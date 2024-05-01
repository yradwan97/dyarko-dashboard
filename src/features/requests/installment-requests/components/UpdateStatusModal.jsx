import { useAppDispatch, useAppSelector } from "hooks"
import { useForm } from "react-hook-form"
import { Button, FormControl, FormLabel, Input, Select, Stack, Text, Textarea, useToast } from "@chakra-ui/react"
import { Modal, Typography } from "components/shared/UI"
import { updateInstallmentStatus } from "../services/installmentsService"

const UpdateStatusModal = ({
  data,
  onClose
}) => {
  const toast = useToast({ position: "top", colorScheme: "blue" });
  const dispatch = useAppDispatch();
  const contracts = useAppSelector(state => state.contracts);
  const {
    register,
    formState: { errors },
    handleSubmit
  } = useForm();

  return (
    <div>
      <Modal isOpen={true} onClose={onClose} className="md:max-w-md rounded-sm">
        <Typography as="h2" className="text-[20px] capitalize text-start">
          {t("pages.requests.installment.requirements")}
        </Typography>
        <form onSubmit={handleSubmit(values => {
          values.status = data.status;
          values.installmentId = data.installmentRequest?._id;

          const formData = new FormData();
          for (let obj in values) {
            formData.set(obj, values[obj]);
          }

          dispatch(updateInstallmentStatus(values))
            .unwrap()
            .then(_ => {
              toast({ description: `${t("pages.requests.installment.update.success")}` });
              onClose();
            })
            .catch(_ => {
              toast({ description: `${t("pages.requests.installment.update.fail")}` });
              onClose();
            })
        })}>
          <Stack spacing={6} mt={12}>
            {data.status === "rejected" ? (
              <Text>{t("pages.requests.installment.reject")}</Text>
            ) : (
              <>
                <FormControl>
                  <FormLabel textTransform="capitalize">
                    {t("pages.requests.installment.period")}
                  </FormLabel>
                  <Input
                    placeholder={t("pages.requests.installment.period")} height="48px"
                    {...register("max_installment_period", {
                      required: `${t("pages.requests.installment.validation.period")}`
                    })}
                  />
                  {errors.max_installment_period && (
                    <Text color="red" textAlign="start">{errors.max_installment_period.message}</Text>
                  )}
                </FormControl>
                  
                <FormControl>
                  <FormLabel textTransform="capitalize">
                    {t("pages.requests.installment.installment-type")}
                  </FormLabel>
                  <Select
                    placeholder={t("pages.requests.installment.installment-type")} height="48px"
                    {...register("installment_type", {
                      required: `${t("pages.requests.installment.validation.installment-type")}`
                    })}
                  >
                    <option value="monthly">{t("pages.requests.installment.types.monthly")}</option>
                    <option value="quarterly">{t("pages.requests.installment.types.quarterly")}</option>
                    <option value="semi-annually">{t("pages.requests.installment.types.semi-annually")}</option>
                    <option value="annually">{t("pages.requests.installment.types.annually")}</option>
                  </Select>
                  {errors.installment_type && (
                    <Text color="red" textAlign="start">{errors.installment_type.message}</Text>
                  )}
                </FormControl>

                <FormControl>
                  <FormLabel textTransform="capitalize">
                    {t("pages.requests.installment.amount")}
                  </FormLabel>
                  <Input
                    type="number" placeholder="amount" height="48px"
                    {...register("amount", {
                      required: `${t("pages.requests.installment.validation.amount")}`
                    })}
                  />
                  {errors.amount && (
                    <Text color="red" textAlign="start">{errors.amount.message}</Text>
                  )}
                </FormControl>

                <FormControl>
                  <FormLabel textTransform="capitalize">
                    {t("pages.requests.installment.start-date")}
                  </FormLabel>
                  <Input
                    type="datetime-local" placeholder="start date" height="48px"
                    {...register("start_date", {
                      required: `${t("pages.requests.installment.validation.start-date")}`
                    })}
                  />
                  {errors.start_date && (
                    <Text color="red" textAlign="start">{errors.start_date.message}</Text>
                  )}
                </FormControl>

                <FormControl>
                  <FormLabel textTransform="capitalize">
                    {t("pages.requests.installment.contract")}
                  </FormLabel>
                  <Input
                    type="file" height="48px" paddingTop={2}
                    {...register("contract")}
                  />
                </FormControl>
              </>
            )}
            <Button
              type="submit" bg="main.600" color="white"
              textTransform="capitalize"
              _hover={{ bg: "main.500" }}
              isLoading={contracts.isLoading}
            >
              {t('general.done')}
            </Button>
          </Stack>
        </form>
      </Modal>
    </div>
  )
}

export default UpdateStatusModal