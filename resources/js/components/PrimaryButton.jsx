import React from "react";
import Loader from "./Loader";
import { Link } from "@inertiajs/inertia-react";

function PrimaryButton({
    text = "Primary button",
    processing = false,
    href,
    onClick,
    style = "",
}) {
    // Button
    if (onClick) {
        return (
            <button
                onClick={onClick}
                className={`${style} group justify-center items-center flex bg-gradient-to-b from-text from-20% to-60% to-textdark py-2 px-6 rounded-md transition-all duration-200 hover:drop-shadow-xl hover:scale-105 active:drop-shadow-xl active:scale-100 active:brightness-95 active:duration-100`}
            >
                {processing ? (
                    <>
                        <Loader />
                        <Text hidden={true}>{text[0]}</Text>
                    </>
                ) : (
                    <Text>{text}</Text>
                )}
            </button>
        );
    }

    // Link
    return (
        <Link
            href={href}
            className={`${style} group justify-center items-center flex bg-gradient-to-b from-text from-20% to-60% to-textdark py-2 px-6 rounded-md transition-all duration-200 hover:drop-shadow-xl hover:scale-105 active:drop-shadow-xl active:scale-100 active:brightness-95 active:duration-100`}
        >
            <Text>{text}</Text>
        </Link>
    );
}

const Text = ({ children, hidden = false }) => {
    return (
        <h4
            className={`${hidden && "opacity-0"} text-dark drop-shadow-md group-[&:hover]:drop-shadow-xl transition-all`}
        >
            {children}
        </h4>
    );
};

export default PrimaryButton;
