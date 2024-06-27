import React from "react";
import { motion } from "framer-motion";
import { container, revealItem } from "../utils/FramerVariants";

// Need a toast not on show, but on call, stay there for n seconds
export const Toast = ({ text = "Toast!", show = true }) => {
    if (!show) return null;

    return (
        <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="fixed bottom-0 z-30 w-full"
        >
            <motion.div
                variants={revealItem}
                className="flex w-full justify-center bg-primary py-2"
            >
                <motion.p variants={revealItem} className="text-dark">
                    {text}
                </motion.p>
            </motion.div>
        </motion.div>
    );
};
