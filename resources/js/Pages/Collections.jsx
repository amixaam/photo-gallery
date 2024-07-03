import { Link } from "@inertiajs/inertia-react";
import { motion } from "framer-motion";
import React from "react";
import MainLayout from "../Layouts/MainLayout";
import EmptyList from "../components/EmptyList";
import Header from "../components/Header";
import { ImageComponent } from "../components/ImageComponent";
import PrimaryButton from "../components/PrimaryButton";
import { container, revealItem } from "../utils/FramerVariants";

export default function Collections({
    collections,
    featured_collection,
    auth,
}) {
    if (collections.length === 0) {
        return (
            <MainLayout auth={auth.user}>
                <motion.div
                    variants={container}
                    initial="hidden"
                    animate="show"
                    className="flex h-full flex-col justify-center gap-[inherit]"
                >
                    <motion.div variants={revealItem}>
                        <h1 className="special-text w-min text-nowrap text-4xl drop-shadow-md sm:text-6xl">
                            Collections
                        </h1>
                    </motion.div>

                    <motion.div variants={revealItem}>
                        <EmptyList text="Whoops! there are no public collections, for now!" />
                    </motion.div>
                </motion.div>
            </MainLayout>
        );
    }
    return (
        <MainLayout auth={auth.user}>
            <motion.div
                variants={container}
                initial="hidden"
                animate="show"
                className="flex h-full flex-col justify-center gap-[inherit]"
            >
                <motion.div variants={revealItem}>
                    <NewCollectionBanner data={featured_collection} />
                </motion.div>

                <motion.div variants={revealItem}>
                    <div className="flex justify-between">
                        <Header title="Collections" />

                        <div className="flex flex-row items-center gap-2">
                            <img
                                src="/images/collections.svg"
                                alt=""
                                className="size-6"
                            />
                            <p className="hidden sm:block">
                                {collections.length} collections
                            </p>
                            <p className="block sm:hidden">
                                {collections.length}
                            </p>
                        </div>
                    </div>
                </motion.div>

                <motion.div
                    variants={container}
                    initial="hidden"
                    animate="show"
                >
                    <main className="grid grid-cols-1 gap-12 gap-y-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        {collections.map((collection) => (
                            <motion.div
                                variants={revealItem}
                                key={collection.id}
                            >
                                <CollectionCard
                                    collection={collection}
                                    auth={auth}
                                />
                            </motion.div>
                        ))}
                    </main>
                </motion.div>
            </motion.div>
        </MainLayout>
    );
}

const CollectionCard = ({ collection, auth }) => {
    return (
        <Link
            href={route("gallery", collection.slug)}
            className={`group relative mb-6 flex aspect-square w-full flex-col gap-2`}
        >
            {!auth.user && collection.is_featured == 1 && (
                <div className="pointer-events-none absolute right-0 top-0 z-[2] m-4 size-8 rotate-45 drop-shadow-2xl transition-all duration-200 group-hover:scale-110">
                    <img
                        src="/images/pin.svg"
                        alt="pin icon"
                        className="h-full w-full"
                    />
                </div>
            )}
            {auth.user && (
                <Link
                    href={route("gallery.pin", collection.slug)}
                    className="absolute right-0 top-0 z-[2] m-4 size-8 rotate-45 drop-shadow-2xl transition-all duration-200 hover:opacity-50 group-hover:scale-105"
                    preserveScroll
                    preserveState
                >
                    <img
                        src={`/images/${collection.is_featured ? "pin" : "pin-empty"}.svg`}
                        alt="pin icon"
                        className="h-full w-full"
                    />
                </Link>
            )}
            <ImageComponent
                src={`/storage/${collection.cover_path}`}
                blurhash={collection.cover_blurhash}
                alt={`${collection.title}'s cover art`}
                parentClassname="h-full aspect-square"
                className={"h-full w-full rounded-3xl object-cover"}
            />
            <div className="flex flex-1 translate-y-2 flex-col  justify-between text-nowrap transition-all duration-200 group-[&:hover]:translate-y-0">
                <div className="flex flex-row items-center gap-2">
                    <img
                        src="/images/star.svg"
                        alt=""
                        className="scale-75 select-none sm:scale-100 "
                    />
                    <h3 className="text-xl text-text ">{collection.title}</h3>
                </div>
                <div className="ml-[-6px] flex flex-row items-center gap-1 opacity-50">
                    <img
                        src="/images/photo-library.svg"
                        alt=""
                        className="scale-[0.6] select-none sm:scale-[0.6]"
                    />
                    <p className="text-sm text-text sm:text-base">
                        {collection.images_count}
                    </p>
                </div>
            </div>
        </Link>
    );
};

const NewCollectionBanner = ({ data }) => {
    if (!data) return null;

    const { collection, reason } = data;

    if (collection === null) return null;

    return (
        <Link
            href={route("gallery", collection.slug)}
            className="
            group relative flex h-fit flex-col items-center justify-center rounded-[100px] bg-gradient-to-b from-secondary from-10% to-primary 
            to-90% p-8 transition-all 
            duration-200 hover:scale-[1.005] hover:shadow-red-50 hover:drop-shadow-[0_10px_50px_#F6D4EA30] sm:flex-row 
            sm:justify-between sm:p-8 md:h-[35rem] lg:p-16"
        >
            {/* Star borders */}
            <img
                src="/images/star.svg"
                alt=""
                className="absolute left-6 top-6 scale-[4] select-none"
            />
            <img
                src="/images/star.svg"
                alt=""
                className="absolute bottom-6 right-6 scale-[4] select-none"
            />

            <div className="flex w-full min-w-[50%] flex-col items-center justify-center gap-8 md:items-start">
                {/* filtered text */}
                <span className="blend-text absolute right-1/2 hidden select-none text-[20rem] font-black leading-[74%] lg:block">
                    {collection.images_count}
                </span>

                {/* new collection tag */}
                <div className="flex w-fit gap-2 rounded-full border-2 border-secondary60 bg-secondary20 px-6 py-1">
                    <img
                        src="/images/collections.svg"
                        alt=""
                        className="scale-[0.9]"
                    />
                    <p className="uppercase text-text">
                        {reason === "newly_created"
                            ? "new collection!"
                            : "Featured"}
                    </p>
                </div>

                {/* collection info */}
                <div className=" relative flex flex-col gap-2">
                    {/* content */}
                    <h1 className="special-text text-balance text-center text-4xl drop-shadow-md md:text-left lg:text-6xl">
                        {collection.title}
                    </h1>
                    {reason === "newly_created" && (
                        <div className="flex  justify-center gap-2 md:justify-normal">
                            <img
                                src="/images/photo-library.svg"
                                alt=""
                                className="scale-[0.9]"
                            />
                            <p className=" text-text">
                                {collection.images_count} new images!
                            </p>
                        </div>
                    )}
                </div>

                {/* buttons & links */}
                <div className="flex gap-8">
                    <PrimaryButton
                        text="View collection"
                        href={route("gallery", collection.slug)}
                    />
                </div>
            </div>
            <ImageComponent
                src={`/storage/${collection.cover_path}`}
                blurhash={collection.cover_blurhash}
                alt={`${collection.title}'s cover art`}
                parentClassname="hidden h-full min-w-[50%] rounded-full opacity-90 transition-all duration-200 md:block"
                className="h-full w-full rounded-full"
            />
        </Link>
    );
};
