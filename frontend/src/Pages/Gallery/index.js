import React, { useEffect, useState } from "react";
import "./index.scss";

import ImageTile from "./components/ImageTile";
import ImageModal from "./components/ImageModal";
import Header from "../../Reuse/Header";

function GalleryPage() {
    const [thumbnails, setthumbnails] = useState([]);
    const [selectedImage, setselectedImage] = useState(null);

    const [loadingThumbnails, setLoadingThumbnails] = useState(true);

    useEffect(() => {
        const getThumbnails = async () => {
            try {
                const response = await fetch("http://127.0.0.1:8000/images");
                if (!response.ok) {
                    throw new Error("Network response was not ok.");
                }

                const data = await response.json();
                setthumbnails(data.images);
                setLoadingThumbnails(false);
            } catch (error) {
                console.error("Error fetching images: ", error);
                setLoadingThumbnails(false);
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
        <div className="gallery-view-container">
            <Header />
            <div className="gallery-image-container">
                <div className="settings-container"></div>
                <div className="tile-container">
                    {loadingThumbnails ? (
                        <div className="loading-screen">loading...</div>
                    ) : (
                        thumbnails.map((thumbnail, index) => (
                            <ImageTile
                                key={index}
                                ThumbnailData={thumbnail}
                                onImageClick={handleImageClick}
                            />
                        ))
                    )}
                </div>
            </div>
            <ImageModal imageData={selectedImage} onClose={closeModal} />
        </div>
    );
}

export default GalleryPage;
