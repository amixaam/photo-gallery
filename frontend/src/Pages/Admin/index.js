import React, { useState } from "react";

import "./index.scss";

import Header from "../../Reuse/Header";

function Admin() {
    const [formData, setFormData] = useState({
        image: null,
        title: "",
        description: "",
        location: "",
        date: "",
        time: "",
    });

    // handling

    const handleChange = (e) => {
        const { name, value, files } = e.target;

        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: files ? files[0] : value,
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

        try {
            const response = await fetch(apiEndpoint, {
                method: "POST",
                body: data,
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const result = await response.json();
            console.log(result); // TODO: HANDLE RESPONSE
        } catch (error) {
            console.error("Error uploading image:", error);
        }
    };

    return (
        <div className="admin-view-container">
            <Header />
            <div className="admin-form-container">
                <form onSubmit={handleSubmit}>
                    <label>
                        Image:
                        <input
                            type="file"
                            name="image"
                            onChange={handleChange}
                            accept="image/*"
                        />
                    </label>
                    <br />
                    <label>
                        Title:
                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                        />
                    </label>
                    <br />
                    <label>
                        Description:
                        <input
                            type="text"
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                        />
                    </label>
                    <br />
                    <label>
                        Location:
                        <input
                            type="text"
                            name="location"
                            value={formData.location}
                            onChange={handleChange}
                        />
                    </label>
                    <br />
                    <label>
                        Date:
                        <input
                            type="date"
                            name="date"
                            value={formData.date}
                            onChange={handleChange}
                        />
                    </label>
                    <br />
                    <label>
                        Time:
                        <input
                            type="text"
                            name="time"
                            pattern="^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$"
                            placeholder="HH:mm:ss"
                            value={formData.time}
                            onChange={handleChange}
                        />
                    </label>
                    <br />
                    <button type="submit">Upload Image</button>
                </form>
            </div>
        </div>
    );
}

export default Admin;
