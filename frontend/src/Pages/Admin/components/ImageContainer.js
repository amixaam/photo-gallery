import React from "react";
import "./ImageContainer.scss";

import Statistics from "../../../Reuse/Statistics";

function ImageContainer({ data, handleImageClick }) {
    const { title, description, date, time, camera, location } =
        data.picture_data;

    const statisticsData = {
        location: location,
        date: date,
        time: time,
        camera: camera,
    };
    return (
        <div
            className="a-image-container"
            onClick={() => handleImageClick(data)}
        >
            <img
                className="thumbnail"
                src={data.thumbnail}
                alt={title ? title : "no data"}
            />
            <div className="content">
                <h1>{title ? title : "no data"}</h1>
                <Statistics statistics={statisticsData} />
                <p>{description ? description : "no data"}</p>
            </div>
        </div>
    );
}

export default ImageContainer;
