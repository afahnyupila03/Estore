import ShopHome from "../Components/Shop/ShopHome/shop-home";
import Watches from "../Components/Watches/Watches";
import About from "../Pages/About/About";
import Blog from "../Pages/Blog/Blog";
import Contact from "../Pages/Contact/Contact";
import FashionAccessories from "../Pages/FashionAccess/FashionAccessories";
import GetCoupon from "../Pages/Coupons/GetCoupon";
import Home from "../Pages/Home/Home";
import ManAccessories from "../Pages/ManAccess/ManAccessories";
import OffersAndDiscounts from "../Pages/OfferAndDiscount/OffersAndDiscounts";
import PrivacyPolicy from "../Pages/PrivacyPolicy/PrivacyPolicy";
import ReportIssue from "../Pages/ReportIssue/ReportIssue";
import RubberToys from "../Pages/RubberToys/RubberToys";
import Shop from "../Pages/Shop/Shop";
import TermsAndCondition from "../Pages/Terms&Condition/TermsAndCondition";
import WomanCloth from "../Pages/WomanCloth/WomanCloth";
import CartPage from "../Pages/CartPage/cart-page";
import ProductDetails from "../Pages/product-details";
import FAQ from "../Pages/FAQ/FAQ";
import Latest from "../Pages/Latest/Latest";

export const routes = [
  {
    path: "/",
    index: true,
    element: <Home />,
  },
  // Navbar Page Links
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
  // Product Detail Page Link
  {
    path: "/product-details/:productId",
    element: <ProductDetails />,
  },
  // Footer Page Links
  {
    path: "/rubber-toys",
    element: <RubberToys />,
  },
  {
    path: "/woman-cloth",
    element: <WomanCloth />,
  },
  {
    path: "/fashion-accessories",
    element: <FashionAccessories />,
  },
  {
    path: "/man-accessories",
    element: <ManAccessories />,
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
    path: "/faq",
    element: <FAQ />,
  },
  {
    path: "/get-coupons",
    element: <GetCoupon />,
  },
  {
    path: "/offers-&-discounts",
    element: <OffersAndDiscounts />,
  },
  {
    path: "/privacy-policy",
    element: <PrivacyPolicy />,
  },
  {
    path: "/report-payment-issue",
    element: <ReportIssue />,
  },
  {
    path: "/terms-&-conditions",
    element: <TermsAndCondition />,
  },
];
