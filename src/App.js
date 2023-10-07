// TODO: Try implementing Custom Input and fetch-post hooks in the Checkout form and other places where possible.

import React, { useState } from "react";
import { useRoutes } from "react-router-dom";

import Navbar from "./Pages/Home/Layout/Navbar";
import { routes } from "./Routes/routes.js";
import Login from "./Pages/Auth/Auth.js";
import FooterNavbar from './Pages/Home/Layout/FooterPage.js'

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
      {showAuthModal && (
        <Login
          userName={userName}
          handleUserName={handleUserName}
          onHideAuthModal={handleShowAuthModal}
        />
      )}

      <Navbar
        userName={userName}
        onShowAuthModal={handleShowAuthModal}
        showAuthModal={showAuthModal}
      />

      {/* <Cart /> */}

      {route}

      <FooterNavbar />
      {/* <FooterNavbar /> */}
    </React.StrictMode>
  );
}

export default App;
