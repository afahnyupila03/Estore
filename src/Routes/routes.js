import { NavbarRoutes } from "./NavbarRoutes"
import { ProductDetailsRoute } from "./productsDetailsRoute";
import { CategoryRoute } from "./CategoryRoute";

export const routes = [
  ...NavbarRoutes,
  ...ProductDetailsRoute,
  ...CategoryRoute,
];
