import React, { useEffect, useRef, useState } from "react";
import "./index.scss";

import ImageTile from "./components/ImageTile";
import ImageModal from "./components/ImageModal";
import Header from "../../Reuse/Header";
import Wave from "../../Reuse/Wave";
import { json } from "react-router-dom";

function GalleryPage() {
    const [selectedImage, setselectedImage] = useState(null);
    const [thumbnails, setthumbnails] = useState([]);
    const [filteredThumbnails, setFilteredThumbnails] = useState([]);
    const [selectedDropdownValue, setSelectedDropdownValue] = useState("all");
    const [loadingThumbnails, setLoadingThumbnails] = useState(true);
    const [dropdownOptions, setDropdownOptions] = useState([
        { label: "All", value: "all" },
    ]);

    const optionsSetRef = useRef(false);

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

                if (!optionsSetRef.current) {
                    // make dropdown options from folders in data.folders
                    const newOptions = data.folders.map((folder) => ({
                        label: folder,
                        value: folder,
                    }));

                    setDropdownOptions((prevOptions) => [
                        ...prevOptions,
                        ...newOptions,
                    ]);

                    optionsSetRef.current = true;
                }

                setthumbnails(data.images);
                setLoadingThumbnails(false);
            } catch (error) {
                console.error("Error fetching images: ", error);
                setLoadingThumbnails(false);
            }
        };

        getThumbnails();
    }, [optionsSetRef]);

    useEffect(() => {
        const filteredImages =
            selectedDropdownValue === "all"
                ? thumbnails // Show all images
                : thumbnails.filter(
                      (image) => image.folder === selectedDropdownValue
                  );

        setFilteredThumbnails(filteredImages);
    }, [selectedDropdownValue, thumbnails]);

    const handleImageClick = async (ThumbnailData) => {
        if (thumbnails) {
            try {
                const response = await fetch(
                    `http://127.0.0.1:8000/api/image?filename=${ThumbnailData.filename}&folder=${ThumbnailData.folder}`,
                    {
                        method: "GET",
                    }
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

    const handleDropdownChange = (selectedValue) => {
        setSelectedDropdownValue(selectedValue);
    };

    const closeModal = () => {
        setselectedImage(null);
    };

    const handlePagination = async (direction) => {
        if (
            selectedImage &&
            filteredThumbnails &&
            filteredThumbnails.length > 0
        ) {
            const currentIndex = filteredThumbnails.findIndex((thumbnail) => {
                return thumbnail.filename === selectedImage.filename;
            });

            let newIndex;
            if (direction === "next") {
                newIndex = (currentIndex + 1) % filteredThumbnails.length; // Circular navigation
            } else if (direction === "previous") {
                newIndex =
                    (currentIndex - 1 + filteredThumbnails.length) %
                    filteredThumbnails.length; // Circular navigation
            }

            console.log({ current: currentIndex, new: newIndex });
            await handleImageClick(filteredThumbnails[newIndex]);
        }
    };

    const handleNextPagination = () => {
        handlePagination("next");
    };

    const handlePreviousPagination = () => {
        handlePagination("previous");
    };

    if (thumbnails == []) {
        return (
            <div className="loading-screen">
                <p>Not for vercel.</p>
            </div>
        );
    }

    return (
        <div className="gallery-view-container">
            <div className="background-container">
                <div className="background-color"></div>
                <div className="wave-container">
                    <Wave className="inner-wave" size={60} />
                </div>
            </div>

            <div className="gallery-content content-margin">
                <Header
                    dropdownOptions={dropdownOptions}
                    onDropdownChange={handleDropdownChange}
                    selectedDropdownValue={selectedDropdownValue}
                />
                <div className="image-container">
                    {loadingThumbnails ? (
                        <div className="loading-screen">
                            <p>loading...</p>
                        </div>
                    ) : (
                        filteredThumbnails.map((thumbnail, index) => (
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
