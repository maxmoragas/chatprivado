// Verificar que Firebase está cargado correctamente
document.addEventListener("DOMContentLoaded", () => {
    if (typeof firebase === "undefined") {
        console.error("🚨 Firebase no está disponible. Verifica que está correctamente cargado en index.html.");
        return;
    }

    console.log("✅ Firebase cargado correctamente:", firebase);

    const app = firebase.initializeApp({
        apiKey: "AIzaSyCalxt34jrPFP9VJM5yBFA4BRF2U1_XiZw",
        authDomain: "michatprivado-f704a.firebaseapp.com",
        databaseURL: "https://michatprivado-f704a-default-rtdb.firebaseio.com",
        projectId: "michatprivado-f704a",
        storageBucket: "michatprivado-f704a.appspot.com",
        messagingSenderId: "187774286181",
        appId: "1:187774286181:web:95fc9391a64d3d244e498c"
    });

    const db = firebase.database();
    const auth = firebase.auth();
    const storage = firebase.storage();

    // Verificar usuario autenticado
    auth.onAuthStateChanged((user) => {
        if (user) {
            document.getElementById("nickname").innerText = "LLA Bragado";
        } else {
            window.location.href = "index.html"; // Redirigir si no está autenticado
        }
    });

    // Referencia al chat en Firebase
    const chatRef = db.ref("chat");

    // Enviar mensaje de texto o imagen
    document.getElementById("sendMessage").addEventListener("click", async () => {
        const message = document.getElementById("messageInput").value;
        const file = document.getElementById("fileInput").files[0];

        if (file) {
            // Subir imagen a Firebase Storage
            const fileRef = storage.ref("uploads/" + file.name);
            await fileRef.put(file);
            const url = await fileRef.getDownloadURL();

            chatRef.push({
                user: "LLA Bragado",
                image: url,
                timestamp: Date.now()
            });
        } else if (message.trim() !== "") {
            chatRef.push({
                user: "LLA Bragado",
                message: message,
                timestamp: Date.now()
            });
        }

        // Limpiar input de texto y archivo
        document.getElementById("messageInput").value = "";
        document.getElementById("fileInput").value = "";
    });

    // Mostrar mensajes en el chat
    chatRef.on("child_added", (snapshot) => {
        const data = snapshot.val();
        const messageElement = document.createElement("div");
        messageElement.classList.add("message");

        if (data.message) {
            messageElement.innerHTML = `<strong>${data.user}:</strong> ${data.message}`;
        } else if (data.image) {
            messageElement.innerHTML = `<strong>${data.user}:</strong> <img src="${data.image}" alt="Imagen enviada" style="max-width: 200px;">`;
        }

        messageElement.classList.add(data.user === "LLA Bragado" ? "sent" : "received");
        document.getElementById("chatBox").appendChild(messageElement);
    });

    // Cerrar sesión
    document.getElementById("logoutButton").addEventListener("click", () => {
        auth.signOut().then(() => {
            window.location.href = "index.html";
        });
    });
});
