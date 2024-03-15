export const NavbarRoutes = (t) => [
  {
    navLink: "Home",
    navRoute: "/home",
  },
  {
    navLink: "Shop",
    navRoute: "shop",
  },
  {
    navLink: "About",
    navRoute: "about",
  },
  {
    navLink: "Latest",
    navRoute: "latest",
  },
  {
    navLink: "Blog",
    navRoute: "blog",
  },
  {
    navLink: "Contact",
    navRoute: "contact",
  },
];

export const AuthRoute = (t) => [
  {
    navLink: "Sign In | Create Account",
    navRoute: "/sign-in-&-create-account",
  },
];

export const UserAccountRoute = (t, userName) => [
  {
    navLink: `${userName}'s Account`,
    navRoute: "my-account/landing/password-&-personal-information",
  },
];

export const AccountRoutes = (
  t,
  cubeOutline,
  heartOutline,
  cardOutline,
  bicycleOutline
) => [
  {
    iconName: cubeOutline,
    navRoute: "my-account/landing/purchases",
    navLink: "Purchases",
  },
  {
    iconName: heartOutline,
    navRoute: "my-account/landing/wish-lists",
    navLink: "Wish List",
  },
  {
    iconName: bicycleOutline,
    navRoute: "my-account/landing/delivery",
    navLink: "Delivery",
  },
  {
    iconName: cardOutline,
    navRoute: "my-account/landing/payment-method",
    navLink: "Payment Method",
  },
];

export const AccountSettingsRoutes = (t, mailOutline, lockClosedOutline) => [
  {
    iconName: lockClosedOutline,
    navLink: "Password & Personal Info",
    navRoute: "my-account/landing/password-&-personal-information",
  },
  {
    iconName: mailOutline,
    navLink: "Email & Mail Preferences",
    navRoute: "my-account/landing/email-&-mail-preferences",
  },
];

export const CustomerServiceRoutes = (t) => [
  {
    navLink: "Contact Us",
    navRoute: "contact",
  },
  {
    navLink: "Order Status",
    navRoute: "order-status",
  },
  {
    navLink: "Delivery",
    navRoute: "delivery",
  },
  {
    navLink: "Return Policy & Exchanges",
    navRoute: "return-policy-&-exchanges",
  },
  {
    navLink: "Price Adjustments",
    navRoute: "price-adjustments",
  },
  {
    navLink: "Gift Cards",
    navRoute: "gift-cards",
  },
  {
    navLink: "FAQ",
    navRoute: "FAQ",
  },
  {
    navLink: "Product Recalls",
    navRoute: "product-recalls",
  },
];

export const AboutRoutes = (t) => [
  { navLink: "All Brands", navRoute: "brands" },
  { navLink: "Careers", navRoute: "careers" },
  {
    navLink: "Corporate Social Responsibility",
    navRoute: "corporate-social-responsibility",
  },
  {
    navLink: "Diversity, Equity, Inclusion & Belonging",
    navRoute: "diversity-equity-inclusion-&-belonging",
  },
  { navLink: "Get Email Updates", navRoute: "email-updates" },
  { navLink: "TimeZone Blog", navRoute: "blog" },
  { navLink: "The Thread", navRoute: "thread" },
  { navLink: "TimeZone Podcast", navRoute: "podcast" },
];
