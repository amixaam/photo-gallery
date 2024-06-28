import { Link } from "@inertiajs/inertia-react";
import React from "react";

export const SecondaryButton = ({
    text = "Secondary Button",
    children = null,
    as = "button",
    className = "",

    onClick = () => {},
    href = "#",
}) => {
    if (as === "button") {
        return (
            <button
                onClick={onClick}
                type="reset"
                className={`${className} group flex flex-row gap-2 rounded-md bg-text bg-opacity-10  px-6 py-3 transition-all duration-200 hover:scale-[1.025] hover:drop-shadow-xl active:scale-100 active:brightness-95 active:drop-shadow-xl active:duration-100`}
            >
                {children ? children : <p>{text}</p>}
            </button>
        );
    }

    return (
        <Link
            onClick={onClick}
            href={href}
            type="reset"
            className={`${className} group flex flex-row gap-2 rounded-md bg-text bg-opacity-10  px-6 py-3 transition-all duration-200 hover:scale-[1.025] hover:drop-shadow-xl active:scale-100 active:brightness-95 active:drop-shadow-xl active:duration-100`}
        >
            {children ? children : <p>{text}</p>}
        </Link>
    );
};
