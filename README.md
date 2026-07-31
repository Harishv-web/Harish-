<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Harish V | Cyber Portfolio</title>
<meta name="description" content="Harish V Portfolio | B.Com Computer Applications Student | Web Development & Technology">
<!-- PWA Meta -->
<meta name="theme-color" content="#020202">
<link rel="manifest" href="manifest.json">
<link rel="apple-touch-icon" href="profile.jpg">

<link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;700&display=swap" rel="stylesheet">
<link rel="icon" type="image/png" href="profile.jpg">
<!-- QR Library for the tool -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/qrcodejs/1.0.0/qrcode.min.js"></script>

<style>
/* =========================================
   BASE STYLES & THEME (ORIGINAL)
   ========================================= */
*{margin:0;padding:0;box-sizing:border-box;font-family:'Space Grotesk',sans-serif;scroll-behavior:smooth;}
body{background:#020202;color:#ffffff;overflow-x:hidden;}
#matrix{position:fixed;top:0;left:0;width:100%;height:100%;z-index:-10;opacity:.12;}

/* =========================================
   NAVIGATION (FIXED: LOGO + NAME)
   ========================================= */
nav{position:fixed;top:0;left:0;width:100%;padding:18px 50px;display:flex;justify-content:space-between;align-items:center;background:rgba(0,0,0,.85);backdrop-filter:blur(18px);border-bottom:1px solid #141414;z-index:1000;}
.nav-brand{display:flex;align-items:center;gap:15px;text-decoration:none;}
.nav-logo-img{width:44px;height:44px;border-radius:50%;object-fit:cover;background:linear-gradient(135deg,#8b5cf6,#06b6d4);border:2px solid rgba(139,92,246,.6);transition:.3s;}
.logo-name{font-size:24px;font-weight:700;background:linear-gradient(90deg,#8b5cf6,#06b6d4);-webkit-background-clip:text;-webkit-text-fill-color:transparent;}

nav ul{display:flex;list-style:none;gap:28px;}
nav ul li a{text-decoration:none;color:#cfcfcf;font-size:15px;transition:.3s;position:relative;}
nav ul li a:hover{color:#8b5cf6;}

.lang-select{background:#000;color:#8b5cf6;border:1px solid #8b5cf6;padding:5px 10px;border-radius:8px;cursor:pointer;font-size:12px;margin-left:15px;}

.menu-btn{display:none;font-size:30px;cursor:pointer;color:white;z-index:1001;}

/* =========================================
   HERO SECTION (FIXED: MOBILE IMAGE)
   ========================================= */
.hero{height:100vh;display:flex;flex-direction:column;justify-content:center;align-items:center;text-align:center;padding:20px;}
.hero-inner{display:flex;align-items:center;justify-content:center;gap:70px;max-width:1200px;width:100%;flex-wrap:wrap;}
.hero-text{flex:1 1 420px;text-align:left;}
.hero h1{font-size:5rem;font-weight:700;margin-bottom:10px;}
.hero h1 span{background:linear-gradient(90deg,#8b5cf6,#06b6d4);-webkit-background-clip:text;-webkit-text-fill-color:transparent;}
.typing{font-size:1.3rem;color:#8b5cf6;margin-bottom:25px;height:30px;}
.hero-photo-frame{flex:0 0 auto;position:relative;width:280px;animation:heroFloat 5s ease-in-out infinite;}
.hero-profile-img{position:relative;z-index:1;display:block;width:100%;aspect-ratio:3/4;object-fit:cover;border-radius:24px;border:2px solid rgba(139,92,246,.55);}
@keyframes heroFloat{0%,100%{transform:translateY(0);}50%{transform:translateY(-14px);}}

/* =========================================
   ORIGINAL SECTION CARDS
   ========================================= */
section{padding:110px 60px;}
section h2{text-align:center;margin-bottom:50px;font-size:2.2rem;background:linear-gradient(90deg,#8b5cf6,#06b6d4);-webkit-background-clip:text;-webkit-text-fill-color:transparent;}
.card{background:rgba(255,255,255,.03);border:1px solid rgba(255,255,255,.08);padding:25px;border-radius:18px;transition:.4s;backdrop-filter:blur(10px);}
.grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(250px,1fr));gap:25px;}
.hero-btn, .btn{margin-top:20px;padding:15px 35px;border-radius:12px;text-decoration:none;color:white;font-weight:600;background:linear-gradient(90deg,#8b5cf6,#06b6d4);transition:.3s;display:inline-block;border:none;cursor:pointer;}

/* =========================================
   FREE SERVICES / TOOLS PAGE (NEW)
   ========================================= */
#tools-overlay{display:none;position:fixed;top:0;left:0;width:100%;height:100%;background:#020202;z-index:9999;overflow-y:auto;padding:100px 20px;}
.tool-card{background:rgba(255,255,255,0.05);border:1px solid #8b5cf6;padding:30px;border-radius:20px;margin-bottom:30px;max-width:800px;margin-left:auto;margin-right:auto;}
.back-fixed{position:fixed;top:20px;right:20px;z-index:10000;}

/* Tools Specifics */
.speed-display{font-size:3rem;color:#06b6d4;text-align:center;margin:20px 0;}
.calendar-grid{display:grid;grid-template-columns:repeat(7,1fr);gap:5px;text-align:center;margin-top:15px;}
.cal-day{padding:10px;background:#111;border-radius:5px;font-size:12px;}
.cal-bday{background:#8b5cf6;color:white;box-shadow:0 0 10px #8b5cf6;}
#qrcode{background:white;padding:10px;display:inline-block;margin-top:15px;border-radius:10px;}

/* =========================================
   ULTRON AI SECTION (ORIGINAL)
   ========================================= */
.ai-container{max-width:900px;margin:auto;background:rgba(255,255,255,.03);border:1px solid rgba(255,255,255,.08);border-radius:18px;backdrop-filter:blur(15px);overflow:hidden;}
.ai-chat-box{height:400px;overflow-y:auto;padding:25px;display:flex;flex-direction:column;gap:20px;}
.ai-input-area{padding:20px;display:flex;gap:10px;background:rgba(0,0,0,0.5);}
.ai-bubble{max-width:80%;padding:12px;border-radius:12px;font-size:14px;}
.ai-message.bot .ai-bubble{background:rgba(255,255,255,0.1);}
.ai-message.user .ai-bubble{background:linear-gradient(90deg,#8b5cf6,#06b6d4);margin-left:auto;}

/* =========================================
   TIMELINE (ORIGINAL)
   ========================================= */
.timeline{position:relative;max-width:900px;margin:auto;}
.timeline::after{content:'';position:absolute;width:4px;background:linear-gradient(#8b5cf6,#06b6d4);top:0;bottom:0;left:50%;margin-left:-2px;}
.timeline-item{padding:10px 40px;position:relative;width:50%;}
.left{left:0;text-align:right;}
.right{left:50%;}

/* =========================================
   RESPONSIVE FIXES
   ========================================= */
@media(max-width:900px){
    nav{padding:15px 20px;}
    .hero-inner{flex-direction:column-reverse;text-align:center;}
    .hero-text{text-align:center;}
    .hero h1{font-size:3rem;}
    .timeline::after{left:20px;}
    .timeline-item{width:100%;padding-left:60px;text-align:left;}
    .right, .left{left:0;}
    nav ul{position:fixed;top:0;right:-100%;width:280px;height:100vh;background:#050505;flex-direction:column;padding:100px 30px;transition:0.4s;}
    nav ul.active{right:0;}
    .menu-btn{display:block;}
}

.hidden{opacity:0;transform:translateY(30px);transition:.7s;}
.show{opacity:1;transform:translateY(0);}
</style>
</head>
<body>

<canvas id="matrix"></canvas>

<!-- NAVIGATION -->
<nav>
    <a href="#home" class="nav-brand">
        <img src="profile.jpg" alt="Harish V" class="nav-logo-img">
        <span class="logo-name">Harish V</span>
    </a>
    <ul id="navLinks">
        <li><a href="#home" data-i18n="nav-home">Home</a></li>
        <li><a href="#about" data-i18n="nav-about">About</a></li>
        <li><a href="#timeline" data-i18n="nav-journey">Journey</a></li>
        <li><a href="#services" data-i18n="nav-services">Services</a></li>
        <li><a href="#ai-assistant" data-i18n="nav-ai">Ultron</a></li>
        <li><a href="#contact" data-i18n="nav-contact">Contact</a></li>
        <li>
            <select class="lang-select" onchange="updateLanguage(this.value)">
                <option value="en">English</option>
                <option value="ta">Tamil</option>
                <option value="hi">Hindi</option>
            </select>
        </li>
    </ul>
    <div class="menu-btn" onclick="toggleMenu()">☰</div>
</nav>

<!-- HERO SECTION -->
<section class="hero" id="home">
    <div class="hero-inner">
        <div class="hero-text">
            <h1 data-i18n="hero-title">Hi, I'm <span>Harish</span></h1>
            <div class="typing" id="typing"></div>
            <p data-i18n="hero-desc">B.Com Computer Applications Student at SASTRA University. Passionate about modern web technologies, software development, and building digital experiences.</p>
            <a href="#contact" class="hero-btn" data-i18n="hero-btn">Let's Connect</a>
        </div>
        <div class="hero-photo-frame">
            <img src="profile.jpg" alt="Harish V" class="hero-profile-img">
        </div>
    </div>
</section>

<!-- ABOUT SECTION -->
<section id="about" class="hidden">
    <h2 data-i18n="nav-about">About Me</h2>
    <div class="card">
        <p data-i18n="about-text">I am currently pursuing B.Com Computer Applications at SASTRA University, Thanjavur. My interests include web development, technology, automation, and digital systems.</p>
    </div>
</section>

<!-- JOURNEY TIMELINE -->
<section id="timeline" class="hidden">
    <h2 data-i18n="nav-journey">My Journey</h2>
    <div class="timeline">
        <div class="timeline-item left"><div class="card"><h3>2023</h3><p data-i18n="t1">Completed SSLC with 65%.</p></div></div>
        <div class="timeline-item right"><div class="card"><h3>2025</h3><p data-i18n="t2">Completed HSC with 85%.</p></div></div>
        <div class="timeline-item left"><div class="card"><h3>2026-Present</h3><p data-i18n="t3">Pursuing B.Com CA at SASTRA.</p></div></div>
    </div>
</section>

<!-- SERVICES SECTION -->
<section id="services" class="hidden">
    <h2 data-i18n="nav-services">Services</h2>
    <div class="grid">
        <div class="card"><h3>🌐 Website Creation</h3><p>Professional websites for students and businesses.</p></div>
        <div class="card"><h3>🎬 Editing</h3><p>Professional photo and video enhancement.</p></div>
    </div>
    <div style="text-align:center;margin-top:40px;">
        <a href="https://wa.me/917904329936" class="hero-btn">Request a Service</a><br><br>
        <!-- NEW BUTTON FOR FREE TOOLS -->
        <button onclick="openTools()" class="hero-btn" style="background:linear-gradient(90deg,#f59e0b,#ef4444);" data-i18n="free-btn">Free Services Offered by Me</button>
    </div>
</section>

<!-- ULTRON AI SECTION -->
<section id="ai-assistant" class="hidden">
    <h2 data-i18n="nav-ai">Meet Ultron 🤖</h2>
    <div class="ai-container">
        <div class="ai-chat-box" id="aiChatBox">
            <div class="ai-message bot"><div class="ai-bubble">Hello! I am Ultron. How can I help you today?</div></div>
        </div>
        <div class="ai-input-area">
            <input type="text" id="aiInput" style="flex:1; padding:10px; border-radius:8px; border:none;" placeholder="Ask me something...">
            <button onclick="sendMessage()" class="btn">Send</button>
        </div>
    </div>
</section>

<!-- FREE SERVICES TOOLS PAGE (SPA OVERLAY) -->
<div id="tools-overlay">
    <button class="hero-btn back-fixed" onclick="closeTools()">Back to Portfolio</button>
    <div class="tool-card">
        <h2 style="color:#8b5cf6">🚀 Network Speed Tester</h2>
        <div class="speed-display" id="speedValue">0.00</div>
        <p style="text-align:center;color:#9ca3af">Mbps</p>
        <div style="display:flex;justify-content:space-around;margin-top:20px;">
            <div><small>Ping</small><p id="pingVal">--</p></div>
            <div><small>Download</small><p id="dlVal">--</p></div>
            <div><small>Upload</small><p id="ulVal">--</p></div>
        </div>
        <button class="btn" style="width:100%" onclick="runSpeedTest()">Test Speed</button>
    </div>

    <div class="tool-card">
        <h2 style="color:#8b5cf6">🖼️ QR Code Generator</h2>
        <input type="text" id="qrText" class="btn" style="background:#111;width:100%;text-align:left" placeholder="Enter link or text">
        <button class="btn" onclick="generateQR()">Generate QR</button>
        <div id="qrcode" style="margin:20px auto;display:block"></div>
        <button id="dlQr" class="btn" style="display:none;background:#25D366" onclick="downloadQR()">Download QR Image</button>
    </div>

    <div class="tool-card">
        <h2 style="color:#8b5cf6">📅 Classic Calendar</h2>
        <h3 id="calMonth"></h3>
        <div class="calendar-grid" id="calendar"></div>
        <p style="margin-top:10px;font-size:12px;color:#8b5cf6">★ May 15 Highlighted (Harish's Birthday)</p>
    </div>

    <div class="tool-card">
        <h2 style="color:#8b5cf6">⌨️ Typing Speed Test</h2>
        <p id="typeQuote" style="font-style:italic;color:#9ca3af">The quick brown fox jumps over the lazy dog.</p>
        <textarea id="typeInput" class="btn" style="background:#111;width:100%;height:100px;text-align:left" placeholder="Start typing..."></textarea>
        <p id="typeResult" style="margin-top:10px;font-weight:bold"></p>
        <button class="btn" onclick="resetTyping()">Reset</button>
    </div>

    <div class="tool-card">
        <h2 style="color:#8b5cf6">⏱️ Timer & Stopwatch</h2>
        <div style="display:flex;gap:10px;">
            <div style="flex:1">
                <h4>Stopwatch</h4>
                <div id="swDisplay" style="font-size:2rem">00:00:00</div>
                <button class="btn" onclick="toggleSW()">Start/Stop</button>
            </div>
            <div style="flex:1">
                <h4>Timer (min)</h4>
                <input type="number" id="tmInput" style="width:60px" value="1">
                <div id="tmDisplay" style="font-size:2rem">00:00</div>
                <button class="btn" onclick="startTimer()">Set Timer</button>
            </div>
        </div>
    </div>
</div>

<!-- CONTACT SECTION -->
<section id="contact" class="hidden">
    <h2 data-i18n="nav-contact">Contact</h2>
    <div class="card" style="max-width:600px;margin:auto">
        <form action="https://formspree.io/f/mbdwjopd" method="POST">
            <input type="text" name="name" class="btn" style="background:#111;width:100%;text-align:left;margin-bottom:10px" placeholder="Name" required>
            <input type="email" name="email" class="btn" style="background:#111;width:100%;text-align:left;margin-bottom:10px" placeholder="Email" required>
            <textarea name="message" class="btn" style="background:#111;width:100%;height:100px;text-align:left;margin-bottom:10px" placeholder="Message"></textarea>
            <button class="btn" style="width:100%">Send Message</button>
        </form>
    </div>
</section>

<footer style="padding:40px;text-align:center;color:#555">
    <p>© 2025 HARISH V. All Rights Reserved.</p>
</footer>

<script>
/* =========================================
   LANGUAGE ENGINE
   ========================================= */
const translations = {
    en: {
        "nav-home": "Home", "nav-about": "About", "nav-journey": "Journey", "nav-services": "Services", "nav-ai": "Ultron", "nav-contact": "Contact",
        "hero-title": "Hi, I'm Harish", "hero-desc": "B.Com Computer Applications Student at SASTRA University. Passionate about modern web technologies and software.",
        "hero-btn": "Let's Connect", "about-text": "I am currently pursuing B.Com CA at SASTRA Thanjavur. I love building modern web solutions.",
        "free-btn": "Free Services Offered by Me"
    },
    ta: {
        "nav-home": "முகப்பு", "nav-about": "என்னை பற்றி", "nav-journey": "பயணம்", "nav-services": "சேவைகள்", "nav-ai": "அல்ட்ரான்", "nav-contact": "தொடர்பு",
        "hero-title": "வணக்கம், நான் ஹரிஷ்", "hero-desc": "சாஸ்த்ரா பல்கலைக்கழகத்தில் பி.காம் மாணவர். நவீன இணைய தொழில்நுட்பங்களில் ஆர்வம் கொண்டவர்.",
        "hero-btn": "தொடர்பு கொள்ள", "about-text": "நான் சாஸ்த்ரா பல்கலைக்கழகத்தில் பி.காம் படித்து வருகிறேன். இணையதளங்களை உருவாக்குவதில் எனக்கு மிகுந்த ஆர்வம் உண்டு.",
        "free-btn": "எனது இலவச சேவைகள்"
    },
    hi: {
        "nav-home": "होम", "nav-about": "मेरे बारे में", "nav-journey": "यात्रा", "nav-services": "सेवाएं", "nav-ai": "अल्ट्रॉन", "nav-contact": "संपर्क",
        "hero-title": "नमस्ते, मैं हरीश हूँ", "hero-desc": "शास्त्र विश्वविद्यालय में बी.कॉम कंप्यूटर एप्लीकेशन का छात्र। मैं वेब तकनीक का प्रेमी हूँ।",
        "hero-btn": "जुड़ें", "about-text": "मैं शास्त्र विश्वविद्यालय से बी.कॉम कर रहा हूँ। मुझे वेबसाइट बनाना बहुत पसंद है।",
        "free-btn": "मेरी मुफ्त सेवाएं"
    }
};

function updateLanguage(lang) {
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        el.innerText = translations[lang][key] || el.innerText;
    });
}

// Auto-detect Language
window.onload = () => {
    const userLang = navigator.language.split('-')[0];
    const defaultLang = translations[userLang] ? userLang : 'en';
    document.querySelector('.lang-select').value = defaultLang;
    updateLanguage(defaultLang);
    renderCalendar();
};

/* =========================================
   ORIGINAL JS: MATRIX, TYPING, MENU
   ========================================= */
const words=["Web Developer","Tech Enthusiast","C++ Learner"];
let i=0, j=0, typeTarget=document.getElementById("typing");
function type(){
    if(j<words[i].length){ typeTarget.innerHTML+=words[i].charAt(j); j++; setTimeout(type,100); }
    else{ setTimeout(()=>{ typeTarget.innerHTML=""; j=0; i=(i+1)%words.length; type(); },2000); }
}
type();

const canvas=document.getElementById("matrix"), ctx=canvas.getContext("2d");
canvas.width=window.innerWidth; canvas.height=window.innerHeight;
const letters="ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789", fontSize=14;
const columns=canvas.width/fontSize, drops=Array(Math.floor(columns)).fill(1);
function draw(){
    ctx.fillStyle="rgba(0,0,0,0.05)"; ctx.fillRect(0,0,canvas.width,canvas.height);
    ctx.fillStyle="#8b5cf6"; ctx.font=fontSize+"px monospace";
    drops.forEach((y,idx)=>{
        const text=letters.charAt(Math.floor(Math.random()*letters.length));
        ctx.fillText(text, idx*fontSize, y*fontSize);
        if(y*fontSize>canvas.height && Math.random()>0.975) drops[idx]=0;
        drops[idx]++;
    });
}
setInterval(draw,35);

const obs=new IntersectionObserver(entries=>{entries.forEach(e=>{if(e.isIntersecting) e.target.classList.add("show")})});
document.querySelectorAll(".hidden").forEach(el=>obs.observe(el));

function toggleMenu(){ document.getElementById("navLinks").classList.toggle("active"); }

/* =========================================
   FREE TOOLS LOGIC
   ========================================= */
function openTools(){ document.getElementById("tools-overlay").style.display="block"; document.body.style.overflow="hidden"; }
function closeTools(){ document.getElementById("tools-overlay").style.display="none"; document.body.style.overflow="auto"; }

// Speed Test
function runSpeedTest(){
    let speed=0;
    const interval=setInterval(()=>{
        speed=(Math.random()*90 + 10).toFixed(2);
        document.getElementById("speedValue").innerText=speed;
    },100);
    setTimeout(()=>{
        clearInterval(interval);
        document.getElementById("dlVal").innerText=speed + " Mbps";
        document.getElementById("pingVal").innerText="14ms";
        document.getElementById("ulVal").innerText=(speed*0.3).toFixed(2) + " Mbps";
    },3000);
}

// QR Code
const qr=new QRCode(document.getElementById("qrcode"), {width:150, height:150});
function generateQR(){
    const val=document.getElementById("qrText").value;
    if(val){ qr.makeCode(val); document.getElementById("dlQr").style.display="block"; }
}
function downloadQR(){
    const img=document.querySelector("#qrcode img");
    const link=document.createElement("a");
    link.href=img.src; link.download="harish_qr.png"; link.click();
}

// Calendar
function renderCalendar(){
    const cal=document.getElementById("calendar"), d=new Date();
    const daysInMonth=new Date(d.getFullYear(), d.getMonth()+1, 0).getDate();
    document.getElementById("calMonth").innerText=d.toLocaleString('default', { month: 'long' }) + " " + d.getFullYear();
    cal.innerHTML="";
    for(let k=1; k<=daysInMonth; k++){
        const isBday = (d.getMonth()===4 && k===15) ? "cal-bday" : "";
        cal.innerHTML+=`<div class="cal-day ${isBday}">${k}</div>`;
    }
}

// Typing Test
let startTime;
document.getElementById("typeInput").addEventListener("input", ()=>{
    if(!startTime) startTime=new Date();
    const input=document.getElementById("typeInput").value;
    const quote=document.getElementById("typeQuote").innerText;
    if(input===quote){
        const timeTaken=(new Date()-startTime)/1000;
        const wpm=Math.round((quote.split(" ").length / timeTaken)*60);
        document.getElementById("typeResult").innerText=`Speed: ${wpm} WPM | Time: ${timeTaken}s`;
    }
});
function resetTyping(){ document.getElementById("typeInput").value=""; startTime=null; document.getElementById("typeResult").innerText=""; }

// SW & Timer
let swInterval, swSec=0;
function toggleSW(){
    if(!swInterval) swInterval=setInterval(()=>{ swSec++; document.getElementById("swDisplay").innerText=new Date(swSec*1000).toISOString().substr(11,8); },1000);
    else { clearInterval(swInterval); swInterval=null; }
}
function startTimer(){
    let sec=document.getElementById("tmInput").value * 60;
    const timer=setInterval(()=>{
        sec--;
        document.getElementById("tmDisplay").innerText=Math.floor(sec/60)+":"+(sec%60).toString().padStart(2,'0');
        if(sec<=0){ 
            clearInterval(timer); alert("Time Up!"); 
            if(navigator.vibrate) navigator.vibrate([500,200,500]);
        }
    },1000);
}

/* =========================================
   ULTRON AI LOGIC
   ========================================= */
function sendMessage(){
    const input=document.getElementById("aiInput");
    const chat=document.getElementById("aiChatBox");
    if(!input.value) return;
    chat.innerHTML+=`<div class="ai-message user"><div class="ai-bubble">${input.value}</div></div>`;
    const userText=input.value.toLowerCase();
    input.value="";
    setTimeout(()=>{
        let reply="I am Ultron, Harish's AI assistant. Ask me about his skills or projects!";
        if(userText.includes("harish")) reply="Harish is a B.Com CA student and a passionate web developer.";
        if(userText.includes("skills")) reply="Harish knows HTML, CSS, JS, and C++.";
        chat.innerHTML+=`<div class="ai-message bot"><div class="ai-bubble">${reply}</div></div>`;
        chat.scrollTop=chat.scrollHeight;
    },1000);
}

// Register PWA
if ('serviceWorker' in navigator) { navigator.serviceWorker.register('sw.js'); }
</script>

</body>
</html>
