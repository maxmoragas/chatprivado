document.addEventListener("DOMContentLoaded", () => {
    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            window.location.href = "chat.html"; // 🔥 Redirigir al chat si el usuario está autenticado
        }
    });
});

// 🔥 Función para registrar usuarios con nickname
window.registerUser = function() {
    const nickname = document.getElementById("nickname").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            firebase.database().ref("users/" + user.uid).set({
                nickname: nickname,
                email: email
            });
            alert("¡Registro exitoso! Bienvenido, " + nickname);
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
