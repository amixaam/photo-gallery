import { Link } from "@inertiajs/inertia-react";
import { motion } from "framer-motion";
import { container, revealItem } from "../utils/FramerVariants";
import React from "react";
import MainLayout from "../Layouts/MainLayout";
import EmptyList from "../components/EmptyList";
import Header from "../components/Header";
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
                <motion.div
                    variants={container}
                    initial="hidden"
                    animate="show"
                    className="flex h-full flex-col gap-[inherit]"
                >
                    <motion.div variants={revealItem}>
                        <Header
                            title={collection.title}
                            back={true}
                            textNoWrap={false}
                            href={route("collections")}
                        />
                    </motion.div>

                    <main>
                        <motion.div
                            variants={revealItem}
                            className="columns-1 gap-12 sm:columns-2 md:columns-3 lg:columns-4"
                        >
                            {collection.images.map((image) => (
                                <div key={image.id}>
                                    <Link
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
                                </div>
                            ))}
                        </motion.div>
                    </main>
                </motion.div>
            </MainLayout>
        </>
    );
}

export default Gallery;
