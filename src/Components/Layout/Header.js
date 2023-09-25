import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";

import HeaderCartButton from "./HeaderCartButton";
import classes from "./nav.module.css";
import { person } from "react-icons-kit/iconic/person";
import IconName from "../Icon";

const Header = ({ onShowAuthModal, onOpen, showAuthModal, userName }) => {
  const { t, i18n } = useTranslation();

  const handleLanguageSwitch = lang => {
    i18n.changeLanguage(lang)
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
                  {t('home')}
                </NavLink>
              </li>

              {/* Shop Link */}
              <li className="nav-item mr-4">
                <NavLink to="/shop" className={activeLinkStyle}>
                  {t('shop')}
                </NavLink>
              </li>

              {/* About Link */}
              <li className="nav-item mr-4">
                <NavLink to="/about" className={activeLinkStyle}>
                  {t('about')}
                </NavLink>
              </li>

              {/* Latest Link = New Arrival Products */}
              <li className="nav-item mr-4">
                <NavLink to="/latest" className={activeLinkStyle}>
                  {t('latest')}
                </NavLink>
              </li>

              {/* Blog Link */}
              <li className="nav-item mr-4">
                <NavLink to="/blog" className={activeLinkStyle}>
                  {t('blog')}
                </NavLink>
              </li>

              {/* Contact Link */}
              <li className="nav-item mr-4">
                <NavLink to="/contact" className={activeLinkStyle}>
                  {t('contact')}
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
          <div>
            <button style={{color: 'white'}} onClick={()=>handleLanguageSwitch('en')}>
              {t('english')}
            </button>
            <button style={{color: 'white'}} onClick={()=>handleLanguageSwitch('fr')}>
              {t('french')}
            </button>
          </div>
          {/* Language Sector */}
        </div>
      </div>
    </>
  );
};

export default Header;
