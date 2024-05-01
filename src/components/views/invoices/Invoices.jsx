import React from "react";
import PrintDropdown from "./PrintDropdown";
import { FiSearch } from "react-icons/fi";
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";
import Button from "components/shared/UI/buttons/Button";
import { Menu } from "@headlessui/react";
import { Typography } from "components/shared/UI";

function Invoices() {
  return (
    <div>
      <div className="relative w-6/12">
        <FiSearch className="text-2xl text-main-secondary absolute top-1/2 left-3 -translate-y-1/2" />
        <Button
          variant="input"
          className="w-full !pl-12 !border-0"
          placeholder="Search tenant by name or property id..."
        />
      </div>
      <div className="bg-white rounded-lg p-2 mt-6">
        <table className="table-auto w-full text-left">
          <thead>
            <tr className="flex justify-between p-4">
              <th className="flex-1 text-md font-medium text-gray-500 text-left">
                Invoice Id
              </th>
              <th className="flex-1 text-md font-medium text-gray-500 text-left">
                Tenant
              </th>
              <th className="flex-1 text-md font-medium text-gray-500 text-left">
                Date
              </th>
              <th className="flex-1 text-md font-medium text-gray-500 text-left">
                Amount
              </th>
              <th className="flex-1 text-md font-medium text-gray-500 text-left">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="flex justify-between py-4 px-4 border-b border-main-100 hover:bg-main-100">
              <td className="flex-1 text-sm font-bold text-black/70 text-left">
                #6547839
              </td>
              <td className="flex-1 text-sm font-medium text-gray-600 text-left">
                Valentino Parker
              </td>
              <td className="flex-1 text-sm font-medium text-gray-600 text-left">
                Dec 9, 11.00 AM
              </td>
              <td className="flex-1 flex items-center gap-x-2 text-main-orange-600 text-left">
                $500.00
              </td>
              <td className="flex-1 text-sm font-bold text-black text-left">
                <Menu as="div" className="relative">
                  <div>
                    <Menu.Button className="  text-sm font-medium text-black focus:outline-none p-1">
                      ...
                    </Menu.Button>
                  </div>
                  <PrintDropdown />
                </Menu>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="flex justify-between items-center mt-7">
        <Typography variant="body-sm-medium" as="span" className="text-black">
          1－10 of 57
        </Typography>
        <div className="flex items-center gap-x-4">
          <Typography variant="body-sm-medium" as="span" className="text-black">
            1 of 6
          </Typography>
          <span className="w-7 h-7 bg-white cursor-pointer rounded-full border border-gray-200 flex justify-center items-center shadow-basicSm">
            <BiChevronLeft className="w-4 h-4 text-main-secondary" />
          </span>
          <span className="w-7 h-7 bg-white cursor-pointer rounded-full border border-gray-200 flex justify-center items-center shadow-basicSm">
            <BiChevronRight className="w-4 h-4 text-main-secondary" />
          </span>
        </div>
      </div>
    </div>
  );
}

export default Invoices;
