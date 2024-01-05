import React, { useEffect, useState } from "react";
import "./index.scss";

function GalleryPage() {
    // const [images, setImages] = useState([]);

    // useEffect(() => {
    //     const getImages = async () => {
    //         try {
    //             const response = await fetch("http://127.0.0.1:8000/images");
    //             if (!response.ok) {
    //                 throw new Error("Network response was not ok.");
    //             }

    //             const data = await response.json();
    //             setImages(data.images);
    //         } catch (error) {
    //             console.error("Error fetching images: ", error);
    //         }
    //     };

    //     getImages();
    // }, []);

    return (
        <>
            <p>not for vercel yet..</p>
            {/* <div className="image-container">
                {images.map((image, index) => (
                    <div key={index}>
                        <img
                            className="test-image"
                            src={image.image_url}
                            alt={`Image ${index}`}
                        />
                        <p>{image.picture_data.title}</p>
                        <p>{image.picture_data.description}</p>
                    </div>
                ))}
            </div> */}
        </>
    );
}

export default GalleryPage;
