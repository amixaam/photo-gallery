import React from "react";
import "./Header.scss";
import { Link } from "react-router-dom";

export default function Header() {
    return (
        <header>
            <Link to="/" className="logo">
                RB
            </Link>
            <Link to="/gallery" className="nav-button">
                All photos
            </Link>
        </header>
    );
}
