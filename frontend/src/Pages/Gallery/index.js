import React, { useEffect, useState } from "react";
import "./index.scss";

import ImageTile from "./components/ImageTile";
import ImageModal from "./components/ImageModal";
import Header from "../../Reuse/Header";

function GalleryPage() {
    const [selectedImage, setselectedImage] = useState(null);
    const [loadingThumbnails, setLoadingThumbnails] = useState(true);

    const [thumbnails, setthumbnails] = useState([]);

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

    const handleImageDownloadClick = async () => {
        try {
            if (selectedImage && selectedImage.image_url) {
                const response = await fetch(selectedImage.image_url);
                const blob = await response.blob();

                // Create a download link
                const url = window.URL.createObjectURL(new Blob([blob]));
                const link = document.createElement("a");
                link.href = url;

                // Extract the filename from the URL or use a default name
                const filename = selectedImage.title || "downloaded_image";
                link.setAttribute("download", `${filename}.jpg`);

                // Append the link to the body and trigger the click event
                document.body.appendChild(link);
                link.click();

                // Remove the link from the body
                document.body.removeChild(link);
            }
        } catch (error) {
            console.error("Error downloading image: ", error);
        }
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
                onDownload={handleImageDownloadClick}
            />
        </div>
    );
}

export default GalleryPage;
