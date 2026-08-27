const DASHBOARD_ENDPOINT = 'https://ultron.v90300560.workers.dev/dashboard';
const DASHBOARD_REFRESH_MS = 60_000;
const PAGE_NAMES = {
  '/': 'Portfolio home',
  '/index.html': 'Portfolio home',
  '/free-services.html': 'Free Digital Services',
  '/games.html': 'Games Offered'
};

let dashboardAccessKey = '';
let dashboardRefreshTimer = 0;

function displayNumber(value) {
  const number = Number(value);
  return Number.isFinite(number) ? Math.round(number).toLocaleString('en-IN') : '0';
}

function pageName(path) {
  return PAGE_NAMES[path] || 'Portfolio page';
}

function deviceName(device) {
  return ({ mobile: 'Mobile', tablet: 'Tablet', desktop: 'Desktop' })[device] || 'Other';
}

function renderAnalyticsList(list, emptyNote, rows, labelForRow) {
  list.replaceChildren();
  emptyNote.hidden = rows.length > 0;
  if (rows.length === 0) return;

  const highestValue = Math.max(1, ...rows.map((row) => Number(row.views) || 0));
  rows.forEach((row) => {
    const item = document.createElement('li');
    const label = document.createElement('span');
    const value = document.createElement('strong');
    const bar = document.createElement('div');
    const fill = document.createElement('span');

    label.className = 'dashboard-list-label';
    value.className = 'dashboard-list-value';
    bar.className = 'dashboard-bar';
    label.textContent = labelForRow(row);
    value.textContent = displayNumber(row.views);
    fill.style.width = `${Math.max(4, Math.round(((Number(row.views) || 0) / highestValue) * 100))}%`;
    bar.append(fill);
    item.append(label, value, bar);
    list.append(item);
  });
}

function showDashboardData(data) {
  const panel = document.getElementById('dashboardPanel');
  const updated = document.getElementById('dashboardUpdated');
  const totalViews = document.getElementById('dashboardTotalViews');
  const pageCount = document.getElementById('dashboardPageCount');
  const deviceCount = document.getElementById('dashboardDeviceCount');
  const pageList = document.getElementById('dashboardPages');
  const deviceList = document.getElementById('dashboardDevices');
  const pagesEmpty = document.getElementById('dashboardPagesEmpty');
  const devicesEmpty = document.getElementById('dashboardDevicesEmpty');
  if (!panel || !updated || !totalViews || !pageCount || !deviceCount || !pageList || !deviceList || !pagesEmpty || !devicesEmpty) return;

  const pages = Array.isArray(data.pages) ? data.pages : [];
  const devices = Array.isArray(data.devices) ? data.devices : [];
  totalViews.textContent = displayNumber(data.totalViews);
  pageCount.textContent = displayNumber(pages.length);
  deviceCount.textContent = displayNumber(devices.length);
  const timestamp = new Date(data.generatedAt);
  updated.textContent = Number.isNaN(timestamp.getTime())
    ? 'Last updated just now'
    : `Last updated ${timestamp.toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' })}`;
  renderAnalyticsList(pageList, pagesEmpty, pages, (row) => pageName(row.page));
  renderAnalyticsList(deviceList, devicesEmpty, devices, (row) => deviceName(row.device));
  panel.hidden = false;
}

function setDashboardStatus(message, state = '') {
  const status = document.getElementById('dashboardStatus');
  if (!status) return;
  status.className = `status-note dashboard-status${state ? ` ${state}` : ''}`;
  status.textContent = message;
}

async function requestDashboardData() {
  const response = await fetch(DASHBOARD_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'text/plain;charset=UTF-8'
    },
    body: JSON.stringify({ accessKey: dashboardAccessKey }),
    cache: 'no-store'
  });
  const payload = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(payload.error || 'Dashboard data could not be loaded.');
  return payload;
}

async function refreshDashboard({ showLoading = false } = {}) {
  if (!dashboardAccessKey) return;
  if (showLoading) setDashboardStatus('Loading private analytics…');
  const data = await requestDashboardData();
  showDashboardData(data);
  setDashboardStatus('Dashboard unlocked. It refreshes while this tab stays open.', 'success');
}

function lockDashboard() {
  dashboardAccessKey = '';
  window.clearInterval(dashboardRefreshTimer);
  dashboardRefreshTimer = 0;
  const panel = document.getElementById('dashboardPanel');
  const form = document.getElementById('dashboardAccessForm');
  const keyInput = document.getElementById('dashboardAccessKey');
  if (panel) panel.hidden = true;
  if (form) form.reset();
  setDashboardStatus('Dashboard locked. Enter your access key to load the last seven days.');
  keyInput?.focus();
}

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('dashboardAccessForm');
  const keyInput = document.getElementById('dashboardAccessKey');
  const unlockButton = document.getElementById('dashboardUnlockButton');
  const lockButton = document.getElementById('dashboardLockButton');
  if (!form || !keyInput || !unlockButton || !lockButton) return;

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    dashboardAccessKey = keyInput.value;
    if (!dashboardAccessKey) return;
    unlockButton.disabled = true;
    keyInput.disabled = true;

    try {
      await refreshDashboard({ showLoading: true });
      keyInput.value = '';
      window.clearInterval(dashboardRefreshTimer);
      dashboardRefreshTimer = window.setInterval(() => {
        refreshDashboard().catch(() => setDashboardStatus('The dashboard could not refresh. Your access key remains only in this tab.', 'error'));
      }, DASHBOARD_REFRESH_MS);
    } catch (error) {
      dashboardAccessKey = '';
      setDashboardStatus(error.message || 'Dashboard data could not be loaded.', 'error');
      keyInput.focus();
    } finally {
      unlockButton.disabled = false;
      keyInput.disabled = false;
    }
  });

  lockButton.addEventListener('click', lockDashboard);
  window.addEventListener('pagehide', () => window.clearInterval(dashboardRefreshTimer), { once: true });
});
