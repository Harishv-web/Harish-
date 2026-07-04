<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Harish V | Cyber Portfolio</title>
<meta name="description"
content="Harish V Portfolio | B.Com Computer Applications Student | Web Development & Technology">
<link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;700&display=swap" rel="stylesheet">
<style>
*{
margin:0;
padding:0;
box-sizing:border-box;
font-family:'Space Grotesk',sans-serif;
scroll-behavior:smooth;
}
body{
background:#020202;
color:#ffffff;
overflow-x:hidden;
}

  /* MATRIX BACKGROUND */

#matrix{
position:fixed;
top:0;
left:0;
width:100%;
height:100%;
z-index:-10;
opacity:.12;
}

/* NAVBAR */

nav{
position:fixed;
top:0;
left:0;
width:100%;
padding:18px 50px;
display:flex;
justify-content:space-between;
align-items:center;
background:rgba(0,0,0,.85);
backdrop-filter:blur(18px);
border-bottom:1px solid #141414;
z-index:1000;
}

.logo{
font-size:24px;
font-weight:700;
background:linear-gradient(90deg,#8b5cf6,#06b6d4);
-webkit-background-clip:text;
-webkit-text-fill-color:transparent;
}

nav ul{
display:flex;
list-style:none;
gap:28px;
}

nav ul li a{
text-decoration:none;
color:#cfcfcf;
font-size:15px;
transition:.3s;
}

nav ul li a:hover{
color:#8b5cf6;
}

/* HERO */

.hero{
height:100vh;
display:flex;
flex-direction:column;
justify-content:center;
align-items:center;
text-align:center;
padding:20px;
}

.hero h1{
font-size:5rem;
font-weight:700;
margin-bottom:10px;
}

.hero h1 span{
background:linear-gradient(90deg,#8b5cf6,#06b6d4);
-webkit-background-clip:text;
-webkit-text-fill-color:transparent;
}

.typing{
font-size:1.3rem;
color:#8b5cf6;
margin-bottom:25px;
}

.hero p{
max-width:800px;
line-height:1.9;
color:#9ca3af;
}

.hero-btn{
margin-top:35px;
padding:15px 35px;
border-radius:12px;
text-decoration:none;
color:white;
font-weight:600;
background:linear-gradient(90deg,#8b5cf6,#06b6d4);
transition:.3s;
}

.hero-btn:hover{
transform:translateY(-4px);
box-shadow:0 0 25px rgba(139,92,246,.35);
}

/* SECTION */

section{
padding:110px 60px;
}

section h2{
text-align:center;
margin-bottom:50px;
font-size:2.2rem;
background:linear-gradient(90deg,#8b5cf6,#06b6d4);
-webkit-background-clip:text;
-webkit-text-fill-color:transparent;
}

/* GRID */

.grid{
display:grid;
grid-template-columns:repeat(auto-fit,minmax(250px,1fr));
gap:25px;
}

/* CARD */

.card{
background:rgba(255,255,255,.03);
border:1px solid rgba(255,255,255,.08);
padding:25px;
border-radius:18px;
transition:.4s;
backdrop-filter:blur(10px);
}

.card:hover{
transform:translateY(-10px);
border-color:#8b5cf6;
box-shadow:0 0 30px rgba(139,92,246,.15);
}

.card h3{
margin-bottom:10px;
color:#8b5cf6;
}

/* STATS */

.stats{
display:grid;
grid-template-columns:repeat(auto-fit,minmax(200px,1fr));
gap:20px;
}

.stat-box{
background:#0a0a0a;
padding:25px;
border-radius:15px;
text-align:center;
border:1px solid #151515;
}

.stat-box h3{
font-size:2rem;
color:#8b5cf6;
}

.stat-box p{
color:#9ca3af;
margin-top:10px;
}

/* CONTACT */

.contact-box{
max-width:700px;
margin:auto;
}

.contact input,
.contact textarea{
width:100%;
padding:15px;
margin:10px 0;
background:#090909;
border:1px solid #1a1a1a;
color:white;
border-radius:12px;
}

.btn{
width:100%;
padding:15px;
border:none;
border-radius:12px;
font-weight:600;
cursor:pointer;
background:linear-gradient(90deg,#8b5cf6,#06b6d4);
color:white;
}

.btn:hover{
opacity:.9;
}

footer{
padding:40px;
text-align:center;
border-top:1px solid #111;
color:#888;
}

.hidden{
opacity:0;
transform:translateY(50px);
transition:.7s;
}
.show{
opacity:1;
transform:translateY(0);
}
/* PROFESSIONAL TIMELINE */
.timeline{
position:relative;
max-width:900px;
margin:auto;
}
.timeline::after{
content:'';
position:absolute;
width:4px;
background:linear-gradient(#8b5cf6,#06b6d4);
top:0;
bottom:0;
left:50%;
margin-left:-2px;
border-radius:10px;
}
.timeline-item{
padding:10px 40px;
position:relative;
width:50%;
}
.timeline-item::after{
content:'';
position:absolute;
width:22px;
height:22px;
right:-11px;
background:#8b5cf6;
border:4px solid #06b6d4;
top:25px;
border-radius:50%;
z-index:1;
box-shadow:0 0 20px rgba(139,92,246,.8);
}
.left{
left:0;
}
.right{
left:50%;
}
.right::after{
left:-11px;
}
.timeline-content{
padding:25px;
background:rgba(255,255,255,.03);
border:1px solid rgba(255,255,255,.08);
border-radius:18px;
backdrop-filter:blur(12px);
transition:.4s;
}
.timeline-content:hover{
transform:translateY(-8px);
box-shadow:0 0 25px rgba(139,92,246,.25);
}

.timeline-content h3{
color:#8b5cf6;
margin-bottom:10px;
}
@media(max-width:768px){
.timeline::after{
left:20px;
}
.timeline-item{
width:100%;
padding-left:60px;
padding-right:15px;
}
.left,
.right{
left:0;
}
.timeline-item::after{
left:9px;
}
}
@media(max-width:768px){
.hero h1{
font-size:3rem;
}
nav{
padding:15px 20px;
}
nav ul{
gap:12px;
font-size:13px;
}
section{
padding:80px 20px;
}
}
</style>
</head>
<body>
<canvas id="matrix"></canvas>
<nav>
<div class="logo">HARISH V</div>
<ul>
<li><a href="#home">Home</a></li>
<li><a href="#about">About</a></li>
<li><a href="#skills">Skills</a></li>
<li><a href="#projects">Projects</a></li>
<li><a href="#education">Education</a></li>
<li><a href="#timeline">Timeline</a></li>
<li><a href="#contact">Contact</a></li>
</ul>
</nav>
<section class="hero" id="home">
<h1>Hi, I'm <span>Harish</span></h1>
<div class="typing" id="typing"></div>
<p>
B.Com Computer Applications Student at SASTRA University.
Passionate about modern web technologies, software development,
automation and building professional digital experiences.
</p>
<a href="#contact" class="hero-btn">
Let's Connect
</a>
<br> 
<br>
<a href="https://www.instagram.com/mr_harish.v?igsh=MXM0c2syaTJrZDRybA=="
target="_blank"
class="hero-btn"
style="background:linear-gradient(90deg,#E1306C,#F77737);">
View Instagram Profile
</a> <br>
<a href="https://www.linkedin.com/in/harish-v-253011362?utm_source=share_via&utm_content=profile&utm_medium=member_android"
target="_blank"
class="hero-btn"
style="background:linear-gradient(90deg,#0077B5,#00A0DC);">
View LinkedIn Profile
</a>
</section>
<section id="about" class="hidden">
<h2>About Me</h2>
<div class="card">
<p style="line-height:1.9;color:#bdbdbd;">

I am currently pursuing B.Com Computer Applications at
SASTRA University, Thanjavur.

My interests include web development, technology,
automation, digital systems and software solutions.

I enjoy building modern websites and continuously
improving my technical skills through hands-on projects.
</p>
</div>
</section>
<section id="skills" class="hidden">
<h2>Skills</h2>
<div class="grid">
<div class="card">
<h3>HTML & CSS</h3>
<p>Responsive Website Development</p>
</div>
<div class="card">
<h3>C++ Programming</h3>
<p>Problem Solving & Logic Building</p>
</div>
<div class="card">
<h3>JavaScript</h3>
<p>Interactive Web Applications</p>
</div>
<div class="card">
<h3>Computer Applications</h3>
<p>Business & Technology Integration</p>
</div>
</div>
</section>
<section class="hidden">
<h2>Overview</h2>
<div class="stats">
<div class="stat-box">
<h3>2025</h3>
<p>Portfolio Started</p>
</div>
<div class="stat-box">
<h3>10+</h3>
<p>Projects Planned</p>
</div>
<div class="stat-box">
<h3>24/7</h3>
<p>Learning Mode</p>
</div>
<div class="stat-box">
<h3>∞</h3>
<p>Growth Mindset</p>
</div>
</div>
</section>
<section id="projects" class="hidden">
<h2>Projects</h2>
<div class="grid">
<div class="card">
<h3>Personal Portfolio</h3>
<p>
Professional portfolio website hosted using
GitHub Pages with custom domain integration.
</p>
</div>
<div class="card">
<h3>Web Development Journey</h3>
<p>
Collection of HTML, CSS and JavaScript
practice projects.
</p>
</div>
<div class="card">
<h3>Future web Projects</h3>
<p>
Exploring scalable software and
digital business solutions.
</p>
</div>
</div>
</section>
<section id="education" class="hidden">
<h2>Education</h2>
<div class="card">
<h3>B.Com Computer Applications</h3>
<p style="margin-top:10px;color:#bdbdbd;">
SASTRA Deemed University<br>
Thanjavur, Tamil Nadu
</p>
</div>
</section>
</section>
<!-- PASTE TIMELINE HERE -->
/* PROFESSIONAL TIMELINE */
.timeline{
position:relative;
max-width:900px;
margin:auto;
}
.timeline::after{
content:'';
position:absolute;
width:4px;
background:linear-gradient(#8b5cf6,#06b6d4);
top:0;
bottom:0;
left:50%;
margin-left:-2px;
border-radius:10px;
}
.timeline-item{
padding:10px 40px;
position:relative;
width:50%;
}
.timeline-item::after{
content:'';
position:absolute;
width:22px;
height:22px;
right:-11px;
background:#8b5cf6;
border:4px solid #06b6d4;
top:25px;
border-radius:50%;
z-index:1;
box-shadow:0 0 20px rgba(139,92,246,.8);
}
.left{
left:0;
}
.right{
left:50%;
}
.right::after{
left:-11px;
}
.timeline-content{
padding:25px;
background:rgba(255,255,255,.03);
border:1px solid rgba(255,255,255,.08);
border-radius:18px;
backdrop-filter:blur(12px);
transition:.4s;
}
.timeline-content:hover{
transform:translateY(-8px);
box-shadow:0 0 25px rgba(139,92,246,.25);
}
.timeline-content h3{
color:#8b5cf6;
margin-bottom:10px;
}
@media(max-width:768px){
.timeline::after{
left:20px;
}
.timeline-item{
width:100%;
padding-left:60px;
padding-right:15px;
}
.left,
.right{
left:0;
}
.timeline-item::after{
left:9px;
}
}
<!-- CONTACT SECTION STARTS HERE -->
<section id="contact" class="hidden contact">
<h2>Contact</h2>
<div class="contact-box">
<section id="contact" class="hidden contact">
<h2>Contact</h2>
<div class="contact-box">
<p style="margin-bottom:15px;">
📧 v90300560@gmail.com
</p>
<p style="margin-bottom:15px;">
📷 @mr_harish.v
</p>
<p style="margin-bottom:25px;">
💼 LinkedIn:
<a href="https://www.linkedin.com/in/harish-v-253011362?utm_source=share_via&utm_content=profile&utm_medium=member_android"
target="_blank"
style="color:#06b6d4;text-decoration:none;font-weight:600;">
Harish . V
</a>
</p>
<form action="https://formspree.io/f/mbdwjopd" method="POST">
<input
type="text"
name="name"
placeholder="Your Name"
required>
<input
type="email"
name="email"
placeholder="Your Email"
required>
<textarea
name="message"
rows="5"
placeholder="Your Message"
required></textarea>
<button class="btn">
Send Message
</button>
</form>
</div>
</section>
<footer>
<h3 style="color:#8b5cf6;">
HARISH V
</h3>
<br>
<p>
B.Com Computer Applications
</p>
<p>
SASTRA University
</p>
<br>
<p>
© 2026 All Rights Reserved
</p>
</footer>
<script>
/* TYPING EFFECT */
const words=[
"Web Developer",
"Tech Enthusiast",
"C++ Learner",
"Future Software Builder"
];
let i=0;
let j=0;
function type(){
const typing=document.getElementById("typing");
if(j<words[i].length){
typing.innerHTML+=words[i].charAt(j);
j++;
setTimeout(type,80);
}else{
setTimeout(()=>{
typing.innerHTML="";
j=0;
i=(i+1)%words.length;
type();
},1500);
}
}
type();
/* SCROLL ANIMATION */
const observer=
new IntersectionObserver(entries=>{
entries.forEach(entry=>{
if(entry.isIntersecting){
entry.target.classList.add("show");
}
});
});
document
.querySelectorAll(".hidden")
.forEach(el=>observer.observe(el));

/* MATRIX EFFECT */

const canvas=
document.getElementById("matrix");

const ctx=
canvas.getContext("2d");

canvas.width=
window.innerWidth;

canvas.height=
window.innerHeight;

const letters=
"ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890{}[]<>#$%&*";

const fontSize=14;

const columns=
canvas.width/fontSize;

const drops=[];

for(let x=0;x<columns;x++){

drops[x]=1;

}

function draw(){

ctx.fillStyle=
"rgba(0,0,0,0.08)";

ctx.fillRect(
0,
0,
canvas.width,
canvas.height
);

ctx.fillStyle="#8b5cf6";

ctx.font=
fontSize+"px monospace";

for(let i=0;i<drops.length;i++){

const text=
letters.charAt(
Math.floor(
Math.random()*letters.length
)
);

ctx.fillText(
text,
i*fontSize,
drops[i]*fontSize
);

if(
drops[i]*fontSize>
canvas.height
&&
Math.random()>0.975
){

drops[i]=0;

}

drops[i]++;

}

}

setInterval(draw,35);

window.addEventListener(
"resize",
()=>{

canvas.width=
window.innerWidth;

canvas.height=
window.innerHeight;
}
);
</script>
</body>
</html>
