import React from "react";
import { Link } from "@inertiajs/inertia-react";
import { Icon } from "../Pages/Dashboard";

export const SmallCollectionCard = ({ collection, href }) => {
    return (
        <Link
            href={href ? href : route("gallery", collection.slug)}
            className="group flex aspect-square flex-col gap-4"
        >
            <img
                src={
                    collection.cover_path
                        ? `/storage/${collection.cover_path}`
                        : "/images/grain.png"
                }
                alt={collection.title}
                className="size-72 rounded-3xl object-cover"
            />
            <div className="flex justify-between transition-all duration-200 group-hover:-translate-y-1">
                <div className="flex flex-row items-center gap-2">
                    <img
                        src="/images/star.svg"
                        alt=""
                        className="scale-90 select-none"
                    />
                    <p className="text-text">{collection.title}</p>
                </div>
                <div className="flex gap-1">
                    <Icon
                        show={collection.is_public}
                        icon="/images/public.svg"
                    />
                    <Icon
                        show={!collection.is_public}
                        icon="/images/private.svg"
                    />
                    <Icon
                        show={collection.is_featured}
                        icon="/images/pin.svg"
                    />
                </div>
            </div>
        </Link>
    );
};
