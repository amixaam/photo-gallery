import React from "react";
import MainLayout from "../Layouts/MainLayout";
import { Link } from "@inertiajs/inertia-react";

export default function Collections({ collections, auth }) {
    return (
        <MainLayout auth={auth.user} margins={false}>
            {/* <h1 className="special-text drop-shadow-md w-min text-4xl sm:text-6xl text-nowrap">
                Collections
            </h1>

            <main className="flex gap-8 flex-wrap">
                {collections.map((collection) => (
                    <Link
                        href={route("gallery", collection.slug)}
                        key={collection.id}
                        className="w-fit hover:scale-[1.025] transition-all duration-200"
                    >
                        <img
                            src={`/storage/${collection.cover_path}`}
                            alt={`${collection.title}'s cover art`}
                            className="w-[350px] object-cover bg-footersecondary aspect-square rounded-3xl flex items-center justify-center text-text50 font-medium"
                        />
                        <div className="flex flex-row justify-between items-center">
                            <h3 className="text-text special-text">
                                {collection.title}
                            </h3>
                            <p className="text-text">
                                {collection.images_count} images
                            </p>
                        </div>
                    </Link>
                ))}
            </main> */}
        </MainLayout>
    );
}
