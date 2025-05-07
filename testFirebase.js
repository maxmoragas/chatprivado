import { db } from "./firebaseConfig.js";
import { collection, getDocs } from "firebase/firestore";

const testConexion = async () => {
  try {
    console.log("🔍 Probando conexión con Firebase...");
    const querySnapshot = await getDocs(collection(db, "mensajes"));
    console.log("✅ Conexión exitosa. Mensajes en Firebase:");
    querySnapshot.forEach(doc => console.log(doc.data()));
  } catch (error) {
    console.error("❌ Error al conectar con Firebase:", error);
  }
};

testConexion();
