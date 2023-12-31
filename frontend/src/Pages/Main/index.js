import React, { useEffect } from "react";

import "../Main/index.scss";
import Header from "../../Reuse/Header";
import ImageItem from "./components/ImageItem";

import StarsImage from "../../images/decoration/stars_pink.png";
import Grain from "../../images/decoration/grain.png";

import Castle from "../../images/Gallery/poland_mountains.jpg";
import Tree from "../../images/Gallery/fall_tree_night.jpg";
import StarryNight from "../../images/Gallery/poland_starry_night.jpg";
import { Link } from "react-router-dom";

export default function MainPage() {
    const data = [
        {
            id: 1,
            image: Castle,
            title: "beautiful zakupane mountain range",
            description:
                "This is a beautiful example of the natural beauty of Poland. The mountains takes up the majority of the frame and the sky is a clear blue. ",
            date: "13.08.2023",
            location: "Poland, zakupane",
        },
        {
            id: 2,
            image: StarryNight,
            title: "Starry night in poland",
            description:
                "This breathtaking image captures the beauty of a starry night in Zakopane, Poland. The sky is ablaze with stars, and the Milky Way can be clearly seen stretching across the horizon. In the foreground, a power pole stands silhouetted against the night sky, adding a touch of man-made contrast to the natural scene.",
            date: "13.08.2023",
            location: "poland, zakupane",
        },
        {
            id: 3,
            image: Tree,
            title: "Fall tree night",
            description: "Funny tree lol!",
            date: "31.10.2023",
            location: "LATVIA, CĒSIS",
        },
    ];

    const frames = [
        "M124.069 0.175348C96.9955 2.38238 81.3212 31.7032 60.9707 51.6037C38.1792 73.8913 0.627975 87.825 0.00764465 121.493C-0.613693 155.216 36.737 170.524 58.3417 194.295C79.8126 217.919 93.8068 257.628 124.069 257.996C154.387 258.365 170.978 220.879 191.257 195.913C209.831 173.046 233.771 152.226 234.945 121.493C236.15 89.9355 217.48 62.6966 197.193 40.4988C177.056 18.4653 152.298 -2.12591 124.069 0.175348Z",
        "M114.328 10.311C146.468 3.07288 189.234 -8.28452 212.99 9.42862C238.482 28.4367 214.463 61.6862 219.019 88.3725C221.901 105.26 237.047 120.07 234.767 137.009C232.435 154.335 219.183 169.066 206.211 183.535C191.588 199.845 176.397 215.505 154.58 226.451C126.372 240.602 93.6396 265.944 62.6267 255.571C30.0084 244.662 36.6065 207.595 23.7471 182.692C15.6406 166.993 3.65311 152.954 1.009 136.245C-1.58484 119.853 0.758989 103.46 8.77522 88.0786C17.1373 72.0333 31.2874 58.7454 47.6998 46.6532C67.6828 31.9305 87.4523 16.3636 114.328 10.311Z",
        "M126.167 3.15351C93.6567 -7.07841 58.3685 16.4569 38.5785 36.1796C16.4145 58.2682 18.6576 73.333 5.52218 123.388C-7.61326 173.444 5.52218 241.332 44.4132 223.492C83.3043 205.652 96.7384 258.307 126.167 258.672C155.65 259.038 193.415 239.316 213.136 214.572C231.198 191.909 239.284 157.079 233.99 123.388C228.695 89.698 209.525 74.5324 189.797 52.5328C170.214 30.696 158.678 13.3854 126.167 3.15351Z",
    ];

    useEffect(() => {
        const handleScroll = () => {
            const scrolled = window.scrollY;
            const parallax = document.querySelector(".landing-image-container");
            if (parallax) {
                parallax.style.transform = `translateY(${scrolled * -1.3}px)`;
            }
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return (
        <div className="image-background">
            <div className="container">
                <Header />
                <main className="landing">
                    <div className="title-container">
                        <h1 className="title-content gradient">
                            Photo gallery
                        </h1>
                        <img
                            className="title-stars"
                            src={StarsImage}
                            alt="Stars"
                        />
                        <p className="title-paragraph gradient">
                            I'm bad at it, but I'm doing it anyway
                        </p>
                    </div>
                    <div className="landing-image-container"></div>
                </main>
            </div>
            <section className="showcase-container">
                <div className="showcase-animation">
                    <svg
                        className="transition-wave"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 1446 35"
                        preserveAspectRatio="none"
                    >
                        <path d="M3 17.5C27 0.833334 51 0.833334 75 17.5C99 34.1667 123 34.1667 147 17.5C171 0.833334 195 0.833334 219 17.5C243 34.1667 267 34.1667 291 17.5C315 0.833334 339 0.833334 363 17.5C387 34.1667 411 34.1667 435 17.5C459 0.833334 483 0.833334 507 17.5C531 34.1667 555 34.1667 579 17.5C603 0.833334 627 0.833334 651 17.5C675 34.1667 699 34.1667 723 17.5C747 0.833334 771 0.833334 795 17.5C819 34.1667 843 34.1667 867 17.5C891 0.833334 915 0.833334 939 17.5C963 34.1667 987 34.1667 1011 17.5C1035 0.833334 1059 0.833334 1083 17.5C1107 34.1667 1131 34.1667 1155 17.5C1179 0.833334 1203 0.833334 1227 17.5C1251 34.1667 1275 34.1667 1299 17.5C1323 0.833334 1347 0.833334 1371 17.5C1395 34.1667 1419 34.1667 1443 17.5" />
                    </svg>
                    <svg
                        className="transition-wave-inner"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 1450 115"
                        preserveAspectRatio="none"
                    >
                        <defs>
                            <pattern
                                id="grainPattern"
                                x="0"
                                y="0"
                                width="100"
                                height="100"
                                patternUnits="userSpaceOnUse"
                            >
                                <image
                                    xlinkHref={Grain}
                                    x="0"
                                    y="0"
                                    width="100"
                                    height="100"
                                />
                            </pattern>
                        </defs>

                        <path d="M77 17.5C53 0.833334 29 0.833334 5 17.5V109.5H1445V17.5C1421 34.1667 1397 34.1667 1373 17.5C1349 0.833334 1325 0.833334 1301 17.5C1277 34.1667 1253 34.1667 1229 17.5C1205 0.833334 1181 0.833334 1157 17.5C1133 34.1667 1109 34.1667 1085 17.5C1061 0.833334 1037 0.833334 1013 17.5C989 34.1667 965 34.1667 941 17.5C917 0.833334 893 0.833334 869 17.5C845 34.1667 821 34.1667 797 17.5C773 0.833334 749 0.833334 725 17.5C701 34.1667 677 34.1667 653 17.5C629 0.833334 605 0.833334 581 17.5C557 34.1667 533 34.1667 509 17.5C485 0.833334 461 0.833334 437 17.5C413 34.1667 389 34.1667 365 17.5C341 0.833334 317 0.833334 293 17.5C269 34.1667 245 34.1667 221 17.5C197 0.833334 173 0.833334 149 17.5C125 34.1667 101 34.1667 77 17.5Z" />

                        <path
                            d="M77 17.5C53 0.833334 29 0.833334 5 17.5V109.5H1445V17.5C1421 34.1667 1397 34.1667 1373 17.5C1349 0.833334 1325 0.833334 1301 17.5C1277 34.1667 1253 34.1667 1229 17.5C1205 0.833334 1181 0.833334 1157 17.5C1133 34.1667 1109 34.1667 1085 17.5C1061 0.833334 1037 0.833334 1013 17.5C989 34.1667 965 34.1667 941 17.5C917 0.833334 893 0.833334 869 17.5C845 34.1667 821 34.1667 797 17.5C773 0.833334 749 0.833334 725 17.5C701 34.1667 677 34.1667 653 17.5C629 0.833334 605 0.833334 581 17.5C557 34.1667 533 34.1667 509 17.5C485 0.833334 461 0.833334 437 17.5C413 34.1667 389 34.1667 365 17.5C341 0.833334 317 0.833334 293 17.5C269 34.1667 245 34.1667 221 17.5C197 0.833334 173 0.833334 149 17.5C125 34.1667 101 34.1667 77 17.5Z"
                            fill="url(#grainPattern)"
                        />
                    </svg>
                </div>
                <div className="showcase-content">
                    <div className="showcase-title-container">
                        <h1 className="showcase-title">some of my best</h1>
                        <svg
                            className="showcase-title-flair"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 630 14"
                        >
                            <path
                                d="M2 11.7578C25.1849 6.26399 48.3699 0.770355 71.5559 2.2422C94.7409 3.71405 117.926 12.1517 141.111 11.7578C164.297 11.3639 187.482 2.13858 210.667 2.2422C233.852 2.34583 257.037 11.7786 280.223 11.7578C303.408 11.737 326.592 2.26296 349.777 2.2422C372.963 2.22144 396.148 11.6542 419.333 11.7578C442.518 11.8614 465.703 2.63611 488.889 2.2422C512.074 1.84829 535.259 10.286 558.444 11.7578C581.63 13.2296 604.815 7.73601 628 2.2422"
                                stroke="#943C75"
                                strokeWidth="4"
                                strokeLinecap="round"
                            />
                        </svg>
                    </div>
                    {data.map((item) => (
                        <ImageItem
                            key={item.id}
                            image={item.image}
                            title={item.title}
                            description={item.description}
                            date={item.date}
                            location={item.location}
                            frame={frames[item.id % frames.length]}
                            clipPath={"clipPath-" + item.id}
                        />
                    ))}
                    <Link to="/gallery" className="showcase-button">
                        MOre photos
                    </Link>
                    <div className="footer-container">
                        <p>@amixam / @amixaam</p>
                    </div>
                </div>
            </section>
        </div>
    );
}
