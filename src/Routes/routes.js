import { NavbarRoutes } from "./NavbarRoutes/NavbarRoutes";
import { FooterRoutes } from "./FooterRoutes/FooterRoutes";
import { ProductDetailsRoute } from "./ProductDetails/productsDetailsRoute";
import { ShopCorporate } from "./HomeLinks";
import { AboutRoutes } from "./AboutRoutes";

export const routes = [
  ...NavbarRoutes,
  ...ProductDetailsRoute,
  ...FooterRoutes,
  ...ShopCorporate,
  ...AboutRoutes
];
