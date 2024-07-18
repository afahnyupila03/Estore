import About from "../Pages/About/About";
import Blog from "../Pages/Blog/Blog";
import CategoryPage from "../Pages/Category/Category";
import Home from "../Pages/Home/Home";
import ProductDetails from "../Pages/ProductDetails/ProductDetails";
import Shop from "../Pages/Shop/Shop";
import Auth from "../Pages/Auth/Auth";
import CartPage from "../Pages/CartPage/CartPage";
import PurchasePage from "../Pages/UserAccount/PurchasePage";
import WishlistPage from "../Pages/UserAccount/WishlistPage";
import DeliveryPage from "../Pages/UserAccount/DeliveryPage";
import PaymentMethodPage from "../Pages/UserAccount/PaymentMethodPage";
import PersonalInformation from "../Pages/UserAccount/PersonalInformation";
import EmailAndMailPreferencePage from "../Pages/UserAccount/EmailAndMailPreferencePage";
import ContactPage from "../Pages/UserAccount/ContactPage";
import FAQ from "../Pages/FAQ/FAQ";
import AccountLandingPage from "../Pages/UserAccount/AccountLandingPage";
import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { routes } from "../Routes/routes";

jest.mock("./Routes/routes.js", () => ({
  routes: [
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
      children: [
        {
          path: "/shop/:category",
          element: <CategoryPage />,
        },
      ],
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
      element: <Auth />,
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
    {
      path: "my-account/landing/*",
      element: <AccountLandingPage />,
      children: [
        {
          path: "purchases",
          element: <PurchasePage />,
        },
        {
          path: "wish-lists",
          element: <WishlistPage />,
        },
        {
          path: "delivery",
          element: <DeliveryPage />,
        },
        {
          path: "payment-method",
          element: <PaymentMethodPage />,
        },
        {
          path: "password-&-personal-information",
          element: <PersonalInformation />,
        },
        {
          path: "email-&-mail-preferences",
          element: <EmailAndMailPreferencePage />,
        },
        {
          path: "customer-service",
          element: <ContactPage />,
        },
      ],
    },
    {
      path: "home/category/:category", // Static part of the path
      element: <CategoryPage />,
    },
    { path: "purchases/:id/:purchaseId", element: <SinglePurchasePage /> },
    {
      path: "product-details/:id/:title",
      element: <ProductDetails />,
    },
  ],
}));

test("renders routes and route component", async () => {
  render(<MemoryRouter initialEntries={["/"]}>{routes}</MemoryRouter>);
  await waitFor(() => expect(screen.getByText("route")).toBeInTheDocument());
});
