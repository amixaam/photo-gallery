import React from "react";
import MainLayout from "../Layouts/MainLayout";
import { Link } from "@inertiajs/inertia-react";

export default function Collections({ collections, auth }) {
    return (
        <MainLayout auth={auth.user}>
            <h1 className="special-text drop-shadow-md w-min text-4xl sm:text-6xl text-nowrap">
                Collections
            </h1>

            <div className="relative h-[64px]">
                <div className="wave-middle" />
            </div>

            <main className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 gap-y-10">
                {collections.map((collection) => (
                    <Link
                        href={route("gallery", collection.slug)}
                        key={collection.id}
                        className="w-full aspect-square group flex flex-col gap-2"
                    >
                        <img
                            src={`/storage/${collection.cover_path}`}
                            alt={`${collection.title}'s cover art`}
                            className="object-cover h-full bg-footersecondary aspect-square rounded-3xl flex items-center justify-center text-text50 font-medium group-[&:hover]:scale-[1.01] transition-all duration-200"
                        />
                        <div className="flex flex-col sm:flex-row justify-between sm:items-center text-nowrap translate-y-2 group-[&:hover]:translate-y-0 transition-all duration-200">
                            <div className="flex flex-row gap-2 items-center">
                                <img
                                    src="/images/star.svg"
                                    alt=""
                                    className="scale-75 sm:scale-100 select-none "
                                />
                                <h3 className="text-text text-base sm:text-3xl">
                                    {collection.title}
                                </h3>
                            </div>
                            <div className="flex flex-row items-center ml-[-4px] sm:ml-0 opacity-70 gap-1">
                                <img
                                    src="/images/info.svg"
                                    alt=""
                                    className="scale-[0.6] select-none sm:scale-75"
                                />
                                <p className="text-text text-sm sm:text-base">
                                    {collection.images_count}{" "}
                                    {collection.images_count === 1
                                        ? "image"
                                        : "images"}
                                </p>
                            </div>
                        </div>
                    </Link>
                ))}
            </main>
            <div className="relative h-[64px] opacity-40 mb-64">
                <div className="wave-middle" />
            </div>


        </MainLayout>
    );
}
