import {
  deleteProperty as deletePropertyService,
  PROPERTIES_KEY,
  Property,
} from "features/properties";
import { useMutation } from "@tanstack/react-query";
import { toastifyClient } from "services/toastifyClient";
import { queryClient } from "services/queryClient";

export const useMutateProperties = () => {
  const deletePropertyMutation = useMutation({
    mutationFn: deletePropertyService,
    onError: (error: Error) => toastifyClient.error({ message: error.message }),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: [PROPERTIES_KEY] });
    },
  });

  const createProperty = (property: Property) => {};

  const deleteProperty = (id: string) => {
    deletePropertyMutation.mutate(id);
  };

  const editProperty = (id: string) => {};

  return { createProperty, deleteProperty, editProperty };
};
