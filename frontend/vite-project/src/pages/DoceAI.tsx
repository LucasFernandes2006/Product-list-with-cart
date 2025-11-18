import React, { useState } from "react";
import '../pageStyle/App.css'

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

    setText("");
    setLoading(false);
  }

  return (
    <div>
      <div>
        {messages.map((msg, idx) => (
          <div key={idx}>
            <strong>{msg.role}: </strong> {msg.content}
          </div>
        ))}
      </div>

      {loading && <p>Loading...</p>}

      <form onSubmit={sendMessage}>
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
