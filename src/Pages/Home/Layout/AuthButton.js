import { useState, Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { useTranslation } from "react-i18next"

import {
  AccountRoutes,
  AccountSettingsRoutes,
} from "../components/LayoutNavigation";
import { IonIcon } from "@ionic/react";
import {
  heartOutline,
  cardOutline,
  lockClosedOutline,
  mailOutline,
  chatbubblesOutline,
  bicycleOutline,
  chevronDownOutline
} from "ionicons/icons";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function () {
  const { t } = useTranslation();
  const [menuOpen, setMenuOpen] = useState(false);

  const accountNavigation = AccountRoutes(
    t,
    heartOutline,
    cardOutline,
    bicycleOutline
  );
  const accSettingsNavigation = AccountSettingsRoutes(
    t,
    mailOutline,
    lockClosedOutline
  );

  return (
    <Menu as="div" className="relative mt-2 text-center">
      <div>
        <Menu.Button
          onMouseEnter={() => setMenuOpen(true)}
          onMouseLeave={() => setMenuOpen(false)}
          className="
        inline-flex w-full justify-center text-lg"
        >
          Sign In
          <IonIcon 
            icon={chevronDownOutline} className='ml-2 mt-2'
          />
        </Menu.Button>
      </div>

      <Transition
        show={menuOpen}
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items
          onMouseEnter={() => setMenuOpen(true)}
          onMouseLeave={() => setMenuOpen(false)}
          className="
        absolute center mt-4
        transform -translate-x-20
        w-80 origin-top rounded-md 
        bg-white shadow-lg ring-1 ring-black 
        ring-opacity-5 focus:outline-none 
        justify-center
        "
        >
          <div className="py-6">
            <Menu.Item className='px-4'>
            <a className="bg-black px-2 py-2 text-white">Sign In | Create Account</a>
            </Menu.Item>

            <h4 className="text-left px-4 font-semibold mt-2 mb-2">
              Your Account
            </h4>
            {accountNavigation.map((accountNav) => (
              <Menu.Item className="px-4">
                <a href={accountNav.navRoute} className="flex items-center">
                  <IonIcon
                    icon={accountNav.iconName}
                    style={{ fontSize: "1.5rem" }}
                    className="mr-2"
                  />
                  {accountNav.navLink}
                </a>
              </Menu.Item>
            ))}

            <h4 className="text-left px-4 font-semibold mt-4 mb-2">
              Account Settings
            </h4>
            {accSettingsNavigation.map((accSettings) => (
              <Menu.Item className="px-4">
                <a href={accSettings.navRoute} className="flex items-center">
                  <IonIcon
                    icon={accSettings.iconName}
                    style={{ fontSize: "1.5rem" }}
                    className="mr-2"
                  />
                  {accSettings.navLink}
                </a>
              </Menu.Item>
            ))}

            <h4 className="text-left px-4 font-semibold mt-4 mb-2">
              Need Help ?
            </h4>
            <Menu.Item className="px-4">
              <a href="account/customer-support" className="flex items-center">
                <IonIcon icon={chatbubblesOutline} className="mr-2" />
                Contact Us
              </a>
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
