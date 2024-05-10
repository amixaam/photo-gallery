import { Link } from "@inertiajs/inertia-react";
import React from "react";

export default function Navbar() {
    return (
        <nav
            style={{
                display: "flex",
                gap: "8px",
                justifyContent: "center",
            }}
        >
            <Link href={route("landing")}>Home</Link>
            <Link href={route("gallery")}>Gallery</Link>
            <Link href={route("dashboard")}>Admin</Link>
            <a href={"https://github.com/amixaam"}>GitHub</a>
        </nav>
    );
}
