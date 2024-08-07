import { Link } from "react-router-dom";
import {
  CustomerServiceRoutes,
  AboutRoutes,
} from "../components/LayoutNavigation";
import ReactCountryFlag from "react-country-flag";
import { useTranslation } from "react-i18next";

const date = new Date();
const currentYear = date.getFullYear();

export default function () {
  const { t } = useTranslation();
  const customerNavigation = CustomerServiceRoutes(t);
  const aboutNavigation = AboutRoutes(t);

  return (
    <div className="container mx-auto lg:pt-5 lg:mt-5 px-10 lg:px-4 pb-10 text-lg">
      <div className="mx- text-sm lg:text-lg grid lg:grid-cols-3 md:grid-cols-3 sm:grid-cols-1">
        <div>
          <h3 className="font-medium text-gray-800 text-xl">
            {t("auth.customerService")}
          </h3>
          <hr className="w-14 border-black pb-4" />
          <ul>
            {customerNavigation.map((customerRoutes) => (
              <li key={customerRoutes.navLink} className="py-1">
                <Link to={customerRoutes.navRoute} className="font-medium ">
                  {customerRoutes.navLink}
                </Link>
              </li>
            ))}
          </ul>
          <div className="flex items-center py-2">
            <ReactCountryFlag countryCode="CM" svg className="mr-2 my-2" />
            <p className="font-medium ">{t("home.cameroon")}</p>
          </div>
        </div>

        <div>
          <h3 className="font-medium text-xl text-gray-800">
            {t("home.aboutUs")}
          </h3>
          <hr className="w-14 border-black pb-4" />
          <ul>
            {aboutNavigation.map((aboutRoutes) => (
              <li key={aboutRoutes.navLink} className="py-1">
                <Link to={aboutRoutes.navRoute} className="font-medium ">
                  {aboutRoutes.navLink}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="flex mt-4 items-center justify-center">
        <hr className="border-1 border-red-500 w-10 lg:w-80 mr-2" />
        <p className="font-medium lg:text-lg text-xs ">
          All Copyrights reserved &copy;{currentYear}
        </p>
        <hr className="border-1 border-red-500 w-10 lg:w-80 ml-2" />
      </div>
    </div>
  );
}
