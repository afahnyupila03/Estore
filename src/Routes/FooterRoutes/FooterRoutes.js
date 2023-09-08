import About from "../../Pages/About/About";
import Contact from "../../Pages/Contact/Contact";
import FashionAccessories from "../../Pages/FashionAccess/FashionAccessories";
import GetCoupon from "../../Pages/Coupons/GetCoupon";
import ManAccessories from "../../Pages/ManAccess/ManAccessories";
import OffersAndDiscounts from "../../Pages/OfferAndDiscount/OffersAndDiscounts";
import PrivacyPolicy from "../../Pages/PrivacyPolicy/PrivacyPolicy";
import ReportIssue from "../../Pages/ReportIssue/ReportIssue";
import RubberToys from "../../Pages/RubberToys/RubberToys";
import TermsAndCondition from "../../Pages/Terms&Condition/TermsAndCondition";
import WomanCloth from "../../Pages/WomanCloth/WomanCloth";
import FAQ from "../../Pages/FAQ/FAQ";
// import FAQ from "@/Pages/FAQ/FAQ"

export const FooterRoutes = [
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
