import {PROPERTIES_KEY} from "features/properties";
import { useMutation } from "@tanstack/react-query";
import { toastifyClient } from "services/toastifyClient";
import { queryClient } from "services/queryClient";
import { createPromote as createPromoteService } from "../../services/api/promoteService"
import {Nullable} from "../../../../types";
import { useToast } from "@chakra-ui/react";
export const useMutatePromote = () => {
  const toast = useToast({position: "top"})
  const createPromoteMutation = useMutation({
    mutationFn: createPromoteService,
    onError: (error: Error) => toastifyClient.error({ message: error.message }),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: [PROPERTIES_KEY] });
      toast({description: "Property promoted successfully"})
    },
  });
  const createPromote = (propertyId: Nullable<string>, featureType: string) => {
    if(!propertyId) return;
    createPromoteMutation.mutate({propertyId, featureType})
  }

  return { createPromote };
};
