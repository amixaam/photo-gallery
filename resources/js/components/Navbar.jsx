import { Link } from "@inertiajs/inertia-react";
import React from "react";
import { motion } from "framer-motion";

export default function Navbar({ showAdmin, adminPage }) {
    return (
        <nav className="pointer-events-none fixed left-0 right-0 top-0 z-10 flex select-none justify-center pt-4 sm:pt-8">
            <div className="pointer-events-auto flex w-fit select-all justify-center rounded-full border-2 border-secondary20 bg-secondary20 px-3 py-2 backdrop-blur-xl sm:w-fit sm:gap-5">
                {adminPage && showAdmin ? (
                    <AdminButtonLayout />
                ) : (
                    <GuestButtonLayout showAdmin={showAdmin} />
                )}
            </div>
        </nav>
    );
}

const AdminButtonLayout = () => {
    return (
        <>
            <NavButton href={route("landing")} text="Home" />
            <NavButton href={route("collections")} text="Collections" />
            <NavButton href={route("dashboard")} text="Dashboard" />
            <NavButton href={route("upload")} text="Upload" />
        </>
    );
};

const GuestButtonLayout = ({ showAdmin }) => {
    return (
        <>
            <NavButton href={route("landing")} text="Home" />
            <NavButton href={route("collections")} text="Collections" />
            {showAdmin && (
                <NavButton href={route("dashboard")} text="Dashboard" />
            )}
        </>
    );
};

const NavButton = ({ href, text }) => {
    return (
        <Link
            href={href}
            className="group rounded-full px-4 py-1 transition-all hover:scale-105 hover:bg-secondary active:scale-100 active:brightness-95"
        >
            <h4 className="drop-shadow-lg">{text}</h4>
        </Link>
    );
};
