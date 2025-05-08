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

        if (!imagenInput) {
            console.error("❌ Error: No se encontró el elemento 'imagenInput' en el DOM.");
            alert("❌ Error: No se encontró el campo para seleccionar imágenes.");
            return;
        }

        // Enviar mensaje o imagen
        botonEnviar.addEventListener("click", async () => {
            const mensajeTexto = inputMensaje.value.trim();
            const imagenSeleccionada = imagenInput.files.length > 0 ? imagenInput.files[0] : null;

            if (!mensajeTexto && !imagenSeleccionada) {
                alert("❌ Debes escribir un mensaje o seleccionar una imagen.");
                return;
            }

            const mensajeData = {
                usuario: firebase.auth().currentUser.displayName,
                mensaje: mensajeTexto || "",
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            };

            try {
                // Subir imagen si existe
                if (imagenSeleccionada) {
                    console.log("📸 Subiendo imagen:", imagenSeleccionada.name);

                    const storageRef = storage.ref();
                    const imagenRef = storageRef.child(`imagenes/${firebase.auth().currentUser.uid}/${Date.now()}_${imagenSeleccionada.name}`);

                    await imagenRef.put(imagenSeleccionada);
                    console.log("✅ Imagen subida con éxito.");
                    
                    const imagenURL = await imagenRef.getDownloadURL();
                    mensajeData.imagenURL = imagenURL;
                }

                // Guardar mensaje en Firestore
                await db.collection("mensajes").add(mensajeData);
                console.log("✅ Mensaje enviado correctamente:", mensajeData);
                
                inputMensaje.value = "";
                imagenInput.value = ""; 

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
