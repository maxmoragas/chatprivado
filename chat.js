document.addEventListener("DOMContentLoaded", async function () {
    firebase.auth().onAuthStateChanged(user => {
        if (!user) {
            console.error("❌ No hay usuario autenticado.");
            window.location.replace("login.html");
            return;
        }

        console.log("✅ Usuario autenticado:", user.displayName || user.email);

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

        // Mostrar usuarios conectados en tiempo real
        const usuariosList = document.getElementById("listaUsuarios");
        db.collection("users").where("online", "==", true).onSnapshot(snapshot => {
            usuariosList.innerHTML = "";
            snapshot.docs.forEach(doc => {
                const usuario = doc.data();
                const listItem = document.createElement("li");
                listItem.textContent = usuario.nickname || usuario.email;
                usuariosList.appendChild(listItem);
            });
        });

        // Enviar mensaje
        botonEnviar.addEventListener("click", async () => {
            const mensajeTexto = inputMensaje.value.trim();
            if (!mensajeTexto) {
                alert("❌ No puedes enviar un mensaje vacío.");
                return;
            }

            const mensajeData = {
                usuario: user.displayName || user.email,
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

        // Mostrar mensajes en tiempo real
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
