document.addEventListener("DOMContentLoaded", function () {
    firebase.auth().onAuthStateChanged(user => {
        if (!user) {
            console.error("❌ No hay usuario autenticado.");
            window.location.replace("login.html");
            return;
        }
        console.log("✅ Usuario autenticado:", user.displayName);

        if (!firebase.firestore) {
            console.error("❌ Firebase no se cargó correctamente.");
            alert("❌ Error al conectar con Firebase, revisa tu configuración.");
            return;
        }

        const db = firebase.firestore();
        const mensajesContainer = document.getElementById("mensajes");
        const inputMensaje = document.getElementById("mensaje");
        const botonEnviar = document.getElementById("enviar");

        inputMensaje.disabled = false; // 🔥 Habilitar el cuadro de texto correctamente

        botonEnviar.addEventListener("click", async () => {
            const mensajeTexto = inputMensaje.value.trim();
            if (!mensajeTexto) return;

            const mensajeData = {
                usuario: user.displayName,
                mensaje: mensajeTexto,
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            };

            try {
                await db.collection("mensajes").add(mensajeData);
                console.log("✅ Mensaje enviado correctamente:", mensajeData);
                inputMensaje.value = "";
            } catch (error) {
                console.error("❌ Error al enviar mensaje:", error.message);
                alert("❌ Error al enviar mensaje: " + error.message);
            }
        });

        db.collection("mensajes").orderBy("timestamp", "asc").onSnapshot(snapshot => {
            mensajesContainer.innerHTML = "";
            snapshot.docs.forEach(doc => {
                const mensaje = doc.data();
                const mensajeElement = document.createElement("div");
                mensajeElement.innerHTML = `<b>${mensaje.usuario}:</b> ${mensaje.mensaje}`;
                mensajesContainer.appendChild(mensajeElement);
            });
        });
    });
});
