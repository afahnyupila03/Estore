import { useState, Fragment } from "react";
import { Popover, Transition } from "@headlessui/react";
import { useTranslation } from "react-i18next";

import {
  AccountRoutes,
  AccountSettingsRoutes,
  AuthRoute,
} from "../components/LayoutNavigation";
import { IonIcon } from "@ionic/react";
import {
  heartOutline,
  cardOutline,
  lockClosedOutline,
  mailOutline,
  chatbubblesOutline,
  bicycleOutline,
  chevronDownOutline,
} from "ionicons/icons";
import MenuItemsCard from "../../../Components/MenuItemsCard";

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
  const authRoutes = AuthRoute(t)

  return (
    <Popover as="div" className="relative mt-2 text-center">
      <Popover.Button
        onMouseEnter={() => setMenuOpen(true)}
        onMouseLeave={() => setMenuOpen(false)}
        className="flex items-center gap-x-1 text-sm font-semibold leading-6 text-gray-900"
      >
        Sign In
        <IonIcon icon={chevronDownOutline} className="ml-2" />
      </Popover.Button>

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
        <Popover.Panel
          onMouseEnter={() => setMenuOpen(true)}
          onMouseLeave={() => setMenuOpen(false)}
          className="absolute left-1/2 z-10 mt-3 flex w-screen max-w-max -translate-x-1/2 px-4"
        >
          <div className="w-80  flex-auto overflow-hidden rounded-3xl bg-white text-sm leading-6 shadow-lg  ring-gray-900/5">
            <div className="p-4">

              {authRoutes.map((authKey) => (
                <MenuItemsCard 
                  key={authKey.navLink}
                  navigationLink={authKey.navLink}
                  navigationRoute={authKey.navRoute}
                  style={{fontWeight: 'bold'}}
                />
              ))}

              {/* Your Account Routes */}
              <h4 className="text-left px-4 font-semibold mt-2 mb-2">
                Your Account
              </h4>
              {accountNavigation.map((accountNav) => (
                <MenuItemsCard
                  key={accountNav.navLink}
                  navigationRoute={accountNav.navRoute}
                  navigationLink={accountNav.navLink}
                  icon={accountNav.iconName}
                />
              ))}
              {/* Account Settings Routes */}
              <h4 className="text-left px-4 font-semibold mt-2 mb-2">
                Account Settings
              </h4>
              {accSettingsNavigation.map((accSettings) => (
                <MenuItemsCard
                  key={accSettings.navLink}
                  navigationLink={accSettings.navLink}
                  navigationRoute={accSettings.navRoute}
                  icon={accSettings.iconName}
                />
              ))}
              {/* Customer Line Route */}
              <h4 className="text-left px-4 font-semibold mt-4 mb-2">
                Need Help ?
              </h4>
              <MenuItemsCard
                navigationRoute="/account/customer-service"
                navigationLink="Contact Us"
                icon={chatbubblesOutline}
              />
            </div>
          </div>
        </Popover.Panel>
      </Transition>
    </Popover>
  );
}
