import { useState } from "react";
import { NavLink } from "react-router-dom";

const ShopNavbarPage = () => {
  const [menuActive, setMenuActive] = useState(false);

  return (
    <div
      className="bg-red-300 mt-4"
    >
      <div className="flex items-center justify-around">
        <div className="nav-links hidden md:block">
          <ul className="flex gap-4 py-2">
            <li>
              <NavLink to="/shop" className="font-bold text-xl">
                Shop
              </NavLink>
            </li>
            <li>
              <NavLink to="/shop/watches" className="font-bold text-xl">
                Watches
              </NavLink>
            </li>
            <li>
              <NavLink to="/shop/woman-cloth" className="font-bold text-xl">
                Woman Accessories
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/shop/fashion-accessories"
                className="font-bold text-xl"
              >
                Fashion Accessories
              </NavLink>
            </li>
            <li>
              <NavLink to="/shop/man-accessories" className="font-bold text-xl">
                Man Accessories
              </NavLink>
            </li>
            <li>
              <NavLink to="/shop/rubber-toys" className="font-bold text-xl">
                Rubber Toys
              </NavLink>
            </li>
          </ul>
        </div>
        <div className="nav-icon md:hidden sm:block">
          <button onClick={() => setMenuActive(!menuActive)}>
            {menuActive ? "Cancel" : "Menu"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShopNavbarPage;
