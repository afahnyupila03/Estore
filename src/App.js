// TODO: Try implementing Custom Input and fetch-post hooks in the Checkout form and other places where possible.

import React, { useState } from "react";
import { useRoutes } from "react-router-dom";

import Header from "./Components/Layout/Header.js";
import FooterNavbar from "./Components/Layout/FooterNavbar";
import { routes } from "./Routes/routes.js";
import { QueryClientProvider, QueryClient } from "react-query";
import Login from "./Pages/Auth/Auth.js";
import Cart from "./Components/Cart/Cart.js";

function App() {
  // const queryClient = new QueryClient()

  // TODO: HANDLE THE LOGIN && SIGNUP STATES HERE TO SWITCH BETWEEN FORMS.
  // TODO: REMOVE CART FROM MODAL TO PAGE.
  const [showAuthModal, setShowAuthModal] = useState(false);

  const handleShowAuthModal = () => setShowAuthModal(!showAuthModal)

  const [userName, setUserName] = useState("")

  const handleUserName = e => setUserName(e.target.value)

  // useRoutes Navigation
  const route = useRoutes(routes);

  return (
    <React.StrictMode>
      <QueryClientProvider client={new QueryClient()}>
        {showAuthModal && <Login userName={userName} handleUserName={handleUserName} onHideAuthModal={handleShowAuthModal} />}

        <Header userName={userName} onShowAuthModal={handleShowAuthModal} showAuthModal={showAuthModal} />

        {/* <Cart /> */}

        {route}

        <FooterNavbar />
      </QueryClientProvider>
    </React.StrictMode>
  );
}

export default App;
