import { CheckboxInput, Label } from "components/shared/form/index";
import React from "react";
import { FormInputSchema } from "types";

export interface InputConfig<TFieldName extends string> {
  label: string;
  inputSchema: FormInputSchema<TFieldName>;
}

export interface CheckboxInputGroupProps<TFieldName extends string> {
  label: string;
  inputsConfigs: InputConfig<TFieldName>[];
}

const CheckboxInputGroup = <TFieldName extends string>({
  label,
  inputsConfigs,
}: CheckboxInputGroupProps<TFieldName>) => {
  return (
    <div className="mb-4 flex flex-col gap-y-2">
      <Label>{label}</Label>
      <div className="flex gap-x-7 flex-wrap">
        {inputsConfigs.map((inputConfig) => {
          const error = inputConfig.inputSchema.error;
          const isError = !!error;
          return (
            <React.Fragment key={inputConfig.inputSchema.id}>
              <CheckboxInput
                label={inputConfig.label}
                inputSchema={inputConfig.inputSchema}
              />
              {isError && <p className="text-error">{error.message}</p>}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};

export default CheckboxInputGroup;
