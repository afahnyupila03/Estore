import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";

import classes from "./nav.module.css";
import CartButton from "./components/CartButton";
import LanguageButton from "./Buttons/LanguageButton";
import AuthButton from "./Buttons/AuthButton";
import { NavObjects } from "./Nav Component/NavObjects";
import IconName from "../../Components/Icon";
import { commentDiscussion } from "react-icons-kit/oct";

export default function ({ onShowAuthModal, onOpen, showAuthModal, userName }) {
  const { t } = useTranslation();

  const activeLinkStyle = ({ isActive }) =>
    isActive ? `${classes.activeLink}` : `${classes.inactiveLInk}`;

  return (
    <>
      <div
        className="bg-black font-bold text-xl px-2 py-2 fixed"
        style={{ top: "0", left: "0", width: "100%" }}
      >
        <div className="flex items-center justify-around">
          {/* Navbar Brand */}
          <div className="navbar-header hidden sm:block">
            <NavLink to="/" className="cursor-pointer text-3xl">
              <span className="text-white">{t("navbarLinks.time")}</span>
              <span className="text-red-500">{t("navbarLinks.zone")}</span>
            </NavLink>
          </div>

          {/* Navbar Links */}
          <div className="navbar-links hidden lg:block">
            <ul className={classes.nav}>
              {NavObjects.map((navLinks) => (
                <li className="nav-item mx-2">
                  <NavLink className={activeLinkStyle} to={navLinks.NavLink}>
                    {navLinks.NavName}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
          {/* Menu Text */}
          <div
            className="text-white uppercase sm:block lg:hidden text-white"
            id="menu"
          >
            <a href="#/">menu</a>
          </div>

          {/* New Auth */}
          <AuthButton />

          {/* Cart Icon */}
          <div className="navbar-button md:hidden lg:block">
            <CartButton />
          </div>

          {/* Language Sector */}
          <LanguageButton />
          {/* Language Sector */}
        </div>
      </div>
    </>
  );
}
