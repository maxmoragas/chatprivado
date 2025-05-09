window.addEventListener("firebase-ready", () => {
    console.log("🔍 Firebase recibido en chat.js:", window.firebaseInstance);

    if (typeof window.firebaseInstance === "undefined") {
        console.error("🚨 Firebase sigue sin estar disponible en chat.js. Deteniendo ejecución.");
        return;
    }

    console.log("✅ Firebase ya está disponible en chat.js:", window.firebaseInstance);
    iniciarFirebase();
});

function iniciarFirebase() {
    console.log("✅ Usando la instancia de Firebase creada en index.html.");

    const db = window.firebaseInstance.database();
    const auth = window.firebaseInstance.auth();
    const storage = window.firebaseInstance.storage();

    auth.onAuthStateChanged((user) => {
        if (!user) window.location.href = "index.html";
    });

    const chatRef = db.ref("chat");

    document.getElementById("sendMessage").addEventListener("click", async () => {
        const message = document.getElementById("messageInput").value;
        const file = document.getElementById("fileInput").files[0];

        if (file) {
            const fileRef = storage.ref("uploads/" + file.name);
            await fileRef.put(file);
            const url = await fileRef.getDownloadURL();
            chatRef.push({ user: "LLA Bragado", image: url, timestamp: Date.now() });
        } else if (message.trim() !== "") {
            chatRef.push({ user: "LLA Bragado", message: message, timestamp: Date.now() });
        }

        document.getElementById("messageInput").value = "";
        document.getElementById("fileInput").value = "";
    });

    chatRef.on("child_added", (snapshot) => {
        const data = snapshot.val();
        const messageElement = document.createElement("div");
        messageElement.classList.add("message");

        if (data.message) {
            messageElement.innerHTML = `<strong>${data.user}:</strong> ${data.message}`;
        } else if (data.image) {
            messageElement.innerHTML = `<strong>${data.user}:</strong> <img src="${data.image}" style="max-width: 200px;">`;
        }

        messageElement.classList.add(data.user === "LLA Bragado" ? "sent" : "received");
        document.getElementById("chatBox").appendChild(messageElement);
    });

    document.getElementById("logoutButton").addEventListener("click", () => {
        auth.signOut().then(() => window.location.href = "index.html");
    });
}
