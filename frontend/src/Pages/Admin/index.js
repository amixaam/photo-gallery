import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import "./index.scss";

import Header from "../../Reuse/Header";
import CSRF from "../../Reuse/CSRF";
import Wave from "../../Reuse/Wave";

function Admin() {
    const token = sessionStorage.getItem("token");
    const navigate = useNavigate();

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
        const csrfToken = await CSRF();

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
        } catch (error) {
            console.error("Error uploading image:", error);
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
                <Header />
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
                    <div className="logout-button-container">
                        <div className="flex-button" onClick={HandleLogOut}>
                            Log out
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Admin;
