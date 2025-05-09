import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getDatabase, ref, onValue, push, set } from "firebase/database";
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from "firebase/storage";

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
const storage = getStorage(app);

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

// Enviar mensajes con texto e imágenes
document.getElementById("sendMessage").addEventListener("click", () => {
  const messageInput = document.getElementById("messageInput").value;
  const fileInput = document.getElementById("fileInput").files[0];
  const user = auth.currentUser;

  if (user) {
    if (fileInput) {
      // Subir archivo a Firebase Storage
      const fileRef = storageRef(storage, `uploads/${user.uid}/${fileInput.name}`);
      uploadBytes(fileRef, fileInput).then((snapshot) => {
        getDownloadURL(snapshot.ref).then((fileURL) => {
          sendMessage(user, fileURL, fileInput.name);
        });
      });
    } else if (messageInput.trim() !== "") {
      sendMessage(user, messageInput);
    }
  }
});

// Función para enviar mensajes
function sendMessage(user, content, fileName = null) {
  const chatRef = ref(db, "chatMessages");
  const newMessageRef = push(chatRef);

  set(newMessageRef, {
    sender: user.displayName || "Usuario",
    text: fileName ? null : content,
    fileURL: fileName ? content : null,
    fileName: fileName,
    timestamp: Date.now()
  });

  document.getElementById("messageInput").value = "";
  document.getElementById("fileInput").value = "";
}

// Mostrar mensajes en tiempo real
const chatMessagesRef = ref(db, "chatMessages");
onValue(chatMessagesRef, (snapshot) => {
  const chatBox = document.getElementById("chatBox");
  chatBox.innerHTML = "";

  snapshot.forEach((childSnapshot) => {
    const messageData = childSnapshot.val();
    const messageElement = document.createElement("p");

    if (messageData.fileURL) {
      messageElement.innerHTML = `<strong>${messageData.sender}:</strong> <a href="${messageData.fileURL}" target="_blank">${messageData.fileName}</a>`;
    } else {
      messageElement.textContent = `${messageData.sender}: ${messageData.text}`;
    }

    chatBox.appendChild(messageElement);
  });
});
