export const NAV_CONST = (
  bicycleOutline,
  cardOutline,
  chatbubbleOutline,
  cubeOutline,
  heartOutline,
  lockClosedOutline,
  mailOutline,
  t
) => [
  {
    name: "Purchases",
    href: "/my-account/landing/purchases",
    current: false,
    icon: cubeOutline,
  },
  {
    name: "Wish lists",
    href: "/my-account/landing/wish-lists",
    current: false,
    icon: heartOutline,
  },
  {
    name: "Delivery",
    href: "/my-account/landing/delivery",
    current: false,
    icon: bicycleOutline,
  },
  {
    name: "Payment Method",
    href: "/my-account/landing/payment-method",
    current: false,
    icon: cardOutline,
  },
  {
    name: "Password & Personal Infor",
    href: "/my-account/landing/payment-method",
    current: false,
    icon: lockClosedOutline,
  },
  {
    name: "Email & Mail Preferences",
    href: "/my-account/landing/payment-method",
    current: false,
    icon: mailOutline,
  },
  {
    name: "Contact Us",
    href: "/my-account/landing/payment-method",
    current: false,
    icon: chatbubbleOutline,
  },
];
