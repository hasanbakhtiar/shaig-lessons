import axios from "axios";
import { createContext, useEffect, useState } from "react";

const userPrvId = window.prompt();
export const CurrentUserContext = createContext();
export const CurrentUserProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState([]);
    useEffect(() => {
        axios.get(`http://localhost:3000/user/${userPrvId}`)
            .then(res => setCurrentUser(res.data));
    }, [userPrvId]);
    return <CurrentUserContext.Provider value={[currentUser]}>{children}</CurrentUserContext.Provider>
}