import { NavbarRoutes } from "./NavbarRoutes"
import { ProductDetailsRoute } from "./productsDetailsRoute";
import { CategoryRoute } from "./CategoryRoute";
import { AccountRoute } from "./AccountRoute";
import { InvoiceRoute } from "./InvoiceRoute";

export const routes = [
  ...NavbarRoutes,
  ...ProductDetailsRoute,
  ...CategoryRoute,
  ...AccountRoute,
  ...InvoiceRoute
];
