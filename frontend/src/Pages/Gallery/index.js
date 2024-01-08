import React, { useEffect, useState } from "react";
import "./index.scss";
import ImageTile from "./components/ImageTile";
import ImageModal from "./components/ImageModal";

function GalleryPage() {
    // const [images, setImages] = useState([]);
    // const [selectedImage, setselectedImage] = useState(null);

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

    // const handleImageClick = (imageData) => {
    //     setselectedImage(imageData);
    // };

    // const closeModal = () => {
    //     setselectedImage(null);
    // };

    return (
        <>
            <p>not for vercel yet..</p>
            {/* <div className="image-container">
                {images.map((image, index) => (
                    <ImageTile
                        key={index}
                        ImageData={image}
                        onImageClick={handleImageClick}
                    />
                ))}
            </div>
            <ImageModal imageData={selectedImage} onClose={closeModal} /> */}
        </>
    );
}

export default GalleryPage;
