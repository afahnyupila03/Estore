// TODO: INSTALL MDBIcon WITH YARN.
import { useTranslation } from "react-i18next";
import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { Link } from "react-router-dom";
import { heartO, envelopeO, creditCard } from "react-icons-kit/fa";
import { commentDiscussion } from "react-icons-kit/oct";
import { ic_https_outline, ic_keyboard_arrow_down_twotone, ic_local_shipping_outline } from "react-icons-kit/md";
import IconName from "../../../Components/Icon";

export default function LanguageButton() {
  const { t } = useTranslation();

  return (
    <Menu as="div" className="relative inline-block text-center">
      <div>
        <Menu.Button
          className="
        inline-flex w-full justify-center 
        text-white 
        text-lg 
        "
        >
          {t("auth.signIn")}
          <IconName icon={ic_keyboard_arrow_down_twotone} style={{marginLeft: '.5rem'}} />
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transition opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items
          className="
            absolute right-0 z-10 mt-4 origin-top-right
            rounded-md bg-white shadow-lg ring-1 ring-black
            ring-opacity-5 focus:outline-none
        "
          style={{ width: "25rem" }}
        >
          <div className="py-4">
            <Menu.Item>
              <Link className="bg-gray-700 text-white py-2 px-8" to="signin">
                {t("auth.signInCreateAccount")}
              </Link>
            </Menu.Item>
            <Menu.Item className="px-4 mt-4 py-2">
              <div className="flex space-between">
                <h4>{t("auth.yourAccount")}</h4>
              </div>
            </Menu.Item>
            <Menu.Item className="px-4 py-2">
              <Link className="flex text-sm">
                <IconName icon={heartO} style={{ marginRight: "1rem" }} />
                {t("auth.wishList")}
              </Link>
            </Menu.Item>
            <Menu.Item className="px-4 py-2">
              <Link className="flex text-sm">
                <IconName icon={ic_local_shipping_outline} style={{marginRight: '1rem'}} />
                {t("auth.deliveryAddresses")}
              </Link>
            </Menu.Item>
            <Menu.Item className="px-4 py-2">
              <div className="flex space-between">
                <Link className="text-sm">
                  <IconName icon={creditCard} style={{ marginRight: "1rem" }} />
                  {t("auth.paymentMethods")}
                </Link>
              </div>
            </Menu.Item>
            <Menu.Item className="px-4 py-4 mt-2">
              <div className="flex space-between">
                <h4>{t("auth.accountSettings")}</h4>
              </div>
            </Menu.Item>
            <Menu.Item className="px-4 py-2">
              <Link className="flex text-sm">
                <IconName
                  icon={ic_https_outline}
                  style={{ marginRight: "1rem" }}
                />
                {t("auth.password")} &amp; {t("auth.personalInfo")}
              </Link>
            </Menu.Item>
            <Menu.Item className="px-4 py-2">
              <div className=" space-between">
                <Link className="flex text-sm">
                  <IconName icon={envelopeO} style={{ marginRight: "1rem" }} />
                  {t("auth.email")} &amp; {t("auth.mailPreferences")}
                </Link>
              </div>
            </Menu.Item>
            <Menu.Item className="px-4 py-4 mt-2">
              <div className="flex space-between">
                <h4>{t("auth.needHelp")}</h4>
              </div>
            </Menu.Item>
            <Menu.Item className="px-4">
              <Link className="flex text-sm">
                <IconName
                  icon={commentDiscussion}
                  style={{ marginRight: "1rem" }}
                />
                {t("auth.contactUs")}
              </Link>
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
