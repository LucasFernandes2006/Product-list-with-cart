import React, { useState } from "react";
import '../pageStyle/DoceAI.css'

import LogoAI from '../assets/images/DoceAI_logo.png'

type Message = {
  role: "You" | "DoceAI";
  content: string;
};

export default function DoceAI() {
  const [text, setText] = useState<string>("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  async function sendMessage(e: React.FormEvent) {
    e.preventDefault();

    if (!text.trim()) return;

    setLoading(true);
    setText("");

    // adiciona mensagem do usuário
    setMessages(prev => [...prev, { role: "You", content: text }]);

    try {
      const res = await fetch("http://localhost:5001/doceAI", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: text }),
      });

      const data = await res.json();

      // adiciona mensagem da IA
      setMessages(prev => [
        ...prev,
        { role: "DoceAI", content: data.reply }
      ]);

    } catch (err) {
      console.error("Erro na IA", err);
    }

    
    setLoading(false);
  }

  return (
    <div className="doceai-container">

    <img src={LogoAI} className="logo-ai" />
    <h1 className="doceai-title">Converse com a DoceAI</h1>

    <div className="messages-area">
      {messages.map((msg, idx) => (
        <div
          key={idx}
          className={
            "message " + (msg.role === "You" ? "message-you" : "message-ai")
          }
        >
          <strong>{msg.role}: </strong> {msg.content}
        </div>
      ))}
    </div>

    {loading && <p className="loading">Carregando...</p>}

    <form className="chat-form" onSubmit={sendMessage}>
      <input
        type="text"
        placeholder="Digite sua mensagem"
        onChange={(e) => setText(e.target.value)}
        value={text}
      />
      <button type="submit">Enviar</button>
    </form>

  </div>
  );
}
