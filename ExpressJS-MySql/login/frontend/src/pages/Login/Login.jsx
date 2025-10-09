import React, { useRef, useState } from "react";
import BirsaytLogo from "../../assets/images/BirsaytLogo.png";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "./_Login.scss";
import axios from "axios";

const Login = () => {
  const emailRef = useRef();
  const passwordRef = useRef();

  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await axios.post(
        `http://localhost:3000/login`,
        {
          email: emailRef.current.value,
          password: passwordRef.current.value,
        },
      );
      console.log(response);
      
      if (response.status === 200) {
        
        toast.success(response.data.message);
        navigate("/dashboard");
      } else {
        toast.error(response.data.data.message );
      }
    } catch (error) {
      if (error.response?.data?.message) {
        toast.error(error.response.data.data.message);
      } else {
        toast.error("Server xətası! Yenidən cəhd edin.");
      }
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="login-page-section">
      <div className="login-page-container">
        <section className="top-section">
          <img src={BirsaytLogo} alt="Birsayt Logo" className="birsayt-logo" />
          <h1>Xoş gəlmisiniz! 👋</h1>
        </section>
        <section className="form-section">
          <form onSubmit={handleSubmit}>
            <div className="row g-4">
              <div className="col-12">
                <label htmlFor="email">İstifadəçi emaili</label>
                <input
                  ref={emailRef}
                  type="text"
                  id="email"
                  placeholder="İstifadəçi emaili"
                  required
                />
              </div>
              <div className="col-12">
                <label htmlFor="password">Şifrə</label>
                <input
                  ref={passwordRef}
                  type="password"
                  id="password"
                  placeholder="Şifrə"
                  required
                />
              </div>
              <div className="col-12">
                <button type="submit" disabled={isLoading}>
                  {isLoading ? "Yüklənir..." : "Daxil ol"}
                </button>
              </div>
            </div>
          </form>
        </section>
      </div>
    </div>
  );
};

export default Login;
