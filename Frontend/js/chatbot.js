/* ==========================================
   HEALORA AI CHATBOT
========================================== */

document.addEventListener("DOMContentLoaded", () => {

    const chatWindow = document.querySelector(".chat-window");
    const input = document.getElementById("messageInput");
    const sendBtn = document.getElementById("sendBtn");

    /* ======================================
       SEND MESSAGE
    ====================================== */

    function sendMessage() {

        const message = input.value.trim();

        if (message === "") return;

        // USER MESSAGE
        const userMessage = document.createElement("div");

        userMessage.className = "message user";

        userMessage.innerHTML = `
            <div class="bubble">${message}</div>
            <div class="avatar user-avatar">👤</div>
        `;

        chatWindow.appendChild(userMessage);

        input.value = "";

        chatWindow.scrollTop = chatWindow.scrollHeight;

        showTyping(message);

    }

    sendBtn.addEventListener("click", sendMessage);

    input.addEventListener("keypress", (e) => {

        if (e.key === "Enter") {

            sendMessage();

        }

    });

    /* ======================================
       TYPING ANIMATION
    ====================================== */

    function showTyping(userText) {

        const typing = document.createElement("div");

        typing.className = "message ai typing-box";

        typing.innerHTML = `

            <div class="avatar">🤖</div>

            <div class="bubble typing">

                <span></span>

                <span></span>

                <span></span>

            </div>

        `;

        chatWindow.appendChild(typing);

        chatWindow.scrollTop = chatWindow.scrollHeight;

        setTimeout(() => {

            typing.remove();

            botReply(userText);

        }, 1800);

    }

    /* ======================================
       SIMPLE AI RESPONSES
    ====================================== */

    function botReply(text) {

        text = text.toLowerCase();

        let reply =
        "I understand your concern. Please consult a healthcare professional if symptoms persist.";

        if (text.includes("fever")) {

            reply =
            "🌡️ For fever: Stay hydrated, rest well, and monitor your temperature. If it exceeds 102°F or lasts more than 2–3 days, consult a doctor.";

        }

        else if (text.includes("headache")) {

            reply =
            "🤕 Headaches may occur due to stress, dehydration, or lack of sleep. Drink water, rest, and seek medical advice if the pain is severe.";

        }

        else if (text.includes("cold")) {

            reply =
            "🤧 Common cold usually improves with rest, fluids, and warm drinks. Consult a doctor if symptoms worsen.";

        }

        else if (text.includes("cough")) {

            reply =
            "😷 A persistent cough can have many causes. Stay hydrated and seek medical advice if it lasts more than 2 weeks.";

        }

        else if (text.includes("medicine")) {

            reply =
            "💊 Please take medicines only as prescribed by your doctor. Never self-medicate without proper guidance.";

        }

        else if (text.includes("report")) {

            reply =
            "📄 Upload your medical report and Healora AI will help explain the findings in simple language.";

        }

        const aiMessage = document.createElement("div");

        aiMessage.className = "message ai";

        aiMessage.innerHTML = `

            <div class="avatar">🤖</div>

            <div class="bubble">

                ${reply}

            </div>

        `;

        chatWindow.appendChild(aiMessage);

        chatWindow.scrollTop = chatWindow.scrollHeight;

    }

});
/* ==========================================
   SUGGESTION BUTTONS
========================================== */

document.querySelectorAll(".suggestions button").forEach(button => {

    button.addEventListener("click", () => {

        input.value = button.innerText;

        sendMessage();

    });

});


/* ==========================================
   NEW CHAT
========================================== */

const newChat = document.querySelector(".new-chat");

if(newChat){

    newChat.addEventListener("click",()=>{

        if(confirm("Start a new conversation?")){

            chatWindow.innerHTML=`

            <div class="message ai">

                <div class="avatar">🤖</div>

                <div class="bubble">

                    Hello 👋 I'm Healora AI.

                    Tell me your symptoms and I'll try to help.

                </div>

            </div>

            `;

        }

    });

}


/* ==========================================
   DARK MODE
========================================== */

const moonBtn=document.querySelector(".fa-moon");

if(moonBtn){

    moonBtn.parentElement.addEventListener("click",()=>{

        document.body.classList.toggle("dark");

    });

}


/* ==========================================
   REPORT UPLOAD
========================================== */

const upload=document.getElementById("reportUpload");

if(upload){

upload.addEventListener("change",(e)=>{

const file=e.target.files[0];

if(file){

alert("📄 "+file.name+" uploaded successfully.");

}

});

}


/* ==========================================
   VOICE INPUT
========================================== */

const micBtn=document.querySelector(".fa-microphone");

if(micBtn){

micBtn.parentElement.addEventListener("click",()=>{

if(!('webkitSpeechRecognition' in window)){

alert("Voice recognition is not supported in this browser.");

return;

}

const recognition=new webkitSpeechRecognition();

recognition.lang="en-US";

recognition.start();

recognition.onresult=function(event){

input.value=event.results[0][0].transcript;

};

});

}


/* ==========================================
   EMOJI BUTTON
========================================== */

const emojiBtn=document.querySelector(".input-tools button:nth-child(2)");

if(emojiBtn){

emojiBtn.addEventListener("click",()=>{

input.value+=" 😊";

input.focus();

});

}


/* ==========================================
   SAVE CHAT
========================================== */

function saveChat(){

localStorage.setItem(

"healoraChat",

chatWindow.innerHTML

);

}

function loadChat(){

const history=localStorage.getItem("healoraChat");

if(history){

chatWindow.innerHTML=history;

}

}

loadChat();

const observer=new MutationObserver(()=>{

saveChat();

});

observer.observe(chatWindow,{

childList:true,

subtree:true

});


/* ==========================================
   QUICK TOOLS
========================================== */

document.querySelectorAll(".tool-card").forEach(card=>{

card.addEventListener("click",()=>{

alert(card.querySelector("h3").innerText+" module will open soon.");

});

});


/* ==========================================
   EMERGENCY BUTTON
========================================== */

const emergency=document.querySelector(".emergency-btn");

if(emergency){

emergency.addEventListener("click",()=>{

alert("🚑 In a real application, this button will immediately call emergency services or your emergency contact.");

});

}


/* ==========================================
   PAGE READY
========================================== */

console.log("%c🤖 Healora AI Ready",
"color:#14B8A6;font-size:18px;font-weight:bold;");