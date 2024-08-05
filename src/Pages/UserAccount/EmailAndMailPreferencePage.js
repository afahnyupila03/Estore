import { getFirstTwoLetters } from "./AccountLandingPage";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../Store";
import { useTranslation } from "react-i18next";

// className="grid justify-center"

export const BRAND = "TIME ZONE";

export default function EmailAndMailPreferencePage() {
  const { user } = useAuth();

  const { t } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();

  const userEmail = user?.email;

  return (
    <div>
      <h1 className="text-4xl font-semibold font-mono">
        {t("auth.email&Mail")}
      </h1>
      <hr className="w-full border-gray-500" />

      {user === null ? (
        <div className="mt-8">
          <p className="mb-10 font-mono text-xl">
            {t("personalInfor.emailAuthMessage")}
          </p>
          <button
            className="bg-black text-center text-white py-6 px-14 rounded font-semibold font-mono"
            onClick={() =>
              navigate("/sign-in-&-create-account", {
                state: { from: location },
              })
            }
          >
            {t("auth.signInCreate")}
          </button>
        </div>
      ) : (
        <div>
          <h1 className="text-xl mt-8">
            <span className="font-bold mr-2">{getFirstTwoLetters(BRAND)}</span>
            {t("personalInfor.aboutSales")}
          </h1>
          <div className="mt-8 font-mono text-lg">
            <h1 className="mb-2">{t("checkoutForm.email")}</h1>
            <h1 className="mb-4">{userEmail}</h1>
            <Link to="/my-account/landing/password-&-personal-information">
              {t("delivery.edit")}
            </Link>
            <hr className="w-10 border-black" />
          </div>
        </div>
      )}
    </div>
  );
}
