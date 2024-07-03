import React from "react";

function EmptyList({ text = "Whoops! theres nothing here, for now!" }) {
    return (
        <div className="mt-nav-height flex w-full flex-col items-center justify-center gap-2">
            <img src="/images/info.svg" alt="" className="scale-125" />
            <h4 className="text-center text-text">{text}</h4>;
        </div>
    );
}

export default EmptyList;
