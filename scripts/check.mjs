#!/usr/bin/env node

import fs from 'node:fs';
import path from 'node:path';
import { spawnSync } from 'node:child_process';

const repoRoot = process.cwd();
const args = new Set(process.argv.slice(2));
const selected = {
  html: args.has('--html') || args.has('--all') || args.size === 0,
  css: args.has('--css') || args.has('--all') || args.size === 0,
  js: args.has('--js') || args.has('--all') || args.size === 0,
  links: args.has('--links') || args.has('--all') || args.size === 0,
  security: args.has('--security') || args.has('--all') || args.size === 0,
};

const errors = [];
const warnings = [];

function isFile(filePath) {
  try {
    return fs.statSync(filePath).isFile();
  } catch {
    return false;
  }
}

function normalizeRepoPath(filePath) {
  return path.relative(repoRoot, filePath).split(path.sep).join('/');
}

function listProjectFiles(dir, filter = () => true) {
  const results = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.name === '.git' || entry.name === 'node_modules') continue;
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      results.push(...listProjectFiles(fullPath, filter));
    } else if (filter(entry.name)) {
      results.push(fullPath);
    }
  }
  return results;
}

function readFile(filePath) {
  try {
    return fs.readFileSync(filePath, 'utf8');
  } catch (error) {
    errors.push(`${normalizeRepoPath(filePath)}: unable to read file (${error.message})`);
    return '';
  }
}

function addError(filePath, message) {
  errors.push(`${normalizeRepoPath(filePath)}: ${message}`);
}

function addWarning(filePath, message) {
  warnings.push(`${normalizeRepoPath(filePath)}: ${message}`);
}

function isExternalReference(value) {
  if (!value) return true;
  if (value.startsWith('#')) return true;
  if (value.startsWith('mailto:') || value.startsWith('tel:') || value.startsWith('javascript:')) return true;
  if (value.startsWith('data:') || value.startsWith('blob:')) return true;
  return /^[a-z][a-z0-9+.-]*:/i.test(value) || value.startsWith('//');
}

function parseLocalReference(value) {
  if (isExternalReference(value)) return null;
  const trimmed = value.trim();
  if (!trimmed || trimmed === '/') return null;
  const withoutHash = trimmed.split('#')[0].split('?')[0];
  if (!withoutHash) return null;
  return withoutHash;
}

function resolveReference(fromFile, reference) {
  const relative = parseLocalReference(reference);
  if (!relative) return null;
  const absolute = path.resolve(path.dirname(fromFile), relative);
  return absolute;
}

function referenceExists(fromFile, reference) {
  const resolved = resolveReference(fromFile, reference);
  if (!resolved) return true;
  if (isFile(resolved)) return true;
  try {
    const status = fs.statSync(resolved);
    if (status.isDirectory()) {
      return isFile(path.join(resolved, 'index.html'));
    }
  } catch {
    return false;
  }
  return false;
}

function checkHtmlFile(filePath, htmlText) {
  if (!/<html[^>]*\s+lang=/i.test(htmlText)) {
    addError(filePath, 'missing html lang attribute');
  }

  if (!/<meta[^>]+charset=/i.test(htmlText) && !/<meta[^>]+http-equiv=["']content-type["']/i.test(htmlText)) {
    addError(filePath, 'missing charset or content-type metadata');
  }

  if (!/<title>.*?<\/title>/is.test(htmlText)) {
    addError(filePath, 'missing title element');
  }

  if (!/<meta[^>]+name=["']description["']/i.test(htmlText)) {
    addError(filePath, 'missing meta description');
  }

  const duplicateIds = new Map();
  const idMatches = [...htmlText.matchAll(/\s+id=["']([^"']+)["']/gi)];
  for (const match of idMatches) {
    const id = match[1];
    duplicateIds.set(id, (duplicateIds.get(id) || 0) + 1);
  }
  for (const [id, count] of duplicateIds.entries()) {
    if (count > 1) {
      addError(filePath, `duplicate id attribute detected: ${id}`);
    }
  }

  const refs = [...htmlText.matchAll(/(?:src|href)\s*=\s*["']([^"']+)["']/gi)].map((match) => match[1]);
  for (const ref of refs) {
    const target = parseLocalReference(ref);
    if (!target) continue;
    if (!referenceExists(filePath, target)) {
      addError(filePath, `missing local asset or page reference: ${ref}`);
    }
  }
}

function countChars(text, char) {
  return [...text].filter((item) => item === char).length;
}

function checkCssFile(filePath, cssText) {
  const openBraces = countChars(cssText, '{');
  const closeBraces = countChars(cssText, '}');
  if (openBraces !== closeBraces) {
    addError(filePath, `brace mismatch detected (${openBraces} opening braces vs ${closeBraces} closing braces)`);
  }

  const refs = [...cssText.matchAll(/url\((?:['"])?([^'"\)]+)(?:['"])?\)/gi)].map((match) => match[1]);
  for (const ref of refs) {
    if (isExternalReference(ref)) continue;
    const resolved = resolveReference(filePath, ref);
    if (resolved && !isFile(resolved)) {
      addError(filePath, `missing CSS asset reference: ${ref}`);
    }
  }
}

function getJsFiles() {
  return listProjectFiles(repoRoot, (name) => name.endsWith('.js'));
}

function checkJsFiles() {
  for (const filePath of getJsFiles()) {
    const result = spawnSync(process.execPath, ['--check', filePath], {
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'pipe'],
    });
    if (result.status !== 0) {
      const detail = (result.stderr || '').trim() || (result.stdout || '').trim() || 'JavaScript syntax error';
      addError(filePath, detail.replace(/\s+/g, ' '));
    }
  }
}

function detectSecrets(text, filePath) {
  const patterns = [
    /(?:AKIA|ASIA)[0-9A-Z]{16}/g,
    /gh[pousr]_[A-Za-z0-9]{20,}/g,
    /github_pat_[A-Za-z0-9_]{20,}/g,
    /AIza[0-9A-Za-z\-_]{35}/g,
    /xox[baprs]-[A-Za-z0-9-]{10,}/g,
    /(?:sk_live|sk_test)_[A-Za-z0-9A-Za-z\-_]{10,}/g,
    /-----BEGIN (?:RSA |EC |DSA |OPENSSH |PGP )?PRIVATE KEY-----/g,
    /(?:api[_-]?key|access[_-]?token|secret|password)[\s:=]+["']?[A-Za-z0-9._\-+/=]{16,}/gi,
  ];

  const matches = new Set();
  for (const pattern of patterns) {
    for (const match of text.matchAll(pattern)) {
      matches.add(match[0]);
    }
  }

  for (const match of matches) {
    const redacted = match.replace(/.(?=.{2,}$)/g, '*');
    addError(filePath, `possible secret detected (${redacted})`);
  }
}

function checkProjectFiles() {
  const htmlFiles = listProjectFiles(repoRoot, (name) => name.endsWith('.html'));
  const cssFiles = listProjectFiles(repoRoot, (name) => name.endsWith('.css'));
  const manifestPath = path.join(repoRoot, 'manifest.webmanifest');
  const serviceWorkerPath = path.join(repoRoot, 'sw.js');

  if (selected.html) {
    for (const filePath of htmlFiles) {
      const htmlText = readFile(filePath);
      if (!htmlText) continue;
      checkHtmlFile(filePath, htmlText);
    }
  }

  if (selected.css) {
    for (const filePath of cssFiles) {
      const cssText = readFile(filePath);
      if (!cssText) continue;
      checkCssFile(filePath, cssText);
    }
  }

  if (selected.js) {
    checkJsFiles();
  }

  if (selected.links) {
    for (const filePath of htmlFiles) {
      const text = readFile(filePath);
      if (!text) continue;
      const refs = [...text.matchAll(/(?:src|href)\s*=\s*["']([^"']+)["']/gi)].map((match) => match[1]);
      for (const ref of refs) {
        const target = parseLocalReference(ref);
        if (!target) continue;
        if (!referenceExists(filePath, target)) {
          addError(filePath, `broken internal reference: ${ref}`);
        }
      }
    }
  }

  if (selected.security) {
    for (const filePath of listProjectFiles(repoRoot, (name) => /\.(html|js|css|json|yml|yaml|md)$/i.test(name))) {
      if (filePath === manifestPath || filePath === serviceWorkerPath || filePath.endsWith('.md')) {
        const text = readFile(filePath);
        if (text) detectSecrets(text, filePath);
      } else {
        const text = readFile(filePath);
        if (text) detectSecrets(text, filePath);
      }
    }
    if (isFile(manifestPath)) {
      try {
        const manifest = JSON.parse(readFile(manifestPath));
        if (!manifest.start_url) {
          addError(manifestPath, 'manifest is missing start_url');
        }
        if (!Array.isArray(manifest.icons) || manifest.icons.length === 0) {
          addError(manifestPath, 'manifest icons are missing');
        }
      } catch (error) {
        addError(manifestPath, `manifest JSON is invalid: ${error.message}`);
      }
    } else {
      addError(repoRoot, 'manifest.webmanifest is missing');
    }

    if (!isFile(serviceWorkerPath)) {
      addError(repoRoot, 'service worker file is missing');
    }
  }

  if (htmlFiles.length === 0) {
    addError(repoRoot, 'no HTML files were found');
  }
}

checkProjectFiles();

if (errors.length > 0) {
  console.error(`Validation failed with ${errors.length} error(s).`);
  for (const error of errors) {
    console.error(`ERROR: ${error}`);
  }
  if (warnings.length > 0) {
    console.warn('Warnings:');
    for (const warning of warnings) {
      console.warn(`WARN: ${warning}`);
    }
  }
  process.exit(1);
}

if (warnings.length > 0) {
  console.warn(`Validation passed with ${warnings.length} warning(s).`);
  for (const warning of warnings) {
    console.warn(`WARN: ${warning}`);
  }
} else {
  console.log('Validation passed. No repository issues detected.');
}
