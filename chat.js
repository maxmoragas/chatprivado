console.log("🔍 chat.js se está ejecutando...");

// Función para inicializar Firebase en chat.js
function iniciarFirebase() {
    console.log("✅ Ejecutando iniciarFirebase...");

    if (window.firebase) {
        console.log("🔥 Firebase listo para usarse en chat.js:", window.firebase);

        // Inicializar autenticación y base de datos
        const auth = window.firebase.auth();
        const database = window.firebase.database();

        console.log("✅ Autenticación Firebase:", auth);
        console.log("✅ Base de datos Firebase:", database);

        // Escuchar mensajes del chat
        escucharMensajes();
    } else {
        console.error("🚨 Firebase aún no está disponible en chat.js.");
    }
}

// Función para enviar mensajes a Firebase Database
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

// Función para escuchar nuevos mensajes en Firebase Database
function escucharMensajes() {
    window.firebase.database().ref("chat").on("child_added", (snapshot) => {
        const datos = snapshot.val();
        console.log("📩 Mensaje recibido:", datos);

        // Aquí puedes agregar código para mostrar el mensaje en la interfaz
    });
}

// Esperar a que Firebase se cargue en `window.firebase`
window.addEventListener("firebase-load-complete", iniciarFirebase);

// Verificación adicional después de unos segundos
setTimeout(() => {
    console.log("🔍 Segunda verificación después de 3 segundos:", window.firebase);
    if (!window.firebase) {
        console.error("🚨 Firebase sigue sin estar accesible en chat.js.");
    } else {
        iniciarFirebase();
    }
}, 3000);
