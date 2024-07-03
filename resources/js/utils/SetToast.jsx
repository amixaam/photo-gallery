import React from "react";
import { Toast } from "../components/Toast";
import toast from "react-hot-toast";

export const SetToast = (text) => {
    toast.custom((t) => <Toast t={t} text={text} />);
};
