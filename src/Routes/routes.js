

import ProductDetails from "../Pages/product-details";

import { NavbarRoutes } from "./NavbarRoutes/NavbarRoutes"
import { FooterRoutes } from "./FooterRoutes/FooterRoutes"

export const routes = [
  ...NavbarRoutes,
  // Product Detail Page Link
  {
    path: "/product-details/:productId",
    element: <ProductDetails />,
  },
  // Footer Page Links
  ...FooterRoutes
];
