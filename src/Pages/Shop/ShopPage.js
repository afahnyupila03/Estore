import React from "react";

import ShopNavbarPage from "./ShopNavbarPage";
import { Outlet } from "react-router-dom";

const ShopPage = () => {
  

  return (
    <React.Fragment>
      <div className="mt-20">
        <ShopNavbarPage />
        
      </div>
      <Outlet />
    </React.Fragment>
  );
};

export default ShopPage;
