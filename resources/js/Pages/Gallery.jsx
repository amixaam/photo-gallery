import React, { useState } from "react";
import MainLayout from "../Layouts/MainLayout";
import { InertiaLink, Link } from "@inertiajs/inertia-react";
import EmptyList from "../components/EmptyList";
import { IconButton } from "../components/IconButton";
import { ImageComponent } from "../components/ImageComponent";

function Gallery({ collection, auth }) {
    if (collection.images.length === 0) {
        let text = "Whoops! there are no images in this collection, for now!";

        if (!collection.is_public) {
            text = "Whoops! this collection is private!";
        }
        return (
            <MainLayout auth={auth.user}>
                <h1 className="special-text w-min text-nowrap text-4xl drop-shadow-md sm:text-6xl">
                    {collection.title}
                </h1>
                <EmptyList text={text} />
            </MainLayout>
        );
    }
    return (
        <>
            <MainLayout auth={auth.user}>
                <div className="flex flex-col gap-4">
                    <h1 className="special-text w-min text-nowrap text-4xl drop-shadow-md sm:text-6xl">
                        {collection.title}
                    </h1>

                    <Link
                        href={route("collections")}
                        className="group flex w-fit gap-2"
                    >
                        <img
                            src="/images/back.svg"
                            alt=""
                            className="transition-all duration-200 group-hover:scale-x-150"
                        />
                        <p className="text-text transition-all duration-200 group-hover:font-bold">
                            Go back
                        </p>
                    </Link>
                </div>

                <main>
                    <div className="columns-1 gap-12 sm:columns-2 md:columns-3 lg:columns-4">
                        {collection.images.map((image) => (
                            <Link
                                key={image.id}
                                href={route("photo", [
                                    collection.slug,
                                    image.id,
                                ])}
                                preserveScroll
                                only={["selectedImage"]}
                                className="w-full transition-all duration-200 hover:scale-[1.025]"
                            >
                                <ImageComponent
                                    src={"/storage/" + image.path}
                                    blurhash={image.blurhash}
                                    alt={image.alt_text}
                                    className={`mb-12 w-full rounded-3xl aspect-[${image.aspect_ratio}]`}
                                />
                            </Link>
                        ))}
                    </div>
                </main>
            </MainLayout>
        </>
    );
}

export default Gallery;
