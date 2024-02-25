// ObservadorChat.js
// ObservadorChat.js
class ObservadorChat {
  constructor(viewchatElement, userListElement, inputElement, setTopic) {
    this.viewchatElement = viewchatElement;
    this.userListElement = userListElement;
    this.inputElement = inputElement;
    this.setTopic = setTopic;
    this.userList = [];
  }

  onMessage(socket, event) {
    const message = event.data;
    const splitPacket = message.split(':');
    const packetEvent = splitPacket[0];
    const count = splitPacket[1].split(',');
    const args = splitPacket[2];

    switch (packetEvent) {
      case 'NOSUCH':
        this.updateViewChat(args);
        break;

      case 'PUBLIC':
        // Si el evento es 'PUBLIC', manejarlo de manera diferente
        this.handlePublicEvent(args, count);
        break;

      case 'TOPIC_FIRST':
        this.updateTopic(args);
        break;
      case 'JOIN':
      case 'USERLIST':
        this.updateUserList(args,count);
        break;

      case 'USERLIST_END':
        // No es necesario hacer nada aquí, podría ser utilizado para alguna lógica de finalización de lista.
        break;

      default:
        // Otros eventos, si es necesario manejarlos.
        break;
    }
  }
  handlePublicEvent(args, count) {
    // Verifica si count es un array y tiene al menos un elemento
    if (Array.isArray(count) && count.length >= 1) {
      const nickLength = parseInt(count[0], 10);
      const nick = args.substring(0, nickLength);
      const message = args.substring(nickLength);

      // Formatea el mensaje para 'nick > message'
      const formattedMessage = `${nick} > ${message}`;

      this.updateViewChat(formattedMessage);
    } else {
      // Si count no es un array o no tiene al menos un elemento, simplemente actualiza el viewchat con args
      this.updateViewChat(args);
    }
  }

  updateViewChat(message,type) {
    this.viewchatElement.innerText += `\n${message}`;
  }

  updateTopic(newTopic) {
    this.setTopic(newTopic);
  }

  updateUserList(args, count) {
    const nickLength = parseInt(count[0], 10);
    const nick = args.substring(0, nickLength);
    const privilegeLevel = args.charAt(nickLength);

    const userEntry = `${nick} (Nivel: ${privilegeLevel})`;

    // Agregamos la entrada del usuario a la lista
    this.userList.push(userEntry);

    // Actualizamos el elemento con toda la lista
    this.userListElement.innerText = this.userList.join('\n');
  }
}

export default ObservadorChat;

  