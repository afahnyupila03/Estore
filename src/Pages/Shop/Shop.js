import React from "react";
import { useQuery } from "react-query";
import UseAnimation from "../../Components/Loader";
import loading from "react-useanimations/lib/loading";
import { ShopProductsService } from "../../Services/ShopService";
import { Link } from "react-router-dom";
import ProductItemCard from "../../Components/ProductItemCard";

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

const Shop = () => {
  const { t } = useTranslation();

  const {
    data = {},
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery("shopProducts", () => ShopProductsService());
  console.log(data);

  const Accessories = AccessoriesRoute(t, FaKitchenSet, FaMobile, IoFitness);
  const AutoMobile = AutoMobileRoutes(t, IoCarSport, FaMotorcycle);
  const Electronics = ElectronicRoutes(
    t,
    IoLaptop,
    IoTabletLandscape,
    FaMobile
  );
  const Men = MenRoutes(t, IoWatchSharp, FaShoePrints, FaShirt);
  const Women = WomenRoutes(
    t,
    IoSparkles,
    FaBagShopping,
    FaShirt,
    FaShoePrints,
    GiNecklaceDisplay,
    IoWatchSharp
  );

  let shopProducts;

  if (isLoading) {
    shopProducts = <UseAnimation animation={loading} size={60} />;
  } else if (isError) {
    shopProducts = (
      <div>
        <p>{error}</p>
        <button onClick={() => refetch()}>Try again</button>
      </div>
    );
  } else {
    shopProducts = (
      <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
        {data.map((shopItems) => (
          <ProductItemCard productData={shopItems} key={shopItems.id} />
        ))}
      </div>
    );
  }

  const iconSize = 20;
  const classStyle = "mr-4";
  const divClass = "flex items-center";
  const sideBarClass = "text-lg";

  return (
    <div className="flex items-center">
      <Sidebar aria-label="Sidebar with content separator example">
        <Sidebar.Items>
          <Sidebar.ItemGroup>
            <Sidebar.Collapse
              label="Accessories"
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
                <Sidebar.Item
                  key={accessories.name}
                  className={`${sideBarClass}`}
                  href={accessories.route}
                >
                  <div className={`${divClass}`}>
                    {React.createElement(accessories.icon, {
                      className: classStyle,
                      size: iconSize,
                    })}
                    {accessories.name}
                  </div>
                </Sidebar.Item>
              ))}
            </Sidebar.Collapse>

            <Sidebar.Collapse
              label="Automobiles"
              renderChevronIcon={(theme, open) => {
                const IconComponent = open ? HiOutlineMinusSm : HiOutlinePlusSm;

                return (
                  <IconComponent
                    aria-hidden
                    className={twMerge(
                      theme.label.icon.open[open ? "on" : "off"]
                    )}
                  />
                );
              }}
            >
              {AutoMobile.map((automobiles) => (
                <Sidebar.Item
                  key={automobiles.name}
                  className={`${sideBarClass}`}
                  href={automobiles.route}
                >
                  <div className={`${divClass}`}>
                    {React.createElement(automobiles.icon, {
                      className: classStyle,
                      size: iconSize,
                    })}
                    {automobiles.name}
                  </div>
                </Sidebar.Item>
              ))}
            </Sidebar.Collapse>

            <Sidebar.Collapse
              label="Electronics"
              renderChevronIcon={(theme, open) => {
                const IconComponent = open ? HiOutlineMinusSm : HiOutlinePlusSm;

                return (
                  <IconComponent
                    aria-hidden
                    className={twMerge(
                      theme.label.icon.open[open ? "on" : "off"]
                    )}
                  />
                );
              }}
            >
              {Electronics.map((electronics) => (
                <Sidebar.Item
                  key={electronics.name}
                  className={`${sideBarClass}`}
                  href={electronics.route}
                >
                  <div className={`${divClass}`}>
                    {React.createElement(electronics.icon, {
                      className: classStyle,
                      size: iconSize,
                    })}
                    {electronics.name}
                  </div>
                </Sidebar.Item>
              ))}
            </Sidebar.Collapse>

            <Sidebar.Item className={`${sideBarClass}`} href="#">
              <div className={`${divClass}`}>
                <FaSprayCan className={`${classStyle}`} size={iconSize} />
                Fragrances
              </div>
            </Sidebar.Item>

            <Sidebar.Item className={`${sideBarClass}`} href="#">
              <div className={`${divClass}`}>
                <GiWoodenChair className={`${classStyle}`} size={iconSize} />
                Furniture
              </div>
            </Sidebar.Item>

            <Sidebar.Item className={`${sideBarClass}`} href="#">
              <div className="flex items-center">
                <MdLocalGroceryStore
                  className={`${classStyle}`}
                  size={iconSize}
                />
                Groceries
              </div>
            </Sidebar.Item>

            <Sidebar.Item className={`${sideBarClass}`} href="#">
              <div className={`${divClass}`}>
                <IoHome className={`${classStyle}`} size={iconSize} />
                Home Decoration
              </div>
            </Sidebar.Item>

            <Sidebar.Collapse
              label="Men"
              renderChevronIcon={(theme, open) => {
                const IconComponent = open ? HiOutlineMinusSm : HiOutlinePlusSm;

                return (
                  <IconComponent
                    aria-hidden
                    className={twMerge(
                      theme.label.icon.open[open ? "on" : "off"]
                    )}
                  />
                );
              }}
            >
              {Men.map((men) => (
                <Sidebar.Item
                  key={men.name}
                  className={`${sideBarClass}`}
                  href={men.route}
                >
                  <div className={`${divClass}`}>
                    {React.createElement(men.icon, {
                      className: classStyle,
                      size: iconSize,
                    })}
                    {men.name}
                  </div>
                </Sidebar.Item>
              ))}
            </Sidebar.Collapse>

            <Sidebar.Item className={`${sideBarClass}`} href="#">
              <div className={`${divClass}`}>
                <FaHandSparkles className={`${classStyle}`} size={iconSize} />
                Skincare
              </div>
            </Sidebar.Item>

            <Sidebar.Item className={`${sideBarClass}`} href="#">
              <div className={`${divClass}`}>
                <IoGlasses className={`${classStyle}`} size={iconSize} />
                Sunglasses
              </div>
            </Sidebar.Item>

            <Sidebar.Collapse
              label="Women"
              renderChevronIcon={(theme, open) => {
                const IconComponent = open ? HiOutlineMinusSm : HiOutlinePlusSm;

                return (
                  <IconComponent
                    aria-hidden
                    className={twMerge(
                      theme.label.icon.open[open ? "on" : "off"]
                    )}
                  />
                );
              }}
            >
              {Women.map((women) => (
                <Sidebar.Item
                  key={women.name}
                  className={`${sideBarClass}`}
                  href={women.route}
                >
                  <div className={`${divClass}`}>
                    {React.createElement(women.icon, {
                      className: classStyle,
                      size: iconSize,
                    })}
                    {women.name}
                  </div>
                </Sidebar.Item>
              ))}
            </Sidebar.Collapse>
          </Sidebar.ItemGroup>
        </Sidebar.Items>
      </Sidebar>
      <div>
        <h1>Shop Page</h1>
      </div>
    </div>
  );
};

export default Shop;
