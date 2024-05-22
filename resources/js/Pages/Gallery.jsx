import React, { useState } from "react";
import MainLayout from "../Layouts/MainLayout";
import { InertiaLink, Link } from "@inertiajs/inertia-react";
import EmptyList from "../components/EmptyList";

function Gallery({ collection, selectedImage, auth }) {
    const [ViewModal, setViewModal] = useState(selectedImage ? true : false);

    if (collection.images.length === 0) {
        let text = "Whoops! there are no images in this collection, for now!";

        // re-enable this once there are more images in my-best-works collection
        // if (!collection.is_public) {
        //     text = "Whoops! this collection is private!";
        // }
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
            <ImageModal
                selectedImage={selectedImage}
                setViewModal={setViewModal}
                ViewModal={ViewModal}
            />

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

                <div className="relative h-[64px]">
                    <div className="wave-middle" />
                </div>

                <main>
                    <div className="columns-1 gap-12 sm:columns-2 md:columns-3 lg:columns-4">
                        {collection.images.map((image) => (
                            <Link
                                key={image.id}
                                href={`/collections/${collection.slug}?i=${image.id}`}
                                preserveScroll
                                only={["selectedImage"]}
                                className="w-full transition-all duration-200 hover:scale-[1.025]"
                            >
                                <img
                                    src={"/storage/" + image.path}
                                    alt={image.alt_text}
                                    className="mb-12 w-full rounded-3xl"
                                />
                            </Link>
                        ))}
                    </div>
                </main>

                <div className="relative mb-64 h-[64px] opacity-40">
                    <div className="wave-middle" />
                </div>
            </MainLayout>
        </>
    );
}

const ImageModal = ({ selectedImage, setViewModal, ViewModal }) => {
    return (
        <div
            className={`fixed z-20 flex h-screen w-screen items-center justify-center bg-bg70 transition-all duration-200 ${!ViewModal && "pointer-events-none opacity-0"} `}
            onClick={() => setViewModal(false)}
        >
            <div className="flex h-full flex-col items-center py-24">
                <div className="h-full">
                    <img
                        src={`/storage/${selectedImage?.path}`}
                        alt={selectedImage?.alt_text}
                        className="h-full rounded-3xl "
                    />
                </div>
                <h3 className="text-text">{selectedImage?.title}</h3>
            </div>
        </div>
    );
};

export default Gallery;
