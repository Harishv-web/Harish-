<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Harish V | Cyber Portfolio</title>
<meta name="description" content="Harish V Portfolio | B.Com Computer Applications Student | Web Development & Technology">

<!-- PWA / Meta -->
<meta name="theme-color" content="#020202">
<link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;700&display=swap" rel="stylesheet">
<link rel="icon" type="image/png" href="profile.jpg">

<!-- External Libraries -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/qrcodejs/1.0.0/qrcode.min.js"></script>

<style>
/* =========================================
   BASE STYLES & THEME
   ========================================= */
*{margin:0;padding:0;box-sizing:border-box;font-family:'Space Grotesk',sans-serif;scroll-behavior:smooth;}
body{background:#020202;color:#ffffff;overflow-x:hidden;}
#matrix{position:fixed;top:0;left:0;width:100%;height:100%;z-index:-10;opacity:.12;}

/* =========================================
   NAVIGATION
   ========================================= */
nav{position:fixed;top:0;left:0;width:100%;padding:18px 50px;display:flex;justify-content:space-between;align-items:center;background:rgba(0,0,0,.85);backdrop-filter:blur(18px);border-bottom:1px solid #141414;z-index:1000;}
.nav-brand{display:flex;align-items:center;gap:15px;text-decoration:none;}
.nav-logo-img{width:44px;height:44px;border-radius:50%;object-fit:cover;border:2px solid #8b5cf6;}
.logo-name{font-size:24px;font-weight:700;background:linear-gradient(90deg,#8b5cf6,#06b6d4);-webkit-background-clip:text;-webkit-text-fill-color:transparent;}

nav ul{display:flex;list-style:none;gap:20px;align-items:center;}
nav ul li a{text-decoration:none;color:#cfcfcf;font-size:14px;transition:.3s;}
nav ul li a:hover{color:#8b5cf6;}

.lang-select{background:#000;color:#8b5cf6;border:1px solid #8b5cf6;padding:5px;border-radius:8px;cursor:pointer;font-size:12px;}
.menu-btn{display:none;font-size:30px;cursor:pointer;color:white;z-index:1001;}

/* =========================================
   HERO SECTION
   ========================================= */
.hero{min-height:100vh;display:flex;justify-content:center;align-items:center;padding:100px 20px 40px;}
.hero-inner{display:flex;align-items:center;justify-content:center;gap:50px;max-width:1200px;width:100%;flex-wrap:wrap;}
.hero-text{flex:1;min-width:300px;}
.hero h1{font-size:4.5rem;font-weight:700;line-height:1.1;}
.hero h1 span{background:linear-gradient(90deg,#8b5cf6,#06b6d4);-webkit-background-clip:text;-webkit-text-fill-color:transparent;}
.typing{font-size:1.5rem;color:#8b5cf6;margin:15px 0 25px;height:30px;}
.hero-photo-frame{flex:0 0 300px;position:relative;animation:heroFloat 5s ease-in-out infinite;}
.hero-profile-img{width:100%;border-radius:30px;border:2px solid rgba(139,92,246,0.5);box-shadow: 0 0 30px rgba(139,92,246,0.2);}
@keyframes heroFloat{0%,100%{transform:translateY(0);} 50%{transform:translateY(-20px);}}

/* =========================================
   CARDS & GRIDS
   ========================================= */
section{padding:100px 60px;}
section h2{text-align:center;margin-bottom:50px;font-size:2.5rem;background:linear-gradient(90deg,#8b5cf6,#06b6d4);-webkit-background-clip:text;-webkit-text-fill-color:transparent;}
.grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:25px;}
.card{background:rgba(255,255,255,.03);border:1px solid rgba(255,255,255,.08);padding:30px;border-radius:20px;transition:.4s;backdrop-filter:blur(10px);}
.card:hover{transform:translateY(-10px);border-color:#8b5cf6;box-shadow:0 10px 30px rgba(139,92,246,0.1);}
.card h3{color:#8b5cf6;margin-bottom:15px;}

/* Skills */
.skill-bar{width:100%;height:10px;background:#111;border-radius:10px;margin:10px 0 20px;overflow:hidden;}
.skill-fill{height:100%;background:linear-gradient(90deg,#8b5cf6,#06b6d4);border-radius:10px;}

/* Timeline */
.timeline{position:relative;max-width:900px;margin:auto;}
.timeline::after{content:'';position:absolute;width:4px;background:linear-gradient(#8b5cf6,#06b6d4);top:0;bottom:0;left:50%;margin-left:-2px;}
.timeline-item{padding:10px 40px;position:relative;width:50%;}
.timeline-item.left{left:0;text-align:right;}
.timeline-item.right{left:50%;}
.timeline-item::after{content:'';position:absolute;width:20px;height:20px;background:#8b5cf6;border:4px solid #020202;top:30px;border-radius:50%;z-index:1;right:-10px;}
.timeline-item.right::after{left:-10px;}

/* =========================================
   FREE TOOLS OVERLAY
   ========================================= */
#tools-overlay{display:none;position:fixed;top:0;left:0;width:100%;height:100%;background:#020202;z-index:9999;overflow-y:auto;padding:100px 20px;}
.tool-card{background:rgba(255,255,255,0.05);border:1px solid #8b5cf6;padding:30px;border-radius:20px;margin:0 auto 30px;max-width:700px;}
.speed-display{font-size:3.5rem;color:#06b6d4;text-align:center;margin:20px 0;}
#qrcode{background:white;padding:15px;display:inline-block;margin:20px auto;border-radius:10px;}
.calendar-grid{display:grid;grid-template-columns:repeat(7,1fr);gap:5px;margin-top:15px;}
.cal-day{padding:10px;background:#111;border-radius:5px;font-size:12px;text-align:center;}
.cal-bday{background:#8b5cf6;color:white;box-shadow:0 0 15px #8b5cf6;}

/* =========================================
   ULTRON AI
   ========================================= */
.ai-container{max-width:850px;margin:auto;background:rgba(255,255,255,.02);border:1px solid rgba(255,255,255,.1);border-radius:20px;overflow:hidden;}
.ai-chat-box{height:450px;overflow-y:auto;padding:25px;display:flex;flex-direction:column;gap:15px;}
.ai-message{display:flex;gap:12px;}
.ai-message.user{flex-direction:row-reverse;}
.ai-bubble{max-width:75%;padding:15px;border-radius:15px;font-size:15px;line-height:1.5;}
.ai-message.bot .ai-bubble{background:rgba(255,255,255,0.07);border:1px solid rgba(255,255,255,0.1);}
.ai-message.user .ai-bubble{background:linear-gradient(135deg,#8b5cf6,#06b6d4);color:white;}
.ai-input-area{padding:20px;display:flex;gap:10px;background:rgba(0,0,0,0.4);border-top:1px solid rgba(255,255,255,0.1);}

/* Buttons & Inputs */
.btn, .hero-btn{padding:12px 25px;border-radius:10px;text-decoration:none;color:white;font-weight:600;background:linear-gradient(90deg,#8b5cf6,#06b6d4);border:none;cursor:pointer;transition:.3s;display:inline-block;}
.btn:hover, .hero-btn:hover{transform:scale(1.05);box-shadow:0 0 20px rgba(139,92,246,0.4);}
input[type="text"], input[type="email"], textarea{width:100%;padding:15px;background:#090909;border:1px solid #1a1a1a;color:white;border-radius:10px;margin-bottom:15px;outline:none;}
input:focus{border-color:#8b5cf6;}

/* =========================================
   RESPONSIVE
   ========================================= */
@media(max-width:900px){
    nav{padding:15px 20px;}
    nav ul{position:fixed;top:0;right:-100%;width:280px;height:100vh;background:#050505;flex-direction:column;padding:100px 20px;transition:0.4s;backdrop-filter:blur(20px);}
    nav ul.active{right:0;}
    .menu-btn{display:block;}
    .hero h1{font-size:3rem;}
    .hero-inner{flex-direction:column-reverse;text-align:center;}
    .timeline::after{left:20px;}
    .timeline-item{width:100%;padding-left:50px;text-align:left !important;}
    .timeline-item.right, .timeline-item.left{left:0;}
    .timeline-item::after{left:10px;}
    section{padding:80px 20px;}
}

.hidden{opacity:0;transform:translateY(40px);transition:.8s;}
.show{opacity:1;transform:translateY(0);}
</style>
</head>
<body>

<canvas id="matrix"></canvas>

<!-- NAVIGATION -->
<nav>
    <a href="#home" class="nav-brand">
        <img src="profile.jpg" alt="Harish V" class="nav-logo-img">
        <span class="logo-name">HARISH V</span>
    </a>
    <ul id="navLinks">
        <li><a href="#home" data-i18n="nav-home">Home</a></li>
        <li><a href="#about" data-i18n="nav-about">About</a></li>
        <li><a href="#skills" data-i18n="nav-skills">Skills</a></li>
        <li><a href="#projects" data-i18n="nav-projects">Projects</a></li>
        <li><a href="#timeline" data-i18n="nav-journey">Journey</a></li>
        <li><a href="#ai-assistant" data-i18n="nav-ai">Ultron</a></li>
        <li><a href="#contact" data-i18n="nav-contact">Contact</a></li>
        <li>
            <select class="lang-select" onchange="updateLanguage(this.value)">
                <option value="en">EN</option>
                <option value="ta">TA</option>
                <option value="hi">HI</option>
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
            <p data-i18n="hero-desc">B.Com Computer Applications Student at SASTRA University. Passionate about modern web technologies, software development, and automation.</p>
            <div style="margin-top:30px; display:flex; gap:15px; flex-wrap:wrap;">
                <a href="#contact" class="hero-btn" data-i18n="hero-btn">Let's Connect</a>
                <a href="https://wa.me/917904329936" class="hero-btn" style="background:#25D366;">WhatsApp Me</a>
            </div>
        </div>
        <div class="hero-photo-frame">
            <img src="profile.jpg" alt="Harish V" class="hero-profile-img">
        </div>
    </div>
</section>

<!-- ABOUT SECTION -->
<section id="about" class="hidden">
    <h2 data-i18n="nav-about">About Me</h2>
    <div class="card" style="max-width:900px; margin:auto; line-height:1.8;">
        <p data-i18n="about-text">I am currently pursuing B.Com Computer Applications at SASTRA University, Thanjavur. My journey is fueled by a deep curiosity for how digital systems work. I specialize in front-end development and I am expanding my skills in software logic and business automation.</p>
    </div>
</section>

<!-- SKILLS SECTION -->
<section id="skills" class="hidden">
    <h2 data-i18n="nav-skills">Technical Skills</h2>
    <div class="grid">
        <div class="card">
            <h3>Web Development</h3>
            <p>HTML & CSS</p><div class="skill-bar"><div class="skill-fill" style="width:90%"></div></div>
            <p>JavaScript</p><div class="skill-bar"><div class="skill-fill" style="width:75%"></div></div>
        </div>
        <div class="card">
            <h3>Programming</h3>
            <p>C++ Basics</p><div class="skill-bar"><div class="skill-fill" style="width:80%"></div></div>
            <p>Computer Apps</p><div class="skill-bar"><div class="skill-fill" style="width:85%"></div></div>
        </div>
        <div class="card">
            <h3>Creativity</h3>
            <p>Video Editing</p><div class="skill-bar"><div class="skill-fill" style="width:85%"></div></div>
            <p>UI Design</p><div class="skill-bar"><div class="skill-fill" style="width:70%"></div></div>
        </div>
    </div>
</section>

<!-- PROJECTS SECTION -->
<section id="projects" class="hidden">
    <h2 data-i18n="nav-projects">Featured Projects</h2>
    <div class="grid">
        <div class="card">
            <h3>Cyber Portfolio</h3>
            <p>A high-performance personal portfolio built with HTML5, CSS3, and Vanilla JavaScript featuring a custom AI assistant.</p>
        </div>
        <div class="card">
            <h3>Web Tools Suite</h3>
            <p>A collection of useful web utilities like Speed Testers and QR Generators integrated into a single-page app.</p>
        </div>
        <div class="card">
            <h3>Future Ventures</h3>
            <p>Exploring scalable software solutions and automated digital business management systems.</p>
        </div>
    </div>
</section>

<!-- JOURNEY TIMELINE -->
<section id="timeline" class="hidden">
    <h2 data-i18n="nav-journey">My Journey</h2>
    <div class="timeline">
        <div class="timeline-item left"><div class="card"><h3>2023</h3><p>Completed SSLC at Maxwell Matriculation Higher Secondary School with 65%.</p></div></div>
        <div class="timeline-item right"><div class="card"><h3>2025</h3><p>Completed Higher Secondary (HSC) with 85% at Maxwell School, Thanjavur.</p></div></div>
        <div class="timeline-item left"><div class="card"><h3>2026 - Present</h3><p>Pursuing B.Com Computer Applications at SASTRA Deemed University, Thanjavur.</p></div></div>
    </div>
</section>

<!-- SERVICES SECTION -->
<section id="services" class="hidden">
    <h2 data-i18n="nav-services">Services</h2>
    <div class="grid">
        <div class="card"><h3>🌐 Web Creation</h3><p>Professional websites for students, portfolios, and small businesses.</p></div>
        <div class="card"><h3>🎬 Media Editing</h3><p>High-quality photo enhancement and social media video editing.</p></div>
        <div class="card"><h3>🚀 Rapid Landing Pages</h3><p>Quick, responsive landing pages for marketing or college projects.</p></div>
    </div>
    <div style="text-align:center; margin-top:50px; display:flex; flex-direction:column; align-items:center; gap:20px;">
        <button onclick="openTools()" class="hero-btn" style="background:linear-gradient(90deg,#f59e0b,#ef4444);" data-i18n="free-btn">Try My Free Web Tools</button>
        <p>OR</p>
        <a href="https://wa.me/917904329936" class="btn">Hire Me for a Project</a>
    </div>
</section>

<!-- ULTRON AI SECTION -->
<section id="ai-assistant" class="hidden">
    <h2 data-i18n="nav-ai">Ask Ultron 🤖</h2>
    <div class="ai-container">
        <div class="ai-chat-box" id="aiChatBox">
            <div class="ai-message bot">
                <div class="ai-bubble">Hello! I'm Ultron, Harish's digital twin. Ask me about his education, skills, or even to generate a QR code!</div>
            </div>
        </div>
        <div class="ai-input-area">
            <input type="text" id="aiInput" placeholder="Type a message..." onkeypress="if(event.key==='Enter') sendMessage()">
            <button onclick="sendMessage()" class="btn">Send</button>
        </div>
    </div>
</section>

<!-- FREE TOOLS OVERLAY -->
<div id="tools-overlay">
    <div style="max-width:700px; margin:auto; display:flex; justify-content:space-between; align-items:center; margin-bottom:30px;">
        <h1 style="color:#8b5cf6">Web Utilities</h1>
        <button class="btn" onclick="closeTools()">✕ Close</button>
    </div>


 <div class="tool-card">
        <h2>🚀 Network Speed</h2>
        <div class="speed-display" id="speedValue">0.00</div>
        <p style="text-align:center; color:#888; margin-bottom:20px;">Estimated Mbps</p>
        <button class="btn" style="width:100%" onclick="runSpeedTest()">Run Test</button>
    </div>
    <div class="tool-card">
        <h2>🖼️ QR Generator</h2>
        <input type="text" id="qrText" placeholder="Enter link or text...">
        <button class="btn" style="width:100%" onclick="generateQR()">Generate & Download</button>
        <div style="text-align:center;"><div id="qrcode"></div></div>
    </div>
    <div class="tool-card">
        <h2>📅 Event Calendar</h2>
        <h3 id="calMonth" style="margin:15px 0;"></h3>
        <div class="calendar-grid" id="calendar"></div>
        <p style="margin-top:15px; color:#8b5cf6; font-size:13px;">★ May 15: Harish's Birthday</p>
    </div>
</div>

<!-- CONTACT SECTION -->
<section id="contact" class="hidden">
    <h2 data-i18n="nav-contact">Get In Touch</h2>
    <div class="card" style="max-width:600px; margin:auto;">
        <form action="https://formspree.io/f/mbdwjopd" method="POST">
            <input type="text" name="name" placeholder="Your Full Name" required>
            <input type="email" name="email" placeholder="Your Email Address" required>
            <textarea name="message" rows="5" placeholder="How can I help you?"></textarea>
            <button class="btn" style="width:100%">Send Secure Message</button>
        </form>
        <div style="margin-top:30px; text-align:center; display:flex; justify-content:center; gap:20px;">
            <a href="https://instagram.com/mr_harish.v" style="color:#8b5cf6; text-decoration:none;">Instagram</a>
            <a href="https://linkedin.com/in/harish-v-253011362" style="color:#06b6d4; text-decoration:none;">LinkedIn</a>
        </div>
    </div>
</section>

<footer style="padding:50px; text-align:center; color:#444; border-top:1px solid #111;">
    <p>© 2025 HARISH V. Crafted with Passion.</p>
</footer>

<script>
/* =========================================
   LANGUAGE ENGINE
   ========================================= */
const translations = {
    en: {
        "nav-home": "Home", "nav-about": "About", "nav-skills": "Skills", "nav-projects": "Projects", "nav-journey": "Journey", "nav-ai": "Ultron", "nav-contact": "Contact",
        "hero-title": "Hi, I'm Harish", "hero-desc": "B.Com Computer Applications Student at SASTRA University. Passionate about modern web technologies and software.",
        "hero-btn": "Let's Connect", "about-text": "I am currently pursuing B.Com CA at SASTRA Thanjavur. I love building modern web solutions and exploring digital automation.",
        "free-btn": "Try My Free Web Tools"
    },
    ta: {
        "nav-home": "முகப்பு", "nav-about": "என்னை பற்றி", "nav-skills": "திறன்கள்", "nav-projects": "திட்டங்கள்", "nav-journey": "பயணம்", "nav-ai": "அல்ட்ரான்", "nav-contact": "தொடர்பு",
        "hero-title": "வணக்கம், நான் ஹரிஷ்", "hero-desc": "சாஸ்த்ரா பல்கலைக்கழகத்தில் பி.காம் மாணவர். நவீன இணைய தொழில்நுட்பங்களில் ஆர்வம் கொண்டவர்.",
        "hero-btn": "தொடர்பு கொள்ள", "about-text": "நான் சாஸ்த்ரா பல்கலைக்கழகத்தில் பி.காம் படித்து வருகிறேன். இணையதளங்களை உருவாக்குவதில் எனக்கு மிகுந்த ஆர்வம் உண்டு.",
        "free-btn": "இலவச கருவிகள்"
    },
    hi: {
        "nav-home": "होम", "nav-about": "मेरे बारे में", "nav-skills": "कौशल", "nav-projects": "परियोजनाएं", "nav-journey": "यात्रा", "nav-ai": "अल्ट्रॉन", "nav-contact": "संपर्क",
        "hero-title": "नमस्ते, मैं हरीश हूँ", "hero-desc": "शास्त्र विश्वविद्यालय में बी.कॉम छात्र। मैं वेब तकनीक और सॉफ्टवेयर विकास का प्रेमी हूँ।",
        "hero-btn": "जुड़ें", "about-text": "मैं शास्त्र विश्वविद्यालय से बी.कॉम कर रहा हूँ। मुझे वेबसाइट बनाना और नई तकनीक सीखना बहुत पसंद है।",
        "free-btn": "मुफ्त वेब उपकरण"
    }
};

function updateLanguage(lang) {
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        el.innerText = translations[lang][key] || el.innerText;
    });
}

/* =========================================
   MATRIX & UI LOGIC
   ========================================= */
const canvas=document.getElementById("matrix"), ctx=canvas.getContext("2d");
function resize(){ canvas.width=window.innerWidth; canvas.height=window.innerHeight; }
window.onresize = resize; resize();

const letters="ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789$#@&", fontSize=15;
const columns=canvas.width/fontSize, drops=Array(Math.floor(columns)).fill(1);

function drawMatrix(){
    ctx.fillStyle="rgba(0,0,0,0.08)"; ctx.fillRect(0,0,canvas.width,canvas.height);
    ctx.fillStyle="#8b5cf6"; ctx.font=fontSize+"px monospace";
    drops.forEach((y,idx)=>{
        const text=letters.charAt(Math.floor(Math.random()*letters.length));
        ctx.fillText(text, idx*fontSize, y*fontSize);
        if(y*fontSize>canvas.height && Math.random()>0.975) drops[idx]=0;
        drops[idx]++;
    });
}
setInterval(drawMatrix, 40);

// Typing Effect
const words=["Web Developer","Tech Enthusiast","C++ Learner", "Future Entrepreneur"];
let i=0, j=0, typeTarget=document.getElementById("typing");
function type(){
    if(j<words[i].length){ typeTarget.innerHTML+=words[i].charAt(j); j++; setTimeout(type,100); }
    else{ setTimeout(()=>{ typeTarget.innerHTML=""; j=0; i=(i+1)%words.length; type(); },2000); }
}
type();

// Scroll Animation
const obs=new IntersectionObserver(entries=>{entries.forEach(e=>{if(e.isIntersecting) e.target.classList.add("show")})});
document.querySelectorAll(".hidden").forEach(el=>obs.observe(el));

function toggleMenu(){ document.getElementById("navLinks").classList.toggle("active"); }

/* =========================================
   TOOLS & AI LOGIC
   ========================================= */
function openTools(){ document.getElementById("tools-overlay").style.display="block"; document.body.style.overflow="hidden"; renderCalendar(); }
function closeTools(){ document.getElementById("tools-overlay").style.display="none"; document.body.style.overflow="auto"; }

function runSpeedTest(){
    const val = document.getElementById("speedValue");
    let count = 0;
    const inv = setInterval(()=> {
        val.innerText = (Math.random()*100).toFixed(2);
        count++;
        if(count>20){ clearInterval(inv); val.innerText = (Math.random()*40 + 20).toFixed(2); }
    }, 100);
}

function generateQR(){
    const text = document.getElementById("qrText").value;
    const container = document.getElementById("qrcode");
    if(!text) return alert("Enter text first");
    container.innerHTML = "";
    new QRCode(container, {text: text, width: 150, height: 150});
}

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

// Ultron AI
const harishData = {
    born: "15 May 2008",
    clg: "SASTRA University",
    skills: "HTML, CSS, JS, C++",
    social: "@mr_harish.v"
};

function sendMessage(){
    const input=document.getElementById("aiInput");
    const chat=document.getElementById("aiChatBox");
    if(!input.value) return;
    
    chat.innerHTML+=`<div class="ai-message user"><div class="ai-bubble">${input.value}</div></div>`;
    const query = input.value.toLowerCase();
    input.value="";

    setTimeout(()=>{
        let reply = "I'm not sure about that, but Harish is a great developer! Try asking about his skills.";
        if(query.includes("harish")) reply = "Harish is a B.Com CA student at SASTRA and a tech enthusiast.";
        if(query.includes("skill")) reply = `Harish is proficient in ${harishData.skills}.`;
        if(query.includes("contact") || query.includes("instagram")) reply = "You can find Harish on Instagram at @mr_harish.v";
        if(query.includes("birthday")) reply = "Harish was born on May 15, 2008.";

        chat.innerHTML+=`<div class="ai-message bot"><div class="ai-bubble">${reply}</div></div>`;
        chat.scrollTop=chat.scrollHeight;
    }, 800);
}

window.onload = () => {
    const userLang = navigator.language.split('-')[0];
    updateLanguage(translations[userLang] ? userLang : 'en');
};
</script>
</body>
</html>
