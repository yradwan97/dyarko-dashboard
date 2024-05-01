import {
  InputGroupWrapper,
  SelectField,
  SelectOption,
} from "components/shared/form";
import React, { SetStateAction } from "react";
import { FormInputSchema, Optional } from "types";
import { FieldValues, PathValue, UseFormSetValue } from "react-hook-form";
import { FieldPath } from "react-hook-form/dist/types/path";

export interface SelectGroupProps<
  TOption extends PathValue<TFieldValues, TFieldName>,
  TFieldValues extends FieldValues,
  TFieldName extends FieldPath<TFieldValues>
> {
  inputSchema: FormInputSchema<TFieldName>;
  label: string;
  selectedOption: Optional<SelectOption<TOption>>;
  options: Optional<SelectOption<TOption>[]>;
  setSelectedOption: (
    value: SetStateAction<Optional<SelectOption<TOption>>>
  ) => void;
  setFormValue: UseFormSetValue<TFieldValues>;
  placeholder?: string;
}

const SelectGroup = <
  TOption extends PathValue<TFieldValues, TFieldName>,
  TFieldValues extends FieldValues,
  TFieldName extends FieldPath<TFieldValues>
>({
  inputSchema,
  label,
  selectedOption,
  setSelectedOption,
  options,
  setFormValue,
  placeholder,
}: SelectGroupProps<TOption, TFieldValues, TFieldName>) => {
  const { id, error } = inputSchema;

  return (
    <InputGroupWrapper label={label} id={id} error={error}>
      <SelectField
        selectedOption={selectedOption}
        setSelectedOption={setSelectedOption}
        options={options}
        inputSchema={inputSchema}
        placeholder={placeholder}
        setFormValue={setFormValue}
      />
    </InputGroupWrapper>
  );
};

export default SelectGroup;
