interface updateKeyProps {
  params?: string;
  key: string;
  value: any;
}

export const updateKey = ({
  params = "",
  key,
  value,
}: updateKeyProps): string => {
  let updatedSearchParams = new URLSearchParams(params);
  updatedSearchParams.set(key, value);
  return updatedSearchParams.toString();
};

export const toParams = (params: any = ""): string => {
  let updatedSearchParams = new URLSearchParams(params);
  return updatedSearchParams.toString();
};
