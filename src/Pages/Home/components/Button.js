// COMPONENT NOT IN USE.

import { Menu, Transition } from '@headlessui/react'

export default function({button, className}){
    return (
        <Menu className={className}>
        <div>
        <Menu.Button className={className}>
            {button}
            {/* <ChevronDownIcon className="-mr-1 h-5 w-5 text-gray-400" aria-hidden="true" /> */}
          </Menu.Button>
        </div>
    </Menu>
    )
}
// "inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"

