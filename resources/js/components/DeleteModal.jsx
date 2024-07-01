import React from "react";
import { ModalSkeleton } from "./ModalSkeleton";
import PrimaryButton from "./PrimaryButton";
import { SecondaryButton } from "./SecondaryButton";

export const DeleteModal = ({
    show = false,
    CloseModal = () => {},
    DeleteImage = () => {},
    title = "Delete this photo?",
    confirmButtonText = "Delete",
    children,
}) => {
    return (
        <ModalSkeleton show={show} CloseModal={CloseModal}>
            <form className="flex flex-col gap-8" onSubmit={DeleteImage}>
                <h3 className="text-center text-text">{title}</h3>
                <div className="flex max-w-[27rem] flex-col gap-2">
                    {children}
                </div>
                <div className="flex flex-row justify-center gap-4">
                    <PrimaryButton
                        text={confirmButtonText}
                        onClick={() => {}}
                    />
                    <SecondaryButton text="Cancel" onClick={CloseModal} />
                </div>
            </form>
        </ModalSkeleton>
    );
};
