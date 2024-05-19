import { Link } from "./Link";
import { Link as InertiaLink } from "@inertiajs/inertia-react";

export const Footer = ({ grainPrefs, setGrainPrefs }) => {
    return (
        <footer>
            <div className="relative h-[64px] rotate-180">
                <div className="wave-footer" />
            </div>
            <div className="relative h-fit bg-gradient-to-t from-footer to-footersecondary">
                <div className="grid grid-cols-[1fr_1fr] gap-10 p-app-small sm:p-app opacity-75">
                    <div className="flex flex-col gap-2 sm:gap-6">
                        <h4 className="text-text">About</h4>
                        <Link href="https://github.com/amixaam/photo-gallery">
                            Source code
                        </Link>
                        <Link>Figma design</Link>
                        <Link href="https://www.linkedin.com/in/robertsbrinkis/">
                            LinkedIn
                        </Link>
                        <Link>CV</Link>
                    </div>
                    <div className="flex flex-col flex-wrap gap-3 sm:gap-6">
                        <h4 className="text-text">Socials</h4>
                        <Link href="https://www.instagram.com/robisnis/">
                            Instagram
                        </Link>
                        <Link href="https://twitter.com/amixaaam">X</Link>
                        <Link href="https://www.youtube.com/@amixam">
                            YouTube
                        </Link>
                    </div>

                    <div className="flex flex-row justify-between gap-3 col-span-2">
                        <p className="text-text link">
                            © Roberts Briņķis, 2024
                        </p>
                        <div className="flex flex-row gap-8">
                            <button
                                onClick={() => setGrainPrefs(!grainPrefs)}
                                className="hover:scale-110 transition-all"
                            >
                                <p className="text-text link">
                                    Grain {grainPrefs ? "on" : "off"}
                                </p>
                            </button>
                            <InertiaLink
                                href="/dashboard"
                                className="hover:scale-125 transition-all"
                            >
                                <img
                                    src="/images/key.svg"
                                    alt=""
                                    className="scale-75 sm:scale-100 select-none"
                                />
                            </InertiaLink>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};
