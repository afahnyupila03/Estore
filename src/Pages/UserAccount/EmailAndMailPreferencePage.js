import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { auth } from "../../FirebaseConfigs/Firesbase";
import { getFirstTwoLetters } from "./AccountLandingPage";
import { Link } from "react-router-dom";

// className="grid justify-center"

export const BRAND = "TIME ZONE";

export default function EmailAndMailPreferencePage() {
  const [userEmail, setUserEmail] = useState(null);
  console.log("Formik data:", userEmail);
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
      <h1 className="text-4xl font-semibold font-mono">
        Email & Mail Preferences
      </h1>
      <hr className="w-full border-gray-500" />

      <div>
        <h1 className="text-xl mt-8">
          <span className="font-bold">{getFirstTwoLetters(BRAND)}</span>
          Hear about sales and more at <span>TIMEZONE</span>.
        </h1>
        <div className="mt-8 font-mono text-lg">
          <h1 className="mb-2">Email</h1>
          <h1 className="mb-4">{userEmail}</h1>
          <Link to="/my-account/landing/password-&-personal-information">
            Edit
          </Link>
          <hr className="w-10 border-black" />
        </div>
      </div>
    </div>
  );
}
