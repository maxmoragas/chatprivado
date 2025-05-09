document.addEventListener("DOMContentLoaded", () => {
    if (!window.db) {
        console.error("Firebase no ha sido inicializado correctamente.");
        return;
    }
    
    const db = window.db;

    document.getElementById("sendMessage").addEventListener("click", () => {
        const messageText = document.getElementById("messageInput").value;
        if (messageText.trim() !== "") {
            db.ref("messages").push({
                text: messageText,
                sender: localStorage.getItem("nickname") || "Anon"
            });
            document.getElementById("messageInput").value = "";
        }
    });

    document.getElementById("imageInput").addEventListener("change", (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
                db.ref("messages").push({
                    image: reader.result,
                    sender: localStorage.getItem("nickname") || "Anon"
                });
            };
        }
    });

    db.ref("messages").on("child_added", (snapshot) => {
        const message = snapshot.val();
        const messageContainer = document.createElement("div");

        if (message.text) {
            messageContainer.innerHTML = `<p><strong>${message.sender}:</strong> ${message.text}</p>`;
        }

        if (message.image) {
            const imgElement = document.createElement("img");
            imgElement.src = message.image;
            messageContainer.appendChild(imgElement);
        }

        document.getElementById("chatContainer").appendChild(messageContainer);
    });
});
