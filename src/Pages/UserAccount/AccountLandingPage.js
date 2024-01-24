import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { auth } from "../../FirebaseConfigs/Firesbase";
import { IonIcon } from "@ionic/react";
import {
  addOutline,
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
import Card from "./Components/Card";
import { Routes, Route, Link, Outlet } from "react-router-dom";
import { AccountRoute } from "../../Routes/AccountRoute";

const getFirstTwoLetters = (displayName) => {
  if (displayName) {
    const names = displayName.split(" ");
    if (names.length >= 2) {
      return names[0].substring(0, 1) + names[1].substring(0, 1);
    } else if (names.length === 1 && names[0].length >= 2) {
      return names[0].substring(0, 2);
    } else {
      return null; // or an appropriate default value
    }
  } else {
    return null; // or an appropriate default value
  }
};

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function AccountLandingPage() {
  const [authUser, setAuthUser] = useState(null);
  const { t } = useTranslation;

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

  useEffect(() => {
    const subscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setAuthUser(user);
      } else {
        setAuthUser(null);
      }
    });
    return () => {
      subscribe();
    };
  }, []);

  const displayName = authUser && authUser.displayName;

  const NAME_BAR = (
    <div className="flex items-center text-gray-300">
      {getFirstTwoLetters(displayName)}
      <p>{displayName}'s Account</p>
    </div>
  );

  return (
    <div className="flex h-screen bg-gray-100">
      <div className="w-80 bg-gray-800">
        <ul className="py-6 space-y-8">
          <li>
            <ul className="text-gray-300 flex justify-center text-xl font-semibold font-mono items-center">
              <p className="rounded-full mr-2 p-2 bg-red-500">
                {getFirstTwoLetters(displayName)}
              </p>
              <p>{displayName}'s Account</p>
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
        </ul>
      </div>
      <div className="flex-1 bg-white">
        <header className="bg-white shadow">
          <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
            <div className="flex font-semibold font-mono tracking-wider uppercase text-white p-4 bg-gray-800 items-center text-lg justify-center">
              <span className="p-4 bg-red-500 rounded-full mr-2">
                {getFirstTwoLetters(displayName)}
              </span>

              <p>{displayName}</p>
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

export function PurchasePage() {
  return (
    <div>
      <h1>This is your purchase page</h1>
      <button>Make a purchase</button>
    </div>
  );
}

export function ContactPage() {
  return (
    <div>
      <h1>THis is our contact page</h1>
    </div>
  );
}
