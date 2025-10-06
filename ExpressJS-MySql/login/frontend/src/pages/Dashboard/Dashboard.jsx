import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import "./_Dashboard.scss";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const Dashboard = () => {
  const [product, setProduct] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {

    axios.get('http://localhost:3000/product', {
      headers: {
        "x-auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZnVsbG5hbWUiOiJIYXNhbiIsImVtYWlsIjoiaGFzYW5Ad2VibHVuYS5vcmciLCJwaG9uZSI6IjEyMzkxMjMiLCJyb2xlIjoidXNlciIsImlhdCI6MTc1OTc2MjQyMCwiZXhwIjoxNzU5NzYzMzIwfQ.TiSHqU785F5X_KcRnIZbn7lgcAEHM5Nn-c_yDORIsbA"
      }
    }).then(res => {
      console.log(res);
    }
    ).catch(err => {
      navigate('/login');
      console.log(err)
    })


  }, []);

  return (
    <div className="dashboard-container">
      <div className="dashboard-content">
        <div className="welcome-section">
          <h2>Xoş gəlmisiniz, Admin! 🎉</h2>
          <p>Admin panelinə uğurla daxil oldunuz.</p>
        </div>



      </div>
    </div>
  );
};

export default Dashboard;
