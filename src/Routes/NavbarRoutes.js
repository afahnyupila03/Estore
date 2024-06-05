import Blog from "../Pages/Blog/Blog";
import Shop from "../Pages/Shop/Shop";
import Latest from "../Pages/Latest/Latest";
import Home from "../Pages/Home/Home";
import About from "../Pages/About/About";
import CartPage from "../Pages/CartPage/CartPage";
import AuthPage from "../Pages/Auth/Auth";
import ProductDetails from "../Pages/ProductDetails/ProductDetails";
import CategoryPage from "../Pages/Category/Category";
import CheckOutForm from "../Pages/CartPage/CheckOutForm";
import FAQ from "../Pages/Home/Layout/FAQ";

export const NavbarRoutes = [
  {
    path: "/",
    index: true,
    element: <Home />,
  },
  {
    path: "/category/:category", // Static part of the path
    element: <CategoryPage />,
  },
  {
    path: "/home",
    element: <Home />,
  },
  {
    path: "/home/product-details/:id/:title",
    element: <ProductDetails />,
  },
  {
    path: "/home/shop",
    element: <Shop />,
  },
  {
    path: "/shop",
    element: <Shop />,
  },

  {
    path: "/about",
    element: <About />,
  },
  {
    path: "/blog",
    element: <Blog />,
  },
  {
    path: "/latest-products",
    element: <Latest />,
  },
  {
    path: "/cart/sign-in-&-create-account",
    element: <AuthPage />,
  },
  {
    path: "/cart",
    element: <CartPage />,
  },
  {
    path: "/checkout-form",
    element: <CheckOutForm />,
  },
  {
    path: "/sign-in-&-create-account",
    element: <AuthPage />,
  },
  {
    path: "/FAQ",
    element: <FAQ />,
  },
];
