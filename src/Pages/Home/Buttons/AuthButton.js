// TODO: INSTALL MDBIcon WITH YARN.
import { useTranslation } from "react-i18next";
import { Fragment, useState } from "react";
import { Menu, Transition } from "@headlessui/react";
import { Link } from "react-router-dom";

function classNames(...classes) {
  return classes.filter(Boolean).join("");
}

export default function LanguageButton() {
  const { t } = useTranslation();

  return (
    <Menu as="div" className="relative inline-block text-center">
      <div>
        <Menu.Button
          className="
        inline-flex w-full justify-center 
        gap-x-1.5 rounded-md bg-white 
        px-5 py-2 text-sm font-semibold 
        text-gray-900 shadow-sm ring-inset 
        ring-gray-300 hover:bg-gray-50
        "
        >
          {t('auth.signIn')}
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
            absolute right-0 z-10 mt-2 origin-top-right
            rounded-md bg-white shadow-lg ring-1 ring-black
            ring-opacity-5 focus:outline-none
        "
          style={{ width: "25rem" }}
        >
          <div className="py-4">
            <Menu.Item>
              <Link className="bg-black text-white py-2 px-8" to="/signin">
                {t('auth.signInCreateAccount')}
              </Link>
            </Menu.Item>
            <Menu.Item className='px-4 mt-4 py-2'>
              <div className="flex space-between">
                  <h4>
                    {t('auth.yourAccount')}
                  </h4>
                </div>
            </Menu.Item>
            <Menu.Item className='px-4 py-2'>
              <div className="flex space-between">
                  <Link className='text-sm'>
                    {t('auth.wishList')}
                  </Link>
                </div>
            </Menu.Item>
            <Menu.Item className='px-4 py-2'>
              <div className="flex space-between">
                  <Link className='text-sm'>
                  {t('auth.deliveryAddresses')}
                  </Link>
                </div>
            </Menu.Item>
            <Menu.Item className='px-4 py-2'>
              <div className="flex space-between">
                  <Link className='text-sm'>
                  {t('auth.paymentMethods')}
                  </Link>
                </div>
            </Menu.Item>
            <Menu.Item className='px-4 py-4 mt-2'>
              <div className="flex space-between">
                  <h4>
                    {t('auth.accountSettings')}
                  </h4>
                </div>
            </Menu.Item>
            <Menu.Item className='px-4 py-2'>
              <div className="flex space-between">
                  <Link className='text-sm'>
                    {t('auth.password')} &amp; {t('auth.personalInfo')}
                  </Link>
                </div>
            </Menu.Item>
            <Menu.Item className='px-4 py-2'>
              <div className="flex space-between">
                  <Link className='text-sm'>
                    {t('auth.email')} &amp; {t('auth.mailPreferences')}
                  </Link>
                </div>
            </Menu.Item>
            <Menu.Item className='px-4 py-4 mt-2'>
              <div className="flex space-between">
                  <h4>
                  {t('auth.needHelp')}
                  </h4>
                </div>
            </Menu.Item>
            <Menu.Item className='px-4'>
              <div className="flex space-between">
                  <Link className='text-sm'>
                    {t('auth.contactUs')}
                  </Link>
                </div>
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}