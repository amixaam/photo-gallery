import React, { useState } from "react";
import MainLayout from "../Layouts/MainLayout";
import { InertiaLink, Link } from "@inertiajs/inertia-react";
import EmptyList from "../components/EmptyList";

function Gallery({ collection, selectedImage, auth }) {
    const [ViewModal, setViewModal] = useState(selectedImage ? true : false);

    if (collection.images.length === 0) {
        return (
            <MainLayout auth={auth.user}>
                <h1 className="special-text drop-shadow-md w-min text-4xl sm:text-6xl text-nowrap">
                    {collection.title}
                </h1>
                <EmptyList text="No images in this collection, for now!" />
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
                <h1 className="special-text drop-shadow-md w-min text-4xl sm:text-6xl text-nowrap">
                    {collection.title}
                </h1>

                <Link href={route("collections")} className="flex gap-2">
                    <img src="/images/back.svg" alt="" />
                    <p className="text-text">Go back</p>
                </Link>

                <div className="relative h-[64px]">
                    <div className="wave-middle" />
                </div>

                <main>
                    <div className="gap-6 columns-1 sm:columns-2 md:columns-3 lg:columns-4">
                        {collection.images.map((image) => (
                            <Link
                                key={image.id}
                                href={`/collections/${collection.slug}?i=${image.id}`}
                                preserveScroll
                                only={["selectedImage"]}
                                className="hover:scale-[1.025] w-full mb-6 transition-all duration-200"
                            >
                                <img
                                    src={"/storage/" + image.path}
                                    alt={image.alt_text}
                                    className="rounded-3xl w-full mb-6"
                                />
                            </Link>
                        ))}
                    </div>
                </main>

                <div className="relative h-[64px] opacity-40 mb-64">
                    <div className="wave-middle" />
                </div>
            </MainLayout>
        </>
    );
}

const ImageModal = ({ selectedImage, setViewModal, ViewModal }) => {
    return (
        <div
            className={`w-screen h-screen flex justify-center items-center fixed bg-bg70 z-20 transition-all duration-200 ${!ViewModal && "opacity-0 pointer-events-none"} `}
            onClick={() => setViewModal(false)}
        >
            <div className="h-full py-24 flex flex-col items-center">
                <div className="h-full">
                    <img
                        src={`/storage/${selectedImage?.path}`}
                        alt={selectedImage?.alt_text}
                        className="rounded-3xl h-full "
                    />
                </div>
                <h3 className="text-text">{selectedImage?.title}</h3>
            </div>
        </div>
    );
};

export default Gallery;
