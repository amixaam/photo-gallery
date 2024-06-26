import React, { useEffect, useRef, useState } from "react";
import Navbar from "../components/Navbar";
import { Footer } from "../components/Footer";
import { useLocalStorage } from "@uidotdev/usehooks";

const MainLayout = ({ auth, children, margins = true }) => {
    const [grainPrefs, setGrainPrefs] = useLocalStorage(
        "Preference-grain",
        true,
    );
    if (!children) {
        children = (
            <div className="flex min-h-screen w-full items-center justify-center">
                <h1 className="special-text w-min text-nowrap text-4xl drop-shadow-md sm:text-6xl">
                    Coming soon!
                </h1>
            </div>
        );
    }

    const [isVisible, setIsVisible] = useState(false);
    const prevScrollPos = useRef(0);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    useEffect(() => {
        const toggleVisibility = () => {
            const currentScrollPos = window.pageYOffset;

            // Button is displayed after scrolling for 500 pixels
            if (
                currentScrollPos > 100 &&
                currentScrollPos > prevScrollPos.current
            ) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }

            prevScrollPos.current = currentScrollPos;
        };

        window.addEventListener("scroll", toggleVisibility);

        return () => window.removeEventListener("scroll", toggleVisibility);
    }, [isVisible]);

    return (
        <>
            <button
                className={`${isVisible ? "opacity-100" : "opacity-0"} group fixed bottom-0 right-0 z-10 m-app-small rounded-full transition-all duration-200 sm:m-app`}
                onClick={scrollToTop}
            >
                <img
                    src="/images/up.svg"
                    alt="scroll up button"
                    className="size-12 drop-shadow-lg transition-all duration-200 group-hover:brightness-105"
                />
            </button>
            {grainPrefs && (
                <div className="pointer-events-none fixed z-[5] h-[100vh] w-full overflow-hidden">
                    <div
                        className="h-full w-full bg-cover bg-center"
                        style={{
                            backgroundImage: `url('/images/grain.png')`,
                            backgroundSize: "100px 100px",
                        }}
                    ></div>
                </div>
            )}
            <div className="bg-gradient-to-t from-bgsecondary to-bg">
                <Navbar showAdmin={auth ? true : false} />
                <div
                    className={
                        margins
                            ? "mx-app-small mb-48 flex min-h-screen flex-col gap-14 pt-nav-height sm:mx-app"
                            : ""
                    }
                >
                    {children}
                </div>
                <Footer grainPrefs={grainPrefs} setGrainPrefs={setGrainPrefs} />
            </div>
        </>
    );
};

export default MainLayout;
