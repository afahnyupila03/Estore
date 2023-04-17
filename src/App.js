import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';


import Banner from "./Components/Banner/Banner";
import FinePens from "./Components/fine-pens/FinePens";
import Header from "./Components/Layout/Header";
import NewArrivals from "./Components/New Arrivals/NewArrivals";
import PopularItemsCard from './Components/Popular Items/PopularItems';
import FooterNavbar from './Components/Layout/FooterNavbar';
import Cart from './Components/Cart/Cart';
import Notification from './Components/UI/Notification';
import { sendCartData, fetchCartData } from './Store/cart-actions';


let isInitial = true;

function App() {

  const [isClosed, setIsClosed] = useState(false);

  const cart = useSelector(
    state => state.cart
  )
  const showNotification = useSelector(
    state => state.ui.notification
  )
  const dispatch = useDispatch()

  // useEffect function to enbale fetch cart products after page loading
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
  }, [cart, dispatch])

  const hideCartHandler = () => {
    setIsClosed(false)
  }
  const openCartHandler = () => {
    setIsClosed(true);
  }

  return (
    <React.StrictMode>
      {
        showNotification && <Notification 
          status={showNotification.status}
          title={showNotification.title}
          message={showNotification.message}
        />
      }
      <Header onOpen={openCartHandler} />
      {isClosed && <Cart onClose={hideCartHandler} />}
      <Banner />
      <NewArrivals />
      <FinePens />
      <PopularItemsCard />
      <FooterNavbar />
    </React.StrictMode>
  );
}

export default App;
