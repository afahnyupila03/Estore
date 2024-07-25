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
import { Routes, Route, Link, Outlet, useLocation } from "react-router-dom";
import { AccountRoute } from "../../Routes/AccountRoute";
import { useAuth } from "../../Store";
import { useTranslation } from "react-i18next";
import { Fragment } from "react";
import { t } from "i18next";

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

const routeTitles = (t) => ({
  "/my-account/landing/password-&-personal-information": t(
    "auth.password&Personal"
  ),
  "/my-account/landing/purchases": t("auth.purchases"),
  "/my-account/landing/wish-lists": t("auth.wishList"),
  "/my-account/landing/delivery": t("auth.delivery"),
  "/my-account/landing/payment-method": t("auth.paymentMethod"),
  "/my-account/landing/email-&-mail-preferences": t("auth.email&Mail"),
  "/my-account/landing/customer-service": t("auth.customerService"),
});

export default function AccountLandingPage() {
  const { t } = useTranslation();

  const location = useLocation();
  const currPath = location.pathname;
  const title = routeTitles(t)[currPath];

  return (
      <div className="flex-1 bg-white">
        <main>
          <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
            <p className="text-xl mb-4 font-medium text-gray-800">
              {t("auth.yourAccount")} &gt;{" "}
              <span className="underline">{title}</span>
            </p>
          </div>
          <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
            <Outlet />
          </div>
        </main>
      </div>
  );
}
