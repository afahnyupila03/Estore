import { onAuthStateChanged, signOut } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { auth } from "../../FirebaseConfigs/Firesbase";

export default function PersonalInformation() {
  const [userEmail, setUserEmail] = useState(null);
  const [userName, setUserName] = useState(null);

  useEffect(() => {
    const subscribed = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserEmail(user.email);
        setUserName(user.displayName);
        console.log("user-email:", user.email);
      } else {
        setUserEmail(null);
        setUserName(null);
      }
    });
    return () => {
      subscribed();
    };
  }, []);

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        console.log("Signed out successfully.");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error(errorCode, errorMessage);
      });
  };

  return (
    <div>
      {/* Password & Personal Information */}
      <div>
        <h1 className="text-2xl font-semibold font-mono">
          Password & Personal Information
        </h1>
        <div>
          <div>
            <p>
              This information is the same at: <br />
              <span className="text-2xl font-semibold font-mono">TIMEZONE</span>
            </p>
          </div>

          <div>
            <h1>Sign-in info</h1>
            <p>
              Email : <span className="text-red-700">{userEmail}</span>
            </p>
            <div>
              <label htmlFor="email">Email: </label>
              <input value={userEmail} />
              <button>Change email</button>
            </div>
            <div>
              <label htmlFor="password">Password</label>
              <button>Change password</button>
            </div>
          </div>
        </div>
      </div>

      {/* Personal Information */}
      <div>
        <h1 className="text-2xl font-semibold font-mono">
          Personal Information
        </h1>
        <div>
          <label htmlFor="name">Name</label>
          <input value={userName} />
          <button>Edit</button>
        </div>
      </div>

      {/* Security */}
      <div>
        <h1 className="text-2xl font-semibold font-mono">Security</h1>
        <p>Logout of your account</p>
        <button onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
}
