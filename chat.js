window.onload = function() {
    console.log("🛠 Verificando si Firebase está definido:", typeof firebase);
    console.log("🔍 Probando acceso a Firebase:", window.firebase);

    if (typeof firebase === "undefined") {
        console.error("🚨 Firebase sigue sin estar disponible.");
        return;
    }

    console.log("✅ Firebase ahora está disponible:", firebase);

    const app = firebase.initializeApp({
        apiKey: "AIzaSyCalxt34jrPFP9VJM5yBFA4BRF2U1_XiZw",
        authDomain: "michatprivado-f704a.firebaseapp.com",
        projectId: "michatprivado-f704a",
        storageBucket: "michatprivado-f704a.appspot.com",
        messagingSenderId: "187774286181",
        appId: "1:187774286181:web:95fc9391a64d3d244e498c"
    });

    const db = firebase.database();
    const auth = firebase.auth();
    const storage = firebase.storage();

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
};
