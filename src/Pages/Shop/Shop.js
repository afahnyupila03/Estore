import React from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { ShopProductsServices } from "../../Services/ShopService";
import { useQuery } from "react-query";
import { Sidebar } from "flowbite-react";
import { FaSprayCan } from "react-icons/fa";
import { GiWoodenChair } from "react-icons/gi";
import { MdLocalGroceryStore } from "react-icons/md";
import {
  IoHome,
  IoGlasses,
  IoFitness,
  IoCarSport,
  IoLaptop,
  IoTabletLandscape,
  IoWatchSharp,
  IoSparkles,
} from "react-icons/io5";
import {
  FaHandSparkles,
  FaKitchenSet,
  FaMobile,
  FaMotorcycle,
  FaShoePrints,
  FaShirt,
  FaBagShopping,
} from "react-icons/fa6";
import { GiNecklaceDisplay } from "react-icons/gi";

import { HiOutlinePlusSm, HiOutlineMinusSm } from "react-icons/hi";
import { twMerge } from "tailwind-merge";
import {
  AccessoriesRoute,
  AutoMobileRoutes,
  ElectronicRoutes,
  MenRoutes,
  WomenRoutes,
} from "../Home/components/LayoutNavigation";
import { useTranslation } from "react-i18next";

import ProductItemCard from "../../Components/ProductItemCard";
import UseAnimation from "../../Components/Loader";
import loading from "react-useanimations/lib/loading";

const Shop = () => {
  const { t } = useTranslation();

  const { data, isLoading, isError, error, refetch } = useQuery(
    "shopProducts",
    () => ShopProductsServices()
  );

  let shopProducts;

  if (isLoading) {
    shopProducts = (
      <div className="flex justify-center">
        <p>{error}</p>
        <UseAnimation
          animation={loading}
          className="text-red-5000"
          color="red"
          size={100}
        />
      </div>
    );
  } else if (isError) {
    shopProducts = (
      <div className="flex justify-center">
        <p>{error}</p>
        <button onClick={() => refetch()}>Try again</button>
      </div>
    );
  } else {
    shopProducts = (
      <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
        {data.map((products) => (
          <ProductItemCard productData={products} key={products.id} />
        ))}
      </div>
    );
  }

  const Accessories = AccessoriesRoute(t, FaKitchenSet, FaMobile, IoFitness);
  const AutoMobile = AutoMobileRoutes(t, IoCarSport, FaMotorcycle);
  const Electronics = ElectronicRoutes(
    t,
    IoLaptop,
    FaMobile,
    IoTabletLandscape
  );
  const Men = MenRoutes(t, FaShoePrints, FaShirt, IoWatchSharp);
  const Women = WomenRoutes(
    t,
    IoSparkles,
    FaBagShopping,
    FaShirt,
    FaShoePrints,
    GiNecklaceDisplay,
    IoWatchSharp
  );

  const categoryRoutes = [
    "/shop/fragrances",
    "/shop/furniture",
    "/shop/groceries",
    "/shop/home-decoration",
    "/shop/skin-care",
    "/shop/sunglasses",
    ...Accessories.map((item) => item.route),
    ...AutoMobile.map((item) => item.route),
    ...Electronics.map((item) => item.route),
    ...Men.map((item) => item.route),
    ...Women.map((item) => item.route),
  ];

  const isCategoryActive = categoryRoutes.includes(location.pathname);

  const iconSize = 20;
  const classStyle = "mr-4";
  const divClass = "flex";
  const sideBarClass = "text-lg";

  return (
    <div className="flex">
      <Sidebar aria-label="product-category">
        <Sidebar.Items>
          <Sidebar.ItemGroup>
            <Sidebar.Collapse
              label={t("category.access")}
              className={twMerge(sideBarClass)}
              renderChevronIcon={(theme, open) => {
                return open ? (
                  <HiOutlineMinusSm
                    size={iconSize}
                    className={twMerge("ml-1", theme.label.icon.open["on"])}
                  />
                ) : (
                  <HiOutlinePlusSm
                    size={iconSize}
                    className={twMerge("ml-1", theme.label.icon.open["off"])}
                  />
                );
              }}
            >
              {Accessories.map((accessories) => (
                <Link
                  key={accessories.name}
                  className={sideBarClass}
                  to={accessories.route}
                >
                  <div className={`${divClass} mb-2`}>
                    {React.createElement(accessories.icon, {
                      className: classStyle,
                      size: iconSize,
                    })}
                    {accessories.name}
                  </div>
                </Link>
              ))}
            </Sidebar.Collapse>

            <Sidebar.Collapse
              label={t("category.automobiles")}
              className={twMerge(sideBarClass)}
              renderChevronIcon={(theme, open) => {
                return open ? (
                  <HiOutlineMinusSm
                    size={iconSize}
                    className={twMerge("ml-1", theme.label.icon.open["on"])}
                  />
                ) : (
                  <HiOutlinePlusSm
                    size={iconSize}
                    className={twMerge("ml-1", theme.label.icon.open["off"])}
                  />
                );
              }}
            >
              {AutoMobile.map((automobiles) => (
                <Link
                  key={automobiles.name}
                  className={sideBarClass}
                  to={automobiles.route}
                >
                  <div className={`${divClass} mb-2`}>
                    {React.createElement(automobiles.icon, {
                      className: classStyle,
                      size: iconSize,
                    })}
                    {automobiles.name}
                  </div>
                </Link>
              ))}
            </Sidebar.Collapse>

            <Sidebar.Collapse
              label={t("category.electronics")}
              className={twMerge(sideBarClass)}
              renderChevronIcon={(theme, open) => {
                return open ? (
                  <HiOutlineMinusSm
                    size={iconSize}
                    className={twMerge("ml-1", theme.label.icon.open["on"])}
                  />
                ) : (
                  <HiOutlinePlusSm
                    size={iconSize}
                    className={twMerge("ml-1", theme.label.icon.open["off"])}
                  />
                );
              }}
            >
              {Electronics.map((electronics) => (
                <Link
                  key={electronics.name}
                  className={sideBarClass}
                  to={electronics.route}
                >
                  <div className={`${divClass} mb-2`}>
                    {React.createElement(electronics.icon, {
                      className: classStyle,
                      size: iconSize,
                    })}
                    {electronics.name}
                  </div>
                </Link>
              ))}
            </Sidebar.Collapse>

            <Link className={sideBarClass} to="/shop/fragrances">
              <div className={`${divClass} mb-2`}>
                <FaSprayCan className={classStyle} size={iconSize} />
                {t("category.fragrances")}
              </div>
            </Link>

            <Link className={sideBarClass} to="/shop/furniture">
              <div className={`${divClass} mb-2`}>
                <GiWoodenChair className={classStyle} size={iconSize} />
                {t("category.furniture")}
              </div>
            </Link>

            <Link className={sideBarClass} to="/shop/groceries">
              <div className={`${divClass} mb-2`}>
                <MdLocalGroceryStore className={classStyle} size={iconSize} />
                {t("category.groceries")}
              </div>
            </Link>

            <Link className={sideBarClass} to="/shop/home-decoration">
              <div className={`${divClass} mb-2`}>
                <IoHome className={classStyle} size={iconSize} />
                {t("category.homeDeco")}
              </div>
            </Link>

            <Sidebar.Collapse
              label={t("category.men")}
              className={twMerge(sideBarClass)}
              renderChevronIcon={(theme, open) => {
                return open ? (
                  <HiOutlineMinusSm
                    size={iconSize}
                    className={twMerge("ml-1", theme.label.icon.open["on"])}
                  />
                ) : (
                  <HiOutlinePlusSm
                    size={iconSize}
                    className={twMerge("ml-1", theme.label.icon.open["off"])}
                  />
                );
              }}
            >
              {Men.map((men) => (
                <Link key={men.name} className={sideBarClass} to={men.route}>
                  <div className={`${divClass} mb-2`}>
                    {React.createElement(men.icon, {
                      className: classStyle,
                      size: iconSize,
                    })}
                    {men.name}
                  </div>
                </Link>
              ))}
            </Sidebar.Collapse>

            <Link className={sideBarClass} to="/shop/skin-care">
              <div className={`${divClass} mb-2`}>
                <FaHandSparkles className={classStyle} size={iconSize} />
                {t("category.skinCare")}
              </div>
            </Link>

            <Link className={sideBarClass} to="/shop/sunglasses">
              <div className={`${divClass} mb-2`}>
                <IoGlasses className={classStyle} size={iconSize} />
                {t("category.sunShades")}
              </div>
            </Link>

            <Sidebar.Collapse
              label={t("category.women")}
              className={twMerge(sideBarClass)}
              renderChevronIcon={(theme, open) => {
                return open ? (
                  <HiOutlineMinusSm
                    size={iconSize}
                    className={twMerge("ml-1", theme.label.icon.open["on"])}
                  />
                ) : (
                  <HiOutlinePlusSm
                    size={iconSize}
                    className={twMerge("ml-1", theme.label.icon.open["off"])}
                  />
                );
              }}
            >
              {Women.map((women) => (
                <Link
                  key={women.name}
                  className={sideBarClass}
                  to={women.route}
                >
                  <div className={`${divClass} mb-2`}>
                    {React.createElement(women.icon, {
                      className: classStyle,
                      size: iconSize,
                    })}
                    {women.name}
                  </div>
                </Link>
              ))}
            </Sidebar.Collapse>
          </Sidebar.ItemGroup>
        </Sidebar.Items>
      </Sidebar>

      <div className="px-6">{isCategoryActive ? <Outlet /> : shopProducts}</div>
    </div>
  );
};

export default Shop;

// DELIVERY-ICON: import { MdDeliveryDining } from "react-icons/md";
