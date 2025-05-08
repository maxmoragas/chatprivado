document.addEventListener("DOMContentLoaded", function () {
    firebase.auth().onAuthStateChanged(user => {
        if (!user || !user.displayName) {
            console.error("❌ Usuario no autenticado.");
            alert("❌ Error: Usuario no definido. Cierra sesión e inicia nuevamente.");
            window.location.replace("login.html");
            return;
        }

        console.log("✅ Usuario autenticado:", user.displayName);
        const db = firebase.firestore();
        const storage = firebase.storage();
        const mensajesContainer = document.getElementById("mensajes");
        const inputMensaje = document.getElementById("mensaje");
        const botonEnviar = document.getElementById("enviar");
        const imagenInput = document.getElementById("imagenInput");

        inputMensaje.disabled = false;

        // Enviar mensaje o imagen
        botonEnviar.addEventListener("click", async () => {
            const mensajeTexto = inputMensaje.value.trim();
            const imagenSeleccionada = imagenInput.files[0];

            if (!mensajeTexto && !imagenSeleccionada) {
                alert("❌ Debes escribir un mensaje o seleccionar una imagen.");
                return;
            }

            const mensajeData = {
                usuario: user.displayName,
                mensaje: mensajeTexto || "",
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            };

            // Subir imagen si existe
            if (imagenSeleccionada) {
                console.log("📸 Imagen seleccionada:", imagenSeleccionada.name);

                const storageRef = storage.ref();
                const imagenRef = storageRef.child(`imagenes/${user.uid}/${Date.now()}_${imagenSeleccionada.name}`);

                try {
                    await imagenRef.put(imagenSeleccionada);
                    console.log("✅ Imagen subida con éxito.");
                    const imagenURL = await imagenRef.getDownloadURL();
                    mensajeData.imagenURL = imagenURL;
                } catch (error) {
                    console.error("❌ Error al subir imagen:", error.message);
                    alert("❌ Error al subir imagen: " + error.message);
                    return;
                }
            }

            // Guardar mensaje en Firestore
            try {
                await db.collection("mensajes").add(mensajeData);
                console.log("✅ Mensaje enviado correctamente:", mensajeData);
                inputMensaje.value = "";
                imagenInput.value = ""; // Limpiar la selección de imagen
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

                if (mensaje.imagenURL) {
                    const imagenElement = document.createElement("img");
                    imagenElement.src = mensaje.imagenURL;
                    imagenElement.style.maxWidth = "200px";
                    mensajesContainer.appendChild(imagenElement);
                }

                mensajesContainer.appendChild(mensajeElement);
            });
        });
    });
});
