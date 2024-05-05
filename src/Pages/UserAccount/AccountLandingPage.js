import { IonIcon } from "@ionic/react";
import {
  bicycleOutline,
  cardOutline,
  chatbubbleOutline,
  cubeOutline,
  heartOutline,
  lockClosedOutline,
  mailOutline,
} from "ionicons/icons";
import { NAV_CONST } from "./Components/AccountNavConst";
import { Routes, Route, Link, Outlet } from "react-router-dom";
import { AccountRoute } from "../../Routes/AccountRoute";
import { useAuth } from "../../Store";
import { useTranslation } from "react-i18next";

export const getFirstTwoLetters = (displayName) => {
  if (displayName) {
    const names = displayName.split(" ");
    if (names.length >= 2) {
      return names[0].substring(0, 1) + names[1].substring(0, 1);
    } else if (names.length === 1 && names[0].length >= 2) {
      return names[0].substring(0, 2);
    } else {
      return null;
    }
  } else {
    return null;
  }
};

export default function AccountLandingPage() {
  const { user, signOutHandler } = useAuth();

  const { t } = useTranslation();

  const userName = user?.displayName;

  const navigation = NAV_CONST(
    t,
    bicycleOutline,
    cardOutline,
    chatbubbleOutline,
    cubeOutline,
    heartOutline,
    lockClosedOutline,
    mailOutline
  );

  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }

  const handleLogout = async () => {
    try {
      await signOutHandler();
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {user !== null && (
        <div
          className="w-100 bg-gray-800 rounded-r"
          style={{ marginBottom: "-10rem" }}
        >
          <ul className="py-6 space-y-8">
            <li>
              <ul className="text-gray-300 flex justify-center text-xl font-semibold font-mono items-center">
                <p className="rounded-full mr-2 p-2 bg-red-500">
                  {getFirstTwoLetters(userName)}
                </p>
                <p>{userName}'s Account</p>
              </ul>
            </li>
            {navigation.map((item) => (
              <li key={item.name}>
                <Link
                  to={item.href}
                  className={classNames(
                    item.current
                      ? "text-white font-bold"
                      : "text-gray-300 hover:text-white",
                    "flex justify-start pl-10 pr-2 py-2 font-mono items-center text-xl"
                  )}
                >
                  <IonIcon
                    icon={item.icon}
                    className="mr-4"
                    style={{ fontSize: "1.5rem" }}
                  />
                  {REDUCE_TITLE(item.name)}
                </Link>
              </li>
            ))}

            <li className="flex justify-center items-center">
              {user !== null && (
                <button
                  onClick={handleLogout}
                  className="p-4 text-white bg-gray-500 rounded-lg"
                >
                  {t("auth.logout")}
                </button>
              )}
            </li>
          </ul>
        </div>
      )}
      <div className="flex-1 bg-white">
        <main>
          <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
            <Routes>
              {AccountRoute.map((route) => (
                <Route
                  key={route.path}
                  path={route.path}
                  element={route.element}
                />
              ))}
            </Routes>
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}

const REDUCE_TITLE = (title) => {
  const MAX = 20;
  if (title.length > MAX) {
    return `${title.slice(0, MAX)}...`;
  }
  return title;
};
