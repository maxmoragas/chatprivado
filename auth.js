document.addEventListener("DOMContentLoaded", () => {
    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            // 🔥 Si el usuario está autenticado, redirigir al chat
            window.location.href = "chat.html";
        }
    });
});

// 🔥 Función para registrar usuarios
window.registerUser = function() {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(() => {
            alert("¡Registro exitoso! Bienvenido.");
        })
        .catch((error) => {
            alert("Error: " + error.message);
        });
};

// 🔥 Función para iniciar sesión
window.loginUser = function() {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    firebase.auth().signInWithEmailAndPassword(email, password)
        .then(() => {
            alert("¡Inicio de sesión exitoso!");
        })
        .catch((error) => {
            alert("Error: " + error.message);
        });
};
