import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { Footer } from "../components/Footer";
import MainLayout from "../Layouts/MainLayout";
import GalleryTitle from "../components/GalleryTitle";
import PrimaryButton from "../components/PrimaryButton";
import { Link } from "@inertiajs/inertia-react";

const tempData = [
    {
        title: "Home",
        alt: "A blue sky with sea-bed like clouds",
        date: "date",
        location: "Latvia",
        url: "/images/home.webp",
    },
    {
        title: "Nested",
        alt: "A building nested within trees with a pink sky",
        date: "date",
        location: "Lithuania",
        url: "/images/lithuania.webp",
    },

    {
        title: "Freedom statue",
        alt: "Freedom statue in Rīga",
        date: "date",
        location: "Latvia",
        url: "/images/freedom.webp",
    },

    {
        title: "Stranded",
        alt: "Hilly Poland terrain in the background. A ski lift in the foreground",
        date: "date",
        location: "Poland",
        url: "/images/poland.webp",
    },
    {
        title: "Uzvaras statue",
        alt: "A statue in the night",
        date: "date",
        location: "Latvia",
        url: "/images/cesis.webp",
    },
];

export default function Landing() {
    return (
        <MainLayout>
            <div className="overflow-x-hidden flex flex-col">
                <div className="">
                    <section className="h-[37rem] xl:h-[50rem] gap-24 flex flex-col items-center justify-center bg-gradient-to-b from-secondary to-primary">
                        <div className="flex flex-col items-center justify-center">
                            <GalleryTitle />
                            <div className="flex flex-row gap-[1ch]">
                                <h4 className="text-text drop-shadow-md">
                                    Made with love,
                                </h4>
                                <a
                                    href="https://github.com/amixaam"
                                    className="text-text hover:underline transition-all active:brightness-90"
                                >
                                    <h4>@amixaam</h4>
                                </a>
                            </div>
                        </div>
                        <div className="flex flex-col items-center justify-center gap-2">
                            <p className="text-text">Don't worry, it's</p>
                            <PrimaryButton
                                text="Coming soon 🚧"
                                href={route("gallery")}
                            />
                        </div>
                    </section>
                    <div className="relative h-[64px]">
                        <div className="wave" />
                    </div>
                </div>
                <main className="h-screen flex flex-col items-center justify-center gap-12 sm:gap-24 ">
                    <div className="flex text-nowrap items-center -skew-x-6">
                        <img
                            src="/images/landing-stars-flipped.svg"
                            alt=""
                            className="scale-75 sm:scale-100 select-none rotate-180"
                        />
                        <h1 className="special-text drop-shadow-md w-min text-4xl sm:text-6xl">
                            My best work
                        </h1>
                        <img
                            src="/images/landing-stars-flipped.svg"
                            alt=""
                            className="scale-75 sm:scale-100 select-none"
                        />
                    </div>
                    <section>
                        <div className="w-screen overflow-x-hidden py-2">
                            <div className="w-max h-full flex flex-row gap-6 sm:gap-16 justify-center scroll relative z-[6]">
                                {[...tempData, ...tempData].map(
                                    (image, index) => (
                                        <Link
                                            key={index}
                                            href="#"
                                            className="flex flex-col gap-2 group"
                                        >
                                            <img
                                                src={image.url}
                                                alt={
                                                    image.alt
                                                        ? image.alt
                                                        : image.title
                                                }
                                                className="w-[220px] sm:w-[440px] rounded-3xl flex-1 bg-secondary20 select-none opacity-80 group-[&:hover]:opacity-100 group-[&:hover]:scale-[1.01] transition-all duration-200"
                                            />
                                            <div className="flex flex-col sm:flex-row justify-between sm:items-center text-nowrap sm:opacity-10 translate-y-2 group-[&:hover]:opacity-100 group-[&:hover]:translate-y-0 transition-all duration-200">
                                                <div className="flex flex-row gap-2 items-center">
                                                    <img
                                                        src="/images/star.svg"
                                                        alt=""
                                                        className="scale-75 sm:scale-100 select-none "
                                                    />
                                                    <h3 className="text-text text-base sm:text-3xl">
                                                        {image.title}
                                                    </h3>
                                                </div>
                                                <div className="flex flex-row items-center ml-[-4px] sm:ml-0 opacity-70 gap-1">
                                                    <img
                                                        src="/images/info.svg"
                                                        alt=""
                                                        className="scale-[0.6] select-none sm:scale-75"
                                                    />
                                                    <p className="text-text text-sm sm:text-base">
                                                        {image.location}
                                                    </p>
                                                </div>
                                            </div>
                                        </Link>
                                    )
                                )}
                            </div>
                        </div>
                    </section>
                </main>
                <section className="h-screen flex flex-col items-center justify-center gap-8">
                    <div className="flex items-center -skew-x-6 text-nowrap">
                        <img
                            src="/images/landing-stars.svg"
                            alt=""
                            className="scale-75 sm:scale-100"
                        />
                        <h1 className="special-text drop-shadow-md w-min text-3xl sm:text-6xl">
                            Like what you see?
                        </h1>
                        <img
                            src="/images/landing-stars.svg"
                            alt=""
                            className="scale-75 sm:scale-100 rotate-180"
                        />
                    </div>
                    <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 items-center">
                        <Link
                            href="/gallery"
                            className="group bg-secondary20 py-2 px-6 rounded-md transition-all duration-200 hover:drop-shadow-xl hover:scale-105 active:drop-shadow-xl active:scale-100 active:brightness-95 active:duration-100 "
                        >
                            <p className="text-text drop-shadow-md group-[&:hover]:drop-shadow-xl transition-all">
                                Coming soon 🚧
                            </p>
                        </Link>
                        <p className="text-text">or</p>
                        <a
                            href="https://github.com/amixaam/photo-gallery"
                            className="group bg-secondary20 flex gap-2 items-center py-2 px-6 rounded-md transition-all duration-200 hover:drop-shadow-xl hover:scale-105 active:drop-shadow-xl active:scale-100 active:brightness-95 active:duration-100 "
                        >
                            <p className="text-text drop-shadow-md group-[&:hover]:drop-shadow-xl transition-all">
                                View source
                            </p>
                            <img src="/images/redirect.svg" alt="" />
                        </a>
                    </div>
                </section>
            </div>
        </MainLayout>
    );
}
