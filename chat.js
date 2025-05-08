// 🔥 Inicializa Firebase con tu configuración
const firebaseConfig = {
  apiKey: "AIzaSyCalxt34jrPFP9VJM5yBFA4BRF2U1_XiZw",
  authDomain: "michatprivado-f704a.firebaseapp.com",
  databaseURL: "https://michatprivado-f704a.firebaseio.com",
  projectId: "michatprivado-f704a",
  storageBucket: "michatprivado-f704a.appspot.com",
  messagingSenderId: "187774286181",
  appId: "1:187774286181:web:95fc9391a64d3d244e498c"
};
firebase.initializeApp(firebaseConfig);

// 🔥 Enviar mensajes de texto a Firebase
document.getElementById("sendMessage").addEventListener("click", () => {
  const messageText = document.getElementById("messageInput").value;
  if (messageText.trim() !== "") {
    firebase.database().ref("messages").push({ text: messageText });
    document.getElementById("messageInput").value = ""; // Limpia el campo
  }
});

// 🔥 Recibir mensajes en el chat
firebase.database().ref("messages").on("child_added", (snapshot) => {
  const message = snapshot.val();
  const messageContainer = document.createElement("div");
  messageContainer.innerHTML = `<p>${message.text}</p>`;
  document.getElementById("chatContainer").appendChild(messageContainer);
});
