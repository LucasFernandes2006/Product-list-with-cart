import React, { useState } from "react";
import '../pageStyle/DoceAI.css'
import { Link } from 'react-router-dom'

import LogoAI from '../assets/images/DoceAI_logo.png'

type Message = {
  role: "Você" | "DoceAI";
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
    setMessages(prev => [...prev, { role: "Você", content: text }]);

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
  <Link to="/mainScreen" className="link-home">
    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="#e66842" className="bi bi-arrow-left-circle-fill" viewBox="0 0 16 16">
      <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0m3.5 7.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5z"/>
    </svg>
  </Link>

    <img src={LogoAI} className="logo-ai" />
    <h1 className="doceai-title">Converse com a DoceAI</h1>

    <div className="messages-area">
      {messages.map((msg, idx) => (
        <div
          key={idx}
          className={
            "message " + (msg.role === "Você" ? "message-you" : "message-ai")
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
