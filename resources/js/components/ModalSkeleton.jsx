import React from "react";

export const ModalSkeleton = ({ show, CloseModal = () => {}, children }) => {
    return (
        <div
            className={`fixed z-50 flex h-screen w-screen items-center justify-center ${!show && "pointer-events-none opacity-0"} `}
        >
            <div
                className="absolute h-full w-full bg-bg70"
                onClick={CloseModal}
            ></div>
            <div className="z-10 flex flex-col items-center justify-center rounded-3xl bg-bg p-8">
                {children}
            </div>
        </div>
    );
};
