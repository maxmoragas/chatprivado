document.addEventListener("DOMContentLoaded", () => {
    if (!window.auth || !window.db || !window.storage) {
        console.error("🚨 Firebase NO se ha cargado correctamente.");
        return;
    }

    console.log("✅ Firebase está listo para el chat.");

    const messageInput = document.getElementById("messageInput");
    const sendMessageButton = document.getElementById("sendMessage");
    const messagesContainer = document.getElementById("messages");
    const imageInput = document.getElementById("imageInput");
    const uploadImageButton = document.getElementById("uploadImage");
    const showOnlineUsersButton = document.getElementById("showOnlineUsers");
    const onlineUsersContainer = document.getElementById("onlineUsers");

    // 💡 Obtener el nickname desde Firebase y guardarlo en `localStorage`
    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            firebase.database().ref("users/" + user.uid).once("value").then((snapshot) => {
                const nickname = snapshot.val().nickname || "Invitado";
                localStorage.setItem("nickname", nickname);
                console.log("✅ Nickname registrado:", nickname);
            });
        }
    });

    sendMessageButton.addEventListener("click", () => {
        const message = messageInput.value.trim();
        if (!message) return;

        const nickname = localStorage.getItem("nickname") || "Invitado";

        firebase.database().ref("messages").push({
            sender: nickname,
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

        if (data.sender === localStorage.getItem("nickname")) {
            messageElement.classList.add("sent");
        } else {
            messageElement.classList.add("received");
        }

        messageElement.textContent = `[${data.sender}]: ${data.text}`;
        messagesContainer.appendChild(messageElement);
    });

    uploadImageButton.addEventListener("click", () => {
        const file = imageInput.files[0];
        if (!file) return;

        const storageRef = firebase.storage().ref("images/" + file.name);
        storageRef.put(file).then(() => {
            storageRef.getDownloadURL().then((url) => {
                firebase.database().ref("messages").push({
                    sender: localStorage.getItem("nickname"),
                    imageUrl: url,
                    timestamp: Date.now()
                });
            });
        });
    });

    showOnlineUsersButton.addEventListener("click", () => {
        onlineUsersContainer.style.display = "block";
        onlineUsersContainer.innerHTML = "";

        firebase.database().ref("users").once("value", (snapshot) => {
            snapshot.forEach((childSnapshot) => {
                if (childSnapshot.val().online) {
                    const userElement = document.createElement("p");
                    userElement.textContent = childSnapshot.val().nickname;
                    onlineUsersContainer.appendChild(userElement);
                }
            });
        });
    });

    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            firebase.database().ref("users/" + user.uid).update({ online: true });
        }
    });

    window.adjustHeight = function(element) {
        element.style.height = "auto";
        element.style.height = element.scrollHeight + "px";
    };
});
