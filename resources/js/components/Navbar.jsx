import { Link } from "@inertiajs/inertia-react";
import React from "react";
import { motion } from "framer-motion";

export default function Navbar({ showAdmin }) {
    return (
        <nav className="pointer-events-none fixed left-0 right-0 top-0 z-10 flex select-none justify-center pt-4 sm:pt-8">
            <div className="pointer-events-auto flex w-fit select-all justify-center rounded-full border-2 border-secondary20 bg-secondary20 px-3 py-2 backdrop-blur-xl sm:w-fit sm:gap-5">
                <Link
                    href={route("landing")}
                    className="group rounded-full px-4 py-1 transition-all hover:scale-105 hover:bg-secondary active:scale-100 active:brightness-95"
                >
                    <h4 className="text-text drop-shadow-lg">Home</h4>
                </Link>
                <Link
                    href={route("collections")}
                    className="group rounded-full px-4 py-1 transition-all hover:scale-105 hover:bg-secondary active:scale-100 active:brightness-95"
                >
                    <h4 className="text-text drop-shadow-lg">Collections</h4>
                </Link>
                {showAdmin && (
                    <Link
                        href={route("dashboard")}
                        className="group rounded-full px-4 py-1 transition-all hover:scale-105 hover:bg-secondary active:scale-100 active:brightness-95"
                    >
                        <h4 className="text-text drop-shadow-lg">Admin</h4>
                    </Link>
                )}
            </div>
        </nav>
    );
}
