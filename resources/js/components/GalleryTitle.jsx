import React from "react";

function GalleryTitle() {
    return (
        <div className="flex -skew-x-6 items-center text-nowrap">
            <img
                src="/images/landing-stars.svg"
                alt=""
                className="scale-75 select-none sm:scale-100"
            />
            <h1 className="special-text w-min text-4xl drop-shadow-md sm:text-6xl">
                photo-gallery
            </h1>
            <img
                src="/images/landing-stars.svg"
                alt=""
                className="rotate-180 scale-75 select-none sm:scale-100"
            />
        </div>
    );
}

export default GalleryTitle;
