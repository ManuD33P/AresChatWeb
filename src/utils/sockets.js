// sockets.js
import { Login } from "./login";

class Socket {
  constructor() {
    this.sockets = [];
    this.observers = [];
  }

  addObserver(observer) {
    this.observers.push(observer);
  }

  removeObserver(observer) {
    const index = this.observers.indexOf(observer);
    if (index !== -1) {
      this.observers.splice(index, 1);
    }
  }

  notifyObservers(eventType, socket, eventData) {
    this.observers.forEach(observer => {
      if (observer[eventType] && typeof observer[eventType] === 'function') {
        observer[eventType](socket, eventData);
      }
    });
  }

  addSocket(url) {
    const io = new WebSocket(`ws://${url}`);
    this.sockets.push(io);

    io.onopen = (event) => {
      this.handleOpen(io, event);
      this.notifyObservers('onOpen', io, event);
    };

    io.onmessage = (event) => {
      this.handleMessage(io, event);
      this.notifyObservers('onMessage', io, event);
    };

    io.onclose = (event) => {
      this.handleClose(io, event);
      this.notifyObservers('onClose', io, event);
    };

    io.onerror = (event) => {
      this.handleError(io, event);
      this.notifyObservers('onError', io, event);
    };
  }

  
  sendMessage(message) {
    // Asumiendo que ya tienes un socket abierto, de lo contrario, puedes manejarlo según tu implementación
    const socket = this.sockets[0]; // Suponiendo que solo hay un socket, ajusta según tu lógica

    if (socket.readyState === WebSocket.OPEN) {
      // Enviamos el mensaje con el formato adecuado
      const formattedMessage = `PUBLIC:${message}`;
      socket.send(formattedMessage);
    } else {
      console.error('El socket no está abierto.');
    }
  }
  // Evento de apertura de la conexión
  handleOpen(socket, event) {
    console.log(`Conexión establecida para socket ${this.sockets.indexOf(socket)}`);
    const login = Login(null, 100, "Ares Web ManuDeev", "/default.png");
    socket.send(login);
  }

  // Evento de recepción de mensaje
  handleMessage(socket, event) {
    console.log(`Mensaje recibido en socket ${this.sockets.indexOf(socket)}:`, event.data);
  }

  // Evento de cierre de la conexión
  handleClose(socket, event) {
    console.log(`Conexión cerrada para socket ${this.sockets.indexOf(socket)}`);
    // Eliminar el socket del arreglo si es necesario
    const index = this.sockets.indexOf(socket);
    if (index !== -1) {
      this.sockets.splice(index, 1);
    }
  }

  // Evento de error en la conexión
  handleError(socket, event) {
    console.error(`Error en socket ${this.sockets.indexOf(socket)}:`, event);
  }
}

export const socket = new Socket();
