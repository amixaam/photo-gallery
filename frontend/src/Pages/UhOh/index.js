import React, { useState } from "react";
import "./index.scss";

import Wave from "../../Reuse/Wave";
import Header from "../../Reuse/Header";

function UhOh() {
    const [inputValue, setInputValue] = useState("");

    // Function to handle input changes
    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };

    // Function to handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        // Perform any action you want with the input value, for now, just log it
        console.log("Input Value:", inputValue);
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
                    <input
                        type="text"
                        value={inputValue}
                        onChange={handleInputChange}
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
