import React from "react";

function EmptyList({ text = "Whoops! theres nothing here, for now!" }) {
    return (
        <div className="w-full mt-nav-height flex items-center justify-center flex-col gap-2">
            <img src="/images/info.svg" alt="" className="scale-125" />
            <h4 className="text-text text-center">{text}</h4>;
        </div>
    );
}

export default EmptyList;
