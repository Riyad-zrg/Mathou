import { useContext } from "react";
import { ToastContext } from "../context/Toast/ToastContext";

export const useToast = () => {
  const context = useContext(ToastContext);
  if (context === undefined) {
    throw new Error("ToastContext is undefined.");
  }
  return context;
};
