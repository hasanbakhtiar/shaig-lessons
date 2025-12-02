import { useEffect, useState, useContext } from "react";
import { Col } from "react-bootstrap";
import axios from 'axios';
import { Link } from "react-router-dom";
import { SocketContext } from "../context/SocketContext";

const Messages = () => {
    const [users, setUsers] = useState([]);
    const [lastMessage, setLastMessage] = useState({});
    const socket = useContext(SocketContext);

    useEffect(() => {
        axios.get('http://localhost:3000/user')
            .then(res => setUsers(res.data));
    }, []);

    // 🔥 Real-time yeni mesaj gəldikdə istifadəçi yanında göstərmək
    useEffect(() => {
        socket.on("receiveMessage", (msg) => {
            setLastMessage(prev => ({
                ...prev,
                [msg.userId]: msg.text   // hər user-in son mesajı
            }));
        });

        return () => socket.off("receiveMessage");
    }, []);

    return (
        <div className="d-flex align-items-center justify-content-center flex-column my-5">
            <h1>Users</h1>
            <Col md={5}>
                <ul className="list-group">
                    {users.map((user) => (
                        <Link
                            to={`/${user.id}`}
                            key={user.id}
                            className="list-group-item d-flex justify-content-between"
                        >
                            {user.fullname}

                            {/* 🔥 Real-time badge */}
                            {lastMessage[user.id] && (
                                <span className="badge bg-success">
                                    {lastMessage[user.id].slice(0, 12)}...
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
