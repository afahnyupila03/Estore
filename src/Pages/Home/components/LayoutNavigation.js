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
    navLink: t("home.contactUs"),
    navRoute: "contact",
  },
  {
    navLink: t("home.orderStatus"),
    navRoute: "order-status",
  },
  {
    navLink: t("auth.delivery"),
    navRoute: "delivery",
  },
  {
    navLink: t("home.returnPolicy"),
    navRoute: "return-policy-&-exchanges",
  },
  {
    navLink: t("home.priceAdjustments"),
    navRoute: "price-adjustments",
  },
  {
    navLink: t("home.giftCards"),
    navRoute: "gift-cards",
  },
  {
    navLink: t("home.FAQ"),
    navRoute: "FAQ",
  },
  {
    navLink: t("home.productRecalls"),
    navRoute: "product-recalls",
  },
];

export const AboutRoutes = (t) => [
  { navLink: t("home.allBrands"), navRoute: "brands" },
  { navLink: t("home.career"), navRoute: "careers" },
  {
    navLink: t("home.corporateSocial"),
    navRoute: "corporate-social-responsibility",
  },
  {
    navLink: t("home.diversity"),
    navRoute: "diversity-equity-inclusion-&-belonging",
  },
  { navLink: t("home.emailUpdates"), navRoute: "email-updates" },
  { navLink: t("home.timezoneBlog"), navRoute: "blog" },
  { navLink: t("home.theThread"), navRoute: "thread" },
  { navLink: t("home.timezonePodcast"), navRoute: "podcast" },
];
