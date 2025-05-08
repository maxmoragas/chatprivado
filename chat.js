document.addEventListener("DOMContentLoaded", async function () {
    firebase.auth().onAuthStateChanged(user => {
        if (!user) {
            console.error("❌ No hay usuario autenticado.");
            window.location.replace("login.html");
            return;
        }

        console.log("✅ Usuario autenticado:", user.displayName);

        if (!firebase.firestore) {
            console.error("❌ Firebase no se cargó correctamente.");
            alert("❌ Error al cargar Firebase, verifica tu configuración.");
            return;
        }

        const db = firebase.firestore();
        const mensajesContainer = document.getElementById("mensajes");
        const inputMensaje = document.getElementById("mensaje");
        const inputImagen = document.getElementById("imagen");
        const botonEnviar = document.getElementById("enviar");

        inputMensaje.disabled = false; // 🔥 Habilitar el cuadro de texto correctamente

        // Mostrar usuarios conectados en tiempo real
        const usuariosList = document.getElementById("listaUsuarios");
        db.collection("users").where("online", "==", true).onSnapshot(snapshot => {
            usuariosList.innerHTML = "";
            snapshot.docs.forEach(doc => {
                const usuario = doc.data();
                const listItem = document.createElement("li");
                listItem.textContent = usuario.nickname;
                usuariosList.appendChild(listItem);
            });
        });

        // Enviar mensaje
        botonEnviar.addEventListener("click", async () => {
            const mensajeTexto = inputMensaje.value.trim();
            const imagenArchivo = inputImagen.files[0];

            if (!mensajeTexto && !imagenArchivo) return;

            const mensajeData = {
                usuario: user.displayName,
                mensaje: mensajeTexto,
                timestamp: new Date(),
            };

            if (imagenArchivo) {
                const storageRef = firebase.storage().ref(`imagenes/${imagenArchivo.name}`);
                await storageRef.put(imagenArchivo);
                const imagenURL = await storageRef.getDownloadURL();
                mensajeData.imagen = imagenURL;
            }

            await db.collection("mensajes").add(mensajeData);
            inputMensaje.value = "";
            inputImagen.value = "";
        });

        // Mostrar mensajes en tiempo real
        db.collection("mensajes").orderBy("timestamp", "asc").onSnapshot(snapshot => {
            mensajesContainer.innerHTML = "";
            snapshot.docs.forEach(doc => {
                const mensaje = doc.data();
                const mensajeElement = document.createElement("div");
                mensajeElement.innerHTML = `<b>${mensaje.usuario}:</b> ${mensaje.mensaje || ""}`;
                if (mensaje.imagen) {
                    const imagenElement = document.createElement("img");
                    imagenElement.src = mensaje.imagen;
                    imagenElement.style.maxWidth = "200px";
                    mensajeElement.appendChild(imagenElement);
                }
                mensajesContainer.appendChild(mensajeElement);
            });
        });
    });
});
