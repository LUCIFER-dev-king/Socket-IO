import "./App.css";
import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import { nanoid } from "nanoid";

const socket = io.connect("http://localhost:5000");
const username = nanoid(4);

function App() {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);

  const sendChart = (e) => {
    e.preventDefault();
    socket.emit("chat", { message, username });
    setMessage("");
  };

  useEffect(() => {
    socket.on("chat", (payload) => {
      setChat([...chat, payload]);
    });
  });

  return (
    <div className='App'>
      <header className='App-header'>
        <h1>Socket IO Chat</h1>
        {chat.map((payload, id) => {
          return (
            <p key={id}>
              {payload.message}: <span>id: {payload.username}</span>
            </p>
          );
        })}
        <form onSubmit={sendChart}>
          <input
            type='text'
            name='chat'
            placeholde='send text'
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          ></input>
          <button type='submit'>Send</button>
        </form>
      </header>
    </div>
  );
}

export default App;
