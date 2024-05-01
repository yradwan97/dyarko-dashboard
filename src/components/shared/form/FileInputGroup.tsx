import { InputProps } from "components/shared/form/Input";
import { FormInputSchema } from "types";
import { ChangeEventHandler, ReactNode, useState } from "react";
import { formatBytes } from "utils/formatBytes";
import {
  FilesList,
  FilesView,
  InputGroupWrapper,
} from "components/shared/form";
import clsx from "classnames";
import { FieldPath } from "react-hook-form/dist/types/path";
import { FieldValues } from "react-hook-form";

export interface InputFile {
  id: string;
  name: string;
  preview: string;
  size: number;
  formattedSize: string;
  type: string;
}

export interface UploadBody {
  text: ReactNode;
  icon: ReactNode;
}

export interface FileInputGroupProps<
  TFieldValues extends FieldValues,
  TFieldName extends FieldPath<TFieldValues>
> extends InputProps {
  label: string;
  inputSchema: FormInputSchema<TFieldName>;
  uploadBody: UploadBody;
  maxFilesNumber?: number;
  containerClass?: string;
  labelClass?: string;
  inputClass?: string;
  filesView?: FilesView;
}

const FileInputGroup = <
  TFieldValues extends FieldValues,
  TFieldName extends FieldPath<TFieldValues>
>({
  labelClass,
  label,
  className,
  inputSchema: { id, error, register },
  uploadBody,
  maxFilesNumber = 1,
  filesView = FilesView.ROW,
  ...inputProps
}: FileInputGroupProps<TFieldValues, TFieldName>) => {
  const [files, setFiles] = useState<InputFile[]>([]);
  const { onChange, ...otherRegisterAttrs } = register;

  const handleFileChange: ChangeEventHandler<HTMLInputElement> = async (e) => {
    const newFiles = e.target.files ? e.target.files : null;
    if (!newFiles) return;
    const inputFiles = Array.from(newFiles).map((file) => ({
      id: `${file.name}${file.size}`,
      preview: URL.createObjectURL(file),
      size: file.size,
      formattedSize: formatBytes(file.size),
      type: file.type,
      name: file.name,
    }));
    await onChange(e);
    setFiles((prevFiles) => {
      return [...prevFiles, ...inputFiles];
    });
  };

  const handleFileRemove = (id: string) => {
    setFiles((prevFiles) => prevFiles.filter((filter) => filter.id !== id));
  };

  return (
    <InputGroupWrapper error={error} id={id} label={label}>
      <div className="flex flex-col space-y-5">
        <FilesList
          files={files}
          onFileRemove={handleFileRemove}
          view={filesView}
        />
        {files.length <= maxFilesNumber - 1 ? (
          <div
            className={clsx(
              "p-10",
              "border",
              "border-gray-200",
              "rounded-lg",
              "relative",
              "flex",
              "justify-center",
              "items-center"
            )}
          >
            <input
              id={id}
              className="absolute inset-0 opacity-0 cursor-pointer"
              type="file"
              onChange={handleFileChange}
              {...otherRegisterAttrs}
              {...inputProps}
            />
            <div className="space-y-4 flex flex-col items-center text-sm text-gray-400 font-lg">
              {uploadBody.icon}
              <p>{uploadBody.text}</p>
            </div>
          </div>
        ) : null}
      </div>
    </InputGroupWrapper>
  );
};

export default FileInputGroup;
