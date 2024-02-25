

export function handlePacket(packet){
    const splitPacket = packet.split(':');
    const event = splitPacket[0];
    const count = splitPacket[1].split(",")
    const args = splitPacket[2];

    console.log(event,count,args);
}


export function PacketController(event,count,args){

    switch(event){
        case 'NOSUCH' || 'PUBLIC':
            /* aca van mensajes para el viewchat*/
        break;

        case 'TOPIC_FIRST':
            /* aca va el mensaje del topic */
        break;

        case 'USERLIST':
            /* LISTA DE USUARIOS. */ 
        break;

        case 'USERLIST_END':
            /* INDICA EL FINAL DE LA LISTA DE USUARIO */
        break;
    }
}