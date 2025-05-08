// 🔥 Importación de Firebase como módulo
import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore, collection, addDoc, orderBy, query, onSnapshot } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

// ✅ Configuración de Firebase
const firebaseConfig = {
    apiKey: "AIzaSyCalxt34jrPFP9VJM5yBFA4BRF2U1_XiZw",
    authDomain: "michatprivado-f704a.firebaseapp.com",
    projectId: "michatprivado-f704a",
    storageBucket: "michatprivado-f704a.appspot.com",
    messagingSenderId: "187774286181",
    appId: "1:187774286181:web:95fc9391a64d3d244e498c"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

document.addEventListener("DOMContentLoaded", function () {
    onAuthStateChanged(auth, user => {
        if (!user || !user.displayName) {
            console.error("❌ Usuario no autenticado.");
            alert("❌ Error: Usuario no definido. Cierra sesión e inicia nuevamente.");
            window.location.replace("login.html");
            return;
        }

        console.log("✅ Usuario autenticado:", user.displayName);
        const mensajesContainer = document.getElementById("mensajes");
        const inputMensaje = document.getElementById("mensaje");
        const botonEnviar = document.getElementById("enviar");
        const imagenInput = document.getElementById("imagenInput");

        if (!imagenInput) {
            console.error("❌ Error: No se encontró el campo para seleccionar imágenes.");
            alert("❌ Error: No se encontró el campo para seleccionar imágenes.");
            return;
        }

        botonEnviar.addEventListener("click", async () => {
            const mensajeTexto = inputMensaje.value.trim();
            const imagenSeleccionada = imagenInput.files.length > 0 ? imagenInput.files[0] : null;

            if (!mensajeTexto && !imagenSeleccionada) {
                alert("❌ Debes escribir un mensaje o seleccionar una imagen.");
                return;
            }

            const mensajeData = {
                usuario: user.displayName,
                mensaje: mensajeTexto || "",
                timestamp: new Date()
            };

            try {
                if (imagenSeleccionada) {
                    console.log("📸 Subiendo imagen:", imagenSeleccionada.name);
                    const imagenRef = ref(storage, `imagenes/${user.uid}/${Date.now()}_${imagenSeleccionada.name}`);
                    await uploadBytes(imagenRef, imagenSeleccionada);
                    console.log("✅ Imagen subida con éxito.");
                    const imagenURL = await getDownloadURL(imagenRef);
                    mensajeData.imagenURL = imagenURL;
                }

                await addDoc(collection(db, "mensajes"), mensajeData);
                console.log("✅ Mensaje enviado correctamente:", mensajeData);

                inputMensaje.value = "";
                imagenInput.value = "";

            } catch (error) {
                console.error("❌ Error al enviar mensaje:", error.message);
                alert("❌ Error al enviar mensaje: " + error.message);
            }
        });

        const mensajesQuery = query(collection(db, "mensajes"), orderBy("timestamp", "asc"));
        onSnapshot(mensajesQuery, snapshot => {
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
