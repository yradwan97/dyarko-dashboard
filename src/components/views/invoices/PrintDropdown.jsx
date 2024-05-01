import { Menu, Transition } from '@headlessui/react'
import React, { Fragment } from 'react'
import PrintIcon from '../../shared/icons/PrintIcon'
import { Typography } from 'components/shared/UI'

function PrintDropdown() {
  return (
    <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
        > 
        <Menu.Items className="absolute left-0 top-full mt-2 w-44 divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="px-1 py-1 ">
                <Menu.Item>
                {({ active }) => (
                    <button
                    className={`${
                        active ? 'bg-[#3CEBC1]/10 text-[#3CEBC1]' : 'text-gray-500'
                    } group flex w-full items-center rounded-md px-4 py-2.5 gap-x-3 text-sm`}
                    >
                    <PrintIcon className="text-inherite text-xl " />
                    <Typography variant='body-md-medium' as='span' className="text-inherite capitalize">Print</Typography> 
                    </button>
                )}
                </Menu.Item>

            </div>
        </Menu.Items>
     </Transition>
  )
}

export default PrintDropdown
