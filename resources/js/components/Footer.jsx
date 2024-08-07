import { Link } from "./Link";
import { Link as InertiaLink } from "@inertiajs/inertia-react";

export const Footer = ({ grainPrefs, setGrainPrefs }) => {
    return (
        <footer>
            <div className="relative h-[64px] rotate-180">
                <div className="wave-footer" />
            </div>
            <div className="relative h-fit bg-gradient-to-t from-footer to-footersecondary">
                <div className="grid grid-cols-[1fr_1fr] gap-16 p-app-small opacity-75 sm:p-app">
                    <div className="flex flex-col gap-6">
                        <h4 className="text-text">About</h4>
                        <Link href="https://github.com/amixaam/photo-gallery">
                            Source code
                        </Link>
                        <Link href="https://www.figma.com/design/pL5zrSYfIO0uTQIQxT4XJf/Photo-portfolio?node-id=457-229&t=C08T1sJH4cPv9xPc-1">
                            Design
                        </Link>
                    </div>
                    <div className="flex flex-col flex-wrap gap-6">
                        <h4 className="text-text">Socials</h4>
                        <Link href="https://www.instagram.com/robisnis/">
                            Instagram
                        </Link>
                        <Link href="https://twitter.com/amixaaam">X</Link>
                    </div>

                    <div className="col-span-2 flex flex-row items-end justify-between gap-3">
                        <p className="link text-text">
                            © Roberts Briņķis, 2024
                        </p>
                        <div className="flex flex-row gap-8">
                            <InertiaLink
                                href={route("dashboard")}
                                className="transition-all hover:scale-110"
                            >
                                <img
                                    src="/images/key.svg"
                                    alt="key"
                                    className="select-none"
                                />
                            </InertiaLink>
                        </div>
                    </div>
                </div>
                {/* so the scroll-to-top button does not overlap with any UI elements */}
                <div className="h-16"></div>
            </div>
        </footer>
    );
};
