import React, { useState } from "react";
import MainLayout from "../Layouts/MainLayout";
import { Link } from "@inertiajs/inertia-react";

function Gallery({ collection, selectedImage }) {
    const [ViewModal, setViewModal] = useState(selectedImage ? true : false);

    return (
        <>
            <div
                className={`${ViewModal ? "opacity-100" : "opacity-0 pointer-events-none"} py-24 w-screen h-screen flex flex-col justify-center items-center fixed bg-bg50 z-20 transition-all duration-200`}
                onClick={() => setViewModal(false)}
            >
                <div className="w-fit h-full">
                    <img
                        src={`/storage/${selectedImage?.path}`}
                        alt=""
                        className="h-full rounded-3xl"
                    />
                    <div className="flex flex-col w-full">
                        <h3 className="text-text">{selectedImage?.title}</h3>
                        <p className="text-text">{selectedImage?.alt_text}</p>
                    </div>
                </div>
            </div>
            <MainLayout>
                <main className="mx-8 pt-24 sm:pt-24 sm:mx-24 flex flex-col gap-4">
                    <div>
                        <h1 className="special-text drop-shadow-md w-min text-4xl sm:text-6xl text-nowrap">
                            {collection.title}
                        </h1>
                        <div className="flex flex-wrap gap-4">
                            {collection.images.map((image) => (
                                <Link
                                    key={image.id}
                                    href={`/collections/${collection.slug}?i=${image.id}`}
                                    preserveScroll
                                    only={["selectedImage"]}
                                    className="hover:scale-[1.025] transition-all duration-200"
                                >
                                    <img
                                        src={
                                            window.location.origin +
                                            "/storage/" +
                                            image.path
                                        }
                                        alt={image.alt_text}
                                        className="h-96 rounded-3xl"
                                    />
                                </Link>
                            ))}
                        </div>
                    </div>
                </main>
            </MainLayout>
        </>
    );
}

export default Gallery;
