import { Link } from "@inertiajs/inertia-react";
import { useMeasure } from "@uidotdev/usehooks";
import { animate, motion, useMotionValue } from "framer-motion";
import React, { useEffect, useState } from "react";
import MainLayout from "../Layouts/MainLayout";
import { ImageComponent } from "../components/ImageComponent";
import PrimaryButton from "../components/PrimaryButton";
import Reveal from "../components/Reveal";
import { SecondaryButton } from "../components/SecondaryButton";
import { container, revealItem } from "../utils/FramerVariants";

export default function Landing({ auth, collection }) {
    const [dragging, setDragging] = useState(false);
    const [ref, { width }] = useMeasure();

    const xTranslation = useMotionValue(0);

    const oneSize = Math.floor(width / 3) - 2;
    const carouselWidth = oneSize * 2;
    const finalX = -carouselWidth / 2 - 8;

    useEffect(() => {
        if (dragging) return;
        let controls;

        if (xTranslation.get() > 0) {
            xTranslation.set(finalX);
        } else if (xTranslation.get() < finalX) {
            xTranslation.set(0);
        }

        controls = animate(
            xTranslation,
            [xTranslation.get(), finalX + xTranslation.get()],
            {
                ease: "linear",
                duration: 35,
                repeat: Infinity,
                repeatType: "loop",
                repeatDelay: 0,
            },
        );

        return controls.stop;
    }, [xTranslation, carouselWidth, dragging]);

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
                            {/* Carousel */}
                            <motion.div className="flex w-screen cursor-grab py-2">
                                {/* Inner carousel */}
                                <motion.div
                                    ref={ref}
                                    drag="x"
                                    onDrag={(event, info) => {
                                        setDragging(true);
                                        let newTranslation =
                                            xTranslation.get() - info.delta.x;
                                        if (newTranslation > 0) {
                                            newTranslation = finalX;
                                        } else if (newTranslation < finalX) {
                                            newTranslation = 0;
                                        }

                                        xTranslation.set(newTranslation);
                                    }}
                                    onDragEnd={(event, info) => {
                                        setDragging(false);
                                    }}
                                    style={{ x: xTranslation }}
                                    className="flex flex-row gap-6 sm:gap-16"
                                >
                                    {[
                                        ...collection.images,
                                        ...collection.images,
                                        ...collection.images,
                                    ].map(
                                        // Images
                                        (image, index) => (
                                            <motion.div
                                                className=" w-[220px] flex-1 select-none sm:w-[380px] lg:w-[440px]"
                                                key={index}
                                            >
                                                <ShowcaseImage
                                                    image={image}
                                                    slug={collection.slug}
                                                />
                                            </motion.div>
                                        ),
                                    )}
                                </motion.div>
                            </motion.div>
                        </Reveal>
                    </section>
                </main>

                {/* Call */}
                <section className="flex h-screen items-center justify-center">
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
            className="group flex h-full select-none flex-col gap-2"
        >
            <ImageComponent
                src={"storage/" + image.path}
                blurhash={image.blurhash}
                alt={image.alt_text}
                parentClassname={"h-full flex flex-1"}
                className={
                    "rounded-3xl bg-secondary20 transition-all duration-200 group-[&:hover]:scale-[1.01] group-[&:hover]:opacity-100"
                }
                imageClassName={`w-[220px] flex-1 select-none sm:w-[380px] md:opacity-90 lg:w-[440px]"`}
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
