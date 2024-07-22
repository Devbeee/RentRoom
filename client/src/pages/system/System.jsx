import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { path } from "../../utils/constant";
import { Header, Sidebar } from "./index";
const System = () => {
  const { isLoggedIn } = useSelector((state) => state.auth);
  return !isLoggedIn ? (
    <Navigate to={`/${path.LOGIN}`} replace={true} />
  ) : (
    <div className="w-full h-screen flex flex-col items-center">
      <Header />
      <div className="flex w-full h-screen flex-auto">
        <Sidebar />
        <div className="flex-auto bg-white h-full shadow-md p-4 overflow-y-scroll">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default System;
