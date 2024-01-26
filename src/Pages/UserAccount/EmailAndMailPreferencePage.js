import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { auth } from "../../FirebaseConfigs/Firesbase";
import { getFirstTwoLetters } from "./AccountLandingPage";

export const BRAND = "TIME ZONE";

export default function EmailAndMailPreferencePage() {
  const [userEmail, setUserEmail] = useState(null);
  useEffect(() => {
    const subscribed = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserEmail(user.email);
      } else {
        setUserEmail(null);
      }
    });
    return () => {
      subscribed();
    };
  }, []);

  return (
    <div>
      <h1>Email & Mail Preferences</h1>
      <div>
        <h1>
          {getFirstTwoLetters(BRAND)} Here about sales and more at{" "}
          <span>TIMEZONE</span>.
        </h1>
        <div>
          <label htmlFor="email">Email : </label>
          <input type="email" value={userEmail} />
          <button>Edit</button>
        </div>
        <input type="radio" />
      </div>
    </div>
  );
}
