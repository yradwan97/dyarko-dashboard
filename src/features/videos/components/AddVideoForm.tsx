import PostButton from "features/videos/components/PostButton";
import { useForm, ValidateResult } from "react-hook-form";
import {
  CustomRadioGroup,
  FileInputGroup,
  Form,
  InputGroup,
  RadioInputVariant,
} from "components/shared/form";
import { useState } from "react";
import { PaymentOption } from "features/properties";
import TextAreaGroup from "components/shared/form/TextAreaGroup";
import {t} from "i18next"

export interface AddVideoFormProps {
  submitHandler: (data: AddVideoFormData) => void;
}

export interface AddVideoFormData {
  title: string;
  description: string;
  videoFiles: FileList;
  paymentOption: PaymentOption;
}

const PAYMENT_OPTION_DEFAULT_VALUE = PaymentOption.CASH;

const AddVideoForm = ({ submitHandler }: AddVideoFormProps) => {
  const [paymentOption, setPaymentOption] = useState<PaymentOption>(
    PAYMENT_OPTION_DEFAULT_VALUE
  );
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AddVideoFormData>({
    defaultValues: { paymentOption: PAYMENT_OPTION_DEFAULT_VALUE },
  });

  const addVideoFormSchema = {
    paymentOption: {
      id: "paymentOption",
      register: {
        ...register("paymentOption", {
          required: t("pages.dashboard.videos.add.validation.payment-option")!,
        }),
      },
      error: errors.paymentOption,
    },
    title: {
      id: "title",
      register: {
        ...register("title", {
          required: t("pages.dashboard.videos.add.validation.title")!,
        }),
      },
      error: errors.title,
    },
    videoFiles: {
      id: "videoFiles",
      register: {
        ...register("videoFiles", {
          required: t("pages.dashboard.videos.add.validation.video")!,
          validate: {
            filesNumber: (files: FileList): ValidateResult => {
              return files.length === 1 || t("pages.dashboard.videos.add.validation.video-length")!;
            },
            fileFormat: (files: FileList): ValidateResult => {
              const allowedFormats = ["mp4"];
              const fileExtension = files[0].name
                .split(".")
                .pop()
                ?.toLowerCase();
              return (
                allowedFormats.includes(fileExtension || "") ||
                `${t("pages.dashboard.videos.add.validation.allowed-formats")!}: ${allowedFormats}`
              );
            },
            fileSize: (files: FileList): ValidateResult => {
              const fileSize = files[0].size;
              return (
                fileSize / 1024 / 1024 < 2 ||
                t("pages.dashboard.videos.add.validation.maximum-size")!
              );
            },
          },
        }),
      },
      error: errors.videoFiles,
    },
  };

  const paymentOptions = [
    {
      value: "wallet",
      label: t("pages.dashboard.videos.payment-methods.wallet"),
    },
    {
      value: "points",
      label: t("pages.dashboard.videos.payment-methods.points"),
    }
  ];

  return (
    <Form formHandleSubmit={handleSubmit} submitHandler={submitHandler}>
      <div className="p-6 border border-gray-200 rounded-lg mt-11 text-start">
        <CustomRadioGroup
          value={paymentOption}
          setValue={setPaymentOption}
          radioGroupItems={paymentOptions}
          hasIndicator={true}
          label={t("pages.dashboard.videos.payment-methods.label")}
          variant={RadioInputVariant.MAIN}
          inputSchema={addVideoFormSchema.paymentOption}
        />
        <InputGroup
          label={t("pages.dashboard.videos.add.title.text")}
          placeholder={t("pages.dashboard.videos.add.title.placeholder")!}
          inputSchema={addVideoFormSchema.title}
        />
        <FileInputGroup
          inputSchema={addVideoFormSchema.videoFiles}
          accept="video/*"
          uploadBody={{
            text: `${t("pages.dashboard.videos.upload-video.text")}`,
            icon: (
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
            ),
          }}
          label={t("pages.dashboard.videos.upload-video.label")!}
        />
      </div>
      <div className="flex justify-center">
        <PostButton />
      </div>
    </Form>
  );
};

export default AddVideoForm;
