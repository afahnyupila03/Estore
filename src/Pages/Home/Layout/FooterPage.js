import { AboutLinks, CustomerServiceLinks } from "../Layout Component/FooterObjects";

import { NavLink, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import PrivacyPolicy from "./../../PrivacyPolicy/PrivacyPolicy";
import ReactCountryFlag from "react-country-flag";

export default function FooterNavbar() {
  const { t } = useTranslation();
  const customerService = CustomerServiceLinks(t);
  const aboutLinks = AboutLinks(t)

  const scrollToTop = () => {
    window.scrollTo(0, 0);
  };

  return (
    <div className="bg-gray-700 py-1">
      <div className="mx-auto container px-4 mt-20 gap-2 mb-10">
        {/* Footer Navbar */}
        <div className="grid mx-auto px-4 md:grid-cols-3 lg:grid-cols-3 sm:grid-cols-1">
          {/* Customer Service */}
          <div>
            {/* Header */}
            <div>
              <h4 className="mb-4 font-bold text-lg text-white">
                {t('footerLinks.customerService')}
              </h4>
            </div>
            {/* Links */}
            <div>
              <ul>
                {customerService.map((service) => (
                  <li
                    key={service.linkName}
                    className="mb-2 text-lg cursor-pointer hover:text-white transition:ease-in duration-200"
                  >
                    <NavLink to={service.linkAddress} onClick={scrollToTop}>
                      {service.linkName}
                    </NavLink>
                  </li>
                ))}
                <li className="text-lg">
                  <ReactCountryFlag
                    style={{ fontSize: "1rem" }}
                    countryCode="CM"
                    svg
                    className="mb-2 mx-4"
                  />
                  {t('footerLinks.cameroon')}
                </li>
              </ul>
            </div>
          </div>

          {/* About Us */}
          <div>
            {/* Header */}
            <div>
              <h4 className="font-bold mb-4 text-lg text-white">{t('footerLinks.aboutUs')}</h4>
            </div>
            {/* Links */}
            <div>
              <ul>
                {aboutLinks.map((about) => (
                  <li
                    key={about.linkName}
                    className="mb-2 text-lg cursor-pointer hover:text-white transition:ease-in duration-200"
                  >
                    <NavLink to={about.linkAddress} onClick={scrollToTop}>
                      {about.linkName}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Apps */}
          <div>
            <div>
                <h4 className='font-bold mb-4 text-white'>{t('footerLinks.getApp')}</h4>
            </div>
            <div className='flex justify-between'>
                <button onClick={() => window.scrollTo(0, 0)}>Top</button>
                <p style={{color: 'brown'}}>Insta</p>
                <p>twitter</p>
                <p>facebook</p>
            </div>
          </div>

        </div>
      </div>

      <div className="flex container text-lg tracking-wildest mx-auto px-4 mb-5">
        <Link className="hover:text-white transition:ease-in duration-200 mx-4">
          PrivacyPolicy
        </Link>
        <Link className="hover:text-white transition:ease-in duration-200 mx-4">
          Your Privacy Rights
        </Link>
        <Link className="hover:text-white transition:ease-in duration-200 mx-4">
          Terms &amp; Conditions
        </Link>
        <Link className="hover:text-white transition:ease-in duration-200 mx-4">
          &copy;{new Date().getFullYear()} TimeZone, Inc.
        </Link>
      </div>
    </div>
  );
}
