export const NavbarRoutes = (t) => [
  {
    navLink: t("navbar.home"),
    navRoute: "/home",
  },
  {
    navLink: t("navbar.shop"),
    navRoute: "shop",
  },
  {
    navLink: t("navbar.about"),
    navRoute: "about",
  },
  {
    navLink: t("navbar.latest"),
    navRoute: "latest",
  },
  {
    navLink: t("navbar.blog"),
    navRoute: "blog",
  },
  {
    navLink: t("navbar.contact"),
    navRoute: "contact",
  },
];

export const AuthRoute = (t) => [
  {
    navLink: t("auth.signInCreate"),
    navRoute: "/sign-in-&-create-account",
  },
];

export const UserAccountRoute = (t, userName) => [
  {
    navLink: `${t("auth.account")} ${userName}`,
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
    navLink: t("auth.purchases"),
  },
  {
    iconName: heartOutline,
    navRoute: "my-account/landing/wish-lists",
    navLink: t("auth.wishList"),
  },
  {
    iconName: bicycleOutline,
    navRoute: "my-account/landing/delivery",
    navLink: t("auth.delivery"),
  },
  {
    iconName: cardOutline,
    navRoute: "my-account/landing/payment-method",
    navLink: t("auth.paymentMethod"),
  },
];

export const AccountSettingsRoutes = (t, mailOutline, lockClosedOutline) => [
  {
    iconName: lockClosedOutline,
    navLink: t("auth.password&Personal"),
    navRoute: "my-account/landing/password-&-personal-information",
  },
  {
    iconName: mailOutline,
    navLink: t("auth.email&Mail"),
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
