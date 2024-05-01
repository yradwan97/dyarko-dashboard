import { createContext, ReactNode } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import { ToastifyClient, toastifyClient } from "services/toastifyClient";

type ToastifyProviderProps = {
  children: ReactNode;
};

export const Toastify = createContext<ToastifyClient>(toastifyClient);

const ToastifyProvider = ({ children }: ToastifyProviderProps) => {
  return (
    <Toastify.Provider value={toastifyClient}>
      <ToastContainer />
      {children}
    </Toastify.Provider>
  );
};

export default ToastifyProvider;
