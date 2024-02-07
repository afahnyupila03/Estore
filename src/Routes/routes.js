import { NavbarRoutes } from "./NavbarRoutes"
import { ProductDetailsRoute } from "./productsDetailsRoute";
import { CategoryRoute } from "./CategoryRoute";
import { AccountRoute } from "./AccountRoute";

export const routes = [
  ...NavbarRoutes,
  ...ProductDetailsRoute,
  ...CategoryRoute,
  ...AccountRoute,
];
