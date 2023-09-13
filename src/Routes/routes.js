import { NavbarRoutes } from "./NavbarRoutes/NavbarRoutes"
import { FooterRoutes } from "./FooterRoutes/FooterRoutes"
import { ProductDetailsRoute } from "./ProductDetails/productsDetailsRoute";

export const routes = [
  ...NavbarRoutes,
  ...ProductDetailsRoute,
  ...FooterRoutes
];
