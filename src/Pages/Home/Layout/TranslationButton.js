import { useState, Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { useTranslation } from "react-i18next";
import ReactCountryFlag from "react-country-flag";

export default function () {
  const { t, i18n } = useTranslation();
  const [curLang, setCurLang] = useState("en");

  const handleLanguageSwitch = (lang) => {
    i18n.changeLanguage(lang);
    setCurLang(lang);
  };

  return (
    <Menu as="div" className="relative inline-block text-center">
      <div>
        <Menu.Button
          className="
        inline-flex w-full justify-center 
        gap-x-1.5 rounded-md bg-gray-400 px-2
        py-2 text-sm font-semibold text-gray-900 
        shadow-sm ring-inset font-mono items-center
        ring-gray-300 hover:bg-gray-500"
        >
          {curLang === "en" ? (
            <>
              <ReactCountryFlag svg countryCode="US" className="mr-2" />
              {t("english")}
            </>
          ) : (
            <>
              <ReactCountryFlag svg countryCode="FR" className="mr-2" />
              {t("french")}
            </>
          )}
        </Menu.Button>
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
        <Menu.Items
          className="
        absolute right-0 z-10 mt-2 
        w-50 origin-top-right rounded-md 
        bg-white shadow-lg ring-1 ring-black 
        ring-opacity-5 focus:outline-none 
        justify-center"
        >
          <div>
            {curLang === "en" ? (
              <Menu.Item>
                <div className="flex space-between">
                  <button
                    onClick={() => handleLanguageSwitch("fr")}
                    className="block px-4 py-2 text-sm font-mono font-semibold rounded-md"
                  >
                    <ReactCountryFlag svg countryCode="FR" className="mr-2" />
                    {t("french")}
                  </button>
                </div>
              </Menu.Item>
            ) : (
              <Menu.Item>
                <button
                  onClick={() => handleLanguageSwitch("en")}
                  className="block px-4 py-2 font-mono font-semibold text-sm rounded-md"
                >
                  <ReactCountryFlag svg countryCode="US" className="mr-2" />
                  {t("english")}
                </button>
              </Menu.Item>
            )}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
