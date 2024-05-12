import { Link } from "@inertiajs/inertia-react";
import React from "react";

export default function Navbar({ showAdmin }) {
    return (
        <nav className="fixed top-0 left-0 right-0 pt-4 sm:pt-8 flex justify-center z-10">
            <div className="flex gap-5 px-3 py-2 w-fit sm:w-fit bg-secondary20 border-secondary20 border-2 justify-center rounded-full backdrop-blur-xl">
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
                {showAdmin && (
                    <Link
                        href={route("dashboard")}
                        className="group px-4 rounded-full py-1 hover:bg-secondary hover:scale-105 transition-all focus:scale-100 focus:brightness-95"
                    >
                        <h4 className="text-text drop-shadow-lg">Admin</h4>
                    </Link>
                )}
            </div>
        </nav>
    );
}
