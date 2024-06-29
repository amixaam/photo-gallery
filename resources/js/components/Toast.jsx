import React from "react";
import { motion } from "framer-motion";
import { container, revealItem } from "../utils/FramerVariants";

export const Toast = ({ text = "Toast!", t }) => {
    return (
        <motion.div
            variants={container}
            initial="hidden"
            animate={t.visible ? "show" : "hidden"}
            className="z-[100] w-full"
        >
            <motion.div
                variants={revealItem}
                className="flex w-full justify-center bg-primary py-2"
            >
                <p variants={revealItem} className="text-dark">
                    {text}
                </p>
            </motion.div>
        </motion.div>
    );

    // Call toast with:
    // toast.custom((t) => (
    //         <Toast t={t} text="Example toast!" />
    //     ));
    // }}
};
