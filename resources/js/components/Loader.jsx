import React from "react";
import starBig from "../../../public/images/loader/star-big.svg";
import starMedium from "../../../public/images/loader/star-medium.svg";
import starSmall from "../../../public/images/loader/star-small.svg";

function Loader() {
    return (
        <div className="loader w-[1.7rem] h-5 relative -skew-x-3">
            <img className="absolute" src={starBig} alt="" />
            <img
                className="absolute right-0 top-[-1px]"
                src={starMedium}
                alt=""
            />
            <img
                className="absolute bottom-[0px] right-[23%] scale-110"
                src={starSmall}
                alt=""
            />
        </div>
    );
}

export default Loader;
