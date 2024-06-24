import React from "react";

export const IconButton = ({
    onClick = () => {
        console.log("Clicked!");
    },
    icon = "close",
    disabled = false,
    alt = icon + " icon button",
}) => {
    return (
        <button
            className="flex h-fit w-fit items-center justify-center rounded-full p-2 transition-all duration-200 hover:scale-105 hover:bg-secondary20"
            onClick={onClick}
            disabled={disabled}
        >
            <img src={`/images/${icon}.svg`} alt={alt} />
        </button>
    );
};
