let usersOnline = [];
let currentNickname = "";

// Función para registrar usuarios
function register() {
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    let nickname = document.getElementById("nickname").value;

    registerUser(email, password, nickname);
}

// Función para iniciar sesión y recuperar el nickname
async function login() {
    let email = document.getElementById("loginEmail").value;
    let password = document.getElementById("loginPassword").value;
    
    currentNickname = await loginUser(email, password);
    if (currentNickname !== "" && !usersOnline.includes(currentNickname)) {
        usersOnline.push(currentNickname);
        updateUsers();
    }
}

// Función para actualizar la lista de usuarios en línea
function updateUsers() {
    document.getElementById("users").innerHTML = "Usuarios en línea: " + usersOnline.join(", ");
}

// Función para enviar mensajes con "Enter"
function sendMessage(event) {
    if (event.key === "Enter") {
        sendMessageManual();
    }
}

// Función para enviar mensajes manualmente con botón
function sendMessageManual() {
    let message = document.getElementById("input").value.trim();
    
    if (currentNickname !== "" && message !== "") {
        document.getElementById("chat").innerHTML += `<p><strong>${currentNickname}:</strong> ${message}</p>`;
        document.getElementById("input").value = "";
    }
}
