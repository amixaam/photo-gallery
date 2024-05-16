import React, { useState } from "react";
import MainLayout from "../Layouts/MainLayout";
import { Link } from "@inertiajs/inertia-react";

function Gallery({ collection, selectedImage }) {
    const [ViewModal, setViewModal] = useState(selectedImage ? true : false);

    return (
        <>
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
                                        src={"/storage/images/" + image.title}
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
