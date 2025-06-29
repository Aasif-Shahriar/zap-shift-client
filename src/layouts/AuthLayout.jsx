import React from "react";
import { Outlet } from "react-router";
import authImage from "../assets/authImage.png";
import ProFastLogo from "../pages/shared-component/profast-logo/ProFastLogo";

const AuthLayout = () => {
  return (
    <div className="p-12">
      <ProFastLogo></ProFastLogo>
      <div className="flex flex-col md:flex-row md:items-center bg-base-200">
        <div className="flex-1 px-2 md:px-10 mb-5 md:mb-0 ">
          <Outlet></Outlet>
        </div>
        <div className="flex-1 bg-primary/10">
          <img src={authImage} />
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
