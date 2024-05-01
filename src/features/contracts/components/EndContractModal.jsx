import { useAppDispatch, useAppSelector } from "hooks"
import { useForm } from "react-hook-form"
import { Button, FormControl, FormLabel, Input, Stack, Text, Textarea, useToast } from "@chakra-ui/react"
import { Modal, Typography } from "components/shared/UI"
import { requestEndContract } from "../services/contractsService"

const EndContractModal = ({
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
  } = useForm({
    defaultValues: {
      property: data.property?._id,
    }
  });

  return (
    <div>
      <Modal isOpen={true} onClose={onClose} className="md:max-w-md">
        <Typography as="h2" className="text-[20px] capitalize text-start">
          {t("general.end-contract")}
        </Typography>
        <form onSubmit={handleSubmit(values => {
          dispatch(requestEndContract(values))
            .unwrap()
            .then(_ => {
              toast({ description: `${t("pages.contracts.end-contract.success")}` });
              onClose();
            })
            .catch(_ => {
              toast({ description: `${t("general.fail")}` });
              onClose();
            })
        })}>
          <Stack spacing={6} mt={12}>
            <FormControl>
              <FormLabel textTransform="capitalize">
                reason
              </FormLabel>
              <Textarea
                placeholder="reason" resize="none"
                {...register("causes", {
                  required: `${t("validation.required")}`
                })}
              />
              {errors.causes && (
                <Text color="red" textAlign="start">{errors.causes.message}</Text>
              )}
            </FormControl>
            <Button
              type="submit" bg="main.600" color="white"
              textTransform="capitalize"
              isLoading={contracts.isLoading}
              _hover={{ bg: "main.500" }}
            >
              {t("general.request")}
            </Button>
          </Stack>
        </form>
      </Modal>
    </div>
  )
}

export default EndContractModal