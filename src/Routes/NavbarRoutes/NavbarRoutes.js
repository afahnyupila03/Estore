import Blog from "../../Pages/Blog/Blog";
import Contact from "../../Pages/Contact/Contact";
import Shop from "../../Pages/Shop/Shop";
import Latest from "../../Pages/Latest/Latest";
import Home from "../../Pages/Home/Home";
import About from "../../Pages/About/About";
import CartPage from "../../Pages/CartPage/cart-page";
import AuthPage from "../../Pages/Auth/Auth";
import ProductDetails from "../../Pages/ProductDetails/ProductDetails";

export const NavbarRoutes = [
  {
    path: "/",
    index: true,
    element: <Home />,
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
    path: "/contact",
    element: <Contact />,
  },
  {
    path: "/blog",
    element: <Blog />,
  },
  {
    path: "/latest",
    element: <Latest />,
  },
  {
    path: "/cart",
    element: <CartPage />,
  },
  {
    path: "/sign-in-&-create-account",
    element: <AuthPage />,
  },
];
