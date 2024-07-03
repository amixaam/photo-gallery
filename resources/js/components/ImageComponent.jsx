import React, { useState } from "react";
import { Blurhash } from "react-blurhash";

export const ImageComponent = ({
    src,
    blurhash,
    alt = "",
    className,
    imageClassName,
    parentClassname,
}) => {
    const [isLoading, setIsLoading] = useState(true);

    if (!src || !blurhash) return console.log("Image or Blurhash missing");

    return (
        <div className={`relative ${parentClassname}`}>
            <div
                className={`${!isLoading && "fade-out"} ${className} pulse absolute h-full w-full overflow-hidden`}
            >
                <Blurhash
                    hash={blurhash}
                    style={{
                        width: "100%",
                        height: "100%",
                    }}
                />
            </div>
            <img
                src={src}
                alt={alt}
                loading="lazy"
                onLoad={() => setIsLoading(false)}
                className={`${imageClassName} ${className}`}
            />
        </div>
    );
};
