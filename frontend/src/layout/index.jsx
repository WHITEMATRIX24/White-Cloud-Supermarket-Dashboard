import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./template/Header";
import DraggablePopup from "../component/draggablePopup/draggablePopup";

const Layout = () => {
  return (
    <div className="main-section">
      <Header />
      <Outlet />
      <DraggablePopup />
    </div>
  );
};

export default Layout;
