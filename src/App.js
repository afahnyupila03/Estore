import React, { useState } from "react";
import Banner from "./Components/Banner/Banner";
import FinePens from "./Components/fine-pens/FinePens";
import Header from "./Components/Layout/Header";
import NewArrivals from "./Components/New Arrivals/NewArrivals";
import PopularItemsCard from './Components/Popular Items/PopularItems';
import FooterNavbar from './Components/Layout/FooterNavbar';
import Cart from './Components/Cart/Cart';
import CartProvider from './Store/CartProvider';


function App() {

  const [isClosed, setIsClosed] = useState(false);

  const hideCartHandler = () => {
    setIsClosed(false)
  }
  const openCartHandler = () => {
    setIsClosed(true);
  }

  return (
    <CartProvider>
        <React.StrictMode>
        <Header onOpen={openCartHandler} />
        {isClosed && <Cart onClose={hideCartHandler} />}
        <Banner />
        <NewArrivals />
        <FinePens />
        <PopularItemsCard />
        <FooterNavbar />
        </React.StrictMode>
    </CartProvider>
  );
}

export default App;
