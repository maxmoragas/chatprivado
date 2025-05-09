import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getDatabase, ref, onValue, push, set } from "firebase/database";

// Configuración de Firebase con tus datos
const firebaseConfig = {
  apiKey: "AIzaSyCalxt34jrPFP9VJM5yBFA4BRF2U1_XiZw",
  authDomain: "michatprivado-f704a.firebaseapp.com",
  projectId: "michatprivado-f704a",
  storageBucket: "michatprivado-f704a.appspot.com",
  messagingSenderId: "187774286181",
  appId: "1:187774286181:web:95fc9391a64d3d244e498c"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getDatabase(app);

// Mostrar el nickname del usuario en el chat
onAuthStateChanged(auth, (user) => {
  const nicknameElement = document.getElementById("nickname");
  if (user) {
    console.log("✅ Usuario autenticado:", user);
    nicknameElement.textContent = user.displayName || "Usuario sin nombre";
  } else {
    console.log("🚨 No hay usuario autenticado.");
    nicknameElement.textContent = "Invitado";
  }
});

// Enviar mensajes al chat
document.getElementById("sendMessage").addEventListener("click", () => {
  const messageInput = document.getElementById("messageInput").value;
  const user = auth.currentUser;

  if (user && messageInput.trim() !== "") {
    const chatRef = ref(db, "chatMessages");
    const newMessageRef = push(chatRef);

    set(newMessageRef, {
      text: messageInput,
      sender: user.displayName || "Usuario",
      timestamp: Date.now()
    });

    document.getElementById("messageInput").value = "";
  }
});

// Mostrar mensajes en tiempo real
const chatMessagesRef = ref(db, "chatMessages");
onValue(chatMessagesRef, (snapshot) => {
  const chatBox = document.getElementById("chatBox");
  chatBox.innerHTML = "";

  snapshot.forEach((childSnapshot) => {
    const messageData = childSnapshot.val();
    const messageElement = document.createElement("p");
    messageElement.textContent = `${messageData.sender}: ${messageData.text}`;
    chatBox.appendChild(messageElement);
  });
});
