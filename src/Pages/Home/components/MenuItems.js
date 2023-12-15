import { Menu } from '@headlessui/react'

export default function ({menuItem}){
    return (
        <Menu.Item>
              {/* {({ active }) => ( */}
                <a
                  href="#"
                //   className={classNames(
                //     active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                //     'block px-4 py-2 text-sm'
                //   )}
                >
                  {menuItem}
                </a>
              {/* )} */}
            </Menu.Item>
    )
}