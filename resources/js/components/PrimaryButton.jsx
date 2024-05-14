import React from "react";
import Loader from "./Loader";

function PrimaryButton({
    text = "Primary button",
    type = "link",
    processing = false,
    href = "#",
    onClick = () => {},
}) {
    if (type.toLowerCase() === "button") {
        return (
            <button
                onClick={onClick}
                className="group min-h-[2.7rem] justify-center items-center flex bg-gradient-to-b from-text from-20% to-60% to-textdark py-2 px-6 rounded-md transition-all duration-200 hover:drop-shadow-xl hover:scale-105 focus:drop-shadow-xl focus:scale-100 focus:brightness-95 focus:duration-100"
            >
                {processing ? (
                    <Loader />
                ) : (
                    <h4 className="text-dark drop-shadow-md group-[&:hover]:drop-shadow-xl transition-all flex justify-center">
                        {text}
                    </h4>
                )}
            </button>
        );
    }

    return (
        <a
            href={href}
            className="group bg-gradient-to-b from-text from-20% to-60% to-textdark py-2 px-6 rounded-md transition-all duration-200 hover:drop-shadow-xl hover:scale-105 focus:drop-shadow-xl focus:scale-100 focus:brightness-95 focus:duration-100"
        >
            <h4 className="text-dark drop-shadow-md group-[&:hover]:drop-shadow-xl transition-all">
                {text}
            </h4>
        </a>
    );
}

export default PrimaryButton;
