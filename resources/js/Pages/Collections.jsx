import React from "react";
import MainLayout from "../Layouts/MainLayout";
import { Link } from "@inertiajs/inertia-react";

export default function Collections({ collections }) {
    console.log(collections);
    return (
        <MainLayout>
            <main className="mx-8 pt-24 sm:pt-24 sm:mx-24 flex flex-col gap-4">
                <h1 className="special-text drop-shadow-md w-min text-4xl sm:text-6xl text-nowrap">
                    Collections
                </h1>
                {collections.map((collection) => (
                    <Link
                        href={route("gallery", collection.slug)}
                        key={collection.id}
                        className="w-fit hover:scale-[1.025] transition-all duration-200"
                    >
                        <img
                            src=""
                            alt={`${collection.title}'s cover art`}
                            className="w-full bg-footersecondary aspect-square rounded-3xl flex items-center justify-center text-text50 font-medium"
                        />
                        <h3 className="text-text special-text">
                            {collection.title}
                        </h3>
                        <p className="text-text">
                            {collection.images_count} images
                        </p>
                    </Link>
                ))}
            </main>
        </MainLayout>
    );
}
