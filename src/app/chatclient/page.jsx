// ChatPage.js
'use client'
import React, { useState, useEffect, useRef } from 'react';
import { socket } from '@/utils/sockets';
import observerChat from '@/utils/observerChat';

export default function ChatPage() {
  const viewchatRef = useRef(null);
  const userListRef = useRef(null);
  const inputRef = useRef(null);
  const [topic, setTopic] = useState('');

  useEffect(() => {
    const viewchatElement = viewchatRef.current;
    const userListElement = userListRef.current;
    const inputElement = inputRef.current;

    const observador = new observerChat(viewchatElement, userListElement, inputElement, setTopic);
    socket.addObserver(observador);

    return () => {
      socket.removeObserver(observador);
    };
  }, []);

  const handleOnClick = function(e) {
    socket.addSocket('181.167.128.66:46579');
  }

  const handleSendMessage = () => {
    const inputElement = inputRef.current;

    if (inputElement.value.trim() !== '') {
      // Enviamos el mensaje utilizando el método sendMessage de la clase Socket
      socket.sendMessage(inputElement.value);

      // Limpiamos el campo de entrada después de enviar el mensaje
      inputElement.value = '';
    }
  };

  return (
    <main className="flex flex-col justify-center items-center w-full h-full">
      <h1>Chat</h1> 
      <button className="border-black border-2 p-2 m-7" onClick={handleOnClick}>Conectar Test</button>
      <div name="topic" className="w-full border-black border-2">
          {topic}
        </div>
        <section className="w-full h-[70vh] flex">

      <div name="viewchat" ref={viewchatRef} className="ml-5 w-[79vw] h-[70vh]  border-black border-4 bg-slate-100 overflow-y-auto text-black pl-3">
      </div>
      <div name="userList" ref={userListRef} className="w-[20vw] h-[70vh] border-black border-4 bg-slate-100 overflow-y-auto text-black pl-3">
      </div>
        </section>

      <div name="inputSection" className="flex w-full">
        <input name="input" ref={inputRef} type="text" className="ml-5 w-[79vw] border-black border-2 p-2" placeholder="Escribe tu mensaje..." />
        <button onClick={handleSendMessage} className="w-[20vw] border-black border-2 p-2">Enviar</button>
      </div>
    </main>
  );
}

