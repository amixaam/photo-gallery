import React from "react";
import "./Statistics.scss";

import LocationIcon from "../images/decoration/icons/location.svg";
import CalendarIcon from "../images/decoration/icons/calendar.svg";
import ClockIcon from "../images/decoration/icons/time.svg";
import CassetteIcon from "../images/decoration/icons/camera.svg";

function Statistics({ statistics }) {
    const getIcon = (name) => {
        switch (name) {
            case "location":
                return LocationIcon;
            case "date":
                return CalendarIcon;
            case "time":
                return ClockIcon;
            case "camera":
                return CassetteIcon;
            default:
                return null;
        }
    };

    return (
        <div className="statistics-wrapper">
            {Object.entries(statistics).map(([name, statistic]) => (
                <div className="statistic" key={name}>
                    <img src={getIcon(name)} alt="" />
                    <p>{statistic ? statistic : "no data"}</p>
                </div>
            ))}
        </div>
    );
}

export default Statistics;
