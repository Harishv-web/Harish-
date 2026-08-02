/* ================================================================
   SHARED SITE JAVASCRIPT
   - Language detection and translation
   - Navigation, background, reveal effects and local assistant
   - PWA registration
   ================================================================ */

const translations = {
  en: {
    navHome: 'Home', navAbout: 'About', navSkills: 'Skills', navProjects: 'Projects', navEducation: 'Education', navServices: 'Services', navContact: 'Contact',
    heroGreeting: "Hi, I'm", heroCopy: 'B.Com Computer Applications student at SASTRA University. I enjoy modern web technology, automation, and building professional digital experiences.',
    connect: "Let's Connect", freeTools: 'Free Services Offered by Me', instagram: 'Instagram Profile', linkedin: 'LinkedIn Profile',
    aboutTitle: 'About Me', aboutCopy: 'I am pursuing B.Com Computer Applications at SASTRA University, Thanjavur. My interests include web development, technology, automation, digital systems and software solutions. I enjoy building modern websites and improving my skills through hands-on projects.',
    skillsTitle: 'Skills', computerApps: 'Computer Applications', projectsTitle: 'Projects', projectPortfolio: 'Personal Portfolio', projectPortfolioCopy: 'A professional portfolio website built with responsive HTML, CSS and JavaScript.', projectJourney: 'Web Development Journey', projectJourneyCopy: 'A growing collection of practice projects and experiments in web development.', projectFuture: 'Future Web Projects', projectFutureCopy: 'Exploring practical software and digital solutions for students and businesses.',
    educationTitle: 'Education', degree: 'B.Com Computer Applications', higherSecondary: 'Higher Secondary Education', higherSecondaryCopy: '85% · Maxwell Matriculation Higher Secondary School · 2025', sslc: 'SSLC', sslcCopy: '65% · Maxwell Matriculation Higher Secondary School · 2023',
    journeyTitle: 'My Journey', timelineBorn: 'Born on 15 May 2008 — the beginning of a journey of learning and ambition.', timelineSslc: 'Completed SSLC at Maxwell Matriculation Higher Secondary School.', timelineHsc: 'Completed Higher Secondary Education with 85%.', present: 'Present', timelineDegree: 'Studying B.Com Computer Applications at SASTRA Deemed University.', futureVision: 'Future Vision', timelineFuture: 'To become a skilled technology professional, web developer and entrepreneur.',
    servicesTitle: 'Services', servicesLead: 'Professional digital help for students, creators and small businesses.', available: 'Available', serviceWeb: 'Website Creation', serviceWebCopy: 'Professional, responsive websites for students and businesses.', serviceStudent: 'Student Portfolio Websites', serviceStudentCopy: 'Personal websites to present skills, education, achievements and projects.', serviceCollege: 'College Project Websites', serviceCollegeCopy: 'Clean front-end projects for academic presentations and submissions.', serviceBusiness: 'Small Business Websites', serviceBusinessCopy: 'Service details, contact forms, WhatsApp integration and branding.', serviceLanding: 'Landing Pages', serviceLandingCopy: 'Focused pages for products, events, promotions and marketing campaigns.', serviceEditing: 'Photo & Video Editing', serviceEditingCopy: 'Photo enhancement, social-media creatives and video editing.', requestService: 'Request a Service',
    assistantTitle: 'Meet Ultron', assistantSub: 'A simple browser assistant for questions about Harish and his services.', assistantWelcome: 'Hello! Ask me about Harish, his skills, contact details or services.', assistantPlaceholder: 'Ask Ultron something…', send: 'Send',
    contactTitle: 'Contact', viewProfile: 'View my profile', yourName: 'Your name', yourEmail: 'Your email', yourMessage: 'Your message', sendMessage: 'Send Message', footerRole: 'B.Com Computer Applications · SASTRA University', rights: 'All Rights Reserved',
    typingWords: ['Web Developer', 'Technology Enthusiast', 'C++ Learner', 'Future Software Builder'], chatContact: 'You can contact Harish at v90300560@gmail.com or on WhatsApp at +91 79043 29936.', chatServices: 'Harish offers website creation, student portfolios, college project websites, business websites, landing pages, and photo/video editing.', chatAbout: 'Harish V is a B.Com Computer Applications student at SASTRA University, Thanjavur.', chatDefault: 'I can help with information about Harish, his skills, services, and contact details.'
  },
  ta: {
    navHome: 'முகப்பு', navAbout: 'என்னைப் பற்றி', navSkills: 'திறன்கள்', navProjects: 'திட்டங்கள்', navEducation: 'கல்வி', navServices: 'சேவைகள்', navContact: 'தொடர்பு',
    heroGreeting: 'வணக்கம், நான்', heroCopy: 'சாஸ்திரா பல்கலைக்கழகத்தில் B.Com கணினி பயன்பாடுகள் மாணவர். நவீன வலைத் தொழில்நுட்பம், தானியக்கம் மற்றும் சிறந்த டிஜிட்டல் அனுபவங்களை உருவாக்குவதில் ஆர்வம் கொண்டவன்.',
    connect: 'தொடர்பு கொள்ளுங்கள்', freeTools: 'என்னால் வழங்கப்படும் இலவச சேவைகள்', instagram: 'Instagram சுயவிவரம்', linkedin: 'LinkedIn சுயவிவரம்',
    aboutTitle: 'என்னைப் பற்றி', aboutCopy: 'நான் தஞ்சாவூரில் உள்ள சாஸ்திரா பல்கலைக்கழகத்தில் B.Com கணினி பயன்பாடுகள் படித்து வருகிறேன். வலை உருவாக்கம், தொழில்நுட்பம், தானியக்கம், டிஜிட்டல் அமைப்புகள் மற்றும் மென்பொருள் தீர்வுகள் ஆகியவற்றில் எனக்கு ஆர்வம் உள்ளது. செயல்முறை திட்டங்கள் மூலம் என் திறன்களை மேம்படுத்துகிறேன்.',
    skillsTitle: 'திறன்கள்', computerApps: 'கணினி பயன்பாடுகள்', projectsTitle: 'திட்டங்கள்', projectPortfolio: 'தனிப்பட்ட போர்ட்ஃபோலியோ', projectPortfolioCopy: 'பதிலளிக்கும் HTML, CSS மற்றும் JavaScript கொண்டு உருவாக்கப்பட்ட தொழில்முறை போர்ட்ஃபோலியோ தளம்.', projectJourney: 'வலை உருவாக்கப் பயணம்', projectJourneyCopy: 'வலை உருவாக்க பயிற்சித் திட்டங்கள் மற்றும் முயற்சிகளின் வளர்ந்து வரும் தொகுப்பு.', projectFuture: 'எதிர்கால வலைத் திட்டங்கள்', projectFutureCopy: 'மாணவர்கள் மற்றும் வணிகங்களுக்கு பயனுள்ள மென்பொருள் மற்றும் டிஜிட்டல் தீர்வுகளை ஆராய்கிறேன்.',
    educationTitle: 'கல்வி', degree: 'B.Com கணினி பயன்பாடுகள்', higherSecondary: 'மேல்நிலை கல்வி', higherSecondaryCopy: '85% · மேக்ஸ்வெல் மெட்ரிகுலேஷன் மேல்நிலைப் பள்ளி · 2025', sslc: 'SSLC', sslcCopy: '65% · மேக்ஸ்வெல் மெட்ரிகுலேஷன் மேல்நிலைப் பள்ளி · 2023',
    journeyTitle: 'என் பயணம்', timelineBorn: '15 மே 2008 இல் பிறந்தேன் — கற்றல் மற்றும் லட்சியத்தின் பயணம் தொடங்கியது.', timelineSslc: 'மேக்ஸ்வெல் மெட்ரிகுலேஷன் மேல்நிலைப் பள்ளியில் SSLC முடித்தேன்.', timelineHsc: '85% உடன் மேல்நிலை கல்வியை முடித்தேன்.', present: 'தற்போது', timelineDegree: 'சாஸ்திரா பல்கலைக்கழகத்தில் B.Com கணினி பயன்பாடுகள் படிக்கிறேன்.', futureVision: 'எதிர்கால நோக்கம்', timelineFuture: 'திறமையான தொழில்நுட்ப நிபுணர், வலை உருவாக்குநர் மற்றும் தொழில்முனைவோர் ஆக வேண்டும்.',
    servicesTitle: 'சேவைகள்', servicesLead: 'மாணவர்கள், படைப்பாளிகள் மற்றும் சிறு வணிகங்களுக்கான தொழில்முறை டிஜிட்டல் உதவி.', available: 'கிடைக்கிறது', serviceWeb: 'இணையதள உருவாக்கம்', serviceWebCopy: 'மாணவர்கள் மற்றும் வணிகங்களுக்கான தொழில்முறை, பதிலளிக்கும் இணையதளங்கள்.', serviceStudent: 'மாணவர் போர்ட்ஃபோலியோ இணையதளங்கள்', serviceStudentCopy: 'திறன்கள், கல்வி, சாதனைகள் மற்றும் திட்டங்களைக் காட்ட தனிப்பட்ட இணையதளங்கள்.', serviceCollege: 'கல்லூரித் திட்ட இணையதளங்கள்', serviceCollegeCopy: 'கல்வி விளக்கங்கள் மற்றும் சமர்ப்பிப்புகளுக்கான அழகான முன்தளத் திட்டங்கள்.', serviceBusiness: 'சிறு வணிக இணையதளங்கள்', serviceBusinessCopy: 'சேவை விவரங்கள், தொடர்புப் படிவங்கள், WhatsApp இணைப்பு மற்றும் பிராண்டிங்.', serviceLanding: 'லேண்டிங் பக்கங்கள்', serviceLandingCopy: 'தயாரிப்புகள், நிகழ்வுகள் மற்றும் விளம்பரங்களுக்கு மையப்படுத்தப்பட்ட பக்கங்கள்.', serviceEditing: 'புகைப்படம் மற்றும் வீடியோ எடிட்டிங்', serviceEditingCopy: 'புகைப்பட மேம்பாடு, சமூக ஊடக படைப்புகள் மற்றும் வீடியோ எடிட்டிங்.', requestService: 'சேவையைக் கோருங்கள்',
    assistantTitle: 'Ultron-ஐ சந்தியுங்கள்', assistantSub: 'ஹரிஷ் மற்றும் அவரது சேவைகள் பற்றிய கேள்விகளுக்கான எளிய உலாவி உதவியாளர்.', assistantWelcome: 'வணக்கம்! ஹரிஷ், அவரது திறன்கள், தொடர்பு விவரங்கள் அல்லது சேவைகள் பற்றி கேளுங்கள்.', assistantPlaceholder: 'Ultron-ஐ ஏதாவது கேளுங்கள்…', send: 'அனுப்பு',
    contactTitle: 'தொடர்பு', viewProfile: 'என் சுயவிவரத்தைப் பார்க்கவும்', yourName: 'உங்கள் பெயர்', yourEmail: 'உங்கள் மின்னஞ்சல்', yourMessage: 'உங்கள் செய்தி', sendMessage: 'செய்தியை அனுப்பவும்', footerRole: 'B.Com கணினி பயன்பாடுகள் · சாஸ்திரா பல்கலைக்கழகம்', rights: 'அனைத்து உரிமைகளும் பாதுகாக்கப்பட்டவை',
    typingWords: ['வலை உருவாக்குநர்', 'தொழில்நுட்ப ஆர்வலர்', 'C++ கற்பவர்', 'எதிர்கால மென்பொருள் உருவாக்குநர்'], chatContact: 'ஹரிஷை v90300560@gmail.com அல்லது WhatsApp +91 79043 29936 மூலம் தொடர்பு கொள்ளலாம்.', chatServices: 'ஹரிஷ் இணையதள உருவாக்கம், மாணவர் போர்ட்ஃபோலியோ, கல்லூரித் திட்ட இணையதளம், வணிக இணையதளம், லேண்டிங் பக்கம் மற்றும் புகைப்பட/வீடியோ எடிட்டிங் வழங்குகிறார்.', chatAbout: 'ஹரிஷ் V தஞ்சாவூரில் உள்ள சாஸ்திரா பல்கலைக்கழகத்தில் B.Com கணினி பயன்பாடுகள் மாணவர்.', chatDefault: 'ஹரிஷ், அவரது திறன்கள், சேவைகள் மற்றும் தொடர்பு விவரங்கள் பற்றிய தகவலுக்கு நான் உதவ முடியும்.'
  },
  hi: {
    navHome: 'होम', navAbout: 'परिचय', navSkills: 'कौशल', navProjects: 'प्रोजेक्ट', navEducation: 'शिक्षा', navServices: 'सेवाएँ', navContact: 'संपर्क',
    heroGreeting: 'नमस्ते, मैं हूँ', heroCopy: 'SASTRA University में B.Com Computer Applications का छात्र। आधुनिक वेब तकनीक, ऑटोमेशन और बेहतरीन डिजिटल अनुभव बनाने में रुचि रखता हूँ।',
    connect: 'संपर्क करें', freeTools: 'मेरी निःशुल्क सेवाएँ', instagram: 'Instagram प्रोफ़ाइल', linkedin: 'LinkedIn प्रोफ़ाइल',
    aboutTitle: 'मेरे बारे में', aboutCopy: 'मैं SASTRA University, तंजावुर में B.Com Computer Applications कर रहा हूँ। मेरी रुचि वेब डेवलपमेंट, तकनीक, ऑटोमेशन, डिजिटल सिस्टम और सॉफ्टवेयर समाधानों में है। मैं प्रायोगिक प्रोजेक्टों के माध्यम से अपने कौशल में सुधार करता हूँ।',
    skillsTitle: 'कौशल', computerApps: 'कंप्यूटर एप्लीकेशन्स', projectsTitle: 'प्रोजेक्ट', projectPortfolio: 'व्यक्तिगत पोर्टफोलियो', projectPortfolioCopy: 'रिस्पॉन्सिव HTML, CSS और JavaScript से बनी पेशेवर पोर्टफोलियो वेबसाइट।', projectJourney: 'वेब डेवलपमेंट यात्रा', projectJourneyCopy: 'वेब डेवलपमेंट के अभ्यास प्रोजेक्टों और प्रयोगों का बढ़ता संग्रह।', projectFuture: 'भविष्य के वेब प्रोजेक्ट', projectFutureCopy: 'छात्रों और व्यवसायों के लिए उपयोगी सॉफ्टवेयर व डिजिटल समाधान तलाश रहा हूँ।',
    educationTitle: 'शिक्षा', degree: 'B.Com Computer Applications', higherSecondary: 'उच्च माध्यमिक शिक्षा', higherSecondaryCopy: '85% · Maxwell Matriculation Higher Secondary School · 2025', sslc: 'SSLC', sslcCopy: '65% · Maxwell Matriculation Higher Secondary School · 2023',
    journeyTitle: 'मेरी यात्रा', timelineBorn: '15 मई 2008 को जन्म — सीखने और महत्वाकांक्षा की यात्रा की शुरुआत।', timelineSslc: 'Maxwell Matriculation Higher Secondary School से SSLC पूरा किया।', timelineHsc: '85% के साथ उच्च माध्यमिक शिक्षा पूरी की।', present: 'वर्तमान', timelineDegree: 'SASTRA Deemed University में B.Com Computer Applications की पढ़ाई कर रहा हूँ।', futureVision: 'भविष्य की सोच', timelineFuture: 'एक कुशल तकनीकी पेशेवर, वेब डेवलपर और उद्यमी बनना।',
    servicesTitle: 'सेवाएँ', servicesLead: 'छात्रों, रचनाकारों और छोटे व्यवसायों के लिए पेशेवर डिजिटल सहायता।', available: 'उपलब्ध', serviceWeb: 'वेबसाइट निर्माण', serviceWebCopy: 'छात्रों और व्यवसायों के लिए पेशेवर, रिस्पॉन्सिव वेबसाइटें।', serviceStudent: 'छात्र पोर्टफोलियो वेबसाइटें', serviceStudentCopy: 'कौशल, शिक्षा, उपलब्धियाँ और प्रोजेक्ट दिखाने के लिए व्यक्तिगत वेबसाइटें।', serviceCollege: 'कॉलेज प्रोजेक्ट वेबसाइटें', serviceCollegeCopy: 'शैक्षणिक प्रस्तुतियों और सबमिशन के लिए साफ़ फ्रंट-एंड प्रोजेक्ट।', serviceBusiness: 'छोटे व्यवसाय की वेबसाइटें', serviceBusinessCopy: 'सेवा विवरण, संपर्क फ़ॉर्म, WhatsApp एकीकरण और ब्रांडिंग।', serviceLanding: 'लैंडिंग पेज', serviceLandingCopy: 'उत्पादों, कार्यक्रमों, प्रचार और मार्केटिंग के लिए केंद्रित पेज।', serviceEditing: 'फोटो और वीडियो एडिटिंग', serviceEditingCopy: 'फोटो एन्हांसमेंट, सोशल मीडिया क्रिएटिव और वीडियो एडिटिंग।', requestService: 'सेवा का अनुरोध करें',
    assistantTitle: 'Ultron से मिलिए', assistantSub: 'हरिश और उनकी सेवाओं के प्रश्नों के लिए एक सरल ब्राउज़र सहायक।', assistantWelcome: 'नमस्ते! हरिश, उनके कौशल, संपर्क विवरण या सेवाओं के बारे में पूछें।', assistantPlaceholder: 'Ultron से कुछ पूछें…', send: 'भेजें',
    contactTitle: 'संपर्क', viewProfile: 'मेरी प्रोफ़ाइल देखें', yourName: 'आपका नाम', yourEmail: 'आपका ईमेल', yourMessage: 'आपका संदेश', sendMessage: 'संदेश भेजें', footerRole: 'B.Com Computer Applications · SASTRA University', rights: 'सर्वाधिकार सुरक्षित',
    typingWords: ['वेब डेवलपर', 'तकनीक प्रेमी', 'C++ सीखने वाला', 'भविष्य का सॉफ्टवेयर बिल्डर'], chatContact: 'आप हरिश से v90300560@gmail.com या WhatsApp +91 79043 29936 पर संपर्क कर सकते हैं।', chatServices: 'हरिश वेबसाइट निर्माण, छात्र पोर्टफोलियो, कॉलेज प्रोजेक्ट वेबसाइटें, व्यवसाय वेबसाइटें, लैंडिंग पेज और फोटो/वीडियो एडिटिंग प्रदान करते हैं।', chatAbout: 'हरिश V, SASTRA University, तंजावुर में B.Com Computer Applications के छात्र हैं।', chatDefault: 'मैं हरिश, उनके कौशल, सेवाओं और संपर्क विवरण के बारे में जानकारी दे सकता हूँ।'
  }
};

/* Tool-page translations live separately so the portfolio text remains easy to edit. */
const toolTranslations = {
  en: {
    language: 'Language', toolsTitle: 'Free Digital Services', toolsLead: 'Useful tools made for everyone. Select a service below and use it as many times as you need.', backToServices: '← Back to Services', onlineReady: 'Online — ready to test and generate', offlineMode: 'Offline — installed tools are still available',
    networkTool: 'Network Speed Tester', qrTool: 'QR Code Generator', typingTool: 'Typing Speed Test', stopwatchTool: 'Stopwatch', timerTool: 'Timer', calendarTool: 'Calendar',
    networkTitle: 'Network Speed Tester', speedInfo: "Measures latency and the connection speed from this browser to Cloudflare's test server. Results are useful estimates and may differ from your ISP plan.", startTest: 'Start Test', retest: 'Retest', ping: 'Ping', download: 'Download', upload: 'Upload', waiting: 'Ready when you are.',
    qrTitle: 'QR Code Generator', qrHelp: 'Enter a link, message, contact details or any text. The generated PNG can be downloaded and scanned with a standard QR scanner.', textToEncode: 'Text or link to encode', qrPlaceholder: 'Example: https://yourwebsite.com', generateQR: 'Generate QR Code', downloadQR: 'Download QR Code',
    typingTitle: 'Typing Speed Test', typingHelp: 'Press start, then type the displayed passage exactly. Your speed, accuracy and errors update as you type.', testDuration: 'Test duration', startTyping: 'Start Typing Test', typeThis: 'Type this:', yourTyping: 'Your typing', time: 'Time', wpm: 'WPM', accuracy: 'Accuracy', errors: 'Errors',
    stopwatchTitle: 'Stopwatch', stopwatchHelp: 'Start, pause, reset and record lap times whenever you need.', start: 'Start', pause: 'Pause', lap: 'Lap', reset: 'Reset',
    timerTitle: 'Timer', timerHelp: 'Set a duration. When it ends, this page plays an alarm, asks for a notification if permitted, and vibrates on supported devices.', minutes: 'Minutes', seconds: 'Seconds', enableNotifications: 'Enable Timer Notifications', stopAlarm: 'Stop Alarm',
    calendarTitle: 'Classic Calendar', calendarHelp: "Browse months and years. Harish's birthday, 15 May, is highlighted every year.", birthdayLegend: "Highlighted: Harish V's birthday — 15 May"
  },
  ta: {
    language: 'மொழி', toolsTitle: 'இலவச டிஜிட்டல் சேவைகள்', toolsLead: 'அனைவருக்கும் பயனுள்ள கருவிகள். கீழே ஒரு சேவையைத் தேர்ந்தெடுத்து எத்தனை முறை வேண்டுமானாலும் பயன்படுத்துங்கள்.', backToServices: '← சேவைகளுக்குத் திரும்பு', onlineReady: 'ஆன்லைன் — சோதிக்கவும் உருவாக்கவும் தயார்', offlineMode: 'ஆஃப்லைன் — நிறுவிய கருவிகள் இன்னும் கிடைக்கும்',
    networkTool: 'நெட்வொர்க் வேக சோதனை', qrTool: 'QR குறியீடு உருவாக்கி', typingTool: 'தட்டச்சு வேக சோதனை', stopwatchTool: 'ஸ்டாப்வாட்ச்', timerTool: 'டைமர்', calendarTool: 'நாட்காட்டி',
    networkTitle: 'நெட்வொர்க் வேக சோதனை', speedInfo: 'இந்த உலாவியிலிருந்து Cloudflare சோதனை சேவையகத்திற்கான தாமதம் மற்றும் இணைப்பு வேகத்தை அளக்கிறது. முடிவுகள் பயனுள்ள மதிப்பீடுகள்; உங்கள் ISP திட்டத்திலிருந்து மாறுபடலாம்.', startTest: 'சோதனையைத் தொடங்கு', retest: 'மீண்டும் சோதிக்கவும்', ping: 'பிங்', download: 'பதிவிறக்கம்', upload: 'பதிவேற்றம்', waiting: 'தயாராக இருக்கும்போது தொடங்குங்கள்.',
    qrTitle: 'QR குறியீடு உருவாக்கி', qrHelp: 'இணைப்பு, செய்தி, தொடர்பு விவரங்கள் அல்லது எந்த உரையையும் உள்ளிடுங்கள். உருவாக்கப்படும் PNG-ஐ பதிவிறக்கம் செய்து சாதாரண QR ஸ்கேனரில் ஸ்கேன் செய்யலாம்.', textToEncode: 'குறியிட வேண்டிய உரை அல்லது இணைப்பு', qrPlaceholder: 'உதாரணம்: https://yourwebsite.com', generateQR: 'QR குறியீட்டை உருவாக்கு', downloadQR: 'QR குறியீட்டை பதிவிறக்கு',
    typingTitle: 'தட்டச்சு வேக சோதனை', typingHelp: 'தொடங்கு என்பதை அழுத்தி, காட்டப்படும் பத்தியை அப்படியே தட்டச்சு செய்யுங்கள். வேகம், துல்லியம் மற்றும் பிழைகள் புதுப்பிக்கப்படும்.', testDuration: 'சோதனை நேரம்', startTyping: 'தட்டச்சு சோதனையைத் தொடங்கு', typeThis: 'இதனைத் தட்டச்சு செய்யவும்:', yourTyping: 'உங்கள் தட்டச்சு', time: 'நேரம்', wpm: 'WPM', accuracy: 'துல்லியம்', errors: 'பிழைகள்',
    stopwatchTitle: 'ஸ்டாப்வாட்ச்', stopwatchHelp: 'தேவையான போதெல்லாம் தொடங்கவும், இடைநிறுத்தவும், மீட்டமைக்கவும் மற்றும் லேப் நேரங்களைப் பதிவு செய்யவும்.', start: 'தொடங்கு', pause: 'இடைநிறுத்து', lap: 'லேப்', reset: 'மீட்டமை',
    timerTitle: 'டைமர்', timerHelp: 'ஒரு கால அளவை அமைக்கவும். அது முடிந்ததும் அலாரம் ஒலிக்கும்; அனுமதித்தால் அறிவிப்பு வரும், ஆதரிக்கும் சாதனங்களில் அதிர்வும் வரும்.', minutes: 'நிமிடங்கள்', seconds: 'வினாடிகள்', enableNotifications: 'டைமர் அறிவிப்புகளை இயக்கு', stopAlarm: 'அலாரத்தை நிறுத்து',
    calendarTitle: 'பாரம்பரிய நாட்காட்டி', calendarHelp: 'மாதங்கள் மற்றும் ஆண்டுகளைப் பார்வையிடுங்கள். ஹரிஷின் பிறந்தநாள், மே 15, ஒவ்வொரு ஆண்டும் முன்னிலைப்படுத்தப்படும்.', birthdayLegend: 'முன்னிலைப்படுத்தப்பட்டது: ஹரிஷ் V-ன் பிறந்தநாள் — மே 15'
  },
  hi: {
    language: 'भाषा', toolsTitle: 'निःशुल्क डिजिटल सेवाएँ', toolsLead: 'सभी के लिए उपयोगी टूल। नीचे सेवा चुनें और जितनी बार चाहें उपयोग करें।', backToServices: '← सेवाओं पर वापस', onlineReady: 'ऑनलाइन — परीक्षण और निर्माण के लिए तैयार', offlineMode: 'ऑफ़लाइन — इंस्टॉल किए गए टूल अभी भी उपलब्ध हैं',
    networkTool: 'नेटवर्क स्पीड टेस्टर', qrTool: 'QR कोड जनरेटर', typingTool: 'टाइपिंग स्पीड टेस्ट', stopwatchTool: 'स्टॉपवॉच', timerTool: 'टाइमर', calendarTool: 'कैलेंडर',
    networkTitle: 'नेटवर्क स्पीड टेस्टर', speedInfo: 'यह ब्राउज़र से Cloudflare के टेस्ट सर्वर तक लेटेंसी और कनेक्शन स्पीड मापता है। परिणाम उपयोगी अनुमान हैं और आपके ISP प्लान से अलग हो सकते हैं।', startTest: 'टेस्ट शुरू करें', retest: 'फिर से टेस्ट करें', ping: 'पिंग', download: 'डाउनलोड', upload: 'अपलोड', waiting: 'जब चाहें तब तैयार है।',
    qrTitle: 'QR कोड जनरेटर', qrHelp: 'कोई लिंक, संदेश, संपर्क विवरण या टेक्स्ट दर्ज करें। बने हुए PNG को डाउनलोड कर किसी मानक QR स्कैनर से स्कैन किया जा सकता है।', textToEncode: 'एन्कोड करने के लिए टेक्स्ट या लिंक', qrPlaceholder: 'उदाहरण: https://yourwebsite.com', generateQR: 'QR कोड बनाएँ', downloadQR: 'QR कोड डाउनलोड करें',
    typingTitle: 'टाइपिंग स्पीड टेस्ट', typingHelp: 'स्टार्ट दबाएँ, फिर दिखाया गया अनुच्छेद बिल्कुल टाइप करें। आपकी गति, सटीकता और त्रुटियाँ टाइप करते समय अपडेट होंगी।', testDuration: 'टेस्ट अवधि', startTyping: 'टाइपिंग टेस्ट शुरू करें', typeThis: 'इसे टाइप करें:', yourTyping: 'आपकी टाइपिंग', time: 'समय', wpm: 'WPM', accuracy: 'सटीकता', errors: 'त्रुटियाँ',
    stopwatchTitle: 'स्टॉपवॉच', stopwatchHelp: 'जब भी आवश्यकता हो, शुरू करें, रोकें, रीसेट करें और लैप टाइम रिकॉर्ड करें।', start: 'शुरू', pause: 'रोकें', lap: 'लैप', reset: 'रीसेट',
    timerTitle: 'टाइमर', timerHelp: 'अवधि सेट करें। समाप्त होने पर यह पेज अलार्म बजाता है, अनुमति मिलने पर सूचना भेजता है और समर्थित डिवाइस पर कंपन करता है।', minutes: 'मिनट', seconds: 'सेकंड', enableNotifications: 'टाइमर सूचनाएँ चालू करें', stopAlarm: 'अलार्म बंद करें',
    calendarTitle: 'क्लासिक कैलेंडर', calendarHelp: 'महीने और वर्ष देखें। हरिश का जन्मदिन, 15 मई, हर वर्ष हाइलाइट होता है।', birthdayLegend: 'हाइलाइट: हरिश V का जन्मदिन — 15 मई'
  }
};

let activeLanguage = 'en';

function resolveBrowserLanguage() {
  const browserLanguages = navigator.languages || [navigator.language || 'en'];
  const matchingLanguage = browserLanguages.map((language) => language.toLowerCase().slice(0, 2)).find((language) => translations[language]);
  return matchingLanguage || 'en';
}

function getText(key) {
  return translations[activeLanguage]?.[key] ?? toolTranslations[activeLanguage]?.[key] ?? translations.en[key] ?? toolTranslations.en[key] ?? key;
}

function translatePage(language) {
  activeLanguage = translations[language] ? language : 'en';
  document.documentElement.lang = activeLanguage;
  document.querySelectorAll('[data-i18n]').forEach((element) => {
    element.textContent = getText(element.dataset.i18n);
  });
  document.querySelectorAll('[data-i18n-placeholder]').forEach((element) => {
    element.placeholder = getText(element.dataset.i18nPlaceholder);
  });
  document.title = activeLanguage === 'ta' ? 'ஹரிஷ் V | போர்ட்ஃபோலியோ' : activeLanguage === 'hi' ? 'हरिश V | पोर्टफोलियो' : 'Harish V | Cyber Portfolio';
  window.dispatchEvent(new CustomEvent('site-language-changed', { detail: { language: activeLanguage } }));
}

function initialiseLanguagePicker() {
  const picker = document.getElementById('languagePicker');
  if (!picker) return;
  const storedPreference = localStorage.getItem('harish-language') || 'auto';
  const initialLanguage = storedPreference === 'auto' ? resolveBrowserLanguage() : storedPreference;
  picker.value = storedPreference;
  translatePage(initialLanguage);
  picker.addEventListener('change', () => {
    const preference = picker.value;
    localStorage.setItem('harish-language', preference);
    translatePage(preference === 'auto' ? resolveBrowserLanguage() : preference);
  });
}

/* Mobile menu stays accessible and closes after a link is used. */
function initialiseMenu() {
  const button = document.getElementById('menuButton');
  const links = document.getElementById('navLinks');
  const backdrop = document.getElementById('navBackdrop');
  if (!button || !links || !backdrop) return;
  const closeMenu = () => {
    links.classList.remove('open'); backdrop.classList.remove('open'); document.body.classList.remove('menu-open');
    button.setAttribute('aria-expanded', 'false'); button.textContent = '☰';
  };
  const openMenu = () => {
    links.classList.add('open'); backdrop.classList.add('open'); document.body.classList.add('menu-open');
    button.setAttribute('aria-expanded', 'true'); button.textContent = '×';
  };
  button.addEventListener('click', () => links.classList.contains('open') ? closeMenu() : openMenu());
  backdrop.addEventListener('click', closeMenu);
  links.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeMenu));
}

/* Typewriter heading responds to the selected language. */
function initialiseTyping() {
  const output = document.getElementById('typing');
  if (!output) return;
  let wordIndex = 0, characterIndex = 0, deleting = false, timer;
  const tick = () => {
    const words = getText('typingWords');
    const word = words[wordIndex % words.length];
    output.textContent = word.slice(0, characterIndex);
    if (!deleting && characterIndex < word.length) { characterIndex += 1; timer = setTimeout(tick, 78); return; }
    if (!deleting) { deleting = true; timer = setTimeout(tick, 1300); return; }
    if (characterIndex > 0) { characterIndex -= 1; timer = setTimeout(tick, 35); return; }
    deleting = false; wordIndex += 1; timer = setTimeout(tick, 260);
  };
  window.addEventListener('site-language-changed', () => { clearTimeout(timer); wordIndex = 0; characterIndex = 0; deleting = false; tick(); });
  tick();
}

/* Reveals each section once it enters the screen. */
function initialiseRevealEffects() {
  const items = document.querySelectorAll('.hidden-on-load');
  if (!('IntersectionObserver' in window)) { items.forEach((item) => item.classList.add('show')); return; }
  const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
    if (entry.isIntersecting) { entry.target.classList.add('show'); observer.unobserve(entry.target); }
  }), { threshold: .1 });
  items.forEach((item) => observer.observe(item));
}

/* Background matrix is disabled for visitors who ask for reduced motion. */
function initialiseBackground() {
  const canvas = document.getElementById('matrix');
  if (!canvas || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const context = canvas.getContext('2d');
  const fontSize = 14, letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890{}[]<>#$%&', drops = [];
  const resize = () => {
    canvas.width = window.innerWidth; canvas.height = window.innerHeight;
    drops.length = Math.ceil(canvas.width / fontSize);
    drops.fill(1);
  };
  const draw = () => {
    context.fillStyle = 'rgba(2,2,2,.08)'; context.fillRect(0, 0, canvas.width, canvas.height);
    context.fillStyle = '#8b5cf6'; context.font = `${fontSize}px monospace`;
    drops.forEach((drop, index) => {
      context.fillText(letters[Math.floor(Math.random() * letters.length)], index * fontSize, drop * fontSize);
      drops[index] = drop * fontSize > canvas.height && Math.random() > .975 ? 0 : drop + 1;
    });
  };
  resize(); window.addEventListener('resize', resize); setInterval(draw, 38);
}

function initialiseBackToTop() {
  const button = document.getElementById('backToTop');
  if (!button) return;
  window.addEventListener('scroll', () => button.classList.toggle('visible', window.scrollY > 500), { passive: true });
  button.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

/* This is intentionally a local, privacy-friendly assistant: it sends nothing to a server. */
function initialiseAssistant() {
  const form = document.getElementById('assistantForm');
  const input = document.getElementById('assistantInput');
  const chat = document.getElementById('assistantChat');
  if (!form || !input || !chat) return;
  const addMessage = (message, sender) => {
    const row = document.createElement('div'); row.className = `chat-message ${sender}`;
    const avatar = document.createElement('div'); avatar.className = 'chat-avatar'; avatar.textContent = sender === 'user' ? '●' : '◈';
    const bubble = document.createElement('p'); bubble.className = 'chat-bubble'; bubble.textContent = message;
    row.append(avatar, bubble); chat.append(row); chat.scrollTop = chat.scrollHeight;
  };
  form.addEventListener('submit', (event) => {
    event.preventDefault(); const question = input.value.trim(); if (!question) return;
    addMessage(question, 'user'); input.value = '';
    const words = question.toLowerCase();
    const answer = words.includes('contact') || words.includes('email') || words.includes('phone') ? getText('chatContact') : words.includes('service') || words.includes('website') ? getText('chatServices') : words.includes('harish') || words.includes('about') ? getText('chatAbout') : getText('chatDefault');
    window.setTimeout(() => addMessage(answer, 'bot'), 350);
  });
}

/* PWA works on HTTPS/GitHub Pages. It is skipped for local file:// previews. */
function registerPwa() {
  if ('serviceWorker' in navigator && location.protocol !== 'file:') {
    window.addEventListener('load', () => navigator.serviceWorker.register('./sw.js').catch(() => { /* Site works normally if registration fails. */ }));
  }
}

document.addEventListener('DOMContentLoaded', () => {
  initialiseLanguagePicker(); initialiseMenu(); initialiseTyping(); initialiseRevealEffects();
  initialiseBackground(); initialiseBackToTop(); initialiseAssistant(); registerPwa();
  const glow = document.querySelector('.cursor-glow');
  if (glow && matchMedia('(pointer:fine)').matches) document.addEventListener('pointermove', (event) => { glow.style.left = `${event.clientX}px`; glow.style.top = `${event.clientY}px`; });
});

/* Used by tools.js without exposing the full translation object. */
window.getSiteText = getText;
window.getSiteLanguage = () => activeLanguage;
