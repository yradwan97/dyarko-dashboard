import { useMutateProperties } from "features/properties";

export const usePropertyActions = () => {
  const { deleteProperty: deletePropertyHook } = useMutateProperties();
  const editProperty = () => {};

  const deleteProperty = (id: string) => deletePropertyHook(id);

  const upgradePropertyPromotion = () => {};

  return { editProperty, deleteProperty, upgradePropertyPromotion };
};
