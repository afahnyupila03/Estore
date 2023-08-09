import ShopHome from "../Components/Shop/ShopHome/shop-home";
import Watches from "../Components/Watches/Watches";
import About from "../Pages/About";
import Blog from "../Pages/Blog";
import Contact from "../Pages/Contact";
import FashionAccessories from "../Pages/FashionAccessories";
import GetCoupon from "../Pages/GetCoupon";
import Home from "../Pages/Home";
import Latest from "../Pages/Latest";
import ManAccessories from "../Pages/ManAccessories";
import OffersAndDiscounts from "../Pages/OffersAndDiscounts";
import PrivacyPolicy from "../Pages/PrivacyPolicy";
import ReportIssue from "../Pages/ReportIssue";
import RubberToys from "../Pages/RubberToys";
import Shop from "../Pages/Shop";
import TermsAndCondition from "../Pages/TermsAndCondition";
import WomanCloth from "../Pages/WomanCloth";
import CartPage from "../Pages/cart-page";
import ProductDetails from "../Pages/product-details";
import FAQ from '../Pages/FAQ'


export const routes = [
    {
        path: '/', 
        index: true,
        element: <Home />,
    },
    // Navbar Page Links
    {
        path: '/time-zone/home',
        element: <Home />,
    },
    {
        path: '/time-zone/shop',
        element: <Shop />,
        children: [
            {
                path: '/time-zone/shop',
                element: <ShopHome />,
            },
            {
                path: '/time-zone/shop/watches',
                element: <Watches />,
            },
            {
                path: '/time-zone/shop/woman-cloth',
                element: <WomanCloth />,
            },
            {
                path: '/time-zone/shop/man-accessories',
                element: <ManAccessories />,
            },
            {
                path: '/time-zone/shop/fashion-accessories',
                element: <FashionAccessories />,
            },
            {
                path: '/time-zone/shop/rubber-toys',
                element: <RubberToys />
            },
        ]
    },
    {
        path: '/time-zone/about',
        element: <About />,
    },
    {
        path: '/time-zone/contact',
        element: <Contact />,
    },
    {
        path: '/time-zone/blog',
        element: <Blog />,
    },
    {
        path: '/time-zone/latest',
        element: <Latest />,
    },
    {
        path: '/time-zone/cart',
        element: <CartPage />,
    },
    // Product Detail Page Link
    {
        path: '/time-zone/product-details/:productId',
        element: <ProductDetails />,
    },
    // Footer Page Links
    {
        path: '/time-zone/rubber-toys',
        element: <RubberToys />,
    },
    {
        path: '/time-zone/woman-cloth',
        element: <WomanCloth />,
    },
    {
        path: '/time-zone/fashion-accessories',
        element: <FashionAccessories />,
    },
    {
        path: '/time-zone/man-accessories',
        element: <ManAccessories />,
    },
    {
        path: '/time-zone/about',
        element: <About />,
    },
    {
        path: '/time-zone/contact',
        element: <Contact />,
    },
    {
        path: '/time-zone/faq',
        element: <FAQ />,
    },
    {
        path: '/time-zone/get-coupons',
        element: <GetCoupon />,
    },
    {
        path: '/time-zone/offers-&-discounts',
        element: <OffersAndDiscounts />,
    },
    {
        path: '/time-zone/privacy-policy',
        element: <PrivacyPolicy />,
    },
    {
        path: '/time-zone/report-payment-issue',
        element: <ReportIssue />,
    },
    {
        path: '/time-zone/terms-&-conditions',
        element: <TermsAndCondition />
    },
]