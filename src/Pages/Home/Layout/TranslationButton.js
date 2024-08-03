import { useState, useEffect, Fragment } from "react";
import {
  Menu,
  MenuButton,
  MenuItems,
  MenuItem,
  Transition,
} from "@headlessui/react";
import { useTranslation } from "react-i18next";
import ReactCountryFlag from "react-country-flag";

export default function () {
  const { t, i18n } = useTranslation();
  const [curLang, setCurLang] = useState(localStorage.getItem("lang") || "en");

  useEffect(() => {
    // Set the initial language when the component mounts
    i18n.changeLanguage(curLang);
  }, [curLang, i18n]);

  const handleLanguageSwitch = (lang) => {
    i18n.changeLanguage(lang);
    setCurLang(lang);
    // Save selected language to localStorage
    localStorage.setItem("lang", lang);
  };

  return (
    <Menu as="div" className="relative inline-block text-center">
      <div>
        <MenuButton
          className="
        inline-flex w-40 justify-center 
        gap-x-1.5 rounded-md bg-gray-800 px-2
        py-2 text-lg font-medium 
        shadow-sm ring-inset text-white items-center
        ring-gray-300"
        >
          {curLang === "en" ? (
            <>
              <ReactCountryFlag svg countryCode="GB" className="mr-2" />
              {t("english")}
            </>
          ) : (
            <>
              <ReactCountryFlag svg countryCode="FR" className="mr-2" />
              {t("french")}
            </>
          )}
        </MenuButton>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <MenuItems
          className="
        absolute right-0 z-10 mt-2 
        w-50 origin-top-right rounded-md 
        bg-white shadow-lg ring-1 ring-black 
        ring-opacity-5 focus:outline-none 
        justify-center"
        >
          <div>
            {curLang === "en" ? (
              <MenuItem>
                <div className="flex space-between">
                  <button
                    onClick={() => handleLanguageSwitch("fr")}
                    className="block w-40 px-4 py-2 text-lg 
                    text-gray-800 font-medium rounded-md"
                  >
                    <ReactCountryFlag svg countryCode="FR" className="mr-2" />
                    {t("french")}
                  </button>
                </div>
              </MenuItem>
            ) : (
              <MenuItem>
                <button
                  onClick={() => handleLanguageSwitch("en")}
                  className="block w-40 px-4 py-2 text-gray-800 
                  font-medium text-lg rounded-md"
                >
                  <ReactCountryFlag svg countryCode="GB" className="mr-2" />
                  {t("english")}
                </button>
              </MenuItem>
            )}
          </div>
        </MenuItems>
      </Transition>
    </Menu>
  );
}
