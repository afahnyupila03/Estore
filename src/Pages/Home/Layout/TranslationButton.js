import { useState, Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { useTranslation } from "react-i18next";
import ReactCountryFlag from "react-country-flag";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

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
        gap-x-1.5 rounded-md bg-gray-400 px-5 
        py-2 text-sm font-semibold text-gray-900 
        shadow-sm ring-inset 
        ring-gray-300 hover:bg-gray-50"
        >
          {curLang === "en" ? (
            <div>
              <ReactCountryFlag svg countryCode="Us" className="mr-2" />
              {t("english")}
            </div>
          ) : (
            <div>
              <ReactCountryFlag svg countryCode="FR" className="mr-2" />
              {t("french")}
            </div>
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
                {({ active }) => (
                  <div className="flex space-between">
                    <button
                      onClick={() => handleLanguageSwitch("fr")}
                      className={classNames(
                        active
                          ? "bg-gray-100 rounded-md text-gray-900"
                          : "text-gray-700",
                        "block px-4 py-2 text-sm rounded-md"
                      )}
                    >
                      <ReactCountryFlag svg countryCode="FR" className="mr-2" />
                      {t("french")}
                    </button>
                  </div>
                )}
              </Menu.Item>
            ) : (
              <Menu.Item>
                {({ active }) => (
                  <button
                    onClick={() => handleLanguageSwitch("en")}
                    className={classNames(
                      active
                        ? "bg-gray-100 rounded-md text-gray-900"
                        : "text-gray-700",
                      "block px-4 py-2 text-sm rounded-md"
                    )}
                  >
                    <ReactCountryFlag svg countryCode="US" className="mr-2" />
                    {t("english")}
                  </button>
                )}
              </Menu.Item>
            )}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
