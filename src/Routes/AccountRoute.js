import AccountLandingPage from "../Pages/UserAccount/AccountLandingPage";
import ContactPage from "../Pages/UserAccount/ContactPage";
import DeliveryPage from "../Pages/UserAccount/DeliveryPage";
import EmailAndMailPreferencePage from "../Pages/UserAccount/EmailAndMailPreferencePage";
import PaymentMethodPage from "../Pages/UserAccount/PaymentMethodPage";
import PersonalInformation from "../Pages/UserAccount/PersonalInformation";
import PurchasePage from "../Pages/UserAccount/PurchasePage";
import SinglePurchasePage from "../Pages/UserAccount/SinglePurchasePage";
import WishlistPage from "../Pages/UserAccount/WishlistPage";

export const AccountRoute = [
  {
    path: "my-account/landing/*",
    element: <AccountLandingPage />,
    children: [
      {
        path: "purchases",
        element: <PurchasePage />,
      },
      {
        path: "wish-lists",
        element: <WishlistPage />,
      },
      {
        path: "delivery",
        element: <DeliveryPage />,
      },
      {
        path: "payment-method",
        element: <PaymentMethodPage />,
      },
      {
        path: "password-&-personal-information",
        element: <PersonalInformation />,
      },
      {
        path: "email-&-mail-preferences",
        element: <EmailAndMailPreferencePage />,
      },
      {
        path: "customer-service",
        element: <ContactPage />,
      },
    ],
  },
];
