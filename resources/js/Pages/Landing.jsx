import { Link } from "@inertiajs/inertia-react";
import React from "react";
import MainLayout from "../Layouts/MainLayout";
import PrimaryButton from "../components/PrimaryButton";
import Reveal from "../components/Reveal";
import { motion } from "framer-motion";
import { container, revealItem } from "../utils/FramerVariants";
import { SecondaryButton } from "../components/SecondaryButton";

export default function Landing({ auth, collection }) {
    return (
        <MainLayout auth={auth.user} margins={false}>
            <div className="flex flex-col overflow-x-hidden">
                <div>
                    {/* Landing */}
                    <section className="h-[37rem] bg-gradient-to-b from-secondary from-10% to-primary to-90% xl:h-[85vh]">
                        <motion.div
                            variants={container}
                            initial="hidden"
                            animate="show"
                            className="flex h-full flex-col justify-center gap-24 "
                        >
                            <div className="flex flex-col items-center justify-center ">
                                <StarryHeader title="photo-gallery" />

                                <motion.div
                                    variants={revealItem}
                                    className="flex flex-row justify-center gap-[1ch]"
                                >
                                    <h4 variants={revealItem}>
                                        Made with love,
                                    </h4>
                                    <a
                                        variants={revealItem}
                                        href="https://github.com/amixaam"
                                        className="text-text underline-offset-1 drop-shadow-md transition-all hover:underline active:brightness-90"
                                    >
                                        <h4>@amixaam</h4>
                                    </a>
                                </motion.div>
                            </div>
                            <div className="flex flex-col items-center justify-center gap-2 ">
                                <motion.p variants={revealItem}></motion.p>
                                <motion.div variants={revealItem}>
                                    <PrimaryButton
                                        text="Coming soon!"
                                        href={route("collections")}
                                    />
                                </motion.div>
                            </div>
                        </motion.div>
                    </section>
                    <div className="relative h-[64px]">
                        <div className="wave" />
                    </div>
                </div>

                {/* Highlights */}
                <main className="mt-16 flex h-screen flex-col items-center justify-center  gap-8 ">
                    <Reveal styles="flex -skew-x-6 items-center text-nowrap">
                        <StarryHeader
                            title="Some higlights"
                            mirrorStars={true}
                        />
                    </Reveal>
                    <section>
                        <Reveal>
                            <div className="w-screen overflow-x-hidden py-2">
                                <div className="scroll relative z-[6] flex h-full w-max flex-row justify-center gap-6 sm:gap-16">
                                    {[
                                        ...collection.images,
                                        ...collection.images,
                                    ].map((image, index) => (
                                        <ShowcaseImage
                                            key={index}
                                            image={image}
                                            slug={collection.slug}
                                        />
                                    ))}
                                </div>
                            </div>
                        </Reveal>
                    </section>
                </main>

                {/* Call */}
                <section className="flex h-screen items-center justify-center ">
                    <Reveal styles="flex items-center justify-center gap-8 flex-col">
                        <StarryHeader title="Like what you see?" />
                        <div className="mb-[15vh] flex flex-col items-center gap-2 sm:flex-row sm:gap-4">
                            <motion.div variants={revealItem} className="flex">
                                <SecondaryButton
                                    href={route("collections")}
                                    as="link"
                                    text="Collections (Coming soon!)"
                                ></SecondaryButton>
                            </motion.div>
                            <motion.div variants={revealItem} className="flex">
                                <p>or</p>
                            </motion.div>
                            <motion.div variants={revealItem} className="flex">
                                <SecondaryButton
                                    href="https://github.com/amixaam/photo-gallery"
                                    as="a"
                                >
                                    <p>View source</p>
                                    <img src="/images/redirect.svg" alt="" />
                                </SecondaryButton>
                            </motion.div>
                        </div>
                    </Reveal>
                </section>
            </div>
        </MainLayout>
    );
}

const StarryHeader = ({ title = "Starry Header", mirrorStars = false }) => {
    return (
        <motion.div
            variants={revealItem}
            className="flex -skew-x-6 items-center text-nowrap"
        >
            <img
                src={`/images/landing-stars${mirrorStars ? "-flipped" : ""}.svg`}
                alt=""
                className={`${mirrorStars ? "rotate-180" : ""} scale-75 sm:scale-100`}
            />
            <h1 className="special-text w-min text-3xl drop-shadow-md sm:text-6xl">
                {title}
            </h1>
            <img
                src={`/images/landing-stars${mirrorStars ? "-flipped" : ""}.svg`}
                alt=""
                className={`${!mirrorStars ? "rotate-180" : ""} scale-75 sm:scale-100`}
            />
        </motion.div>
    );
};

const ShowcaseImage = ({ image, slug }) => {
    return (
        <Link
            href={route("photo", [slug, image.id])}
            className="group flex flex-col gap-2"
        >
            <img
                src={"storage/" + image.path}
                alt={image.alt_text}
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
                        {image.location}
                    </p>
                </div>
            </div>
        </Link>
    );
};
