console.log("🔍 chat.js se está ejecutando...");

// Esperar a que Firebase esté listo antes de iniciar
document.addEventListener("firebase-load-complete", () => {
    iniciarFirebase();
});

function iniciarFirebase() {
    const auth = window.firebase.auth();
    const db = window.firebase.database();
    const storage = window.firebase.storage();

    auth.onAuthStateChanged(user => {
        if (user) {
            console.log("✅ Usuario autenticado:", user.email);
            escucharMensajes();
        } else {
            console.log("🔴 Usuario no autenticado.");
        }
    });
}

// Función de registro
function registrarUsuario() {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    window.firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(userCredential => {
            console.log("✅ Registro exitoso:", userCredential.user.email);
        })
        .catch(error => {
            console.error("🚨 Error al registrar:", error);
        });
}

// Función de login
function loginUsuario() {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    window.firebase.auth().signInWithEmailAndPassword(email, password)
        .then(userCredential => {
            console.log("✅ Login exitoso:", userCredential.user.email);
        })
        .catch(error => {
            console.error("🚨 Error en login:", error);
        });
}

// Función de logout
function logoutUsuario() {
    window.firebase.auth().signOut().then(() => {
        console.log("✅ Sesión cerrada.");
    });
}

// Función para enviar mensajes
function enviarMensaje() {
    const mensajeInput = document.getElementById("mensajeInput");
    const mensaje = mensajeInput.value.trim();
    const user = window.firebase.auth().currentUser;

    if (!user || mensaje === "") return;

    window.firebase.database().ref("chat").push({
        usuario: user.email,
        mensaje: mensaje,
        timestamp: Date.now()
    });

    mensajeInput.value = "";
}

// Escuchar mensajes en tiempo real
function escucharMensajes() {
    window.firebase.database().ref("chat").on("child_added", snapshot => {
        const datos = snapshot.val();
        const chatContainer = document.getElementById("chatContainer");

        if (!chatContainer) return;

        const mensajeElemento = document.createElement("p");
        mensajeElemento.textContent = `${datos.usuario}: ${datos.mensaje}`;
        chatContainer.appendChild(mensajeElemento);
    });
}

// Función para enviar imágenes
function enviarImagen() {
    const file = document.getElementById("imagenInput").files[0];
    const user = window.firebase.auth().currentUser;

    if (!user || !file) return;

    const storageRef = window.firebase.storage().ref(`chat-images/${Date.now()}_${file.name}`);
    storageRef.put(file).then(snapshot => {
        snapshot.ref.getDownloadURL().then(url => {
            window.firebase.database().ref("chat").push({
                usuario: user.email,
                imagen: url,
                timestamp: Date.now()
            });
        });
    });
}
