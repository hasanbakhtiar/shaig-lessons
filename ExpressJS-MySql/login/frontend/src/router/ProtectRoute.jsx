import axios from "axios";
import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        // Qorunan yola daxil olmaq üçün cəhd edirik
        await axios.get("http://localhost:3000/product");
        setAuthenticated(true);  // Əgər müvəffəqiyyətlidirsə, istifadəçi autentifikasiya olunub
      } catch (err) {
        if (err.response?.status === 401) {
          // Əgər tokenin müddəti bitibsə, refresh token ilə yeniləməyə cəhd edirik
          try {
            await axios.get("http://localhost:3000/product");  // Yenidən qorunan yola daxil oluruq
            setAuthenticated(true);  // Əgər yenidən müvəffəqiyyətlidirsə, istifadəçi autentifikasiya olunub
          } catch (refreshErr) {
            setAuthenticated(false);  // Əgər refresh token ilə yeniləmə müvəffəqiyyətsiz oldu, istifadəçi autentifikasiya olunmayıb
          }
        } else {
          setAuthenticated(false);  // Başqa bir xəta varsa, istifadəçi autentifikasiya olunmayıb
        }
      } finally {
        setLoading(false);  // Yoxlama başa çatdıqda loading vəziyyətini dayandırırıq
      }
    };

    checkAuth();  // Yoxlama prosesi komponent mount olduqda işə düşür
  }, []);  // Burada boş dependency array var, yəni yalnız bir dəfə işə düşəcək

  if (loading) return <p>Yüklənir...</p>;  // Yoxlama gedərkən loading mesajı göstəririk

  // Əgər istifadəçi autentifikasiya olunmayıbsa, onu login səhifəsinə yönləndiririk
  if (!authenticated) return <Navigate to="/" replace />;


  // Əgər istifadəçi autentifikasiya olunubsa, qorunan məzmunu (children) göstəririk
  return children;
};

export default ProtectedRoute;
