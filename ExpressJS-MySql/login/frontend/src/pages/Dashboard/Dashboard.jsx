import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import "./_Dashboard.scss";
const Dashboard = () => {
  const [animatedNumbers, setAnimatedNumbers] = useState({
    projects: 0,
    products: 0,
    orders: 0,
    blogs: 0,
  });
  const finalNumbers = {
    projects: 10,
    products: 5,
    orders: 10,
    blogs: 20,
  };

  // Animation effect for numbers
  useEffect(() => {
    const animateNumbers = () => {
      Object.keys(finalNumbers).forEach((key) => {
        let current = 0;
        const target = finalNumbers[key];
        const increment = target / 30;

        const timer = setInterval(() => {
          current += increment;
          if (current >= target) {
            current = target;
            clearInterval(timer);
          }
          setAnimatedNumbers((prev) => ({
            ...prev,
            [key]: Math.floor(current),
          }));
        }, 50);
      });
    };

    const timer = setTimeout(animateNumbers, 500);
    return () => clearTimeout(timer);
  }, []);
  // Chart configurations

  const pieChartOptions = {
    chart: {
      type: "donut",
      height: 300,
    },
    colors: ["#667eea", "#764ba2", "#f093fb", "#f5576c"],
    labels: ["Layihələr", "Məhsullar", "Sifarişlər", "Bloqlar"],
    legend: {
      position: "bottom",
      fontSize: "14px",
    },
    plotOptions: {
      pie: {
        donut: {
          size: "70%",
          labels: {
            show: true,
            total: {
              show: true,
              label: "Cəmi",
              fontSize: "16px",
              fontWeight: 600,
              color: "#2c3e50",
            },
          },
        },
      },
    },
    dataLabels: {
      enabled: true,
      formatter: function (val) {
        return Math.round(val) + "%";
      },
    },
  };

  const pieChartSeries = [
    finalNumbers.projects,
    finalNumbers.products,
    finalNumbers.orders,
    finalNumbers.blogs,
  ];

  return (
    <div className="dashboard-container">
      <div className="dashboard-content">
        <div className="welcome-section">
          <h2>Xoş gəlmisiniz, Admin! 🎉</h2>
          <p>Admin panelinə uğurla daxil oldunuz.</p>
        </div>

        <div className="stats-grid">
          <div className="stat-card projects">
            <div className="stat-icon">📊</div>
            <h3>Layihələr</h3>
            <div className="stat-number">{animatedNumbers.projects}</div>
            <div className="stat-trend">+12% bu ay</div>
          </div>
          <div className="stat-card products">
            <div className="stat-icon">🛍️</div>
            <h3>Məhsullar</h3>
            <div className="stat-number">{animatedNumbers.products}</div>
            <div className="stat-trend">+8% bu ay</div>
          </div>
          <div className="stat-card orders">
            <div className="stat-icon">📦</div>
            <h3>Sifarişlər</h3>
            <div className="stat-number">{animatedNumbers.orders}</div>
            <div className="stat-trend">+15% bu ay</div>
          </div>
          <div className="stat-card blogs">
            <div className="stat-icon">📝</div>
            <h3>Bloqlar</h3>
            <div className="stat-number">{animatedNumbers.blogs}</div>
            <div className="stat-trend">+5% bu ay</div>
          </div>
        </div>

        <div className="charts-section">
          <div className="chart-card">
            <div className="chart-header">
              <h3>Kateqoriya Paylanması</h3>
              <span className="chart-period">Cari vəziyyət</span>
            </div>
            <Chart
              options={pieChartOptions}
              series={pieChartSeries}
              type="donut"
              height={300}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
