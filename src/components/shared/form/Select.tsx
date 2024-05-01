import React, { ReactNode } from "react";
import { Listbox } from "@headlessui/react";
import { CheckIcon, ChevronDownIcon } from "@heroicons/react/20/solid";
import { DropDownTransition } from "components/shared/transitions";
import { Optional } from "types";
import clsx from "classnames";

export type RenderOption<TOption> = (option: TOption) => ReactNode;

export interface SelectProps<TOption> {
  options: Optional<TOption[]>;
  selectedOption: TOption;
  onChange: (value: TOption) => void;
  renderOption: RenderOption<TOption>;
  buttonElement: ReactNode;
}

const Select = <TOption,>({
  options,
  selectedOption,
  onChange,
  renderOption,
  buttonElement,
}: SelectProps<TOption>) => {
  const buttonStyles = clsx(
    "relative",
    "w-full",
    "border",
    "border-main-200",
    "cursor-default",
    "rounded-lg",
    "bg-white",
    "py-2",
    "pl-3",
    "pr-10",
    "text-left",
    "shadow-sm",
    "focus:outline-none",
    "focus-visible:border-main-500",
    "focus-visible:ring-2",
    "focus-visible:ring-white",
    "focus-visible:ring-opacity-75",
    "focus-visible:ring-offset-2",
    "focus-visible:ring-offset-main-200",
    "sm:text-sm"
  );
  return (
    <Listbox value={selectedOption} onChange={onChange}>
      <div className="relative">
        <Listbox.Button className={buttonStyles}>
          {buttonElement}
          <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
            <ChevronDownIcon
              className="h-5 w-5 text-gray-400"
              aria-hidden="true"
            />
          </span>
        </Listbox.Button>
        <DropDownTransition>
          <Listbox.Options className="absolute z-1 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
            {options?.map((option, index) => (
              <Listbox.Option
                key={index}
                className={({ active, selected }) =>
                  `relative cursor-default select-none py-2 pl-10 pr-4 ${
                    active || selected
                      ? "bg-main-500 text-white"
                      : "text-gray-900"
                  }`
                }
                value={option}
              >
                {({ selected }) => (
                  <>
                    <span
                      className={`block truncate ${
                        selected ? "font-medium" : "font-normal"
                      }`}
                    >
                      {renderOption(option)}
                    </span>
                    {selected ? (
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                        <CheckIcon className="h-5 w-5" aria-hidden="true" />
                      </span>
                    ) : null}
                  </>
                )}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </DropDownTransition>
      </div>
    </Listbox>
  );
};

export default Select;
