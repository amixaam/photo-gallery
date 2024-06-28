import { Link } from "@inertiajs/inertia-react";
import React from "react";

function Header({ back = false, title = "Header", href = null }) {
    function Back() {
        window.history.back();
    }

    const contents = (
        <>
            <img
                src="/images/back.svg"
                alt=""
                className="transition-all duration-200 group-hover:scale-x-150"
            />
            <p className="text-text transition-all duration-200 group-hover:font-bold">
                Go back
            </p>
        </>
    );

    if (back) {
        return (
            <div className="flex flex-col gap-4">
                <h1 className="special-text w-min text-nowrap text-4xl drop-shadow-md sm:text-6xl">
                    {title}
                </h1>

                {href ? (
                    <Link href={href} className="group flex w-fit gap-2">
                        {contents}
                    </Link>
                ) : (
                    <Link
                        onClick={Back}
                        as="button"
                        className="group flex w-fit gap-2"
                    >
                        {contents}
                    </Link>
                )}
            </div>
        );
    }

    return (
        <h1 className="special-text w-min text-nowrap text-4xl drop-shadow-md sm:text-6xl">
            {title}
        </h1>
    );
}

export default Header;
