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
import Login from "../../Pages/Login/Login";

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
    path: "/shop",
    element: <Shop />,
    children: [
      {
        path: "/shop",
        element: <ShopHome />,
      },
      {
        path: "/shop/watches",
        element: <Watches />,
      },
      {
        path: "/shop/woman-cloth",
        element: <WomanCloth />,
      },
      {
        path: "/shop/man-accessories",
        element: <ManAccessories />,
      },
      {
        path: "/shop/fashion-accessories",
        element: <FashionAccessories />,
      },
      {
        path: "/shop/rubber-toys",
        element: <RubberToys />,
      },
    ],
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
  // {
  //   path: "/login",
  //   element: <Login />
  // },
  // {path: "/sign-up"}
];
