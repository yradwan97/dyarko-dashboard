import { Form, InputGroup } from "components/shared/form";
import {
  ReportsFilterFormData,
  useReportsFilterForm,
} from "../hooks/useReportsFilterForm";
import { Button, ButtonVariant } from "components/shared/UI/buttons";
import { t } from "i18next";

interface ReportsFilterFormProps {
  onFilter: (filterData: ReportsFilterFormData) => void;
  onReset: () => void;
}

const ReportsFilterForm = ({ onFilter, onReset }: ReportsFilterFormProps) => {
  const { handleSubmit, formSchema } = useReportsFilterForm();
  return (
    <Form
      formHandleSubmit={handleSubmit}
      submitHandler={onFilter}
      className="block space-y-6"
    >
      <InputGroup inputSchema={formSchema.title} label={t("general.title")!} />
      <InputGroup inputSchema={formSchema.city} label={t("general.city")!} />
      <InputGroup
        inputSchema={formSchema.renterName}
        label={t("pages.reports.filter.name")}
      />
      <InputGroup
        inputSchema={formSchema.propertyTitle}
        label={t("general.property-title")!}
      />
      <InputGroup inputSchema={formSchema.propertyCode} label={t("pages.reports.filter.code")} />
      <InputGroup inputSchema={formSchema.status} label={t("pages.reports.filter.status")} />
      <InputGroup
        inputSchema={formSchema.dateFrom}
        label={t("pages.reports.filter.date-from")}
        type="date"
      />
      <InputGroup
        inputSchema={formSchema.dateTo}
        label={t("pages.reports.filter.date-to")}
        type="date"
      />
      <div className="mt-8 flex justify-center items-center gap-x-2 px-12">
        <Button
          variant={ButtonVariant.PRIMARY_OUTLINE}
          className="flex-1 font-bold py-3"
          type="button"
          onClick={onReset}
        >
          {t("general.reset")}
        </Button>
        <Button
          variant={ButtonVariant.PRIMARY}
          className="flex-1 font-bold py-3"
          type="submit"
        >
          {t("general.apply")}
        </Button>
      </div>
    </Form>
  );
};

export default ReportsFilterForm;
