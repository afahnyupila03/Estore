import React, { useEffect, useState } from "react";
import { Disclosure, DisclosureButton } from "@headlessui/react";
import { NavLink } from "react-router-dom";
import {
  AccountRoutes,
  AccountSettingsRoutes,
  NavbarRoutes,
  UserAccountRoute,
} from "../components/LayoutNavigation";
import AuthButton from "./AuthButton";
import CartButton from "./CartButton";
import TranslationButton from "./TranslationButton";
import { useTranslation } from "react-i18next";
import Icon from "../../../Components/Icon";
import { closeOutline, menuOutline } from "ionicons/icons";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function () {
  const { t } = useTranslation();

  const [cartTotalProducts, setCartTotalProducts] = useState(0);
  const [wishListTotalProducts, setWishListTotalProducts] = useState([]);

  const navbarRoutes = NavbarRoutes(t);
  const authRoute = UserAccountRoute(t);
  const accRoute = AccountRoutes(t);
  const accSettings = AccountSettingsRoutes(t);

  const ResAuthRoutes = [
    ...accRoute,
    ...accSettings,
    {
      navLink: "Customer Service",
      navRoute: "my-account/landing/customer-service",
    },
  ];

  const getAllStorageData = () => {
    const allData = {};
    for (let i = 0; i < sessionStorage.length; i++) {
      const key = sessionStorage.key(i);
      if (key != "i18nextLng") {
        const value = sessionStorage.getItem(key);
        allData[key] = JSON.parse(value);
      }
    }
    return allData;
  };

  useEffect(() => {
    const sessionStorageData = getAllStorageData();
    const { productQuantity = 0 } = sessionStorageData["cartState"] || {};
    setCartTotalProducts(productQuantity);
    const wishlistProducts = sessionStorageData["wishListData"] || [];
    setWishListTotalProducts(wishlistProducts);
  }, []);

  const wishlistQuantity = wishListTotalProducts.length;

  return (
    <Disclosure as="nav">
      {({ open, close }) => (
        <>
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <DisclosureButton className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  {open ? (
                    <Icon icon={closeOutline} />
                  ) : (
                    <Icon icon={menuOutline} />
                  )}
                </DisclosureButton>
              </div>
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <div className="hidden sm:ml-6 sm:block">
                  <div className="flex space-x-4">
                    {navbarRoutes.map((item) => (
                      <NavLink
                        key={item.navLink}
                        to={item.navRoute}
                        className={classNames(
                          item.current
                            ? "bg-gray-800 text-white"
                            : "text-gray-800 hover:bg-gray-800 hover:text-white",
                          "rounded-md px-3 py-2 text-lg font-medium"
                        )}
                        aria-current={item.current ? item.navLink : undefined}
                      >
                        {item.navLink}
                      </NavLink>
                    ))}
                  </div>
                </div>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                <CartButton cartCount={cartTotalProducts} />
              </div>
              <div className="hidden sm:ml-6 sm:block">
                <AuthButton />
              </div>

              <div className="hidden sm:ml-6 sm:block">
                <TranslationButton />
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2">
              {navbarRoutes.map((item) => (
                <Disclosure.Button
                  key={item.navLink}
                  as="a"
                  href={item.navRoute}
                  className={classNames(
                    item.current
                      ? "bg-gray-900 text-white"
                      : "text-black hover:bg-gray-700 hover:text-white",
                    "block rounded-md px-3 py-2 text-base font-medium"
                  )}
                  aria-current={item.current ? "page" : undefined}
                >
                  {item.navLink}
                </Disclosure.Button>
              ))}
            </div>

            <Disclosure.Panel className="sm:hidden">
              <div className="space-y-1 px-2 pb-3 pt-2">
                {ResAuthRoutes.map((authNav) => (
                  <NavLink
                    className={classNames(
                      authNav.current
                        ? "bg-gray-900 text-white"
                        : "text-black hover:bg-gray-700 hover:text-white",
                      "block rounded-md px-3 py-2 text-base font-medium"
                    )}
                    aria-current={authNav.current ? "page" : undefined}
                    to={authNav.navRoute}
                    key={authNav.navLink}
                    onClick={() => close()}
                  >
                    {authNav.navLink}
                  </NavLink>
                ))}
              </div>
            </Disclosure.Panel>

            <div className="flex flex-1 px-2 pb-3 pt-2">
              <TranslationButton />
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
