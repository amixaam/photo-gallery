export const cubicEasing = [0.16, 1, 0.3, 1];

export const container = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.075,
        },
    },
};



export const revealItem = {
    hidden: { opacity: 0, y: 50 },
    show: {
        transition: { duration: 1, ease: cubicEasing },
        opacity: 1,
        y: 0,
    },
};
