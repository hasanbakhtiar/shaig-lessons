import axios from "axios";
import { useEffect, useRef, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { SocketContext } from "../context/SocketContext";
import { CurrentUserContext } from "../context/CurrentUser";

const Inbox = () => {
    const { id } = useParams();                  // qarşı tərəfin userId-si
    const [messages, setMessages] = useState([]);
    const inputRef = useRef();
    const socket = useContext(SocketContext);
    const [currentUser] = useContext(CurrentUserContext);  // login olan user

    // 1️⃣ Keçmiş mesajları DB-dən gətir
    useEffect(() => {
        axios.get(`http://localhost:3000/message/user/${id}`)
            .then(res => console.log(res.data));
    }, [id]);

    // 2️⃣ Real-time gələn mesajlar
    useEffect(() => {
        socket.on("receiveMessage", (msg) => {
            const { senderId, receiverId } = msg;

            // Qarşı tərəf mənə yazıbsa
            if (senderId == id && receiverId == currentUser.id) {
                setMessages(prev => [...prev, msg]);
            }

            // Mən qarşı tərəfə göndərmişəmsə
            if (senderId == currentUser.id && receiverId == id) {
                setMessages(prev => [...prev, msg]);
            }
        });

        return () => socket.off("receiveMessage");
    }, [id, currentUser.id]);

    // 3️⃣ Mesaj göndərmə
    const sendMessage = async (e) => {
        e.preventDefault();

        const text = inputRef.current.value;
        if (!text.trim()) return;

        // DB-yə yaz (senderId DB-də müəyyən ediləcək)
        await axios.post(`http://localhost:3000/message/user/${id}`, {
            message: text,
            senderId: currentUser.id,
            receiverId: Number(id),
        });

        // Real-time socket mesajı
        socket.emit("sendMessage", {
            senderId: currentUser.id,
            receiverId: Number(id),
            text
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
                        textAlign:
                            item.senderId == currentUser.id ? "right" : "left",
                        fontWeight:
                            item.senderId == currentUser.id ? "bold" : "normal",
                        margin: "4px 0"
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
