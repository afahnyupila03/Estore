import { onAuthStateChanged } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { auth } from "../../FirebaseConfigs/Firesbase";

export default function PersonalInformation() {
  const [userEmail, setUserEmail] = useState(null);

  useEffect(() => {
    const subscribed = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserEmail(user.email);
        console.log("user-email:", user.email);
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
      <h1>Password & Personal Information</h1>
      <div>
        <div>
          <p>
            This information is the same at: <br />
            <span>TIMEZONE</span>
          </p>
        </div>

        <div>
          <h1>Sign-in info</h1>
          <p>
            Email : <span className="text-red-700">{userEmail}</span>
          </p>
          <div>
            <label forHtml="email">Email: </label>
            <input value={userEmail} />
          </div>
        </div>
      </div>
    </div>
  );
}
