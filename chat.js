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

        const auth = window.firebase.auth();
        const database = window.firebase.database();

        console.log("✅ Autenticación Firebase:", auth);
        console.log("✅ Base de datos Firebase:", database);

        escucharMensajes();
    } else {
        console.error("🚨 Firebase aún no está disponible en chat.js.");
    }
}

// Función para enviar mensajes al chat
function enviarMensaje() {
    const mensajeInput = document.getElementById("mensajeInput");
    const mensaje = mensajeInput.value.trim();

    if (mensaje === "") return; // Evitar mensajes vacíos

    window.firebase.database().ref("chat").push({
        usuario: window.firebase.auth().currentUser.email,
        mensaje: mensaje,
        timestamp: Date.now()
    });

    console.log("✅ Mensaje enviado a Firebase:", mensaje);
    mensajeInput.value = ""; // Limpiar el campo después de enviar
}

// Función para recibir mensajes en tiempo real
function escucharMensajes() {
    window.firebase.database().ref("chat").on("child_added", (snapshot) => {
        const datos = snapshot.val();
        console.log("📩 Nuevo mensaje recibido:", datos);

        // Agregar mensaje al chat
        const chatContainer = document.getElementById("chatContainer");
        const mensajeElemento = document.createElement("p");
        mensajeElemento.textContent = `${datos.usuario}: ${datos.mensaje}`;
        chatContainer.appendChild(mensajeElemento);
    });
}

// Esperar a que la página se cargue por completo antes de iniciar Firebase
document.addEventListener("DOMContentLoaded", () => {
    if (!window.firebase) {
        console.error("🚨 Firebase aún no está disponible en chat.js. Intentando nuevamente en 3 segundos...");
        setTimeout(iniciarFirebase, 3000);
    }
});
