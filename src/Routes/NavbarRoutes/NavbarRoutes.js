import Watches from "../../Components/Watches/Watches";
import Blog from "../../Pages/Blog/Blog";
import Contact from "../../Pages/Contact/Contact";
import WomanCloth from "../../Pages/WomanCloth/WomanCloth";
import Latest from "../../Pages/Latest/Latest";
import RubberToys from "../../Pages/RubberToys/RubberToys";
import Home from "../../Pages/Home/Home";
import ManAccessories from "../../Pages/ManAccess/ManAccessories";
import FashionAccessories from "../../Pages/FashionAccess/FashionAccessories";
import About from "../../Pages/About/About";
import ShopCorporateGifts from "../../Pages/Shop/ShopCorporateGifts";
import ShopPage from "../../Pages/Shop/ShopPage";
import ShopHome from "../../Pages/Shop/ShopHome";
import CartPage from "../../Pages/Cart/CartPage";

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
    element: <ShopPage />,
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
      {
        path: "shop/shop-corporate-gifts",
        element: <ShopCorporateGifts />
      }
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
    path: '/cart',
    element: <CartPage />
  }
];
