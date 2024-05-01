import { Close } from "@mui/icons-material";
import { toast, ToastOptions } from "react-toastify";

export const TOASTIFY_DEFAULT_OPTIONS = {
  autoClose: 8000,
  closeButton: Close,
  pauseOnHover: true,
  pauseOnFocusLoss: true,
  closeOnClick: true,
};

export interface ToastifyConfigs {
  LOADING: ToastOptions;
  ERROR: ToastOptions;
  SUCCESS: ToastOptions;
  INFO: ToastOptions;
  WARNING: ToastOptions;
}

export const toastifyConfigs: ToastifyConfigs = {
  LOADING: { ...TOASTIFY_DEFAULT_OPTIONS },
  ERROR: {
    ...TOASTIFY_DEFAULT_OPTIONS,
    type: toast.TYPE.ERROR,
    autoClose: false,
    isLoading: false,
  },
  SUCCESS: {
    ...TOASTIFY_DEFAULT_OPTIONS,
    type: toast.TYPE.SUCCESS,
    isLoading: false,
  },
  WARNING: {
    ...TOASTIFY_DEFAULT_OPTIONS,
    type: toast.TYPE.WARNING,
  },
  INFO: {
    ...TOASTIFY_DEFAULT_OPTIONS,
    type: toast.TYPE.INFO,
  },
};
