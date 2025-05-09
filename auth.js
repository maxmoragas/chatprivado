import { getAuth, onAuthStateChanged } from "firebase/auth";

const auth = getAuth();
onAuthStateChanged(auth, (user) => {
  const nicknameElement = document.getElementById("nickname");

  if (user) {
    console.log("Usuario autenticado:", user); // Esto nos dirá qué datos tiene el usuario
    nicknameElement.textContent = user.displayName ? user.displayName : "Usuario sin nombre";
  } else {
    console.log("No hay usuario autenticado.");
    nicknameElement.textContent = "Invitado";
  }
});
