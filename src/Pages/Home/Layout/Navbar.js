import { NavLink } from "react-router-dom";
import { NavbarRoutes } from "../components/LayoutNavigation";
import AuthButton from "./AuthButton";
import CartButton from "./CartButton";
import TranslationButton from "./TranslationButton";
import { useTranslation } from "react-i18next";

export default function () {

  const {t} = useTranslation()

  const navbarRoutes = NavbarRoutes(t)

  return (
    <div className="mx-auto px-2 py-2 text-lg">
      <div className="flex items-center justify-around">
        <div className="navbar-header">
          <NavLink className="navbar-header" to="/">
            TimeZone
          </NavLink>
        </div>

        <div className="navbar-links">
          <ul className="flex gap-4">
            {navbarRoutes.map((navNavigation) => (
              <li key={navNavigation.navLink} className="nav-item mr-4">
                <NavLink to={navNavigation.navRoute}>
                  {navNavigation.navLink}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex">
          <AuthButton />
          <CartButton />
        </div>

        <div>
          <TranslationButton />
        </div>
      </div>
    </div>
  );
}
