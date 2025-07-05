import React from "react";
import { Outlet } from "react-router";
import authImage from "../assets/authImage.png";
import ProFastLogo from "../pages/shared-component/profast-logo/ProFastLogo";

const AuthLayout = () => {
  return (
    <div className="min-h-screen p-4 lg:p-12 bg-base-100">
      {/* Logo at the top */}
      <div className="mb-8">
        <ProFastLogo />
      </div>

      {/* Main content wrapper */}
      <div className="flex flex-col md:flex-row md:items-center bg-base-200 rounded-lg overflow-hidden shadow-md">
        {/* Form / Outlet Side */}
        <div className="flex-1 px-4 sm:px-6 md:px-10 py-8">
          <Outlet />
        </div>

        {/* Image Side */}
        <div className="flex-1 bg-primary/10 hidden md:block">
          <img
            src={authImage}
            alt="Authentication Illustration"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
