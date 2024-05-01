import { Id, toast } from "react-toastify";
import { toastifyConfigs } from "configs/toastifyConfigs";

export interface ToastifyClient {
  loading: (toastifyParams: ToastifyParams) => Id;
  error: (toastifyParams: ToastifyParams) => Id;
  success: (toastifyParams: ToastifyParams) => Id;
}

type ToastifyParams = {
  message: string;
  id?: Id;
};

export const toastifyClient: ToastifyClient = {
  loading: ({ message, id }: ToastifyParams) => {
    if (id === undefined)
      return toast.loading(message, toastifyConfigs.LOADING);
    toast.update(id, { ...toastifyConfigs.LOADING, render: message });
    return id;
  },
  error: ({ message, id }: ToastifyParams) => {
    if (id === undefined) return toast(message, toastifyConfigs.ERROR);
    toast.update(id, { ...toastifyConfigs.ERROR, render: message });
    return id;
  },
  success: ({ message, id }: ToastifyParams) => {
    if (id === undefined) return toast(message, toastifyConfigs.SUCCESS);
    toast.update(id, { ...toastifyConfigs.SUCCESS, render: message });
    return id;
  },
};
