import { useEffect, useState } from "react";
// import "./App.css";
import io from "socket.io-client";
const socket = io.connect("http://localhost:3001");
function  SocketConnecion() {
  const [message, setMessage] = useState("");
  const [receiveMessage, setReceiveMessage] = useState("");
  const [room, setRoom] = useState("");
  function sendMessage() {
    socket.emit("send_message", { message, room });
  }
  function joinRoom() {
    socket.emit("join_room", room);
  }
  useEffect(() => {
    socket.on("receive_message", (data) => {
      console.log(data);
      setReceiveMessage(data.message);
    });
  }, [socket]);
  return (
    <>
      <input
        placeholder="Enter room number"
        onChange={(e) => {
          setRoom(e.target.value);
        }}
      />
      <button onClick={joinRoom}>set room</button>
      <input
        placeholder="message..."
        onChange={(e) => {
          setMessage(e.target.value);
        }}
      />
      <button onClick={sendMessage}>send message</button>
      <h1> {receiveMessage} </h1>
    </>
  );
}

export default SocketConnecion;
