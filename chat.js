document.addEventListener("DOMContentLoaded", () => {
    if (!window.db) {
        console.error("🚨 Firebase NO está inicializado correctamente.");
        return;
    }

    console.log("✅ Firebase inicializado y listo para usar.");
    const db = window.db;

    document.getElementById("sendMessage").addEventListener("click", () => {
        const messageText = document.getElementById("messageInput").value;
        if (messageText.trim() !== "") {
            db.ref("messages").push({
                text: messageText,
                sender: firebase.auth().currentUser.email
            });
            document.getElementById("messageInput").value = "";
        }
    });

    db.ref("messages").on("child_added", (snapshot) => {
        const message = snapshot.val();
        const messageContainer = document.createElement("div");
        messageContainer.innerHTML = `<p><strong>${message.sender}:</strong> ${message.text}</p>`;
        document.getElementById("chatContainer").appendChild(messageContainer);
    });
});

// 🔥 Función para cerrar sesión
window.logout = function() {
    firebase.auth().signOut().then(() => {
        window.location.href = "index.html";
    });
};
