// Inicialización de Firebase con los datos de tu proyecto
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

// Función para convertir imágenes a Base64 antes de enviarlas a Firebase
function encodeImageToBase64(file) {
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () => {
    const base64String = reader.result;
    saveToFirebase(base64String); // Guarda en Firebase
  };
}

// Función para guardar la imagen en Firebase Realtime Database
function saveToFirebase(base64String) {
  firebase.database().ref("messages").push({
    image: base64String,
    sender: "Usuario"
  });
}

// Función para enviar mensajes de texto al chat
document.getElementById("sendMessage").addEventListener("click", () => {
  const messageText = document.getElementById("messageInput").value;
  firebase.database().ref("messages").push({
    text: messageText,
    sender: "Usuario"
  });
});

// Función para cargar mensajes en el chat
firebase.database().ref("messages").on("child_added", (snapshot) => {
  const message = snapshot.val();
  const messageContainer = document.createElement("div");

  if (message.text) {
    messageContainer.innerHTML = `<p>${message.sender}: ${message.text}</p>`;
  }

  if (message.image) {
    const imgElement = document.createElement("img");
    imgElement.src = message.image;
    imgElement.style.maxWidth = "200px"; // Ajusta el tamaño de la imagen
    messageContainer.appendChild(imgElement);
  }

  document.getElementById("chatContainer").appendChild(messageContainer);
});

// Detectar subida de imágenes y convertirlas a Base64
document.getElementById("imageInput").addEventListener("change", (event) => {
  const file = event.target.files[0];
  if (file) {
    encodeImageToBase64(file);
  }
});
