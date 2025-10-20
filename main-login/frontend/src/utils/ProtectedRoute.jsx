import { useEffect, useState } from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const [authorized, setAuthorized] = useState(null);

  useEffect(() => {
    axios.get("http://localhost:3000/check-auth",{ withCredentials: true })
      .then(() => setAuthorized(true))
      .catch(() => setAuthorized(false));
  }, []);

  if (authorized === null) return <div>Loading...</div>;
  if (authorized === false) return <Navigate to="/" />;
  return children;
}
