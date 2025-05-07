import { initializeApp } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-app.js";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-auth.js";
import { getFirestore, collection, addDoc, query, orderBy, onSnapshot } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "TU_API_KEY",
    authDomain: "TU_AUTH_DOMAIN",
    projectId: "TU_PROJECT_ID",
    storageBucket: "TU_STORAGE_BUCKET",
    messagingSenderId: "TU_MESSAGING_ID",
    appId: "TU_APP_ID"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore();

const loginBtn = document.getElementById("loginBtn");
const chatBox = document.getElementById("chatBox");
const messageInput = document.getElementById("messageInput");
const sendButton = document.getElementById("sendButton");

loginBtn.addEventListener("click", () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider).then((result) => {
        document.getElementById("userStatus").innerText = `Bienvenido, ${result.user.displayName}`;
    }).catch((error) => {
        console.error("Error al iniciar sesión:", error);
    });
});

sendButton.addEventListener("click", async () => {
    const message = messageInput.value.trim();
    if (message && auth.currentUser) {
        await addDoc(collection(db, "messages"), {
            text: message,
            user: auth.currentUser.displayName,
            timestamp: Date.now()
        });
        messageInput.value = "";
    }
});

const q = query(collection(db, "messages"), orderBy("timestamp", "asc"));
onSnapshot(q, (snapshot) => {
    chatBox.innerHTML = "";
    snapshot.forEach((doc) => {
        chatBox.innerHTML += `<p><strong>${doc.data().user}:</strong> ${doc.data().text}</p>`;
    });
});
