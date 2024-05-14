import React from "react";

function GalleryTitle() {
    return (
        <div className="flex text-nowrap items-center -skew-x-6">
            <img
                src="/images/landing-stars.svg"
                alt=""
                className="scale-75 sm:scale-100 select-none"
            />
            <h1 className="special-text drop-shadow-md w-min text-4xl sm:text-6xl">
                photo-gallery
            </h1>
            <img
                src="/images/landing-stars.svg"
                alt=""
                className="rotate-180 scale-75 sm:scale-100 select-none"
            />
        </div>
    );
}

export default GalleryTitle;
