import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";

import instagram from "./instagram.png";
import twitter from "./twitter.png";
import facebook from "./facebook.png";

const FooterNavbar = () => {
  const { t } = useTranslation();

  const scrollToTop = () => {
    window.scrollTo(0, 0);
  };

  return (
    <div className="bg-red-100" style={{ padding: "0.1rem" }}>
      <div className="container mt-20  mb-10 mx-auto px-4">
        {/* Footer Navbar */}
        <div className="px-4 mx-auto grid md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Footer Brand */}
          <div>
            <NavLink
              to="/"
              onClick={scrollToTop}
              className="font-bold text-4xl cursor-pointer"
            >
              <span>{t('navbarLinks.time')}</span>
              <span className="text-red-500">{t('navbarLinks.zone')}</span>
            </NavLink>

            {/* Footer Media Pages */}
            <div className="mt-10">
              <ul className="flex">
                <li>
                  <NavLink
                    to="/"
                    onClick={scrollToTop}
                    className=" mr-2 cursor-pointer hover:text-red-500 transition:ease-out duration-1000"
                  >
                    <img
                      src={twitter}
                      alt="twitter_img"
                      className="h-12 mr-4"
                    />
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/"
                    onClick={scrollToTop}
                    className="mr-2 cursor-pointer hover:text-red-500 transition:ease-out duration-1000"
                  >
                    <img
                      src={facebook}
                      alt="facebook_img"
                      className="h-12 mr-4"
                    />
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/"
                    onClick={scrollToTop}
                    className="mr-2 cursor-pointer hover:text-red-500 transition:ease-out duration-1000"
                  >
                    <img
                      src={instagram}
                      alt="instagram_img"
                      className="h-12 mr-4"
                    />
                  </NavLink>
                </li>
              </ul>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            {/* Header */}
            <div>
              <h4 className="text-red-500 mb-10 font-bold text-4xl">
              {t("footerLinks.quickLinks.quickLinks")}
              </h4>
            </div>
            {/* Links */}
            <div>
              <ul>
                <li className="mb-4 font-bold text-2xl cursor-pointer hover:text-red-500 transition:ease-in duration-200">
                  <NavLink to="/about" onClick={scrollToTop}>
                    {t('navbarLinks.about')}
                  </NavLink>
                </li>
                <li className="mb-4 font-bold text-2xl cursor-pointer hover:text-red-500 transition:ease-in duration-200">
                  <NavLink to="/offers-&amp;-discounts" onClick={scrollToTop}>
                  {t("footerLinks.quickLinks.offerDiscount")}
                  </NavLink>
                </li>
                <li className="mb-4 font-bold text-2xl cursor-pointer hover:text-red-500 transition:ease-in duration-200">
                  <NavLink to="/get-coupons" onClick={scrollToTop}>
                  {t("footerLinks.quickLinks.coupon")}
                  </NavLink>
                </li>
                <li className="mb-4 font-bold text-2xl cursor-pointer hover:text-red-500 transition:ease-in duration-200">
                  <NavLink to="/contact" onClick={scrollToTop}>
                  {t("navbarLinks.contact")}
                  </NavLink>
                </li>
              </ul>
            </div>
          </div>

          {/* New Product Links */}
          <div>
            {/* Header */}
            <div>
              <h4 className="text-red-500 mb-10 font-bold text-4xl">
              {t("footerLinks.newProducts.newProducts")}
              </h4>
            </div>
            {/* Links */}
            <div>
              <ul>
                <li className="mb-4 font-bold text-2xl cursor-pointer hover:text-red-500 transition:ease-in duration-200">
                  <NavLink to="/woman-cloth" onClick={scrollToTop}>
                  {t("footerLinks.newProducts.womanCloth")}
                  </NavLink>
                </li>
                <li className="mb-4 font-bold text-2xl cursor-pointer hover:text-red-500 transition:ease-in duration-200">
                  <NavLink to="/fashion-accessories" onClick={scrollToTop}>
                  {t("footerLinks.newProducts.fashionAccessories")}
                  </NavLink>
                </li>
                <li className="mb-4 font-bold text-2xl cursor-pointer hover:text-red-500 transition:ease-in duration-200">
                  <NavLink to="/man-accessories" onClick={scrollToTop}>
                  {t("footerLinks.newProducts.menAccessories")}
                  </NavLink>
                </li>
                <li className="mb-4 font-bold text-2xl cursor-pointer hover:text-red-500 transition:ease-in duration-200">
                  <NavLink to="/rubber-toys" onClick={scrollToTop}>
                  {t("footerLinks.newProducts.rubberToys")}
                  </NavLink>
                </li>
              </ul>
            </div>
          </div>

          {/* Support Links */}
          <div>
            {/* Header */}
            <div>
              <h4 className="text-red-500 mb-10 font-bold text-4xl">
              {t('footerLinks.support.support')}
              </h4>
            </div>
            {/* Links */}
            <div>
              <ul>
                <li className="mb-4 font-bold text-2xl cursor-pointer hover:text-red-500 transition ease-in-out  duration-300">
                  <NavLink to="/faq" onClick={scrollToTop}>
                  {t('footerLinks.support.faq')}
                  </NavLink>
                </li>
                <li className="mb-4 font-bold text-2xl cursor-pointer hover:text-red-500 transition:ease-in duration-300">
                  <NavLink to="/terms-&amp;-conditions" onClick={scrollToTop}>
                  {t('footerLinks.support.conditions')}
                  </NavLink>
                </li>
                <li className="mb-4 font-bold text-2xl cursor-pointer hover:text-red-500 transition:ease-in duration-300">
                  <NavLink to="/privacy-policy" onClick={scrollToTop}>
                  {t('footerLinks.support.privacyPolicy')}
                  </NavLink>
                </li>
                <li className="mb-4 font-bold cursor-pointer text-2xl hover:text-red-500 transition:ease-in duration-300">
                  <NavLink to="/report-payment-issue" onClick={scrollToTop}>
                  {t('footerLinks.support.reportPayment')}
                  </NavLink>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <hr className="container border-red-500 border-3 mb-5 mx-auto" />
      <div className="container flex justify-center font-bold text-2xl tracking-wildest text-red-500 mx-auto mb-10">
        {t('footerLinks.rightsReserved')}
        <p>&copy;{new Date().getFullYear()}</p>
      </div>
    </div>
  );
};

export default FooterNavbar;
