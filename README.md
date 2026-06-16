<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Harish V | Portfolio</title>

<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;500;700&display=swap" rel="stylesheet">

<style>
*{margin:0;padding:0;box-sizing:border-box;font-family:'Inter',sans-serif;}
body{background:#020617;color:#e5e7eb;}

body::before{
content:"";
position:fixed;
width:100%;height:100%;
background:linear-gradient(to right, rgba(255,255,255,0.03) 1px, transparent 1px),
           linear-gradient(to bottom, rgba(255,255,255,0.03) 1px, transparent 1px);
background-size:40px 40px;
z-index:-1;
}

nav{
position:fixed;width:100%;
display:flex;justify-content:space-between;
padding:15px 50px;
background:rgba(2,6,23,0.8);
backdrop-filter:blur(10px);
}
nav h2{color:#38bdf8;}
nav ul{display:flex;gap:25px;list-style:none;}
nav a{color:#cbd5f5;text-decoration:none;transition:0.3s;}
nav a:hover{color:#38bdf8;}

.hero{
height:100vh;
display:flex;flex-direction:column;
justify-content:center;align-items:center;
text-align:center;
}
.hero h1{font-size:3rem;}
.hero span{color:#38bdf8;}
.typing{margin-top:10px;color:#94a3b8;}

section{padding:100px 50px;}
h2{text-align:center;margin-bottom:40px;color:#38bdf8;}

.grid{
display:grid;
grid-template-columns:repeat(auto-fit,minmax(250px,1fr));
gap:20px;
}

.card{
background:rgba(255,255,255,0.03);
border:1px solid rgba(255,255,255,0.05);
padding:20px;border-radius:12px;
transition:0.3s;
}
.card:hover{
transform:translateY(-5px);
border-color:#38bdf8;
}

.contact input,.contact textarea{
width:100%;padding:12px;margin:10px 0;
background:#020617;border:1px solid #1e293b;
color:white;border-radius:6px;
}

.btn{
width:100%;padding:12px;
background:#38bdf8;border:none;
cursor:pointer;font-weight:500;
}
.btn:hover{background:#0ea5e9;}

footer{
text-align:center;padding:20px;
background:#020617;
border-top:1px solid #1e293b;
}

.hidden{
opacity:0;transform:translateY(40px);
transition:0.6s;
}
.show{
opacity:1;transform:translateY(0);
}
</style>
</head>

<body>

<nav>
<h2>Harish</h2>
<ul>
<li><a href="#home">Home</a></li>
<li><a href="#about">About</a></li>
<li><a href="#skills">Skills</a></li>
<li><a href="#education">Education</a></li>
<li><a href="#contact">Contact</a></li>
</ul>
</nav>

<div class="hero" id="home">
<h1>Hi, I'm <span>Harish</span></h1>
<div class="typing" id="typing"></div>
</div>

<section id="about" class="hidden">
<h2>About</h2>
<p style="max-width:700px;margin:auto;text-align:center;">
B.Com Computer Applications student at SASTRA University, Thanjavur.
Focused on web development, problem solving, and building scalable applications.
</p>
</section>

<section id="skills" class="hidden">
<h2>Skills</h2>
<div class="grid">
<div class="card">HTML & CSS (Strong)</div>
<div class="card">C++ Programming</div>
<div class="card">JavaScript (Basic)</div>
<div class="card">Computer Applications</div>
</div>
</section>

<section id="education" class="hidden">
<h2>Education</h2>
<div class="card">
<h3>B.Com Computer Applications</h3>
<p>SASTRA Deemed University, Thanjavur</p>
</div>
</section>

<section id="contact" class="hidden contact">
<h2>Contact</h2>
<div style="max-width:500px;margin:auto;">

<p>Email: v90300560 [at] gmail.com</p>
<p>Instagram: @mr_harish.v</p>

<form action="https://formspree.io/f/mbdwjopd" method="POST">
<input type="text" name="name" placeholder="Your Name" required>
<input type="email" name="email" placeholder="Your Email" required>
<textarea name="message" rows="4" placeholder="Message" required></textarea>
<button class="btn">Send Message</button>
</form>

</div>
</section>

<footer>
© 2026 Harish V | Portfolio
</footer>

<script>
const text=["Web Developer","C++ Learner","Tech Enthusiast"];
let i=0,j=0;
function type(){
if(j<text[i].length){
document.getElementById("typing").innerHTML+=text[i].charAt(j);
j++;
setTimeout(type,80);
}else{
setTimeout(()=>{
document.getElementById("typing").innerHTML="";
j=0;
i=(i+1)%text.length;
type();
},1500);
}}
type();

const observer=new IntersectionObserver(entries=>{
entries.forEach(entry=>{
if(entry.isIntersecting){
entry.target.classList.add("show");
}});
});
document.querySelectorAll('.hidden').forEach(el=>observer.observe(el));
</script>

</body>
</html>
