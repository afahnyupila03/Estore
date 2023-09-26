import React from "react";
import ShopNav from "../../Components/Shop/ShopHeader/shop-nav";
import { Outlet } from "react-router-dom";

const Shop = (props) => {
  return (
    <React.Fragment>
      <div className='mt-20'>
      <ShopNav />
      </div>
      <Outlet />
    </React.Fragment>
  );
};

export default Shop;
