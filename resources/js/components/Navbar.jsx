import { Link } from "@inertiajs/inertia-react";
import React from "react";

export default function Navbar() {
    return (
        <nav className="fixed top-0 left-0 right-0 pt-4 flex justify-center z-10">
            <div className="flex sm:gap-5 mx-4 sm:mx-0 px-4 py-3 justify-between w-full sm:w-fit bg-secondary20 sm:justify-center rounded-full">
                <Link
                    href={route("landing")}
                    className="group px-4 rounded-full py-1 hover:bg-secondary hover:scale-105 transition-all focus:scale-100 focus:brightness-95"
                >
                    <h4 className="text-text drop-shadow-lg">Home</h4>
                </Link>
                <Link
                    href={route("gallery")}
                    className="group px-4 rounded-full py-1 hover:bg-secondary hover:scale-105 transition-all focus:scale-100 focus:brightness-95"
                >
                    <h4 className="text-text drop-shadow-lg">Gallery</h4>
                </Link>
                <a
                    href={"https://github.com/amixaam/photo-gallery"}
                    className="group px-4 rounded-full py-1 hover:bg-secondary hover:scale-105 transition-all focus:scale-100 focus:brightness-95"
                >
                    <h4 className="text-text drop-shadow-lg">GitHub</h4>
                </a>
            </div>
        </nav>
    );
}
