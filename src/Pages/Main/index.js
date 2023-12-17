import React from "react";

import "../Main/index.scss";
import Header from "../../Reuse/Header";

import StarsImage from "../../images/decoration/stars_pink.png";

export default function MainPage() {
    return (
        <div className="image-background">
            <div className="container">
                <Header />
                <main className="landing">
                    <div className="title-container">
                        <h1 className="title-content gradient">
                            Photo gallery
                        </h1>
                        <img
                            className="title-stars"
                            src={StarsImage}
                            alt="Stars"
                        />
                        <p className="title-paragraph gradient">
                            I'm bad at it, but I'm doing it anyway
                        </p>
                    </div>
                    <svg
                        className="scroll-indicator"
                        xmlns="http://www.w3.org/2000/svg"
                        width="40"
                        height="40"
                        viewBox="0 0 48 48"
                        fill="none"
                    >
                        <path
                            d="M48 24C48 37.2548 37.2548 48 24 48C10.7452 48 0 37.2548 0 24C0 10.7452 10.7452 0 24 0C37.2548 0 48 10.7452 48 24ZM25.5 13.5C25.5 12.6716 24.8284 12 24 12C23.1716 12 22.5 12.6716 22.5 13.5V30.8787L16.0607 24.4393C15.4749 23.8536 14.5251 23.8536 13.9393 24.4393C13.3536 25.0251 13.3536 25.9749 13.9393 26.5607L22.9393 35.5607C23.5251 36.1464 24.4749 36.1464 25.0607 35.5607L34.0607 26.5607C34.6464 25.9749 34.6464 25.0251 34.0607 24.4393C33.4749 23.8536 32.5251 23.8536 31.9393 24.4393L25.5 30.8787V13.5Z"
                            fill="pink"
                        />
                    </svg>

                    <h1>UNDER CONSTRUCTION</h1>
                </main>
            </div>
        </div>
    );
}
