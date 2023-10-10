// TODO: Try implementing Custom Input and fetch-post hooks in the Checkout form and other places where possible.

import React, { useState } from "react";
import { useRoutes } from "react-router-dom";

import { routes } from "./Routes/routes.js";

import Login from "./Pages/Auth/Auth.js";
// import Cart from "./Components/Cart/Cart.js";
import Navbar from "./Pages/Home/Layout/Navbar.js";
import Footer from "./Pages/Home/Layout/Footer.js";
import { Suspense } from "react";

function App() {
  // const queryClient = new QueryClient()

  // TODO: HANDLE THE LOGIN && SIGNUP STATES HERE TO SWITCH BETWEEN FORMS.
  // TODO: REMOVE CART FROM MODAL TO PAGE.
  const [showAuthModal, setShowAuthModal] = useState(false);

  const handleShowAuthModal = () => setShowAuthModal(!showAuthModal);

  const [userName, setUserName] = useState("");

  const handleUserName = (e) => setUserName(e.target.value);

  // useRoutes Navigation
  const route = useRoutes(routes);

  return (
    <React.StrictMode>
      <Navbar />
      {/* <Cart /> */}

      {route}

      <Footer />
    </React.StrictMode>
  );
}

export default App;
