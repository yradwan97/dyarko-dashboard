import { useForm } from "react-hook-form";
import { Form, InputGroup } from "components/shared/form";
import { Button, Typography } from "components/shared/UI";
import { formatDate, getTomorrowDate } from "utils/date";
import { TourSchedule } from "features/account-settings/available-time/types";
import { ButtonVariant } from "components/shared/UI/buttons";
import { t } from "i18next";

interface TourScheduleFormData {
  date: string;
  timeFrom: string;
  timeTo: string;
}

interface AddTourScheduleFormProps {
  onSubmit: (tourSchedule: Omit<TourSchedule, "id">) => void;
}

const tomorrowDate = getTomorrowDate();
const formattedTomorrow = formatDate(tomorrowDate);

const AddTourScheduleForm = ({ onSubmit }: AddTourScheduleFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm<TourScheduleFormData>();

  const watchDate = watch("date", undefined);
  const watchTimeFrom = watch("timeFrom", undefined);

  const handleTourScheduleCreation = (
    tourScheduleFormData: TourScheduleFormData
  ) => {
    reset();
    onSubmit({
      availableDate: new Date(tourScheduleFormData.date),
      availableTime: {
        from: tourScheduleFormData.timeFrom,
        to: tourScheduleFormData.timeTo,
      },
    });
  };

  const tourFormSchema = {
    date: {
      id: "date",
      register: {
        ...register("date", {
          required: `${t("account.tour.available-date-required")}`,
          validate: {
            validateDate: (value) => {
              const selectedDate = new Date(value);
              const date = selectedDate.getDate();
              return (
                !isNaN(date) || `${t("account.tour.enter-available-date")}`
              );
            },
            validateMinDate: (value) => {
              const selectedDate = new Date(value);
              const today = new Date();
              return selectedDate > today || `${t("account.tour.no-past-date")}`;
            },
          },
        }),
      },
      error: errors.date,
    },
    timeFrom: {
      id: "timeFrom",
      register: {
        ...register("timeFrom", {
          required: `${t("account.tour.time-from-required")}`,
          validate: {
            validateTime: (value, formValues) => {
              if (!formValues.date) return `${t("account.tour.date-not-available")}`;
              const fullDate = `${formValues.date} ${value}`;
              const selectedDate = new Date(fullDate);
              const date = selectedDate.getDate();
              return (
                !isNaN(date) ||
                `${t("account.tour.enter-available-date")}`
              );
            },
          },
        }),
      },
      error: errors.timeFrom,
    },
    timeTo: {
      id: "timeTo",
      register: {
        ...register("timeTo", {
          required: `${t("account.tour.time-to-required")}`,
          validate: {
            validateTime: (value, formValues) => {
              const fullDate = `${formValues.date} ${value}`;
              const selectedDate = new Date(fullDate);
              const date = selectedDate.getDate();
              return (
                !isNaN(date) ||
                `${t("account.tour.enter-available-date")}`
              );
            },
            validateTimeIsAfterTimeFrom: (value, { timeFrom }) => {
              return value > timeFrom || `${t("account.tour.to-after-from")}`;
            },
          },
        }),
      },
      error: errors.timeTo,
    },
  };

  return (
    <Form
      formHandleSubmit={handleSubmit}
      submitHandler={handleTourScheduleCreation}
    >
      <div className="flex flex-col space-y-5">
        <InputGroup
          type="date"
          label="Available Date*"
          min={formattedTomorrow}
          inputSchema={tourFormSchema.date}
        />
        {watchDate ? (
          <div className="flex flex-col space-y-2">
            <Typography variant="body-sm-medium" as="p">
              {t("account.tour.available-time")} *
            </Typography>
            <div className="flex gap-x-5">
              <InputGroup
                type="time"
                label="From"
                containerClass="w-1/2"
                inputSchema={tourFormSchema.timeFrom}
              />
              {watchTimeFrom ? (
                <InputGroup
                  type="time"
                  label="To"
                  containerClass="w-1/2"
                  inputSchema={tourFormSchema.timeTo}
                />
              ) : null}
            </div>
          </div>
        ) : null}
        <Button variant={ButtonVariant.PRIMARY} className="self-end">
          Submit
        </Button>
      </div>
    </Form>
  );
};

export default AddTourScheduleForm;
