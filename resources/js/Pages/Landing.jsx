import React from "react";
import Navbar from "../components/Navbar";

export default function Landing() {
    return (
        <div className="flex flex-col min-h-screen bg-bg">
            <Navbar />
            <section className="h-[32rem] lg:h-[40rem] gap-24 flex flex-col items-center justify-center bg-gradient-to-b from-secondary to-primary">
                <div className="flex flex-col items-center justify-center">
                    <div className="flex text-nowrap items-center">
                        <img
                            src="/images/landing-stars.svg"
                            alt=""
                            className="scale-75 sm:scale-100"
                        />
                        <h1 className="special-text drop-shadow-md w-min text-4xl sm:text-6xl">
                            photo-gallery
                        </h1>
                        <img
                            src="/images/landing-stars.svg"
                            alt=""
                            className="rotate-180 scale-75 sm:scale-100"
                        />
                    </div>
                    <div className="flex flex-row gap-[1ch]">
                        <h4 className="text-text drop-shadow-md">
                            Made with love,
                        </h4>
                        <a
                            href="https://github.com/amixaam"
                            className="text-text underline hover:scale-105 group transition-all focus:scale-100 focus:brightness-95"
                        >
                            <h4>@amixaam</h4>
                        </a>
                    </div>
                </div>
                <div className="flex flex-col items-center justify-center gap-2">
                    <p className="text-text">Don't worry, it's</p>
                    <button
                        onClick={() => {
                            window.location.href = "/gallery";
                        }}
                        className="group bg-gradient-to-b from-text from-20% to-60% to-textdark py-2 px-6 rounded-lg transition-all duration-200 hover:drop-shadow-xl hover:scale-105 focus:drop-shadow-xl focus:scale-100 focus:brightness-95 focus:duration-100"
                    >
                        <h4 className="text-dark drop-shadow-md group-[&:hover]:drop-shadow-xl transition-all">
                            Coming soon 🚧
                        </h4>
                    </button>
                </div>
            </section>
            <div className="relative">
                <div className="test" />
            </div>
        </div>
    );
}
