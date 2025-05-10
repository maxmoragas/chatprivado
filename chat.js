console.log("🔍 chat.js se está ejecutando...");

firebase.auth().onAuthStateChanged(user => {
    if (user) {
        console.log("✅ Usuario autenticado:", user.email);
        escucharMensajes();
    } else {
        window.location.href = "index.html";  // 🔹 Redirigir si no está autenticado
    }
});

function enviarMensaje() {
    const mensajeInput = document.getElementById("mensajeInput");
    const mensaje = mensajeInput.value.trim();
    const user = firebase.auth().currentUser;

    if (!user || mensaje === "") return;

    firebase.database().ref("chat").push({
        usuario: user.email,
        mensaje: mensaje,
        timestamp: Date.now()
    });

    mensajeInput.value = "";
}

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

function enviarImagen() {
    const file = document.getElementById("imagenInput").files[0];
    const user = firebase.auth().currentUser;

    if (!user || !file) return;

    const storageRef = firebase.storage().ref(`chat-images/${Date.now()}_${file.name}`);
    storageRef.put(file).then(snapshot => {
        snapshot.ref.getDownloadURL().then(url => {
            firebase.database().ref("chat").push({
                usuario: user.email,
                imagen: url,
                timestamp: Date.now()
            });
        });
    });
}
