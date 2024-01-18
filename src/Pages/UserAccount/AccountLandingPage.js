import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { auth } from "../../FirebaseConfigs/Firesbase";

import { addOutline } from "ionicons/icons";
import Card from "./Components/Card";

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

export default function AccountLandingPage() {
  const [authUser, setAuthUser] = useState(null);

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
    <div className="m-20 p-20 text-3xl">
      <div className="flex justify-center items-center">
        <h1 className="mr-6 p-4 bg-red-500 rounded-full text-white">
          {getFirstTwoLetters(displayName)}
        </h1>
        <h1>{displayName}'s Account</h1>
      </div>
      <h1>This is your account landing page</h1>

      <Card
        title="Hello"
        link="First Link"
        cardText="Hello, this is your first entry"
        icon={addOutline}
        actionLink="Action 1"
        link2="Link 2"
      />

      <div className="mt-6">
        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-1 lg:grid-cols-2 xl:gap-x-8">
          <Card
            title="Hello"
            link="First Link"
            cardText="Hello, this is your first entry"
            icon={addOutline}
            actionLink="Action 1"
            link2="Link 2"
          />
          <Card
            title="Hello"
            link="First Link"
            cardText="Hello, this is your first entry"
            icon={addOutline}
            actionLink="Action 1"
            link2="Link 2"
            link2Style={{
              padding: ".4rem",
              backgroundColor: "black",
              color: "white",
            }}
            className="center"
          />
        </div>
      </div>
    </div>
  );
}
