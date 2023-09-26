import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";

const ShopNavbarPage = () => {
  const { t } = useTranslation();
  const [menuActive, setMenuActive] = useState(false);

  return (
    <div className="bg-red-300 mt-4">
      <div className="flex items-center justify-around">
        <div className="nav-links hidden md:block">
          <ul className="flex gap-4 py-2">
            <li>
              <NavLink to="/shop" className="font-bold text-xl">
                {t('navbarLinks.shop')}
              </NavLink>
            </li>
            <li>
              <NavLink to="/shop/watches" className="font-bold text-xl">
                {t('shop.watches')}
              </NavLink>
            </li>
            <li>
              <NavLink to="/shop/woman-cloth" className="font-bold text-xl">
              {t('footerLinks.newProducts.womanCloth')}
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/shop/fashion-accessories"
                className="font-bold text-xl"
              >
                {t('footerLinks.newProducts.fashionAccessories')}
              </NavLink>
            </li>
            <li>
              <NavLink to="/shop/man-accessories" className="font-bold text-xl">
              {t('footerLinks.newProducts.menAccessories')}
              </NavLink>
            </li>
            <li>
              <NavLink to="/shop/rubber-toys" className="font-bold text-xl">
              {t('footerLinks.newProducts.rubberToys')}
              </NavLink>
            </li>
          </ul>
        </div>
        <div className="nav-icon md:hidden sm:block">
          <button onClick={() => setMenuActive(!menuActive)}>
            {menuActive ? "Cancel" : "Menu"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShopNavbarPage;
