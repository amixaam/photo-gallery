import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import "./index.scss";

import Header from "../../Reuse/Header";
import CSRF from "../../Reuse/CSRF";
import Wave from "../../Reuse/Wave";
import ImageContainer from "./components/ImageContainer";
import EditImageModal from "./components/EditImageModal";

function Admin() {
    const token = sessionStorage.getItem("token");
    const navigate = useNavigate();

    const [csrfToken, setCsrfToken] = useState(null);

    if (!token) {
        window.location.href = "/uhoh";
    }

    const HandleLogOut = () => {
        sessionStorage.removeItem("token");
        navigate("/uhoh");
    };

    const [formData, setFormData] = useState({
        image: null,
        title: "",
        description: "",
        location: "",
        date: "",
        time: "",
        camera: "",
        folder: "",
    });

    const [selectedItem, setSelectedItem] = useState("");

    const handleSelectChange = (event) => {
        setSelectedItem(event.target.value);
    };
    // handling

    const handleChange = (e) => {
        const { name, value, files } = e.target;

        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: name === "image" ? (files ? files[0] : null) : value,
        }));
    };

    //SUBMIT
    const handleSubmit = async (e) => {
        e.preventDefault();

        const apiEndpoint = "http://127.0.0.1:8000/api/images/upload";

        const data = new FormData();
        Object.keys(formData).forEach((key) => {
            data.append(key, formData[key]);
        });

        data.append("_token", csrfToken);

        try {
            const token = sessionStorage.getItem("token");
            const response = await fetch(apiEndpoint, {
                method: "POST",
                credentials: "include",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                body: data,
            });

            if (response.ok) {
                await fetchImageData();
            }
        } catch (error) {
            console.error("Error uploading image:", error);
        }
    };

    //image

    const optionsSetRef = useRef(false);
    const [imageData, setImageData] = useState([]);
    const [filteredImages, setFilteredImages] = useState([]);
    const [selectedImage, setSelectedImage] = useState(null);

    const fetchImageData = async () => {
        try {
            const response = await fetch(
                "http://127.0.0.1:8000/api/images/full"
            );
            if (!response.ok) {
                throw new Error("Network response was not ok.");
            }

            const data = await response.json();

            // make dropdown options from folders in data.folders
            const newOptions = data.folders.map((folder) => ({
                label: folder,
                value: folder,
            }));

            // Update the dropdown options by filtering out existing options
            setDropdownOptions((prevOptions) => {
                const uniqueOptions = newOptions.filter((newOption) => {
                    return !prevOptions.some(
                        (prevOption) => prevOption.value === newOption.value
                    );
                });

                return [...prevOptions, ...uniqueOptions];
            });

            setImageData(data.images);
        } catch (error) {
            console.error("Error fetching images: ", error);
        }
    };

    useEffect(() => {
        const getCSRF = async () => {
            setCsrfToken(await CSRF());
        };

        getCSRF();
        fetchImageData();
    }, [optionsSetRef]);

    // dropdown

    const [selectedDropdownValue, setSelectedDropdownValue] = useState("all");
    const [dropdownOptions, setDropdownOptions] = useState([
        { label: "all", value: "all" },
    ]);

    const handleDropdownChange = (event) => {
        const selectedValue = event.target.value;
        setSelectedDropdownValue(selectedValue);
    };

    useEffect(() => {}, [imageData]);

    useEffect(() => {
        const filteredImages =
            selectedDropdownValue === "all"
                ? imageData // Show all images
                : imageData.filter(
                      (image) => image.folder === selectedDropdownValue
                  );

        setFilteredImages(filteredImages);
    }, [selectedDropdownValue, imageData]);

    // image container interact

    const handleImageClick = async (data) => {
        setSelectedImage(data);
    };

    const closeModal = () => {
        setSelectedImage(null);
    };

    // update & delete

    const handleDeleteImage = async (e, id) => {
        e.preventDefault();
        const apiEndpoint = `http://127.0.0.1:8000/api/images/delete/${id}`;

        try {
            const token = sessionStorage.getItem("token");
            const response = await fetch(apiEndpoint, {
                method: "DELETE",
                credentials: "include",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "X-CSRF-TOKEN": csrfToken,
                },
            });

            if (response.ok) {
                await fetchImageData();
                closeModal();
            }
        } catch (error) {
            console.error("Error updating image:", error);
        }
    };

    const handleUpdateImage = async (e, data) => {
        e.preventDefault();
        const apiEndpoint = "http://127.0.0.1:8000/api/images/update";

        try {
            const token = sessionStorage.getItem("token");
            const response = await fetch(apiEndpoint, {
                method: "PUT",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                    "X-CSRF-TOKEN": csrfToken,
                },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                await fetchImageData();
                closeModal();
            }
        } catch (error) {
            console.error("Error updating image:", error);
        }
    };

    return (
        <div className="admin-view-container">
            <div className="background-container">
                <div className="background-color"></div>
                <div className="wave-container">
                    <Wave className="inner-wave" size={60} />
                </div>
            </div>
            <div className="admin-content content-margin">
                <Header handleLogout={HandleLogOut} />
                <div className="forms-container">
                    <form onSubmit={handleSubmit} className="upload-image">
                        <div className="top">
                            <h1>Add new image</h1>
                            <input
                                type="file"
                                name="image"
                                onChange={handleChange}
                                accept="image/*"
                                className="flex-input"
                                placeholder="file"
                            />
                            <input
                                type="text"
                                name="folder"
                                placeholder="folder"
                                value={formData.folder}
                                onChange={handleChange}
                                className="flex-input"
                            />
                            <input
                                type="text"
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                className="flex-input"
                                placeholder="title"
                            />
                            <input
                                type="text"
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                className="flex-input"
                                placeholder="description"
                            />
                            <input
                                type="text"
                                name="location"
                                value={formData.location}
                                onChange={handleChange}
                                placeholder="city, country"
                                className="flex-input"
                            />
                            <input
                                type="date"
                                name="date"
                                value={formData.date}
                                onChange={handleChange}
                                placeholder="mm/dd/yyyy"
                                className="flex-input"
                            />
                            <input
                                type="text"
                                name="time"
                                pattern="^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$"
                                placeholder="time HH:mm:ss"
                                value={formData.time}
                                onChange={handleChange}
                                className="flex-input"
                            />
                            <input
                                type="text"
                                name="camera"
                                placeholder="camera"
                                value={formData.camera}
                                onChange={handleChange}
                                className="flex-input"
                            />
                        </div>

                        <button type="submit" className="flex-button">
                            Upload
                        </button>
                    </form>
                    <div className="image-list">
                        <div className="filtering-options-container">
                            <h1>All images</h1>
                            <select
                                className="flex-selector"
                                id="selector"
                                onChange={handleDropdownChange}
                                value={selectedDropdownValue}
                            >
                                {dropdownOptions.map((option, index) => (
                                    <option key={index} value={option.value}>
                                        {option.label}
                                    </option>
                                ))}
                            </select>
                        </div>
                        {filteredImages.map((data, index) => (
                            <ImageContainer
                                key={index}
                                data={data}
                                handleImageClick={handleImageClick}
                            />
                        ))}
                    </div>
                </div>
            </div>
            <EditImageModal
                imageData={selectedImage}
                onClose={closeModal}
                csrfToken={csrfToken}
                handleUpdateImage={handleUpdateImage}
                handleDeleteImage={handleDeleteImage}
            />
        </div>
    );
}

export default Admin;
