import React from "react";
import "./Header.scss";
import { Link } from "react-router-dom";

export default function Header() {
    return (
        <header>
            <div className="left-side">
                <Link to="/" className="logo nav-colors">
                    RB
                </Link>
                <Link to="/gallery" className="nav-button nav-colors">
                    All photos
                </Link>
            </div>
            <div className="right-side"></div>
        </header>
    );
}
