import React from "react";
import ShopNav from "../../Components/Shop/ShopHeader/shop-nav";
import { Outlet } from "react-router-dom";

const Shop = (props) => {
  return (
    <React.Fragment>
      <ShopNav />
      <Outlet />
    </React.Fragment>
  );
};

export default Shop;
