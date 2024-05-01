import { Tab } from "@headlessui/react";
import React from "react";
import Button from "components/shared/UI/buttons/Button";
import { FiSearch } from "react-icons/fi";
import { NavLink, Outlet } from "react-router-dom";
import CustomPagination from "../../shared/pagination/CustomPagination";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function MyProperties() {
  return (
    <div>
      <div className="flex justify-between items-center">
        <Tab.Group>
          <Tab.List className="bg-white p-1 rounded-lg text-center md:text-left transition-ease duration-300 border border-gray-200">
            {["Rented", "Sold", "Installment"].map((tab, i) => (
              <NavLink to={`${tab}`} key={i}>
                <Tab
                  key={i}
                  className={({ selected }) =>
                    classNames(
                      "text-md px-6 py-2.5 rounded-lg outline-0 border",
                      selected
                        ? " font-bold text-main-600 border-gray-200 shadow-basic"
                        : "text-gray-400 font-medium border-white"
                    )
                  }
                >
                  {tab}
                </Tab>
              </NavLink>
            ))}
          </Tab.List>
        </Tab.Group>
        <div className="relative w-4/12">
          <FiSearch className="text-2xl text-main-secondary absolute top-1/2 left-3 -translate-y-1/2" />
          <Button
            variant="input"
            className="w-full !pl-12 !border-0"
            placeholder="Search tenant by name or property id..."
          />
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mt-6 md:mt-10 gap-4 md:gap-8">
        <Outlet />
      </div>
      <CustomPagination />
    </div>
  );
}

export default MyProperties;
