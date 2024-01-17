import React, { useEffect, useState } from "react";
import "./index.scss";

import ImageTile from "./components/ImageTile";
import ImageModal from "./components/ImageModal";
import Header from "../../Reuse/Header";

function GalleryPage() {
    const [selectedImage, setselectedImage] = useState(null);
    const [thumbnails, setthumbnails] = useState([]);

    const [loadingThumbnails, setLoadingThumbnails] = useState(true);

    useEffect(() => {
        const getThumbnails = async () => {
            try {
                const response = await fetch(
                    "http://127.0.0.1:8000/api/images"
                );
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
                    "http://127.0.0.1:8000/api/images/" + filename
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

    const handlePagination = async (direction) => {
        if (selectedImage && thumbnails) {
            const currentIndex = thumbnails.findIndex(
                (thumbnail) => thumbnail.filename === selectedImage.filename
            );

            let newIndex;
            if (direction === "next") {
                newIndex = (currentIndex + 1) % thumbnails.length; // Circular navigation
            } else if (direction === "previous") {
                newIndex =
                    (currentIndex - 1 + thumbnails.length) % thumbnails.length; // Circular navigation
            }

            await handleImageClick(thumbnails[newIndex].filename);
        }
    };

    const handleNextPagination = () => {
        handlePagination("next");
    };

    const handlePreviousPagination = () => {
        handlePagination("previous");
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
            <ImageModal
                imageData={selectedImage}
                onClose={closeModal}
                onNext={handleNextPagination}
                onPrevious={handlePreviousPagination}
            />
        </div>
    );
}

export default GalleryPage;
