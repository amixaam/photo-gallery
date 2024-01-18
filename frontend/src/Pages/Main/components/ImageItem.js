import React from "react";
import "./ImageItem.scss";

import Stars from "../../../images/decoration/stars.png";
import TitleFlair from "../../../images/decoration/title_flair.svg";
import Statistics from "../../../Reuse/Statistics";
import AnimatedWave from "../../../Reuse/AnimatedWave";

export default function ImageItem(props) {
    const { image, title, description, statistics, frame, clipPath } = props;

    return (
        <div className="ImageItem-container">
            <div className="image">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="100%"
                    height="100%"
                    viewBox="0 0 235 258"
                >
                    <defs>
                        <clipPath id={clipPath}>
                            <path d={frame} />
                        </clipPath>
                    </defs>
                    <image
                        xlinkHref={image}
                        width="100%"
                        height="100%"
                        preserveAspectRatio="xMidYMid slice"
                        clipPath={`url(#${clipPath})`}
                    />
                </svg>
            </div>
            <div className="content">
                <h1>{title}</h1>
                <img src={TitleFlair} alt="" className="title-flair" />
                <Statistics statistics={statistics} />
                <p>{description}</p>
            </div>
        </div>
    );
}
