import { Link } from "@inertiajs/inertia-react";
import React from "react";
import MainLayout from "../Layouts/MainLayout";
import GalleryTitle from "../components/GalleryTitle";
import PrimaryButton from "../components/PrimaryButton";

export default function Landing({ auth, collection }) {
    return (
        <MainLayout auth={auth.user} margins={false}>
            <div className="flex flex-col overflow-x-hidden">
                <div>
                    <section className="flex h-[37rem] flex-col items-center justify-center gap-24 bg-gradient-to-b from-secondary from-10% to-primary to-90% xl:h-[85vh]">
                        <div className="flex flex-col items-center justify-center">
                            <GalleryTitle />
                            <div className="flex flex-row gap-[1ch]">
                                <h4 className="text-text drop-shadow-md">
                                    Made with love,
                                </h4>
                                <a
                                    href="https://github.com/amixaam"
                                    className="text-text transition-all hover:underline active:brightness-90"
                                >
                                    <h4>@amixaam</h4>
                                </a>
                            </div>
                        </div>
                        <div className="flex flex-col items-center justify-center gap-2">
                            <p className="text-text">Don't worry, it's</p>
                            <PrimaryButton
                                text="Coming soon 🚧"
                                href={route("collections")}
                            />
                        </div>
                    </section>
                    <div className="relative h-[64px]">
                        <div className="wave" />
                    </div>
                </div>
                <main className="mt-16 flex h-screen flex-col items-center justify-center  gap-8 ">
                    <div className="flex -skew-x-6 items-center text-nowrap">
                        <img
                            src="/images/landing-stars-flipped.svg"
                            alt=""
                            className="rotate-180 scale-75 select-none sm:scale-100"
                        />
                        <h1 className="fade-in special-text w-min text-4xl drop-shadow-md sm:text-6xl">
                            My best work
                        </h1>
                        <img
                            src="/images/landing-stars-flipped.svg"
                            alt=""
                            className="scale-75 select-none sm:scale-100"
                        />
                    </div>
                    <section>
                        <div className="w-screen overflow-x-hidden py-2">
                            <div className="scroll relative z-[6] flex h-full w-max flex-row justify-center gap-6 sm:gap-16">
                                {[
                                    ...collection.images,
                                    ...collection.images,
                                ].map((image, index) => (
                                    <Link
                                        key={index}
                                        href={`collections/${collection.slug}`}
                                        className="group flex flex-col gap-2"
                                    >
                                        <img
                                            src={"storage/" + image.path}
                                            alt={
                                                image.alt_text
                                                    ? image.alt_text
                                                    : image.title
                                            }
                                            className="w-[220px] flex-1 select-none rounded-3xl bg-secondary20 transition-all duration-200 group-[&:hover]:scale-[1.01] group-[&:hover]:opacity-100 sm:w-[380px] md:opacity-90"
                                        />
                                        <div className="flex translate-y-2 flex-col justify-between text-nowrap transition-all duration-200 group-[&:hover]:translate-y-0 group-[&:hover]:opacity-100 sm:flex-row sm:items-center sm:opacity-10">
                                            <div className="flex flex-row items-center gap-2">
                                                <img
                                                    src="/images/star.svg"
                                                    alt=""
                                                    className="scale-75 select-none sm:scale-100 "
                                                />
                                                <h3 className="text-base text-text sm:text-3xl">
                                                    {image.title}
                                                </h3>
                                            </div>
                                            <div className="ml-[-4px] flex flex-row items-center gap-1 opacity-70 sm:ml-0">
                                                <img
                                                    src="/images/info.svg"
                                                    alt=""
                                                    className="scale-[0.6] select-none sm:scale-75"
                                                />
                                                <p className="text-sm text-text sm:text-base">
                                                    {image.metadata.location}
                                                </p>
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </section>
                </main>
                <section className="flex h-screen flex-col items-center justify-center gap-8">
                    <div className="flex -skew-x-6 items-center text-nowrap">
                        <img
                            src="/images/landing-stars.svg"
                            alt=""
                            className="scale-75 sm:scale-100"
                        />
                        <h1 className="special-text w-min text-3xl drop-shadow-md sm:text-6xl">
                            Like what you see?
                        </h1>
                        <img
                            src="/images/landing-stars.svg"
                            alt=""
                            className="rotate-180 scale-75 sm:scale-100"
                        />
                    </div>
                    <div className="mb-[15vh] flex flex-col items-center gap-2 sm:flex-row sm:gap-4">
                        <Link
                            href={route("collections")}
                            className="group rounded-md bg-secondary20 px-6 py-2 transition-all duration-200 hover:scale-105 hover:drop-shadow-xl active:scale-100 active:brightness-95 active:drop-shadow-xl active:duration-100 "
                        >
                            <p className="text-text drop-shadow-md transition-all group-[&:hover]:drop-shadow-xl">
                                Coming soon 🚧
                            </p>
                        </Link>
                        <p className="text-text">or</p>
                        <a
                            href="https://github.com/amixaam/photo-gallery"
                            className="group flex items-center gap-2 rounded-md bg-secondary20 px-6 py-2 transition-all duration-200 hover:scale-105 hover:drop-shadow-xl active:scale-100 active:brightness-95 active:drop-shadow-xl active:duration-100 "
                        >
                            <p className="text-text drop-shadow-md transition-all group-[&:hover]:drop-shadow-xl">
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
