import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { getDatabase, ref as dbRef, onValue } from "firebase/database";

const auth = getAuth();
const storage = getStorage();
const db = getDatabase();

// Manejo de autenticación y nickname
onAuthStateChanged(auth, (user) => {
  const nicknameElement = document.getElementById("nickname");
  if (user) {
    nicknameElement.textContent = user.displayName || "Usuario";
  } else {
    nicknameElement.textContent = "Invitado";
  }
});

// Carga de imágenes
document.getElementById("uploadImage").addEventListener("change", async (event) => {
  const file = event.target.files[0];
  if (file) {
    const storageRef = ref(storage, `images/${file.name}`);
    await uploadBytes(storageRef, file);
    const url = await getDownloadURL(storageRef);
    console.log("Imagen subida:", url);
  }
});

// Ver usuarios en línea
const usersOnlineRef = dbRef(db, "users_online");
onValue(usersOnlineRef, (snapshot) => {
  const usersList = document.getElementById("onlineUsers");
  usersList.innerHTML = "";
  snapshot.forEach((userSnapshot) => {
    const userData = userSnapshot.val();
    const listItem = document.createElement("li");
    listItem.textContent = userData.name;
    usersList.appendChild(listItem);
  });
});
