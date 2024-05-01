import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { Typography } from "components/shared/UI";
import ReportsFilterForm from "./ReportsFilterForm";
import { ReportsFilterFormData } from "../hooks/useReportsFilterForm";
import { t } from "i18next";

interface ReportsFilterProps {
  isFiltersShown: boolean;
  hideFilters: () => void;
  onFilter: (filterData: ReportsFilterFormData) => void;
  onReset: () => void;
}

const ReportsFilter = ({
  isFiltersShown,
  hideFilters,
  onFilter,
  onReset,
}: ReportsFilterProps) => {
  return (
    <Transition appear show={isFiltersShown} as={Fragment}>
      <Dialog as="div" className="relative z-[9999]" onClose={hideFilters}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>
        <div className="fixed top-0 right-0 z-[99991] bottom-0 w-1/3">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-100 translate-x-full"
            enterTo="opacity-100 -translate-x-0"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 -translate-x-0"
            leaveTo="opacity-100 translate-x-full"
          >
            <Dialog.Panel
              className={`relative text-start h-full overflow-y-auto bg-white py-8 px-9`}
            >
              <Typography
                variant="h4"
                as="h4"
                className="text-black capitalize mb-8"
              >
                {t("general.filter")}
              </Typography>
              {/* <form className="block space-y-6">
                <div>
                  <Label htmlFor="city">City*</Label>
                  <Button
                    variant="input"
                    id="city"
                    type="text"
                    className="block"
                    placeholder="City name"
                  />
                </div>
                <div className="">
                  <Label htmlFor="name">Buyer or renter name</Label>
                  <Button
                    variant="input"
                    id="name"
                    type="text"
                    className="block"
                    placeholder="Full name"
                  />
                </div>
                <div className="">
                  <Label htmlFor="property-type">Real-Estate Name</Label>
                  <Button
                    variant="input"
                    id="property-type"
                    type="text"
                    className="block"
                    placeholder="e.g villa"
                  />
                </div>
                <div className="">
                  <Label htmlFor="idNumber">ID</Label>
                  <Button
                    variant="input"
                    id="idNumber"
                    type="text"
                    className="block"
                    placeholder="e.g 232435467"
                  />
                </div>
                <div className="">
                  <Label htmlFor="idNumber">Date (From)</Label>
                  <div className="relative">
                    <CalenderIcon className="w-5 h-5 right-2 stroke-gray-400 absolute z-2 top-1/2 -translate-y-1/2" />
                  </div>
                </div>
                <div className="">
                  <Label htmlFor="idNumber">Date (To)</Label>
                  <div className="relative">
                    <CalenderIcon className="w-5 h-5 right-2 stroke-gray-400 absolute z-2 top-1/2 -translate-y-1/2" />
                  </div>
                </div>
                <div className="mt-8 flex justify-end items-center gap-x-2">
                  <Button
                    variant="primary-outline"
                    className="flex-1 font-bold"
                  >
                    Reset
                  </Button>
                  <Button variant="primary" className="flex-1 font-bold">
                    Apply
                  </Button>
                </div>
              </form> */}
              <ReportsFilterForm onFilter={onFilter} onReset={onReset} />
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
};

export default ReportsFilter;
