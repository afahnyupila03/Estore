import { NavLink } from "react-router-dom";

import HeaderCartButton from "./HeaderCartButton";
import classes from "./nav.module.css";
import Login from "./Login";
import { useState } from "react";

const Header = ({ onShowAuthModal, onOpen }) => {
  const [isLogin, setIsLogin] = useState(false);

  const handleLogin = (email, password) => {
    setIsLogin(true);
  };
  const handleLogout = () => {
    setIsLogin(false);
  };

  const activeLinkStyle = ({ isActive }) =>
    isActive ? `${classes.activeLink}` : `${classes.inactiveLInk}`;

  return (
    <>
      <div
        className=" bg-black font-bold text-xl p-4"
        style={{ top: "0", left: "0", width: "100%" }}
      >
        <div className="flex items-center justify-around">
          {/* Navbar Brand */}
          <div className="navbar-header hidden sm:block">
            <NavLink to="/" className="cursor-pointer text-3xl">
              <span className="text-white">Time</span>
              <span className="text-red-500">Zone</span>
            </NavLink>
          </div>
          {/* Navbar Links */}
          <div className="navbar-links hidden lg:block">
            <ul className={classes.nav}>
              {/* Home Link */}
              <li className="nav-item mr-4">
                <NavLink to="/home" className={activeLinkStyle}>
                  Home
                </NavLink>
              </li>

              {/* Shop Link */}
              <li className="nav-item mr-4">
                <NavLink to="/shop" className={activeLinkStyle}>
                  Shop
                </NavLink>
              </li>

              {/* About Link */}
              <li className="nav-item mr-4">
                <NavLink to="/about" className={activeLinkStyle}>
                  About
                </NavLink>
              </li>

              {/* Latest Link = New Arrival Products */}
              <li className="nav-item mr-4">
                <NavLink to="/latest" className={activeLinkStyle}>
                  Latest
                </NavLink>
              </li>

              {/* Blog Link */}
              <li className="nav-item mr-4">
                <NavLink to="/blog" className={activeLinkStyle}>
                  Blog
                </NavLink>
              </li>

              {/* Contact Link */}
              <li className="nav-item mr-4">
                <NavLink to="/contact" className={activeLinkStyle}>
                  Contact
                </NavLink>
              </li>
            </ul>
          </div>
          {/* Menu Text */}
          <div
            className="text-white uppercase sm:block lg:hidden text-white"
            id="menu"
          >
            <a href="#/">menu</a>
          </div>
          {/* Cart Icon */}
          <div className="navbar-button md:hidden lg:block">
            <HeaderCartButton onOpen={onOpen} id="navbar-links" />
            <Login
              isLogin={isLogin}
              onLogin={handleLogin}
              onLogout={handleLogout}
            />

            {/* Auth Page Modal nav */}
            <div>
              <button
                onClick={onShowAuthModal}
                style={{ color: "white" }}
              >
                Auth Controller
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
