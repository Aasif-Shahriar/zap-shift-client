import React from "react";
import { HiMiniBars3 } from "react-icons/hi2";
import { Link, NavLink } from "react-router";
import ProFastLogo from "../profast-logo/ProFastLogo";
import useAuth from "../../../hooks/useAuth";
import { toast } from "react-toastify";

const Navbar = () => {
  const { logOut, user } = useAuth();
  const handleLogout = () => {
    logOut()
      .then(() => {
        toast.warning("logged out successful");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const links = (
    <>
      <li>
        <NavLink to="/">Home</NavLink>
      </li>
      <li>
        <NavLink to="/send-parcel">Send A Parcel</NavLink>
      </li>
      <li>
        <NavLink to="/coverage">Coverage</NavLink>
      </li>

      {
        user && <>
          <li>
        <NavLink to="/dashboard">Dashborad</NavLink>
      </li>
        </>
      }
      
      <li>
        <NavLink to="/about">About Us</NavLink>
      </li>
    </>
  );
  return (
    <div className="navbar bg-base-100 shadow-sm">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <HiMiniBars3 size={20} />
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            {links}
          </ul>
        </div>
        <ProFastLogo></ProFastLogo>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{links}</ul>
      </div>
      <div className="navbar-end">
        {user ? (
          <button onClick={handleLogout} className="btn btn-primary text-black">
            Log Out
          </button>
        ) : (
          <Link to='/login'>
            <button className="btn btn-primary text-black">Log In</button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
