import React, { useEffect, useState } from "react";
import { useReactAuth } from "../../contexts/hooks/AuthContext";
import Echo from "../../config/websockets";
import api from "../../config/api";

export default function Messages() {
  const { user } = useReactAuth();
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    async function getMessages() {
      setLoading(true);

      const { data } = await api.get("/api/message");

      setMessages(data);

      setLoading(false);
    }

    getMessages();
  }, []);

  useEffect(() => {
    Echo.private(`new.message.${user.id}`).listen("NewMessage", (data) => {
      setMessages((prevState) => [...prevState, data]);
    });
  }, [user.id]);

  if (loading) {
    return <h1>Loading ...</h1>;
  }

  return (
    <>
      <h1>Messages</h1>
      <ul>
        {messages.map((item, index) => (
          <li key={index}>{item.body}</li>
        ))}
      </ul>
    </>
  );
}
