console.log("🔍 chat.js se está ejecutando...");

// Esperar a que Firebase esté listo antes de iniciar
document.addEventListener("firebase-load-complete", () => {
    console.log("✅ Firebase finalmente detectado en chat.js:", window.firebase);
    iniciarFirebase();
});

// Función para inicializar Firebase en chat.js
function iniciarFirebase() {
    if (window.firebase && window.firebase.database) {
        console.log("🔥 Firebase listo para usarse en chat.js:", window.firebase);

        escucharMensajes();
    } else {
        console.error("🚨 Firebase aún no está disponible en chat.js.");
    }
}

// Función para enviar mensajes al chat
function enviarMensaje() {
    const mensajeInput = document.getElementById("mensajeInput");
    const mensaje = mensajeInput.value.trim();

    if (mensaje === "") return; 

    const mensajeRef = window.firebase.database().ref("chat").push();
    
    mensajeRef.set({
        usuario: "Anonimo",
        mensaje: mensaje,
        timestamp: Date.now()
    }).then(() => {
        console.log("✅ Mensaje enviado correctamente:", mensaje);
    }).catch((error) => {
        console.error("🚨 Error al enviar mensaje a Firebase:", error);
    });

    mensajeInput.value = ""; 
}

// Función para recibir mensajes en tiempo real
function escucharMensajes() {
    window.firebase.database().ref("chat").on("child_added", (snapshot) => {
        const datos = snapshot.val();
        console.log("📩 Nuevo mensaje recibido:", datos);

        const chatContainer = document.getElementById("chatContainer");
        if (!chatContainer) {
            console.error("🚨 No se encontró el `chatContainer`.");
            return;
        }

        const mensajeElemento = document.createElement("p");
        mensajeElemento.textContent = `${datos.usuario}: ${datos.mensaje}`;
        chatContainer.appendChild(mensajeElemento);
    });
}
