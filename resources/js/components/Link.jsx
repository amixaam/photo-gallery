export const Link = ({ href = "#", children }) => {
    return (
        <a href={href} className="flex flex-row gap-2 items-center w-fit group">
            <p className="text-text group-hover:underline">
                {href === "#" && "(?) "}
                {children}
            </p>
            <img src="images/redirect.svg" alt="" className="scale-75" />
        </a>
    );
};
