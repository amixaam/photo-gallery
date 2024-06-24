import { Link } from "@inertiajs/inertia-react";
import React from "react";

export const IconLink = ({
    href = "#",
    icon = "close",
    disabled = false,
    alt = icon + "icon link",
}) => {
    return (
        <Link
            className="flex h-fit w-fit items-center justify-center rounded-full p-2 transition-all duration-200 hover:scale-105 hover:bg-secondary20"
            href={href}
            disabled={disabled}
        >
            <img src={`/images/${icon}.svg`} alt={alt} />
        </Link>
    );
};
