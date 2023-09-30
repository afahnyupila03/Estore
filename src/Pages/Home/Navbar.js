import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";

import classes from "./nav.module.css";
import { person } from "react-icons-kit/iconic/person";
import IconName from "../../Components/Icon";
import CartButton from "./components/CartButton";
import LanguageButton from "./Buttons/LanguageButton";

export default function ({ onShowAuthModal, onOpen, showAuthModal, userName }) {
  const { t } = useTranslation();

  const activeLinkStyle = ({ isActive }) =>
    isActive ? `${classes.activeLink}` : `${classes.inactiveLInk}`;

  return (
    <>
      <div
        className="bg-black font-bold text-xl p-4 fixed"
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
              {/* Home Link */}
              <li className="nav-item mr-4">
                <NavLink to="/home" className={activeLinkStyle}>
                  {t("navbarLinks.home")}
                </NavLink>
              </li>

              {/* Shop Link */}
              <li className="nav-item mr-4">
                <NavLink to="/shop" className={activeLinkStyle}>
                  {t("navbarLinks.shop")}
                </NavLink>
              </li>

              {/* About Link */}
              <li className="nav-item mr-4">
                <NavLink to="/about" className={activeLinkStyle}>
                  {t("navbarLinks.about")}
                </NavLink>
              </li>

              {/* Latest Link = New Arrival Products */}
              <li className="nav-item mr-4">
                <NavLink to="/latest" className={activeLinkStyle}>
                  {t("navbarLinks.latest")}
                </NavLink>
              </li>

              {/* Blog Link */}
              <li className="nav-item mr-4">
                <NavLink to="/blog" className={activeLinkStyle}>
                  {t("navbarLinks.blog")}
                </NavLink>
              </li>

              {/* Contact Link */}
              <li className="nav-item mr-4">
                <NavLink to="/contact" className={activeLinkStyle}>
                  {t("navbarLinks.contact")}
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
            <CartButton />
          </div>
          {/* Auth Page Modal nav */}
          <div>
            <button onClick={onShowAuthModal} style={{ color: "white" }}>
              {!showAuthModal && (
                <div>
                  <IconName icon={person} />
                  <p>{userName}</p>
                </div>
              )}
            </button>
          </div>
          {/* Language Sector */}
          <LanguageButton />
          {/* Language Sector */}
        </div>
      </div>
    </>
  );
}
