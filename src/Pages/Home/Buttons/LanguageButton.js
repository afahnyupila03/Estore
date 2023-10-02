// TODO: INSTALL MDBIcon WITH YARN.
import { useTranslation } from "react-i18next";
import { Fragment, useState } from "react";
import { Menu, Transition } from "@headlessui/react";
import ReactCountryFlag from "react-country-flag";

function classNames(...classes) {
  return classes.filter(Boolean).join("");
}

export default function LanguageButton() {
  const { t, i18n } = useTranslation();

  const [defaultLang, setDefaultLang] = useState("en");

  const handleLanguageSwitch = (lang) => {
    i18n.changeLanguage(lang);
    setDefaultLang(lang);
  };

  return (
    <Menu as="div" className="relative inline-block text-center">
      <div>
        <Menu.Button
          className="
        inline-flex w-full justify-center 
        gap-x-1.5 rounded-md bg-white 
        px-5 py-2 text-sm font-semibold 
        text-gray-900 shadow-sm ring-inset 
        ring-gray-300 hover:bg-gray-50
        "
        >
          {defaultLang === "en" ? (
            <div>
              <ReactCountryFlag countryCode="US" svg className='mr-2 mb-1' />
              {t("english")}
            </div>
          ) : (
            <div>
              <ReactCountryFlag countryCode="FR" svg className='mr-2 mb-1' />
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
        leaveFrom="transition opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items
          className="
            absolute right-0 z-10 mt-2 w-50 origin-top-right
            rounded-md bg-white shadow-lg ring-1 ring-black
            ring-opacity-5 focus:outline-none
        "
        >
          <div>
            {defaultLang === "en" ? (
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
                      <ReactCountryFlag countryCode="FR" svg className='mr-2 mb-1' />
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
                    <ReactCountryFlag countryCode="US" svg className='mr-2 mb-1' />
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
