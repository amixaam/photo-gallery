import React from "react";
import { IconButton } from "../components/IconButton";
import { Link } from "@inertiajs/inertia-react";
import { IconLink } from "../components/IconLink";

function Photo({ auth, collection, image }) {
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

    return (
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
                    <p className="text-text drop-shadow-md">{image.title}</p>
                </div>
                <div className="flex gap-2">
                    <IconButton icon="share" alt="clear image button" />
                    {/* Admin only buttons */}
                    {auth.user && (
                        <>
                            <IconButton icon="edit" alt="Edit image" />
                            <IconButton icon="trash" alt="Delete image" />
                        </>
                    )}
                    <IconButton icon="info" alt="Image info" />
                </div>
            </div>
            {/* fade & controls */}
            <div className="absolute flex h-full w-full justify-between *:items-center *:px-16">
                <Link
                    alt="Previous image"
                    href={route("photo", [
                        collection.slug,
                        ShowPreviousImage(),
                    ])}
                    className="group flex h-full w-1/4 bg-gradient-to-r from-black50 to-transparent"
                >
                    <img
                        src="/images/back.svg"
                        alt="back icon"
                        className="pointer-events-none size-12 select-none opacity-0 transition-all group-hover:opacity-100 group-active:-translate-x-1 group-active:scale-90"
                    />
                </Link>
                <Link
                    alt="Next image"
                    href={route("photo", [collection.slug, ShowNextImage()])}
                    className="group flex h-full w-1/4 justify-end bg-gradient-to-l from-black50 to-transparent"
                >
                    <img
                        src="/images/front.svg"
                        alt="back icon"
                        className="pointer-events-none size-12 select-none opacity-0 transition-all group-hover:opacity-100 group-active:translate-x-1 group-active:scale-90"
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
    );
}

export default Photo;
