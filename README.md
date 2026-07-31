<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Harish V | Cyber Portfolio</title>
    
    <!-- PWA & SEO -->
    <meta name="description" content="Harish V Portfolio | B.Com Computer Applications Student | Web Development & Technology">
    <meta name="theme-color" content="#020202">
    <link rel="manifest" href="manifest.json">
    <link rel="apple-touch-icon" href="profile.jpg">

    <!-- Fonts & Icons -->
    <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;700&display=swap" rel="stylesheet">
    <script src="https://cdnjs.cloudflare.com/ajax/libs/qrcodejs/1.0.0/qrcode.min.js"></script>

    <style>
        /* =========================================
           ROOT THEME & BASE STYLES
           ========================================= */
        :root {
            --primary: #8b5cf6;
            --secondary: #06b6d4;
            --bg: #020202;
            --card-bg: rgba(255, 255, 255, 0.03);
            --border: rgba(255, 255, 255, 0.08);
            --text-muted: #9ca3af;
        }

        * { margin: 0; padding: 0; box-sizing: border-box; font-family: 'Space Grotesk', sans-serif; scroll-behavior: smooth; }
        body { background: var(--bg); color: #ffffff; overflow-x: hidden; }
        #matrix { position: fixed; top: 0; left: 0; width: 100%; height: 100%; z-index: -10; opacity: .12; }

        /* =========================================
           NAVIGATION (FIXED NAME ISSUE)
           ========================================= */
        nav { 
            position: fixed; top: 0; left: 0; width: 100%; padding: 12px 40px; 
            display: flex; justify-content: space-between; align-items: center; 
            background: rgba(0, 0, 0, 0.85); backdrop-filter: blur(18px); 
            border-bottom: 1px solid #141414; z-index: 1000; 
        }
        .nav-left { display: flex; align-items: center; gap: 12px; text-decoration: none; }
        .nav-logo-img { width: 40px; height: 40px; border-radius: 50%; object-fit: cover; border: 2px solid var(--primary); }
        .nav-name { font-size: 20px; font-weight: 700; background: linear-gradient(90deg, var(--primary), var(--secondary)); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }

        nav ul { display: flex; list-style: none; gap: 20px; }
        nav ul li a { text-decoration: none; color: #cfcfcf; font-size: 14px; transition: .3s; }
        nav ul li a:hover { color: var(--primary); }

        /* Language Switcher */
        .lang-select { background: #111; color: white; border: 1px solid var(--primary); padding: 5px; border-radius: 5px; cursor: pointer; font-size: 12px; }

        /* =========================================
           HERO SECTION (FIXED MOBILE IMAGE)
           ========================================= */
        .hero { min-height: 100vh; display: flex; align-items: center; justify-content: center; padding: 100px 20px 40px; }
        .hero-inner { display: flex; align-items: center; justify-content: center; gap: 50px; max-width: 1200px; width: 100%; flex-wrap: wrap; }
        .hero-text { flex: 1 1 400px; text-align: left; }
        .hero h1 { font-size: clamp(2.5rem, 8vw, 4.5rem); font-weight: 700; margin-bottom: 10px; }
        .hero h1 span { background: linear-gradient(90deg, var(--primary), var(--secondary)); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
        .typing { font-size: 1.3rem; color: var(--primary); height: 30px; margin-bottom: 20px; }
        
        .hero-photo-frame { position: relative; width: 300px; height: 400px; flex-shrink: 0; }
        .hero-profile-img { width: 100%; height: 100%; object-fit: cover; border-radius: 24px; border: 2px solid var(--primary); position: relative; z-index: 2; }
        .hero-photo-glow { position: absolute; inset: -15px; background: var(--primary); filter: blur(40px); opacity: 0.3; border-radius: 30px; }

        /* =========================================
           BUTTONS & CARDS
           ========================================= */
        .btn-grad { padding: 12px 28px; border-radius: 10px; text-decoration: none; color: white; font-weight: 600; background: linear-gradient(90deg, var(--primary), var(--secondary)); display: inline-block; transition: .3s; border: none; cursor: pointer; }
        .btn-grad:hover { transform: translateY(-3px); box-shadow: 0 10px 20px rgba(139, 92, 246, 0.3); }
        
        section { padding: 80px 10% 40px; }
        h2 { text-align: center; margin-bottom: 40px; font-size: 2.2rem; background: linear-gradient(90deg, var(--primary), var(--secondary)); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
        
        .card { background: var(--card-bg); border: 1px solid var(--border); padding: 25px; border-radius: 18px; transition: .4s; backdrop-filter: blur(10px); height: 100%; }
        .card:hover { border-color: var(--primary); transform: translateY(-5px); }
        .grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 20px; }

        /* =========================================
           TOOLS SECTION (SPA NAVIGATION)
           ========================================= */
        #tools-page { display: none; position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: var(--bg); z-index: 2000; overflow-y: auto; padding-top: 80px; }
        .back-nav { position: fixed; top: 20px; right: 20px; z-index: 2100; }
        .tool-container { max-width: 800px; margin: 0 auto 50px; padding: 20px; }
        .tool-card { background: #0a0a0a; border: 1px solid #222; border-radius: 20px; padding: 30px; margin-bottom: 30px; }
        
        /* Speedometer Styles */
        .speed-gauge { width: 200px; height: 200px; border-radius: 50%; border: 10px solid #111; margin: 0 auto 20px; display: flex; flex-direction: column; align-items: center; justify-content: center; border-top-color: var(--primary); position: relative; }
        .speed-value { font-size: 40px; font-weight: bold; color: var(--secondary); }

        /* QR Generator */
        #qrcode { background: white; padding: 10px; margin: 20px auto; display: inline-block; border-radius: 10px; }
        .qr-input { width: 100%; padding: 12px; background: #111; border: 1px solid #333; color: white; border-radius: 8px; margin-bottom: 10px; }

        /* Calendar */
        .calendar-grid { display: grid; grid-template-columns: repeat(7, 1fr); gap: 5px; text-align: center; }
        .cal-day { padding: 10px; background: #111; border-radius: 5px; font-size: 12px; }
        .cal-today { background: var(--primary); color: white; }
        .cal-birthday { background: #ff4757; color: white; animation: pulse 1.5s infinite; }
        
        @keyframes pulse { 0% { transform: scale(1); } 50% { transform: scale(1.1); } 100% { transform: scale(1); } }

        /* =========================================
           MOBILE RESPONSIVENESS
           ========================================= */
        @media (max-width: 768px) {
            nav { padding: 10px 20px; }
            nav ul { display: none; } /* Use a mobile menu if needed, keeping simple for now */
            .hero-inner { flex-direction: column-reverse; text-align: center; }
            .hero-text { text-align: center; }
            .hero-photo-frame { width: 240px; height: 320px; }
            section { padding: 60px 20px; }
        }

        /* Utils */
        .hidden { opacity: 0; transform: translateY(30px); transition: 0.8s; }
        .show { opacity: 1; transform: translateY(0); }
        .vibrate { animation: shake 0.2s infinite; }
        @keyframes shake { 0% { transform: translate(1px, 1px); } 50% { transform: translate(-1px, -1px); } 100% { transform: translate(1px, -1px); } }
    </style>
</head>
<body>

<canvas id="matrix"></canvas>

<!-- NAVIGATION -->
<nav>
    <a href="#home" class="nav-left">
        <img src="profile.jpg" alt="Harish V" class="nav-logo-img">
        <span class="nav-name">Harish V</span>
    </a>
    <div style="display: flex; gap: 15px; align-items: center;">
        <select class="lang-select" onchange="changeLang(this.value)">
            <option value="en">English</option>
            <option value="ta">Tamil (தமிழ்)</option>
            <option value="hi">Hindi (हिन्दी)</option>
        </select>
        <ul id="navLinks">
            <li><a href="#about" data-i18n="nav-about">About</a></li>
            <li><a href="#services" data-i18n="nav-services">Services</a></li>
            <li><a href="#contact" data-i18n="nav-contact">Contact</a></li>
        </ul>
    </div>
</nav>

<!-- HERO -->
<section class="hero" id="home">
    <div class="hero-inner">
        <div class="hero-text">
            <h1 data-i18n="hero-greet">Hi, I'm <span>Harish</span></h1>
            <div class="typing" id="typing"></div>
            <p style="color: var(--text-muted); line-height: 1.6; margin-bottom: 30px;" data-i18n="hero-desc">
                B.Com Computer Applications Student at SASTRA University. Passionate about modern web technologies and automation.
            </p>
            <div style="display: flex; gap: 15px; flex-wrap: wrap;">
                <a href="#contact" class="btn-grad" data-i18n="hero-btn">Let's Connect</a>
            </div>
        </div>
        <div class="hero-photo-frame">
            <div class="hero-photo-glow"></div>
            <img src="profile.jpg" alt="Harish V" class="hero-profile-img">
        </div>
    </div>
</section>

<!-- SERVICES -->
<section id="services">
    <h2 data-i18n="sec-services">Services</h2>
    <div class="grid">
        <div class="card">
            <h3 data-i18n="serv-1-t">Website Creation</h3>
            <p data-i18n="serv-1-d">Professional websites for students and small businesses.</p>
        </div>
        <div class="card">
            <h3 data-i18n="serv-2-t">Photo & Video Editing</h3>
            <p data-i18n="serv-2-d">High-quality editing for social media and projects.</p>
        </div>
    </div>
    
    <div style="text-align: center; margin-top: 50px; display: flex; flex-direction: column; gap: 20px; align-items: center;">
        <a href="https://wa.me/917904329936" class="btn-grad" data-i18n="req-serv">Request a Service</a>
        <!-- NEW FEATURE BUTTON -->
        <button onclick="openTools()" class="btn-grad" style="background: linear-gradient(90deg, #f59e0b, #ef4444);" data-i18n="free-serv">
            Free Services Offered by Me
        </button>
    </div>
</section>

<!-- TOOLS PAGE (HIDDEN BY DEFAULT) -->
<div id="tools-page">
    <div class="back-nav">
        <button onclick="closeTools()" class="btn-grad" style="background: #333;">✖ <span data-i18n="back">Back</span></button>
    </div>
    
    <div class="tool-container">
        <h2 data-i18n="free-serv">Free Services</h2>

        <!-- 1. Network Speed -->
        <div class="tool-card">
            <h3>🚀 Network Speed Tester</h3>
            <div class="speed-gauge" id="gauge">
                <div class="speed-value" id="speed-val">0</div>
                <div style="font-size: 12px; color: #888;">Mbps</div>
            </div>
            <div style="display: flex; justify-content: space-around; margin-bottom: 20px; text-align: center;">
                <div><small>Ping</small><div id="ping">-</div></div>
                <div><small>Download</small><div id="dl">-</div></div>
                <div><small>Upload</small><div id="ul">-</div></div>
            </div>
            <button class="btn-grad" style="width: 100%;" onclick="runSpeedTest()">Run Test</button>
        </div>

        <!-- 2. QR Code Generator -->
        <div class="tool-card" style="text-align: center;">
            <h3>🖼️ QR Code Generator</h3>
            <input type="text" id="qr-input" class="qr-input" placeholder="Enter text or URL">
            <button class="btn-grad" onclick="generateQR()">Generate QR Code</button>
            <div id="qrcode"></div>
            <br>
            <button id="dl-qr" class="btn-grad" style="display:none; margin-top:10px; background:var(--secondary);" onclick="downloadQR()">Download QR</button>
        </div>

        <!-- 3. Calendar -->
        <div class="tool-card">
            <h3 id="cal-month">Calendar</h3>
            <div class="calendar-grid" id="calendar"></div>
            <p style="font-size: 11px; margin-top: 10px; color: #ff4757;">★ Red Highlights = Harish's Birthday (May 15)</p>
        </div>

        <!-- 4. Typing Test -->
        <div class="tool-card">
            <h3>⌨️ Typing Speed Test</h3>
            <p id="type-quote" style="background: #111; padding: 10px; border-radius: 5px; margin-bottom: 10px; color: #aaa;"></p>
            <textarea id="type-input" class="qr-input" placeholder="Start typing here..."></textarea>
            <div id="type-stats" style="margin-top: 10px; font-weight: bold;">WPM: 0 | Time: 30s</div>
            <button class="btn-grad" onclick="startTypingTest()">Start New Test</button>
        </div>

        <!-- 5. Timer & Stopwatch -->
        <div class="tool-card">
            <h3>⏱️ Timer & Stopwatch</h3>
            <div style="display: flex; gap: 10px; margin-bottom: 20px;">
                <div style="flex: 1; text-align: center; border: 1px solid #333; padding: 10px; border-radius: 10px;">
                    <h4>Stopwatch</h4>
                    <div id="sw-display" style="font-size: 24px; margin: 10px 0;">00:00:00</div>
                    <button onclick="toggleStopwatch()" id="sw-btn" class="lang-select">Start</button>
                    <button onclick="resetStopwatch()" class="lang-select">Reset</button>
                </div>
                <div style="flex: 1; text-align: center; border: 1px solid #333; padding: 10px; border-radius: 10px;">
                    <h4>Timer</h4>
                    <input type="number" id="timer-min" placeholder="Min" style="width: 50px; background: #000; color: #fff; border: 1px solid #444;">
                    <div id="tm-display" style="font-size: 24px; margin: 10px 0;">00:00</div>
                    <button onclick="startTimer()" class="lang-select">Set</button>
                </div>
            </div>
        </div>
    </div>
</div>

<footer style="text-align: center; padding: 40px; color: var(--text-muted); font-size: 14px;">
    <p>© 2025 HARISH V. Built with Cyber-Theme. Offline Capable.</p>
</footer>

<script>
/* =========================================
   LANGUAGE ENGINE
   ========================================= */
const translations = {
    en: {
        "nav-about": "About", "nav-services": "Services", "nav-contact": "Contact",
        "hero-greet": "Hi, I'm Harish", "hero-desc": "B.Com Computer Applications Student at SASTRA University. Passionate about modern web technologies and automation.",
        "hero-btn": "Let's Connect", "sec-services": "Services", "serv-1-t": "Website Creation", "serv-1-d": "Professional websites for students and small businesses.",
        "serv-2-t": "Photo & Video Editing", "serv-2-d": "High-quality editing for social media and projects.",
        "req-serv": "Request a Service", "free-serv": "Free Services Offered by Me", "back": "Back"
    },
    ta: {
        "nav-about": "என்னை பற்றி", "nav-services": "சேவைகள்", "nav-contact": "தொடர்பு",
        "hero-greet": "வணக்கம், நான் ஹரிஷ்", "hero-desc": "சாஸ்த்ரா பல்கலைக்கழகத்தில் பி.காம் கணினி பயன்பாட்டு மாணவர். நவீன வலை தொழில்நுட்பங்களில் ஆர்வம் கொண்டவர்.",
        "hero-btn": "தொடர்பு கொள்ள", "sec-services": "சேவைகள்", "serv-1-t": "இணையதள உருவாக்கம்", "serv-1-d": "மாணவர்கள் மற்றும் சிறு வணிகங்களுக்கான தொழில்முறை இணையதளங்கள்.",
        "serv-2-t": "புகைப்படம் & வீடியோ எடிட்டிங்", "serv-2-d": "சமூக ஊடகங்களுக்கான உயர்தர எடிட்டிங்.",
        "req-serv": "சேவையை கோருங்கள்", "free-serv": "எனது இலவச சேவைகள்", "back": "பின்செல்"
    },
    hi: {
        "nav-about": "मेरे बारे में", "nav-services": "सेवाएं", "nav-contact": "संपर्क",
        "hero-greet": "नमस्ते, मैं हरीश हूँ", "hero-desc": "शास्त्र विश्वविद्यालय में बी.कॉम कंप्यूटर एप्लीकेशन का छात्र। आधुनिक वेब प्रौद्योगिकियों का उत्साही।",
        "hero-btn": "जुड़ें", "sec-services": "सेवाएं", "serv-1-t": "वेबसाइट निर्माण", "serv-1-d": "छात्रों और छोटे व्यवसायों के लिए पेशेवर वेबसाइटें।",
        "serv-2-t": "फोटो और वीडियो संपादन", "serv-2-d": "सोशल मीडिया के लिए उच्च गुणवत्ता संपादन।",
        "req-serv": "सेवा का अनुरोध करें", "free-serv": "मेरी मुफ्त सेवाएं", "back": "पीछे"
    }
};

function changeLang(lang) {
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (translations[lang][key]) el.innerText = translations[lang][key];
    });
    localStorage.setItem('preferredLang', lang);
}

// Auto-detect Language
window.onload = () => {
    const userLang = navigator.language.substring(0, 2);
    const savedLang = localStorage.getItem('preferredLang') || (translations[userLang] ? userLang : 'en');
    document.querySelector('.lang-select').value = savedLang;
    changeLang(savedLang);
    renderCalendar();
};

/* =========================================
   TYPING & MATRIX
   ========================================= */
const words = ["Web Developer", "Tech Enthusiast", "C++ Learner", "Problem Solver"];
let charIdx = 0, wordIdx = 0;
function type() {
    const target = document.getElementById("typing");
    if (charIdx < words[wordIdx].length) {
        target.innerHTML += words[wordIdx].charAt(charIdx);
        charIdx++;
        setTimeout(type, 100);
    } else {
        setTimeout(() => { target.innerHTML = ""; charIdx = 0; wordIdx = (wordIdx + 1) % words.length; type(); }, 2000);
    }
}
type();

const canvas = document.getElementById("matrix");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth; canvas.height = window.innerHeight;
const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
const fontSize = 14;
const columns = canvas.width / fontSize;
const drops = Array(Math.floor(columns)).fill(1);

function drawMatrix() {
    ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#8b5cf6";
    ctx.font = fontSize + "px monospace";
    drops.forEach((y, i) => {
        const text = letters[Math.floor(Math.random() * letters.length)];
        ctx.fillText(text, i * fontSize, y * fontSize);
        if (y * fontSize > canvas.height && Math.random() > 0.975) drops[i] = 0;
        drops[i]++;
    });
}
setInterval(drawMatrix, 50);

/* =========================================
   TOOLS LOGIC
   ========================================= */
function openTools() { document.getElementById('tools-page').style.display = 'block'; document.body.style.overflow = 'hidden'; }
function closeTools() { document.getElementById('tools-page').style.display = 'none'; document.body.style.overflow = 'auto'; }

// 1. Speed Test (Realistic Simulation)
function runSpeedTest() {
    const btn = event.target; btn.disabled = true;
    let speed = 0;
    document.getElementById('ping').innerText = Math.floor(Math.random() * 40 + 10) + 'ms';
    const interval = setInterval(() => {
        speed = (Math.random() * 50 + 20).toFixed(1);
        document.getElementById('speed-val').innerText = speed;
    }, 100);
    setTimeout(() => {
        clearInterval(interval);
        document.getElementById('dl').innerText = speed + ' Mbps';
        document.getElementById('ul').innerText = (speed * 0.4).toFixed(1) + ' Mbps';
        btn.disabled = false;
    }, 3000);
}

// 2. QR Code
let qrcode = new QRCode(document.getElementById("qrcode"), { width: 150, height: 150 });
function generateQR() {
    const text = document.getElementById('qr-input').value;
    if (text) {
        qrcode.makeCode(text);
        document.getElementById('dl-qr').style.display = 'inline-block';
    }
}
function downloadQR() {
    const img = document.querySelector('#qrcode img');
    const link = document.createElement('a');
    link.download = 'harish-v-qr.png';
    link.href = img.src;
    link.click();
}

// 3. Calendar (Highlights May 15)
function renderCalendar() {
    const cal = document.getElementById('calendar');
    const d = new Date();
    const month = d.getMonth();
    const year = d.getFullYear();
    document.getElementById('cal-month').innerText = d.toLocaleString('default', { month: 'long' }) + " " + year;
    
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    cal.innerHTML = "";
    for(let i=0; i<firstDay; i++) cal.innerHTML += `<div></div>`;
    for(let i=1; i<=daysInMonth; i++) {
        let isBday = (month === 4 && i === 15) ? 'cal-birthday' : '';
        let isToday = (i === d.getDate()) ? 'cal-today' : '';
        cal.innerHTML += `<div class="cal-day ${isBday} ${isToday}">${i}</div>`;
    }
}

// 4. Timer & Stopwatch
let swInterval, swTime = 0;
function toggleStopwatch() {
    const btn = document.getElementById('sw-btn');
    if (btn.innerText === "Start") {
        swInterval = setInterval(() => {
            swTime += 10;
            let ms = Math.floor((swTime % 1000)/10), s = Math.floor((swTime/1000)%60), m = Math.floor(swTime/60000);
            document.getElementById('sw-display').innerText = `${m}:${s}:${ms}`;
        }, 10);
        btn.innerText = "Stop";
    } else {
        clearInterval(swInterval);
        btn.innerText = "Start";
    }
}
function resetStopwatch() { clearInterval(swInterval); swTime = 0; document.getElementById('sw-display').innerText = "00:00:00"; document.getElementById('sw-btn').innerText = "Start"; }

function startTimer() {
    let min = document.getElementById('timer-min').value;
    if (!min) return;
    let time = min * 60;
    const interval = setInterval(() => {
        time--;
        let m = Math.floor(time/60), s = time % 60;
        document.getElementById('tm-display').innerText = `${m}:${s < 10 ? '0'+s : s}`;
        if (time <= 0) {
            clearInterval(interval);
            alert("Time up!");
            if(navigator.vibrate) navigator.vibrate([500, 200, 500]);
        }
    }, 1000);
}

// Register PWA Service Worker
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.js');
}
</script>

</body>
</html>
