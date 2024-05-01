import { FormInputSchema, Optional } from "types";
import {
  FieldError,
  FieldValues,
  Path,
  UseFormRegister,
} from "react-hook-form";
import { RegisterOptions } from "react-hook-form/dist/types/validator";

export class FormInputSchemaUtils<TFieldValues extends FieldValues> {
  constructor(private readonly register: UseFormRegister<TFieldValues>) {
    this.register = register;
  }

  getInputFieldSchema<TFieldName extends Path<TFieldValues>>(
    fieldName: TFieldName,
    error: Optional<FieldError>,
    registerOptions?: RegisterOptions<TFieldValues, TFieldName>
  ): FormInputSchema<TFieldName> {
    return {
      id: fieldName,
      register: this.register(fieldName, registerOptions),
      error: error,
    };
  }
}

export const mergeFileLists = (...filesLists: FileList[]): FileList => {
  const newFiles: File[] = [];
  for (let fileList of filesLists) {
    for (let file of fileList) {
      newFiles.push(file);
    }
  }

  return createFileListFromFileArray(newFiles);
};
export const createFileListFromFileArray = (array: File[]) => {
  return {
    length: array.length,
    item(index: number): File | null {
      return array[index] || null;
    },
    [Symbol.iterator](): IterableIterator<File> {
      let currentIndex = 0;
      return {
        next(): IteratorResult<File> {
          if (currentIndex >= array.length)
            return { value: array[currentIndex++], done: false };

          return { value: null, done: true };
        },
        [Symbol.iterator](): IterableIterator<File> {
          return this;
        },
      };
    },
  };
};
