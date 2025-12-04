import { useEffect, useState, useContext } from "react";
import { Col } from "react-bootstrap";
import axios from 'axios';
import { Link } from "react-router-dom";
import { SocketContext } from "../context/SocketContext";
import { CurrentUserContext } from "../context/CurrentUser";

const Messages = () => {
    const [users, setUsers] = useState([]);
    const [lastMessage, setLastMessage] = useState({});
    const socket = useContext(SocketContext);
    const [user] = useContext(CurrentUserContext);

    useEffect(() => {
        axios.get('http://localhost:3000/user')
            .then(res => setUsers(res.data));
    }, []);

    // 🔥 Real-time yeni mesaj gəldikdə istifadəçi yanında son mesajı göstərmək
    useEffect(() => {
        socket.on("receiveMessage", (msg) => {
            const { senderId, receiverId, text } = msg;

            // Mesaj mənə gəlibsə → senderId qarşı tərəfdir
            if (receiverId === user.id) {
                setLastMessage(prev => ({
                    ...prev,
                    [senderId]: text
                }));
            }

            // Mesajı mən göndərmişəmsə → receiverId qarşı tərəfdir
            if (senderId === user.id) {
                setLastMessage(prev => ({
                    ...prev,
                    [receiverId]: text
                }));
            }
        });

        return () => socket.off("receiveMessage");
    }, [socket, user.id]);

    return (
        <div className="d-flex align-items-center justify-content-center flex-column my-5">
            <h1>Users</h1>
            <Col md={5}>
                <ul className="list-group">
                    {users.map((item) => (
                        item.id === user.id ? "" :
                            <Link
                                to={`/${item.id}`}
                                key={item.id}
                                className="list-group-item d-flex justify-content-between"
                            >
                                {item.fullname}

                                {/* 🔥 Real-time son mesaj badge */}
                                {lastMessage[item.id] && (
                                    <span className="badge bg-success">
                                        {lastMessage[item.id].slice(0, 12)}...
                                    </span>
                                )}
                            </Link>
                    ))}
                </ul>
            </Col>
        </div>
    );
};

export default Messages;
