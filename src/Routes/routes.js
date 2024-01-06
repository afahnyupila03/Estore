import { NavbarRoutes } from "./NavbarRoutes/NavbarRoutes"
import { ProductDetailsRoute } from "./ProductDetails/productsDetailsRoute";
import { CategoryRoute } from "./CategoryRoute";

export const routes = [
  ...NavbarRoutes,
  ...ProductDetailsRoute,
  ...CategoryRoute,
];
