import { InputFile } from "components/shared/form";
import { ImAttachment } from "react-icons/im";
import { HiOutlineTrash } from "react-icons/hi";

export enum FilesView {
  GRID,
  ROW,
}

export type HandleFileRemove = (id: string) => void;

interface FilesListProps {
  files: InputFile[];
  onFileRemove: HandleFileRemove;
  view?: FilesView;
}

const views: Record<
  FilesView,
  (files: InputFile[], handleFileRemove: HandleFileRemove) => JSX.Element
> = {
  [FilesView.ROW]: (files, handleFileRemove) => (
    <>
      {files.map((file) => (
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-x-2">
            <span className="w-11 h-11 bg-gray-100 rounded-xl flex justify-center items-center">
              <ImAttachment className="text-xl text-[#6D5DD3]" />
            </span>
            <p className="text-black text-base font-medium">{file.name}</p>
          </div>
          <button
            className="text-red text-sm font-bold cursor-pointer"
            onClick={() => handleFileRemove(file.id)}
          >
            Delete
          </button>
        </div>
      ))}
    </>
  ),
  [FilesView.GRID]: (files, handleFileRemove) => (
    <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-5 max-h-96 overflow-y-auto">
      {files.map((file) => (
        <div className="relative aspect-square">
          <img
            src={file.preview}
            alt={file.name}
            className="w-full h-full object-cover rounded-lg"
          />
          <button
            className="absolute right-3 bottom-3 p-1.5 text-sm bg-main-orange-500 bg-opacity-80 rounded-lg text-white hover:bg-opacity-90 transition-colors"
            onClick={() => handleFileRemove(file.id)}
            type="button"
          >
            <HiOutlineTrash size="1.2rem" />
          </button>
        </div>
      ))}
    </div>
  ),
};

const FilesList = ({
  files,
  onFileRemove,
  view = FilesView.ROW,
}: FilesListProps) => {
  return views[view](files, onFileRemove);
};

export default FilesList;
