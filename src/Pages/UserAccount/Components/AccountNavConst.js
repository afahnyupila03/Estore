export const NAV_CONST = (
  t,
  bicycleOutline,
  cardOutline,
  chatbubbleOutline,
  cubeOutline,
  heartOutline,
  lockClosedOutline,
  mailOutline,
) => [
  {
    name: t("auth.purchases"),
    href: "purchases",
    current: false,
    icon: cubeOutline,
  },
  {
    name: t("auth.wishList"),
    href: "wish-lists",
    current: false,
    icon: heartOutline,
  },
  {
    name: t("auth.delivery"),
    href: "delivery",
    current: false,
    icon: bicycleOutline,
  },
  {
    name: t("auth.paymentMethod"),
    href: "payment-method",
    current: false,
    icon: cardOutline,
  },
  {
    name: t("auth.password&Personal"),
    href: "password-&-personal-information",
    current: false,
    icon: lockClosedOutline,
  },
  {
    name: t("auth.email&Mail"),
    href: "email-&-mail-preferences",
    current: false,
    icon: mailOutline,
  },
  {
    name: t("auth.customerService"),
    href: "customer-service",
    current: false,
    icon: chatbubbleOutline,
  },
];
