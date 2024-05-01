import { ChangeEventHandler, InputHTMLAttributes, useState } from "react";
import { Label } from "components/shared/form";
import { formatBytes } from "utils/formatBytes";
import { ImAttachment } from "react-icons/im";
import { t } from "i18next";

export interface VideoFile {
  name: string;
  preview: string;
  size: number;
  formattedSize: string;
  type: string;
}

export interface VideoUploaderProps
  extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  register: any;
  error: any;
}

const VideoUploader = ({ id, register, error }: VideoUploaderProps) => {
  const [videoFile, setVideoFile] = useState<VideoFile | null>();
  const isError = !!error;
  const { onChange, ...otherRegisterAttrs } = register;

  const handleFileChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (file === null) return;
    const videoFile = {
      preview: URL.createObjectURL(file),
      size: file.size,
      formattedSize: formatBytes(file.size),
      type: file.type,
      name: file.name,
    };
    onChange(e);
    setVideoFile(videoFile);
  };

  const handleRemoveVideoClick = () => setVideoFile(null);

  return (
    <div className="flex flex-col space-y-3">
      {videoFile ? (
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-x-2">
            <span className="w-11 h-11 bg-gray-100 rounded-xl flex justify-center items-center">
              <ImAttachment className="text-xl text-[#6D5DD3]" />
            </span>
            <p className="text-black text-base font-medium">{videoFile.name}</p>
          </div>
          <button
            className="text-red text-sm font-bold cursor-pointer"
            onClick={handleRemoveVideoClick}
          >
            Delete
          </button>
        </div>
      ) : (
        <div className="flex flex-col space-y-3">
          <Label id={id}>{t("pages.dashboard.videos.upload-video.label")!}</Label>
          <div className="p-10 border border-gray-200 rounded-lg relative flex justify-center items-center">
            <input
              id={id}
              className="absolute inset-0 opacity-0 cursor-pointer"
              accept="video/*"
              title=""
              type="file"
              onChange={handleFileChange}
              {...otherRegisterAttrs}
            />
            <div className="space-y-4 flex flex-col items-center">
              <svg
                width="35"
                height="29"
                viewBox="0 0 35 29"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="fill-transparent stroke-gray-300"
              >
                <path d="M22.2225 26.5897L20.6237 27.5217H22.4743H33.5039C33.7812 27.5217 34 27.744 34 28.0108C34 28.2777 33.7812 28.5 33.5039 28.5H15.0481C15.0422 28.4997 15.0335 28.4992 15.0231 28.499V28.499L15.0168 28.499C11.2798 28.4772 7.77286 27.0237 5.12901 24.3983C2.46531 21.7531 1 18.2394 1 14.5C1 10.7606 2.46531 7.24692 5.12901 4.60174C7.7929 1.95644 11.3329 0.5 15.1015 0.5C18.8702 0.5 22.4102 1.95644 25.0741 4.60174C27.7378 7.24692 29.2031 10.7607 29.2031 14.5C29.2031 18.2393 27.7378 21.7531 25.0741 24.3983C24.2086 25.2577 23.2503 25.9906 22.2225 26.5897ZM14.2072 19.3376C14.2072 17.1364 12.4058 15.3525 10.1978 15.3525C7.98979 15.3525 6.18827 17.1364 6.18827 19.3376C6.18827 21.5387 7.98985 23.3227 10.1978 23.3227C12.4057 23.3227 14.2072 21.5387 14.2072 19.3376ZM10.1978 5.67735C7.98978 5.67735 6.18827 7.46133 6.18827 9.66245C6.18827 11.8636 7.98986 13.6475 10.1978 13.6475C12.4057 13.6475 14.2072 11.8636 14.2072 9.66245C14.2072 7.46135 12.4058 5.67735 10.1978 5.67735ZM20.0054 13.6475C22.2133 13.6475 24.0148 11.8636 24.0148 9.66245C24.0148 7.46135 22.2134 5.67735 20.0054 5.67735C17.7974 5.67735 15.9959 7.46133 15.9959 9.66245C15.9959 11.8636 17.7975 13.6475 20.0054 13.6475ZM24.0148 19.3376C24.0148 17.1364 22.2134 15.3525 20.0054 15.3525C17.7974 15.3525 15.9959 17.1364 15.9959 19.3376C15.9959 21.5387 17.7975 23.3227 20.0054 23.3227C22.2133 23.3227 24.0148 21.5387 24.0148 19.3376Z" />
              </svg>
              <p className="text-sm text-gray-400 font-medium">
                {t("pages.dashboard.videos.add-video")}
              </p>
            </div>
          </div>
        </div>
      )}
      {isError && <p className="text-error">{error.message}</p>}
    </div>
  );
};

export default VideoUploader;
