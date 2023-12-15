import ShopHome from "../../Components/Shop/ShopHome/shop-home";
import Watches from "../../Components/Watches/Watches";
import Blog from "../../Pages/Blog/Blog";
import Contact from "../../Pages/Contact/Contact";
import Shop from "../../Pages/Shop/Shop";
import WomanCloth from "../../Pages/WomanCloth/WomanCloth";
import Latest from "../../Pages/Latest/Latest";
import RubberToys from "../../Pages/RubberToys/RubberToys";
import Home from "../../Pages/Home/Home";
import ManAccessories from "../../Pages/ManAccess/ManAccessories";
import FashionAccessories from "../../Pages/FashionAccess/FashionAccessories";
import About from "../../Pages/About/About";
import CartPage from "../../Pages/CartPage/cart-page";
import Login from "../../Pages/Auth/Auth";

export const NavbarRoutes = [
  {
    path: "/",
    index: true,
    element: <Home />,
  },
  {
    path: "/home",
    element: <Home />,
    children: [
      {
        path: "/home/shop",
        element: <Shop />
      }
    ]
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
    path: '/sign-in-&-create-account',
    element: <Login />
  }
];
