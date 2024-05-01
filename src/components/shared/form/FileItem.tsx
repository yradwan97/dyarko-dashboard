import { ImAttachment } from "react-icons/im";
import { InputFile } from "components/shared/form";

export enum FilesView {
  GRID,
  ROW,
}

interface FileItemProps {
  file: InputFile;
  onRemove: (id: string) => void;
  filesView?: FilesView;
}

const FileItem = ({
  file,
  onRemove,
  filesView = FilesView.ROW,
}: FileItemProps) => {
  const views: Record<FilesView, JSX.Element> = {
    [FilesView.ROW]: (
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-x-2">
          <span className="w-11 h-11 bg-gray-100 rounded-xl flex justify-center items-center">
            <ImAttachment className="text-xl text-[#6D5DD3]" />
          </span>
          <p className="text-black text-base font-medium">{file.name}</p>
        </div>
        <button
          className="text-red text-sm font-bold cursor-pointer"
          onClick={() => onRemove(file.id)}
        >
          Delete
        </button>
      </div>
    ),
    [FilesView.GRID]: (
      <div className="relative">
        <img
          src={file.preview}
          alt={file.name}
          className="w-full h-full object-cover rounded-xl"
        />
        <button
          className="absolute inset-0 right-10 bottom-10 text-red text-sm font-bold cursor-pointer"
          onClick={() => onRemove(file.id)}
        >
          Delete
        </button>
      </div>
    ),
  };

  return views[filesView];
};

export default FileItem;
