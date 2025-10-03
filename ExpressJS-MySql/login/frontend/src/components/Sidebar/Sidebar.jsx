import React, { useContext, createContext } from "react";
import { useCookies } from "react-cookie";
import BirsaytLogo from "../../assets/images/BirsaytLogo.png";
import { Link, useNavigate, useLocation } from "react-router-dom";
import "./_Sidebar.scss";
export const SidebarContext = createContext();
export const useSidebar = () => useContext(SidebarContext);

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isOpen, toggleSidebar, isMobileOpen, toggleMobileSidebar } =
    useSidebar();
  const [cookies, setCookie, removeCookie] = useCookies(["token"]);
  const handleMenuItemClick = () => {
    if (window.innerWidth <= 768 && isMobileOpen) {
      toggleMobileSidebar();
    }
  };

  const handleLogout = () => {
    removeCookie("token");
    navigate("/");
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  const dashboardRoute = "/dashboard";
  const contactRoute = "/contact";
  return (
    <div
      className={`sidebar ${isOpen ? "open" : "closed"} ${
        isMobileOpen ? "mobile-open" : ""
      }`}
    >
      <div className="sidebar-content">
        <div className="top-side">
          <i
            className="fa-solid fa-bars text-dark desktop-toggle"
            onClick={toggleSidebar}
          ></i>
          {isOpen && (
            <>
              <img
                src={BirsaytLogo}
                alt="Birsayt Logo"
                className="birsayt-logo me-4"
                title="birsayt"
                onClick={() => {
                  navigate(dashboardRoute);
                  handleMenuItemClick();
                }}
                style={{ cursor: "pointer" }}
              />
            </>
          )}
        </div>
        <div className="sidebar-menu">
          <ul>
            <Link
              to={dashboardRoute}
              className="link"
              onClick={handleMenuItemClick}
            >
              <li className={isActive(dashboardRoute) ? "active" : ""}>
                <i className="fa-solid fa-table-columns"></i>{" "}
                <span>Dashboard</span>
              </li>
            </Link>

            <Link
              to={contactRoute}
              className="link"
              onClick={handleMenuItemClick}
            >
              <li className={isActive(contactRoute) ? "active" : ""}>
                <i className="fas fa-address-book"></i>
                <span>Contact</span>
              </li>
            </Link>
          </ul>
        </div>
        <div className="sidebar-footer">
          <div className="link" onClick={handleLogout}>
            <li>
              <i className="fas fa-sign-out-alt"></i>
              <span>Çıxış</span>
            </li>
          </div>
        </div>
      </div>
      <div
        className="mobile-sidebar-overlay"
        onClick={toggleMobileSidebar}
      ></div>
    </div>
  );
};

export default Sidebar;
