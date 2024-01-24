import AccountLandingPage, {
  ContactPage,
  PurchasePage,
} from "../Pages/UserAccount/AccountLandingPage";
import PersonalInformation from "../Pages/UserAccount/PersonalInformation";

export const AccountRoute = [
  {
    path: "my-account/landing",
    element: <AccountLandingPage />,
    children: [
      {
        path: "purchases",
        element: <PurchasePage />,
      },
      {
        path: "wish-lists",
        element: <AccountLandingPage />,
      },
      {
        path: "delivery",
        element: <AccountLandingPage />,
      },
      {
        path: "payment-method",
        element: <AccountLandingPage />,
      },
      {
        path: "password-&-personal-information",
        element: <PersonalInformation />,
      },
      {
        path: "email-&-mail-preferences",
        element: <AccountLandingPage />,
      },
      {
        path: "contact-us",
        element: <ContactPage />,
      },
    ],
  },
];
