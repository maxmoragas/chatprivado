document.addEventListener("DOMContentLoaded", () => {
    const db = firebase.database();
    const nickname = localStorage.getItem("nickname") || "Anon";

    document.getElementById("sendMessage").addEventListener("click", () => {
        const messageText = document.getElementById("messageInput").value;
        if (messageText.trim() !== "") {
            db.ref("messages").push({
                text: messageText,
                sender: nickname
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

    db.ref("users").on("child_added", (snapshot) => {
        const onlineUsers = document.getElementById("onlineUsers");
        onlineUsers.innerHTML += `<br>${snapshot.val().nickname}`;
    });
});

window.logout = function() {
    firebase.auth().signOut().then(() => {
        window.location.href = "index.html";
    });
};
