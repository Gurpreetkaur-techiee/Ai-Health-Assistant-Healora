/* ==========================================
   HEALORA AI CHATBOT
========================================== */

const token = localStorage.getItem("token");

if (!token) {
    window.location.href = "login.html";
}

document.addEventListener("DOMContentLoaded", () => {

    const chatWindow = document.querySelector(".chat-window");
    const input = document.getElementById("messageInput");
    const sendBtn = document.getElementById("sendBtn");
    const API_BASE_URL = "http://localhost:5000/api";

    
    

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

    async function botReply(text) {

    try {

        const response = await fetch(
            `${API_BASE_URL}/symptoms/analyze`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({

                    message: text

                })
            }
        );

        const result = await response.json();

        console.log(result);

        if(!result.success){

            return;

        }

        const aiMessage=document.createElement("div");

        aiMessage.className="message ai";

        aiMessage.innerHTML=`

        <div class="avatar">

        🤖

        </div>

        <div class="bubble">

        ${result.data.response}

        </div>

        `;

        chatWindow.appendChild(aiMessage);

        chatWindow.scrollTop=chatWindow.scrollHeight;

   

    }

    catch(err){

        console.error(err);

    }

}

       

       
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
});