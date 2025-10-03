import React, { useContext } from "react";
import "./_Header.scss";
import NotificationIcon from "../../assets/icons/NotificationIcon.svg";
import { SidebarContext } from "../Sidebar/Sidebar";

const Header = () => {
  const { toggleMobileSidebar } = useContext(SidebarContext);

  return (
    <header className="header">
      <div className="header-content">
        <div className="left-content">
          <i
            className="fa-solid fa-bars mobile-menu-icon"
            onClick={toggleMobileSidebar}
          ></i>
        </div>
        <div className="right-content">
          <div className="notification-wrapper">
            <img
              src={NotificationIcon}
              alt="Notification"
              className="notification-icon"
            />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
