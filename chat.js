document.addEventListener("DOMContentLoaded", () => {
    if (!window.auth || !window.db || !window.storage) {
        console.error("🚨 Firebase NO se ha cargado correctamente.");
        return;
    }

    console.log("✅ Firebase está listo para el chat.");

    const messageInput = document.getElementById("messageInput");
    const sendMessageButton = document.getElementById("sendMessage");
    const messagesContainer = document.getElementById("messages");

    sendMessageButton.addEventListener("click", () => {
        const message = messageInput.value.trim();
        if (!message) return;

        const user = firebase.auth().currentUser;
        if (!user) return;

        firebase.database().ref("messages").push({
            sender: user.email,
            text: message,
            timestamp: Date.now()
        });

        messageInput.value = "";
        adjustHeight(messageInput);
    });

    firebase.database().ref("messages").on("child_added", (snapshot) => {
        const data = snapshot.val();
        const messageElement = document.createElement("div");
        messageElement.classList.add("message");

        if (data.sender === firebase.auth().currentUser.email) {
            messageElement.classList.add("sent");
        } else {
            messageElement.classList.add("received");
        }

        messageElement.textContent = `[${data.sender}]: ${data.text}`;
        messagesContainer.appendChild(messageElement);
    });

    window.adjustHeight = function(element) {
        element.style.height = "auto";
        element.style.height = element.scrollHeight + "px";
    };
});
