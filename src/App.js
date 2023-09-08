// TODO: Try implementing Custom Input and fetch-post hooks in the Checkout form and other places where possible.

import React, { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useRoutes } from 'react-router-dom'


import Header from './Components/Layout/Header.js'
import FooterNavbar from './Components/Layout/FooterNavbar';
import Cart from './Components/Cart/Cart';


import Notification from './Components/UI/Notification';
import { sendCartData, fetchCartData } from './Store/cart-actions';
import { routes } from "./Routes/routes.js";
import { QueryClientProvider, QueryClient } from "react-query";
import { LoginRoute } from "./Routes/Auth/login.js";
import Login from "./Pages/Login/Login.js";



let isInitial = true;

function App() {

  // const queryClient = new QueryClient()

  const cart = useSelector(
    state => state.cart
  )
  // ShowCart Function
  const showCart = useSelector(
    state => state.ui.cartIsVisible
  )
  // Show Cart Function
  const showNotification = useSelector(
    state => state.ui.notification
  )
  // Dispatch Function
  const dispatch = useDispatch()

  // useEffect function to enable fetch cart products after page loading
  useEffect(
    () => {
      dispatch(
        fetchCartData
      )
    }, [dispatch]
  )

  // useEffect function to stop the cart from re-rendering when it's first loaded 
  useEffect(() => {
    if(isInitial) {
      isInitial = false;
      return;
    }
    dispatch(sendCartData(cart))
  }, [cart, dispatch]);

  // useRoutes Navigation
  const route = useRoutes(routes)

  return (
    <React.StrictMode>
      <QueryClientProvider client={new QueryClient()}>
      {
        showNotification && <Notification 
          status={showNotification.status}
          title={showNotification.title}
          message={showNotification.message}
        />
      }

      {/* {LoginRoute} */}

      <Login />

      <Header />
      {showCart && <Cart  />}
      
      { route }
      
      <FooterNavbar />
      </QueryClientProvider>
    </React.StrictMode>
  );
}

export default App;

