import axios from "axios";
import { useEffect, useRef, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { SocketContext } from "../context/SocketContext";

const Inbox = () => {
    const { id } = useParams();
    const [messages, setMessages] = useState([]);
    const inputRef = useRef();
    const socket = useContext(SocketContext);

    // 1️⃣ İlk load – DB-dən mesajları gətir
    useEffect(() => {
        axios.get(`http://localhost:3000/message/user/${id}`)
            .then(res => setMessages(res.data));
    }, [id]);

    // 2️⃣ Real-time yeni mesaj dinləmə
    useEffect(() => {
        socket.on("receiveMessage", (msg) => {
            if (msg.userId == id) {
                setMessages(prev => [...prev, msg]);
            }
        });

        return () => socket.off("receiveMessage");
    }, [id]);

    // 3️⃣ Mesaj göndərmə (DB + socket)
    const sendMessage = (e) => {
        e.preventDefault();

        const text = inputRef.current.value;

        // DB-yə yaz
        axios.post(`http://localhost:3000/message/user/${id}`, {
            message: text
        });

        // Real-time socket mesajı
        socket.emit("sendMessage", {
            userId: id,
            text
        });

        inputRef.current.value = ""; // input sıfırlansın
    };

    return (
        <div>
            <h3>Chat – User {id}</h3>
            {messages.map((item, index) => (
                <p key={index}>{item.message || item.text}</p>
            ))}

            <form onSubmit={sendMessage}>
                <div className="mb-3">
                    <div className="form-floating">
                        <textarea
                            required
                            ref={inputRef}
                            className="form-control"
                            placeholder="Message"
                            id="floatingTextarea2"
                            style={{ height: 100 }}
                        />
                        <label htmlFor="floatingTextarea2">Message</label>
                    </div>
                </div>

                <button type="submit" className="btn btn-primary">send</button>
            </form>
        </div>
    );
};

export default Inbox;
