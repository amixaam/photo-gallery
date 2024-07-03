import { InertiaLink, Link, useForm } from "@inertiajs/inertia-react";
import React, { useEffect, useState } from "react";
import { DeleteModal } from "../components/DeleteModal";
import { IconButton } from "../components/IconButton";
import { IconLink } from "../components/IconLink";
import { SetToast } from "../utils/SetToast";
import { ImageComponent } from "../components/ImageComponent";
import { Inertia } from "@inertiajs/inertia";

function Photo({ auth, collection, image }) {
    const { delete: destroy } = useForm();
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
            onStart: () => {
                setShowDeleteModal(false);
            },
            onSuccess: () => {
                SetToast("Image successfully deleted.");
            },
            onError: (e) => {
                SetToast(
                    e.error
                        ? e.error
                        : "Something went wrong. Please try again later.",
                );
            },
        });
    };

    const handleKeyDown = (event) => {
        console.log(event.key);
        switch (event.key) {
            case "ArrowLeft":
                Inertia.visit(
                    route("photo", [collection.slug, ShowPreviousImage()]),
                    { replace: true },
                );
                break;
            case "ArrowRight":
                Inertia.visit(
                    route("photo", [collection.slug, ShowNextImage()]),
                    { replace: true },
                );
                break;
            case "Escape":
                Inertia.visit(route("gallery", collection.slug));
                break;
            default:
                break;
        }
    };

    useEffect(() => {
        document.addEventListener("keydown", handleKeyDown);

        return () => document.removeEventListener("keydown", handleKeyDown);
    }, []);

    return (
        <>
            {auth.user && (
                <DeleteModal
                    show={showDeleteModal}
                    CloseModal={() => {
                        setShowDeleteModal(false);
                    }}
                    id={image.id}
                    DeleteImage={DeleteImage}
                >
                    <p className="text-center text-text">
                        Are you sure you want to delete this photo?
                    </p>
                    <p className="text-center text-text">
                        This action cannot be reversed.
                    </p>
                </DeleteModal>
            )}

            <main
                className={`flex h-screen items-center justify-center overflow-hidden`}
            >
                <Overlay
                    image={image}
                    collection={collection}
                    auth={auth}
                    setShowDeleteModal={setShowDeleteModal}
                    ShowPreviousImage={ShowPreviousImage}
                    ShowNextImage={ShowNextImage}
                />

                <ImageComponent
                    src={`/storage/${image.path}`}
                    blurhash={image.blurhash}
                    alt={image.alt_text}
                    className="max-h-screen max-w-[100vw]"
                />
            </main>
        </>
    );
}

const Overlay = ({
    image,
    collection,
    auth,
    setShowDeleteModal,
    ShowPreviousImage,
    ShowNextImage,
}) => {
    return (
        <div className="fixed z-20 h-screen w-screen">
            {/* toolbar */}
            <div className="absolute top-0 z-10 flex w-full justify-between p-8 ">
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
                            SetToast("Link copied to clipboard!");
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
                        <div className="absolute left-full z-10 hidden w-72 -translate-x-full translate-y-2 rounded-md bg-bgsecondary p-4 group-hover:block md:w-fit md:*:text-nowrap">
                            <p className="text-text"> {image.title}</p>
                            <p className="text-text">
                                {image.title !== image.alt_text
                                    ? image.alt_text
                                    : ""}
                            </p>
                            <p className="text-text">
                                {image.location ? image.location : ""}
                            </p>
                            <p className="text-text">
                                {image.time ? image.time : ""}
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
                    replace
                    className="group flex h-full w-1/2 bg-gradient-to-r from-black30 to-transparent md:w-1/4 md:from-black50"
                >
                    <img
                        src="/images/back.svg"
                        alt="back icon"
                        className="pointer-events-none size-10 select-none transition-all group-hover:opacity-100 group-active:-translate-x-1 group-active:scale-90 md:size-12 lg:opacity-0"
                    />
                </Link>
                <Link
                    alt="Next image"
                    replace
                    href={route("photo", [collection.slug, ShowNextImage()])}
                    className="group flex h-full w-1/2 justify-end bg-gradient-to-l from-black30 to-transparent md:w-1/4 md:from-black50"
                >
                    <img
                        src="/images/front.svg"
                        alt="back icon"
                        className="pointer-events-none size-10 select-none transition-all group-hover:opacity-100 group-active:translate-x-1 group-active:scale-90 md:size-12 lg:opacity-0"
                    />
                </Link>
            </div>
        </div>
    );
};

export default Photo;
