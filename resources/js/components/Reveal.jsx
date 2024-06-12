import React, { useEffect, useRef } from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import { cubicEasing } from "../utils/FramerVariants";

function Reveal({ children, styles = "", offsetY = 75 }) {
    const scrollRevealContainer = {
        hidden: { opacity: 0, y: offsetY },
        show: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.5,
                delay: 0.075,
                staggerChildren: 0.075,
                easing: cubicEasing,
            },
        },
    };
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });

    const mainControls = useAnimation();

    useEffect(() => {
        if (isInView) {
            mainControls.start("show");
        }
    }, [isInView]);

    return (
        <motion.div
            ref={ref}
            variants={scrollRevealContainer}
            initial="hidden"
            animate={mainControls}
            className={styles}
        >
            {children}
        </motion.div>
    );
}

export default Reveal;
