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
    navRoute: "latest-products",
  },
  {
    navLink: t("navbar.blog"),
    navRoute: "blog",
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
    navLink: `${userName}`,
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
    navLink: t("home.priceAdjustment"),
    navRoute: "price-adjustments",
  },
  {
    navLink: t("home.giftCard"),
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

export const AccessoriesRoute = (t, kitchen, mobile, sports) => [
  {
    icon: kitchen,
    name: t("category.kitchenAccess"),
    route: "/shop/kitchen-accessories",
  },
  {
    icon: mobile,
    name: t("category.mobileAccess"),
    route: "/shop/mobile-accessories",
  },
  {
    icon: sports,
    name: t("category.sportsAccess"),
    route: "/shop/sports-accessories",
  },
];

export const AutoMobileRoutes = (t, vehicle, bike) => [
  {
    icon: bike,
    name: t("category.motorcycle"),
    route: "/shop/motorcycle",
  },
  {
    icon: vehicle,
    name: t("category.vehicle"),
    route: "/shop/vehicle",
  },
];

export const ElectronicRoutes = (t, laptop, smartphone, tablet) => [
  {
    icon: laptop,
    name: t("category.laptops"),
    route: "/shop/laptops",
  },
  {
    icon: smartphone,
    name: t("category.smartphones"),
    route: "/shop/smartphones",
  },
  {
    icon: tablet,
    name: t("category.tablets"),
    route: "/shop/tablets",
  },
];

export const MenRoutes = (t, footwear, shirts, watches) => [
  {
    icon: footwear,
    name: t("category.menFoot"),
    route: "/shop/mens-shoes",
  },
  {
    icon: shirts,
    name: t("category.menShirts"),
    route: "/shop/mens-shirts",
  },
  {
    icon: watches,
    name: t("category.menWatches"),
    route: "/shop/mens-watches",
  },
];

export const WomenRoutes = (
  t,
  beauty,
  bags,
  cloths,
  footwear,
  jewelry,
  watches
) => [
  {
    icon: beauty,
    name: t("category.beauty"),
    route: "/shop/beauty",
  },
  {
    icon: bags,
    name: t("category.womenBags"),
    route: "/shop/womens-bags",
  },
  {
    icon: cloths,
    name: t("category.womenCloths"),
    route: "/shop/womens-dresses",
  },
  {
    icon: footwear,
    name: t("category.womenFoot"),
    route: "/shop/womens-shoes",
  },
  {
    icon: jewelry,
    name: t("category.womenJewelry"),
    route: "/shop/womens-jewellery",
  },
  {
    icon: cloths,
    name: t("category.tops"),
    route: "/shop/tops",
  },
  {
    icon: watches,
    name: t("category.womenWatches"),
    route: "/shop/womens-watches",
  },
];
