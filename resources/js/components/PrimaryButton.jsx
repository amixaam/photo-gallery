import React from "react";
import Loader from "./Loader";
import { Link } from "@inertiajs/inertia-react";

function PrimaryButton({
    text = "Primary button",
    processing = false,
    disabled = false,
    href,
    onClick,
    style = "",
}) {
    // Button
    if (onClick) {
        return (
            <button
                onClick={onClick}
                disabled={disabled || processing}
                className={`${style} ${disabled ? "brightness-50" : "hover:scale-105 hover:drop-shadow-xl active:scale-100 active:brightness-95 active:drop-shadow-xl active:duration-100"} group flex items-center justify-center rounded-md bg-gradient-to-b from-text from-20% to-textdark to-60% px-6 py-2 transition-all duration-200`}
            >
                <div className={`h-full w-full flex justify-center ${processing && "opacity-0"}`}>
                    <Text>{text}</Text>
                </div>
                {processing && (
                    <div className="absolute flex h-full w-full items-center justify-center">
                        <Loader />
                    </div>
                )}
            </button>
        );
    }

    // Link
    return (
        <Link
            href={href}
            disabled={disabled || processing}
            className={`${style} ${disabled ? "brightness-50" : "hover:scale-105 hover:drop-shadow-xl active:scale-100 active:brightness-95 active:drop-shadow-xl active:duration-100"} group flex items-center justify-center rounded-md bg-gradient-to-b from-text from-20% to-textdark to-60% px-6 py-2 transition-all duration-200`}
        >
            <div
                className={`flex h-full w-full justify-center ${processing && "opacity-0"}`}
            >
                <Text>{text}</Text>
            </div>
            {processing && (
                <div className="absolute flex h-full w-full items-center justify-center">
                    <Loader />
                </div>
            )}
        </Link>
    );
}

const Text = ({ children, hidden = false }) => {
    return (
        <h4
            className={`${hidden && "opacity-0"} text-dark drop-shadow-md transition-all group-[&:hover]:drop-shadow-xl`}
        >
            {children}
        </h4>
    );
};

export default PrimaryButton;
