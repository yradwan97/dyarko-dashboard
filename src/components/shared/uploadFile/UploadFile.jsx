import React, { useState } from "react";
import Label from "../../shared/label/Label";
import Button from "components/shared/UI/buttons/Button";
import { BsFileEarmarkArrowUp } from "react-icons/bs";
import { ImAttachment } from "react-icons/im";

function UploadFile() {
  const [contract, setContract] = useState();

  function handleAcceptedFiles(files) {
    files.map((file) =>
      Object.assign(file, {
        preview: URL.createObjectURL(file),
        formattedSize: formatBytes(file.size),
      })
    );
    setContract(files[0]);
  }

  function formatBytes(bytes, decimals = 2) {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
  }

  return (
    <>
      {contract ? (
        <div className="flex justify-between items-center mt-6">
          <div className="flex items-center gap-x-2">
            <span className="w-11 h-11 bg-gray-100 rounded-xl flex justify-center items-center">
              <ImAttachment className="text-xl text-[#6D5DD3]" />
            </span>
            <p className="text-black text-base font-medium">{contract.name}</p>
          </div>
          <span
            className="text-red text-sm font-bold cursor-pointer"
            onClick={() => setContract(null)}
          >
            Delete
          </span>
        </div>
      ) : (
        <div className="hover:cursor-pointer mt-6">
          <Label htmlFor="contract">Please upload the Property contract</Label>
          <div className="p-6 border border-gray-200 rounded-lg relative h-[100px] flex justify-center items-center cursor-pointer">
            <Button
              id="contract"
              variant="input"
              type="file"
              className="absolute inset-0 opacity-0 "
              onChange={(e) =>
                handleAcceptedFiles(Object.values(e.target.files))
              }
            />
            <div className="space-y-4 flex flex-col items-center">
              <BsFileEarmarkArrowUp className="text-gray-300 text-3xl" />
              <p className="text-sm text-gray-400 font-medium">
                Upload rent contract
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default UploadFile;
