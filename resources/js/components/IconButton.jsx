import { Link } from "@inertiajs/inertia-react";
import React from "react";

export const IconButton = ({
    icon = "close",
    alt = icon + " icon button",
    disabled = false,
    className,

    as = "button",
    onClick = () => {},
    href = "#",
}) => {
    if (as === "button") {
        return (
            <button
                className={`flex h-fit w-fit items-center justify-center rounded-full p-2 transition-all duration-200 hover:scale-105 hover:bg-secondary20 ${className}`}
                onClick={onClick}
                disabled={disabled}
            >
                <img src={`/images/${icon}.svg`} alt={alt} />
            </button>
        );
    }

    return (
        <Link
            href={href}
            className={`flex h-fit w-fit items-center justify-center rounded-full p-2 transition-all duration-200 hover:scale-105 hover:bg-secondary20 ${className}`}
            disabled={disabled}
            preserveScroll
            preserveState
        >
            <img src={`/images/${icon}.svg`} alt={alt} />
        </Link>
    );
};
