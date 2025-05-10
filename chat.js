console.log("🔍 chat.js se está ejecutando...");

firebase.auth().onAuthStateChanged(user => {
    if (!user) {
        window.location.href = "index.html";  // 🔹 Redirigir si no está autenticado
    } else {
        escucharMensajes();
    }
});

function enviarMensaje() {
    const mensajeInput = document.getElementById("mensajeInput");
    const mensaje = mensajeInput.value.trim();
    const nickname = localStorage.getItem("nickname");

    if (!nickname || mensaje === "") return;

    firebase.database().ref("chat").push({
        usuario: nickname,
        mensaje: mensaje,
        timestamp: Date.now()
    });

    mensajeInput.value = "";
}

// Escuchar mensajes en tiempo real
function escucharMensajes() {
    firebase.database().ref("chat").on("child_added", snapshot => {
        const datos = snapshot.val();
        const chatContainer = document.getElementById("chatContainer");

        if (!chatContainer) return;

        const mensajeElemento = document.createElement("p");
        mensajeElemento.textContent = `${datos.usuario}: ${datos.mensaje}`;
        chatContainer.appendChild(mensajeElemento);
    });
}
