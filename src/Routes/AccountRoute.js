import AccountLandingPage from "../Pages/UserAccount/AccountLandingPage";

export const AccountRoute = [
  {
    path: "my-account/landing",
    element: <AccountLandingPage />,
    children: [
      {
        path: "my-account/landing/purchases",
        element: <AccountLandingPage />,
      },
      {
        path: "my-account/landing/wish-lists",
        element: <AccountLandingPage />,
      },
      {
        path: "my-account/landing/delivery",
        element: <AccountLandingPage />,
      },
      {
        path: "my-account/landing/payment-method",
        element: <AccountLandingPage />,
      },
      {
        path: "my-account/landing/password-&-personal-information",
        element: <AccountLandingPage />,
      },
      {
        path: "my-account/landing/email-&-mail-preferences",
        element: <AccountLandingPage />,
      },
      {
        path: "my-account/landing/contact-us",
        element: <AccountLandingPage />,
      },
    ],
  },
];
