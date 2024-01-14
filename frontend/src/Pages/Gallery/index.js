import React, { useEffect, useState } from "react";
import "./index.scss";
import ImageTile from "./components/ImageTile";
import ImageModal from "./components/ImageModal";

function GalleryPage() {
    const [thumbnails, setthumbnails] = useState([]);
    const [selectedImage, setselectedImage] = useState(null);

    useEffect(() => {
        const getThumbnails = async () => {
            try {
                const response = await fetch("http://127.0.0.1:8000/images");
                if (!response.ok) {
                    throw new Error("Network response was not ok.");
                }

                const data = await response.json();
                setthumbnails(data.images);
            } catch (error) {
                console.error("Error fetching images: ", error);
            }
        };

        getThumbnails();
    }, []);

    const handleImageClick = async (filename) => {
        if (thumbnails) {
            try {
                const response = await fetch(
                    "http://127.0.0.1:8000/images/" + filename
                );
                if (!response.ok) {
                    throw new Error("Network response was not ok.");
                }

                const data = await response.json();
                setselectedImage(data);
            } catch (error) {
                console.error("Error fetching images: ", error);
            }
        }
    };

    const closeModal = () => {
        setselectedImage(null);
    };

    if (!thumbnails) {
        return <p>Not for vercel.</p>;
    }

    return (
        <>
            <div className="image-container">
                {thumbnails.map((thumbnail, index) => (
                    <ImageTile
                        key={index}
                        ThumbnailData={thumbnail}
                        onImageClick={handleImageClick}
                    />
                ))}
            </div>
            <ImageModal imageData={selectedImage} onClose={closeModal} />
        </>
    );
}

export default GalleryPage;
