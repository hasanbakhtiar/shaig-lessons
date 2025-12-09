import axios from "axios";
import { useEffect, useRef, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { SocketContext } from "../context/SocketContext";
import { CurrentUserContext } from "../context/CurrentUser";

const Inbox = () => {
  const { id } = useParams();
  const [messages, setMessages] = useState([]);
  const inputRef = useRef();
  const socket = useContext(SocketContext);
  const [currentUser] = useContext(CurrentUserContext);
  useEffect(() => {
    if (currentUser?.id) {
      axios
        .get(
          `http://localhost:3000/message/user/${id}?currentUserId=${currentUser.id}`
        )
        .then((res) => {
          setMessages(res.data);
        })
        .catch((err) => console.error("Error loading messages:", err));
    }
  }, [id, currentUser?.id]);
  useEffect(() => {
    socket.on("receiveMessage", (msg) => {
      const { senderId, receiverId } = msg;
      if (senderId == id && receiverId == currentUser.id) {
        setMessages((prev) => [...prev, msg]);
      }
      if (senderId == currentUser.id && receiverId == id) {
        setMessages((prev) => [...prev, msg]);
      }
    });

    return () => socket.off("receiveMessage");
  }, [id, currentUser.id]);
  const sendMessage = async (e) => {
    e.preventDefault();

    const text = inputRef.current.value;
    if (!text.trim()) return;
    await axios.post(`http://localhost:3000/message/user/${id}`, {
      message: text,
      senderId: currentUser.id,
      receiverId: Number(id),
    });
    socket.emit("sendMessage", {
      senderId: currentUser.id,
      receiverId: Number(id),
      text,
    });

    inputRef.current.value = "";
  };
  return (
    <div>
      <h3>Chat with User {id}</h3>

      {messages.map((item, index) => (
        <p
          key={index}
          style={{
            textAlign: item.senderId == currentUser.id ? "right" : "left",
            fontWeight: item.senderId == currentUser.id ? "bold" : "normal",
            margin: "4px 0",
          }}
        >
          {item.message || item.text}
        </p>
      ))}

      <form onSubmit={sendMessage}>
        <div className="mb-3">
          <div className="form-floating">
            <textarea
              required
              ref={inputRef}
              className="form-control"
              placeholder="Message"
              style={{ height: 100 }}
            />
            <label>Message</label>
          </div>
        </div>

        <button type="submit" className="btn btn-primary">
          Send
        </button>
      </form>
    </div>
  );
};

export default Inbox;