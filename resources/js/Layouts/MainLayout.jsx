import React from "react";
import Navbar from "../components/Navbar";
import { Footer } from "../components/Footer";
import { useLocalStorage } from "@uidotdev/usehooks";

const MainLayout = ({ auth, children }) => {
    const [grainPrefs, setGrainPrefs] = useLocalStorage(
        "Preference-grain",
        true
    );
    if (!children) {
        children = (
            <div className="min-h-screen w-full justify-center items-center flex">
                <h1 className="special-text text-nowrap drop-shadow-md w-min text-4xl sm:text-6xl">
                    Coming soon!
                </h1>
            </div>
        );
    }

    return (
        <>
            {grainPrefs && (
                <div className="fixed w-full h-[100vh] pointer-events-none overflow-hidden z-[5]">
                    <div
                        className="w-full h-full bg-cover bg-center"
                        style={{
                            backgroundImage: `url('/images/grain.png')`,
                            backgroundSize: "100px 100px",
                        }}
                    ></div>
                </div>
            )}
            <div className="bg-gradient-to-t from-bgsecondary to-bg">
                <Navbar showAdmin={auth ? true : false} />
                <div className="min-h-screen">{children}</div>
                <Footer grainPrefs={grainPrefs} setGrainPrefs={setGrainPrefs} />
            </div>
        </>
    );
};

export default MainLayout;
