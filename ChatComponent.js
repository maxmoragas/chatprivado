import { useEffect, useState } from "react";
import { recibirMensajes, enviarMensaje } from "./chat";

const ChatComponent = () => {
  const [mensajes, setMensajes] = useState([]);
  const [nuevoMensaje, setNuevoMensaje] = useState("");

  // Escuchar mensajes en tiempo real
  useEffect(() => {
    recibirMensajes(setMensajes);
  }, []);

  // Función para enviar un mensaje
  const handleEnviarMensaje = () => {
    if (nuevoMensaje.trim() !== "") {
      enviarMensaje(nuevoMensaje, "UsuarioPrueba"); // Puedes cambiar "UsuarioPrueba" por el usuario real
      setNuevoMensaje(""); // Limpiar el campo después de enviar el mensaje
    }
  };

  return (
    <div>
      <h2>Chat en Vivo</h2>
      <div>
        {mensajes.map((msg, index) => (
          <p key={index}><strong>{msg.usuario}:</strong> {msg.texto}</p>
        ))}
      </div>
      <input
        type="text"
        value={nuevoMensaje}
        onChange={(e) => setNuevoMensaje(e.target.value)}
        placeholder="Escribe tu mensaje..."
      />
      <button onClick={handleEnviarMensaje}>Enviar</button>
    </div>
  );
};

export default ChatComponent;
