document.addEventListener("DOMContentLoaded", () => {
    if (typeof firebase === "undefined") {
        console.error("🚨 Firebase NO se ha cargado correctamente.");
        return;
    }

    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            window.location.href = "chat.html"; // 🔥 Redirigir al chat si el usuario está autenticado
        }
    });
});

window.registerUser = function() {
    const nickname = document.getElementById("nickname").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    if (!window.auth) {
        console.error("🚨 Firebase NO está inicializado correctamente.");
        return;
    }

    firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            firebase.database().ref("users/" + user.uid).set({
                nickname: nickname,
                email: email
            });
            localStorage.setItem("nickname", nickname);
            alert("¡Registro exitoso! Bienvenido, " + nickname);
        })
        .catch((error) => {
            alert("Error: " + error.message);
        });
};

window.loginUser = function() {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    if (!window.auth) {
        console.error("🚨 Firebase NO está inicializado correctamente.");
        return;
    }

    firebase.auth().signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            firebase.database().ref("users/" + userCredential.user.uid).once("value").then((snapshot) => {
                localStorage.setItem("nickname", snapshot.val().nickname);
            });
            alert("¡Inicio de sesión exitoso!");
        })
        .catch((error) => {
            alert("Error: " + error.message);
        });
};
