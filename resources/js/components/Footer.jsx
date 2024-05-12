import { Link } from "./Link";

export const Footer = ({ grainPrefs, setGrainPrefs }) => {
    return (
        <footer>
            <div className="relative h-[64px] rotate-180">
                <div className="wave-footer" />
            </div>
            <div className="relative h-fit sm:h-[15rem] bg-gradient-to-t from-footer to-footersecondary">
                <div className="opacity-50 h-full flex flex-col sm:justify-between gap-10 py-8 px-8">
                    <div className="flex flex-row flex-wrap gap-2 gap-x-6 sm:gap-6">
                        <Link
                            text="Source code"
                            href="https://github.com/amixaam/photo-gallery"
                        />
                        <Link text="Figma design" />
                        <Link
                            text="LinkedIn"
                            href="https://www.linkedin.com/in/robertsbrinkis/"
                        />
                        <Link text="CV" />
                    </div>
                    <div className="flex flex-row flex-wrap gap-3 sm:gap-6">
                        <Link
                            text="Instagram"
                            href="https://www.instagram.com/robisnis/"
                        />
                        <Link text="X" href="https://twitter.com/amixaaam" />
                        <Link
                            text="YouTube"
                            href="https://www.youtube.com/@amixam"
                        />
                    </div>
                    <div className="flex flex-row justify-between">
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
                            <a
                                href="/dashboard"
                                className="hover:scale-125 transition-all"
                            >
                                <img
                                    src="/images/key.svg"
                                    alt=""
                                    className="scale-75 sm:scale-100 select-none"
                                />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};
