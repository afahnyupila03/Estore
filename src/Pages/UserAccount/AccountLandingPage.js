import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState, Fragment } from "react";
import { auth } from "../../FirebaseConfigs/Firesbase";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import {
  notifications,
  pulseOutline,
  pencilOutline,
  starOutline,
} from "ionicons/icons";
import { IonIcon } from "@ionic/react";

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

const user = {
  name: "Tom Cook",
  email: "tom@example.com",
  imageUrl:
    "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
};
const navigation = [
  { name: "Dashboard", href: "#", current: true },
  { name: "Team", href: "#", current: false },
  { name: "Projects", href: "#", current: false },
  { name: "Calendar", href: "#", current: false },
  { name: "Reports", href: "#", current: false },
];
const userNavigation = [
  { name: "Your Profile", href: "#" },
  { name: "Settings", href: "#" },
  { name: "Sign out", href: "#" },
];

export default function AccountLandingPage() {
  const [authUser, setAuthUser] = useState(null);
  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }

  useEffect(() => {
    const userName = onAuthStateChanged(auth, (user) => {
      if (user) {
        setAuthUser(user);
      } else {
        setAuthUser(null);
      }
    });
    return () => {
      userName();
    };
  }, []);

  const displayName = authUser && authUser.displayName;

  return (
    <div className="flex h-screen bg-gray-100">
      <div className="w-40 bg-gray-800">
        <ul className="py-6 space-y-8">
          {navigation.map((item) => (
            <li key={item.name}>
              <a
                href={item.href}
                className={classNames(
                  item.current
                    ? "text-white font-bold"
                    : "text-gray-300 hover:text-white",
                  "block pl-4 pr-2 py-2"
                )}
              >
                {item.name}
              </a>
            </li>
          ))}
        </ul>
      </div>
      <div className="flex-1 bg-white">
        <main className="p-8">
          {getFirstTwoLetters(displayName)}
          <p>{displayName}'s Account</p>
          <p>Hello Pila</p>
        </main>
      </div>
    </div>
  );
}
