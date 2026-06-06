import { useToast } from "@/src/hooks/useToast";
import { useEffect, useRef } from "react";

interface ToastProps{
    id: number,
    message: String,
    type: "success" | "warning" | "info" | "error";
}

const toastTypes = {
  success: {
    background: "bg-accent-green",
    textColor: "text-white dark:text-black",
    sideColor: "bg-dark-green",
    toastName: "Success",
  },
  warning: {
    background: "bg-accent-yellow",
    textColor: "text-white dark:text-black",
    sideColor: "bg-dark-yellow",
    toastName: "Warning",
  },
  info: {
    background: "bg-accent-blue",
    textColor: "text-white dark:text-black",
    sideColor: "bg-dark-blue",
    toastName: "Info",
  },
  error: {
    background: "bg-accent-red",
    textColor: "text-white dark:text-black",
    sideColor: "bg-dark-red",
    toastName: "Error",
  },
};

export default function Toast({message, type, id }: ToastProps){
    const { toastName, background, sideColor, textColor } = toastTypes[type];
    const toast = useToast();
    const timerID = useRef<NodeJS.Timeout | null>(null);

    const handleDismiss = ()=>{
        toast.removeToast(id);
    }

    useEffect(()=>{
        timerID.current = setTimeout(()=>{
            handleDismiss();
        },5000);
        return ()=>{
            if(timerID.current){
                clearTimeout(timerID.current);
            }
        };
    });
}