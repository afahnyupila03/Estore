import { onAuthStateChanged, signOut } from "firebase/auth";
import { useEffect, useState } from "react";
import { auth } from "../../FirebaseConfigs/Firesbase";
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
import { useTranslation } from "react-i18next";
import { Routes, Route, Link, Outlet } from "react-router-dom";
import { AccountRoute } from "../../Routes/AccountRoute";
import { useAuth } from "../../Store";

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

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function AccountLandingPage() {
  const { user, signOutHandler } = useAuth();
  const { t } = useTranslation;

  const userName = user?.displayName;

  const navigation = NAV_CONST(
    bicycleOutline,
    cardOutline,
    chatbubbleOutline,
    cubeOutline,
    heartOutline,
    lockClosedOutline,
    mailOutline,
    t
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
                {item.name}
              </Link>
            </li>
          ))}

          <li className="flex justify-center items-center">
            <button
              onClick={handleLogout}
              className="p-4 text-white bg-gray-500 rounded-lg"
            >
              Logout
            </button>
          </li>
        </ul>
      </div>
      <div className="flex-1 bg-white">
        <header>
          <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
            <div className="flex font-semibold font-mono tracking-wider rounded uppercase text-white p-4 bg-gray-800 items-center text-lg justify-center">
              <span className="p-4 bg-red-500 rounded-full mr-2">
                {getFirstTwoLetters(userName)}
              </span>

              <p>{userName}</p>
            </div>
          </div>
        </header>
        <main>
          <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
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
