import { getFirstTwoLetters } from "./AccountLandingPage";
import { Link } from "react-router-dom";
import { useAuth } from "../../Store";

// className="grid justify-center"

export const BRAND = "TIME ZONE";

export default function EmailAndMailPreferencePage() {
  const { user } = useAuth();

  const userEmail = user?.email;

  return (
    <div>
      <h1 className="text-4xl font-semibold font-mono">
        Email & Mail Preferences
      </h1>
      <hr className="w-full border-gray-500" />

      <div>
        <h1 className="text-xl mt-8">
          <span className="font-bold mr-2">{getFirstTwoLetters(BRAND)}</span>
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
