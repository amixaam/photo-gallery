import React from "react";
import Navbar from "../components/Navbar";

export default function Landing() {
    return (
        <>
            <Navbar />
            <main
                style={{
                    display: "flex",
                    flexDirection: "column",
                    textAlign: "center",
                    alignItems: "center",
                    justifyContent: "center",

                    height: "65dvh",
                    gap: "8px",
                }}
            >
                <h1>photo-gallery</h1>
                <h4>
                    Made with love,{" "}
                    <a href="https://github.com/amixaam">@amixaam</a>
                </h4>
            </main>
        </>
    );
}
