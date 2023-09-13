// TODO: Try implementing Custom Input and fetch-post hooks in the Checkout form and other places where possible.

import React, { useState } from "react";
import { useRoutes } from "react-router-dom";

import Header from "./Components/Layout/Header.js";
import FooterNavbar from "./Components/Layout/FooterNavbar";
import { routes } from "./Routes/routes.js";
import { QueryClientProvider, QueryClient } from "react-query";
import Login from "./Pages/Auth/Auth.js";

function App() {
  // const queryClient = new QueryClient()

  // TODO: HANDLE THE LOGIN && SIGNUP STATES HERE TO SWITCH BETWEEN FORMS.
  // TODO: REMOVE CART FROM MODAL TO PAGE.
  const [showAuthModal, setShowAuthModal] = useState(false);

  const handleShowAuthModal = () => setShowAuthModal(!showAuthModal)

  // useRoutes Navigation
  const route = useRoutes(routes);

  return (
    <React.StrictMode>
      <QueryClientProvider client={new QueryClient()}>
        {showAuthModal && <Login onHideAuthModal={handleShowAuthModal} />}

        <Header onShowAuthModal={handleShowAuthModal} />

        {route}

        <FooterNavbar />
      </QueryClientProvider>
    </React.StrictMode>
  );
}

export default App;
