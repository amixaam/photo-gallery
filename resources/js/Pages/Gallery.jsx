import React, { useState } from "react";
import MainLayout from "../Layouts/MainLayout";
import { Link } from "@inertiajs/inertia-react";

function Gallery({ collection, selectedImage, auth }) {
    const [ViewModal, setViewModal] = useState(selectedImage ? true : false);

    return (
        <>
            {/* <ImageModal
                selectedImage={selectedImage}
                setViewModal={setViewModal}
                ViewModal={ViewModal}
            /> */}

            <MainLayout auth={auth.user} margins={false}>
                {/* <h1 className="special-text drop-shadow-md w-min text-4xl sm:text-6xl text-nowrap">
                    {collection.title}
                </h1>

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
                                    src={"/storage/images/" + image.title}
                                    alt={image.alt_text}
                                    className="rounded-3xl w-full mb-6"
                                />
                            </Link>
                        ))}
                    </div>
                </main> */}
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
