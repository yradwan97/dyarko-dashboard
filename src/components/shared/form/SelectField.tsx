import { InputField, Select } from "components/shared/form";
import React, { SetStateAction, useCallback, useEffect } from "react";
import { FormInputSchema, Optional } from "types";
import { PathValue, UseFormSetValue } from "react-hook-form";
import { FieldValues } from "react-hook-form/dist/types/fields";
import { FieldPath } from "react-hook-form/dist/types/path";

export interface SelectOption<TOption> {
  label: string;
  value: TOption;
}

export interface SelectFieldProps<
  TOption extends PathValue<TFieldValues, TFieldName>,
  TFieldValues extends FieldValues,
  TFieldName extends FieldPath<TFieldValues>
> {
  inputSchema: FormInputSchema<TFieldName>;
  selectedOption: Optional<SelectOption<TOption>>;
  options: Optional<SelectOption<TOption>[]>;
  setSelectedOption: (
    value: SetStateAction<Optional<SelectOption<TOption>>>
  ) => void;
  setFormValue: UseFormSetValue<TFieldValues>;
  placeholder?: string;
}

const SelectField = <
  TOption extends PathValue<TFieldValues, TFieldName>,
  TFieldValues extends FieldValues,
  TFieldName extends FieldPath<TFieldValues>
>({
  inputSchema: { id, register },
  selectedOption,
  options,
  setSelectedOption,
  setFormValue,
  placeholder,
}: SelectFieldProps<TOption, TFieldValues, TFieldName>) => {
  useEffect(() => {
    if (!selectedOption) return;
    setFormValue(id, selectedOption?.value);
  }, [selectedOption, setFormValue, id]);

  const handleOptionChange = useCallback(
    (selectedOption: Optional<SelectOption<TOption>>) =>
      setSelectedOption(selectedOption),
    [setSelectedOption, selectedOption]
  );

  return (
    <>
      <Select
        onChange={handleOptionChange}
        renderOption={(option) => option?.label}
        options={options}
        selectedOption={selectedOption}
        buttonElement={
          selectedOption?.label ?? (
            <span className="text-gray-400">{placeholder}</span>
          )
        }
      />
      <InputField id={id} type="hidden" register={register} />
    </>
  );
};

export default SelectField;
