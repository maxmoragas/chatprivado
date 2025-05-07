let usersOnline = [];
let currentNickname = localStorage.getItem("nickname");

// Verificar autenticación antes de entrar al chat
if (!currentNickname) {
    window.location.href = "login.html"; // Redirigir si no está autenticado
} else {
    document.getElementById("nickname").innerText = currentNickname;
    usersOnline.push(currentNickname);
    updateUsers();
}

function updateUsers() {
    document.getElementById("users").innerHTML = "Usuarios en línea: " + usersOnline.join(", ");
}

function sendMessage(event) {
    if (event.key === "Enter") {
        sendMessageManual();
    }
}

function sendMessageManual() {
    let message = document.getElementById("input").value.trim();
    
    if (currentNickname !== "" && message !== "") {
        document.getElementById("chat").innerHTML += `<p><strong>${currentNickname}:</strong> ${message}</p>`;
        document.getElementById("input").value = "";
    }
}

function logout() {
    localStorage.removeItem("nickname");
    window.location.href = "login.html"; // Redirigir al login
}
