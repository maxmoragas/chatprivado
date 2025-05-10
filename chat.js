firebase.auth().onAuthStateChanged(user => {
    if (!user) {
        window.location.href = "index.html";
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

function escucharMensajes() {
    firebase.database().ref("chat").on("child_added", snapshot => {
        const datos = snapshot.val();
        const chatContainer = document.getElementById("chatContainer");

        const mensajeElemento = document.createElement("p");
        mensajeElemento.textContent = `${datos.usuario}: ${datos.mensaje}`;
        chatContainer.appendChild(mensajeElemento);
    });
}
