import React, { useState } from "react";
import { IconButton } from "../components/IconButton";
import { Link, useForm } from "@inertiajs/inertia-react";
import { IconLink } from "../components/IconLink";
import { ModalSkeleton } from "../components/ModalSkeleton";
import PrimaryButton from "../components/PrimaryButton";
import { Toast } from "../components/Toast";

function Photo({ auth, collection, image, error }) {
    const { delete: destroy, recentlySuccessful, errors } = useForm();
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const imageList = () => {
        return collection.images.map((image) => {
            return image.id;
        });
    };

    const index = imageList().indexOf(image.id);

    const ShowNextImage = () => {
        if (index < imageList().length - 1) return imageList()[index + 1];
        else return imageList()[0];
    };

    const ShowPreviousImage = () => {
        if (index > 0) return imageList()[index - 1];
        else return imageList()[imageList().length - 1];
    };

    const DeleteImage = (e) => {
        e.preventDefault();
        destroy(route("photo.delete", image.id), {
            onSuccess: () => {
                setShowDeleteModal(false);
            },
        });
    };

    return (
        <>
            {auth.user && (
                <DeletePhotoModal
                    show={showDeleteModal}
                    CloseModal={() => {
                        setShowDeleteModal(false);
                    }}
                    id={image.id}
                    DeleteImage={DeleteImage}
                />
            )}

            <Toast
                text={"Image successfully deleted."}
                show={recentlySuccessful}
            />

            <div
                className={`fixed z-20 flex h-screen w-screen items-center justify-center bg-bg transition-all duration-200`}
            >
                {/* toolbar */}
                <div className="absolute top-0 z-10 flex w-full justify-between p-8">
                    <div className="flex items-center gap-2">
                        <IconLink
                            icon="back"
                            alt="Back"
                            href={route("gallery", collection.slug)}
                        />
                        <p className="hidden text-text drop-shadow-md md:block">
                            {image.title}
                        </p>
                    </div>
                    <div className="flex gap-2">
                        <IconButton
                            icon="share"
                            alt="clear image button"
                            onClick={() => {
                                navigator.clipboard.writeText(
                                    route("photo", [collection.slug, image.id]),
                                );
                            }}
                        />

                        {/* Admin only buttons */}
                        {auth.user && (
                            <>
                                <IconLink
                                    icon="edit"
                                    alt="Edit image"
                                    href={route("photo.edit", image.id)}
                                />
                                <IconButton
                                    icon="trash"
                                    alt="Delete image"
                                    onClick={() => setShowDeleteModal(true)}
                                />
                            </>
                        )}
                        <div className="group relative">
                            <IconButton icon="info" alt="View info button" />
                            <div className="clip absolute left-1/2 z-10 hidden size-8 -translate-x-1/2 rounded-full bg-bgsecondary group-hover:block"></div>
                            <div className="absolute left-full z-10 hidden w-fit -translate-x-full translate-y-2 rounded-md bg-bgsecondary p-4 *:text-nowrap group-hover:block">
                                <p className="text-text"> {image.title}</p>
                                <p className="text-text">
                                    {image.title !== image.alt_text
                                        ? image.alt_text
                                        : ""}
                                </p>
                                <p className="text-text">
                                    {image.location
                                        ? image.location
                                        : "No location"}
                                </p>
                                <p className="text-text">
                                    {image.time ? image.time : "No time"}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                {/* fade & controls */}
                <div className="absolute flex h-full w-full justify-between *:items-center *:px-4 md:*:px-16">
                    <Link
                        alt="Previous image"
                        href={route("photo", [
                            collection.slug,
                            ShowPreviousImage(),
                        ])}
                        className="group flex h-full w-1/2 bg-gradient-to-r from-black50 to-transparent md:w-1/4"
                    >
                        <img
                            src="/images/back.svg"
                            alt="back icon"
                            className="pointer-events-none size-10 select-none transition-all group-hover:opacity-100 group-active:-translate-x-1 group-active:scale-90 md:size-12 lg:opacity-0"
                        />
                    </Link>
                    <Link
                        alt="Next image"
                        href={route("photo", [
                            collection.slug,
                            ShowNextImage(),
                        ])}
                        className="group flex h-full w-1/2 justify-end bg-gradient-to-l from-black50 to-transparent md:w-1/4"
                    >
                        <img
                            src="/images/front.svg"
                            alt="back icon"
                            className="pointer-events-none size-10 select-none transition-all group-hover:opacity-100 group-active:translate-x-1 group-active:scale-90 md:size-12 lg:opacity-0"
                        />
                    </Link>
                </div>

                {/* image */}
                <img
                    src={`/storage/${image.path}`}
                    alt={image.alt_text}
                    className="max-h-full max-w-full"
                />
            </div>
        </>
    );
}

const DeletePhotoModal = ({
    show = false,
    CloseModal = () => {},
    DeleteImage,
}) => {
    return (
        <ModalSkeleton show={show} CloseModal={CloseModal}>
            <form className="flex flex-col gap-8" onSubmit={DeleteImage}>
                <h3 className="text-center text-text">Delete this photo?</h3>
                <div className="flex max-w-[27rem] flex-col gap-2">
                    <p className="text-center text-text">
                        Are you sure you want to delete this photo?
                    </p>
                    <p className="text-center text-text">
                        This action cannot be reversed.
                    </p>
                </div>
                <div className="flex justify-center gap-4">
                    <PrimaryButton text="Delete" onClick={() => {}} />
                    <SecondaryButton text="Cancel" onClick={CloseModal} />
                </div>
            </form>
        </ModalSkeleton>
    );
};
const SecondaryButton = ({ text = "Secondary Button", onClick = () => {} }) => {
    return (
        <button
            onClick={onClick}
            type="reset"
            className="group rounded-md bg-secondary20 px-6 py-2 transition-all duration-200 hover:scale-105 hover:drop-shadow-xl active:scale-100 active:brightness-95 active:drop-shadow-xl active:duration-100 "
        >
            <p className="text-text drop-shadow-md transition-all group-[&:hover]:drop-shadow-xl">
                {text}
            </p>
        </button>
    );
};

export default Photo;
