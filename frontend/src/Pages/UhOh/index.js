import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import "./index.scss";

import Wave from "../../Reuse/Wave";
import Header from "../../Reuse/Header";
import CSRF from "../../Reuse/CSRF";

function UhOh() {
    const [inputValue, setInputValue] = useState("");
    const [result, setResult] = useState("");

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };

    const navigate = useNavigate();
    // Function to handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        const csrfToken = await CSRF();

        try {
            const response = await fetch("http://127.0.0.1:8000/api/login", {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
                body: JSON.stringify({
                    email: "amixam@amixam.com",
                    password: inputValue,
                    _token: csrfToken,
                }),
            });

            if (!response.ok) {
                setResult("fail");
                throw new Error("Login failed");
            }

            const data = await response.json();
            setResult("success");
            sessionStorage.setItem("token", data.token);
            navigate("/admin");
        } catch (error) {
            setResult("fail");
            console.error("Login failed", error);
        }
    };

    return (
        <div className="UhOh-view-container">
            <div className="background-container">
                <div className="background-color"></div>
                <div className="wave-container">
                    <Wave className="inner-wave" size={60} />
                </div>
            </div>

            <div className="uhoh-content content-margin">
                <Header />
                <h1>You are not supposed to be here yknow’?</h1>

                <form onSubmit={handleSubmit}>
                    <p>{result}</p>
                    <input
                        className="flex-input"
                        type="password"
                        value={inputValue}
                        onChange={handleInputChange}
                        placeholder="enter secret code..."
                    />
                    <button type="submit" className="flex-button">
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
}

export default UhOh;
