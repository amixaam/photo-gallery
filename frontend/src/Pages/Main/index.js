import React, { useEffect } from "react";

import "../Main/index.scss";
import Header from "../../Reuse/Header";
import ImageItem from "./components/ImageItem";

import Grain from "../../images/decoration/grain.png";

import Castle from "../../images/Gallery/poland_mountains.jpg";
import Tree from "../../images/Gallery/fall_tree_night.jpg";
import StarryNight from "../../images/Gallery/poland_starry_night.jpg";
import TitleFlair from "../../images/decoration/title_flair.svg";
import { Link } from "react-router-dom";
import Wave from "../../Reuse/Wave";
import AnimatedWave from "../../Reuse/AnimatedWave";

export default function MainPage() {
    const data = [
        {
            id: 1,
            image: Castle,
            title: "Zakupane mountain range",
            description:
                "This photo captures the idyllic beauty of a ski lift nestled amidst the mountains. The contrasting blues of the sky and fog, and the stark lines of the lift, create a serene and captivating scene.",
            statistics: {
                location: "Poland, zakupane",
                date: "13.08.2023",
            },
        },
        {
            id: 2,
            image: StarryNight,
            title: "Poland's Starry night",
            description:
                "This breathtaking image captures the beauty of a starry night. The sky is ablaze with stars, and the Milky Way can be clearly seen. In the foreground, a power pole stands silhouetted against the night sky, adding a touch of man-made contrast to the natural scene.",
            statistics: {
                location: "Poland, zakupane",
                date: "13.08.2023",
            },
        },
        {
            id: 3,
            image: Tree,
            title: "Autumnal Glow",
            description:
                "This is an amazing photo of a tree with its last leaves in fall, glowing in the dark. The dark silhouette of the tree is contrasted against the bright yellow leaves, creating a beautiful contrast. The dark sky adds to the moodiness of the photo, making it feel like a magical scene.",
            statistics: {
                location: "Latvia, Cēsis",
                date: "30.10.2023",
            },
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
            const parallax = document.querySelector(".landing-bg");
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
        <div className="main-page-container">
            <div className="landing-bg"></div>

            <div className="landing content-margin">
                <Header />
                <div className="title-container">
                    <h1 className="title-text">Photo gallery</h1>
                    <p className="title-text">
                        I’m bad at it, but i’m doing it anyway
                    </p>
                    <div className="title-stars"></div>
                </div>
            </div>

            <div className="showcase-wrapper">
                <div className="showcase-animation ">
                    <Wave />
                </div>
                <div className="showcase-bg"></div>
                <div className="showcase-content content-margin">
                    <div className="title-container">
                        <h1>Some of my best</h1>
                        <AnimatedWave
                            className={"title-flair"}
                            amplitude={4}
                            speed={0.2}
                            frequency={20}
                        />
                    </div>
                    <div className="item-container">
                        {data.map((item) => (
                            <ImageItem
                                key={item.id}
                                image={item.image}
                                title={item.title}
                                description={item.description}
                                statistics={item.statistics}
                                frame={frames[item.id % frames.length]}
                                clipPath={"clipPath-" + item.id}
                            />
                        ))}
                    </div>
                    <Link to="/gallery" className="flex-button landing-button">
                        Need more?
                    </Link>

                    <footer>
                        <a href="https://github.com/amixaam">@amixaam</a>
                    </footer>
                </div>
            </div>
        </div>
    );
}
