import { useState, Fragment } from "react";
import {
  Popover,
  PopoverButton,
  PopoverPanel,
  Transition,
} from "@headlessui/react";
import { useTranslation } from "react-i18next";
import { useAuth } from "../../../Store";

import {
  AccountRoutes,
  AccountSettingsRoutes,
  AuthRoute,
  UserAccountRoute,
} from "../components/LayoutNavigation";
import { IonIcon } from "@ionic/react";
import {
  heartOutline,
  cardOutline,
  lockClosedOutline,
  mailOutline,
  chatbubblesOutline,
  bicycleOutline,
  cubeOutline,
  personOutline,
  chevronDownOutline,
} from "ionicons/icons";
import MenuItemsCard from "../../../Components/MenuItemsCard";

export default function () {
  const { t, i18n } = useTranslation();
  const curLang = localStorage.getItem("lang");
  const [menuOpen, setMenuOpen] = useState(false);
  const { signOutHandler, user } = useAuth();

  const userName = user?.displayName;

  const displayUserName =
    i18n.language === "en"
      ? `${userName}${t("auth.account")}`
      : `${t("auth.account")} ${userName}`;

  const handleUserSignOut = async () => {
    try {
      await signOutHandler();
      console.log("logged out successfully");
    } catch (error) {
      console.error("Error logging out: ", error);
    }
  };

  const accountNavigation = AccountRoutes(
    t,
    cubeOutline,
    heartOutline,
    cardOutline,
    bicycleOutline
  );
  const accSettingsNavigation = AccountSettingsRoutes(
    t,
    mailOutline,
    lockClosedOutline
  );

  const authRoutes = AuthRoute(t);
  const accountPage = UserAccountRoute(t, displayUserName);

  const authenticationRoute = authRoutes.map((authKey) => (
    <MenuItemsCard
      key={authKey.navLink}
      navigationLink={authKey.navLink}
      navigationRoute={authKey.navRoute}
      style={{ fontWeight: "bold" }}
    />
  ));

  const userAccount = accountPage.map((account) => (
    <MenuItemsCard
      key={account.navLink}
      navigationLink={account.navLink}
      navigationRoute={account.navRoute}
      style={{ fontWeight: "bold" }}
    />
  ));

  return (
    <Popover as="div" className="relative mt-2 text-center">
      {user === null ? (
        <PopoverButton
          onMouseEnter={() => setMenuOpen(true)}
          onMouseLeave={() => setMenuOpen(false)}
          className="flex items-center gap-x-1 text-sm font-medium  leading-6 text-gray-900"
        >
          <IonIcon icon={personOutline} className="ml-2" />
        </PopoverButton>
      ) : (
        <PopoverButton
          onMouseEnter={() => setMenuOpen(true)}
          onMouseLeave={() => setMenuOpen(false)}
          className="flex items-center gap-x-1 text-lg font-medium  leading-6 text-gray-900"
        >
          {userName}
          <IonIcon icon={chevronDownOutline} className="ml-2" />
        </PopoverButton>
      )}

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
        <PopoverPanel
          onMouseEnter={() => setMenuOpen(true)}
          onMouseLeave={() => setMenuOpen(false)}
          className="absolute left-2 z-10 mt-3 flex w-screen max-w-max -translate-x-1/2 px-4"
        >
          <div className="w-80  flex-auto overflow-hidden rounded-3xl bg-white text-sm leading-6 shadow-lg  ring-gray-900/5">
            <div className="p-4">
              {user === null ? authenticationRoute : userAccount}

              {/* Your Account Routes */}
              <h4 className="text-left px-4 font-medium  mt-2 mb-2">
                {t("auth.yourAccount")}
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
              <h4 className="text-left  px-4 font-medium mt-2 mb-2">
                {t("auth.accountSettings")}
              </h4>
              {accSettingsNavigation.map((accSettings) => (
                <MenuItemsCard
                  key={accSettings.navLink}
                  navigationLink={REDUCED_CHARS(accSettings.navLink)}
                  navigationRoute={accSettings.navRoute}
                  icon={accSettings.iconName}
                />
              ))}
              {/* Customer Line Route */}
              <h4 className="text-left  px-4 font-medium mt-4 mb-2">
                {t("auth.needHelp")}
              </h4>
              <MenuItemsCard
                navigationRoute="my-account/landing/customer-service"
                navigationLink={t("auth.customerService")}
                icon={chatbubblesOutline}
              />

              {user && (
                <button
                  className="bg-red-500 text-white px-4 py-2 rounded-lg mt-4"
                  onClick={handleUserSignOut}
                >
                  {t("auth.logout")}
                </button>
              )}
            </div>
          </div>
        </PopoverPanel>
      </Transition>
    </Popover>
  );
}

const REDUCED_CHARS = (name) => {
  const MAX_CHARS = 20;
  if (name.length > MAX_CHARS) {
    return `${name.slice(0, MAX_CHARS)}...`;
  }
  return name;
};
