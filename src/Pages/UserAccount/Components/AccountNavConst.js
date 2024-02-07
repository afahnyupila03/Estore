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
    href: "purchases",
    current: false,
    icon: cubeOutline,
  },
  {
    name: "Wish lists",
    href: "wish-lists",
    current: false,
    icon: heartOutline,
  },
  {
    name: "Delivery",
    href: "delivery",
    current: false,
    icon: bicycleOutline,
  },
  {
    name: "Payment Method",
    href: "payment-method",
    current: false,
    icon: cardOutline,
  },
  {
    name: "Password & Personal Infor",
    href: "password-&-personal-information",
    current: false,
    icon: lockClosedOutline,
  },
  {
    name: "Email & Mail Preferences",
    href: "email-&-mail-preferences",
    current: false,
    icon: mailOutline,
  },
  {
    name: "Customer Service",
    href: "customer-service",
    current: false,
    icon: chatbubbleOutline,
  },
];
