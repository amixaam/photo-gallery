export const Link = ({ href = "#", children }) => {
    return (
        <a href={href} className="group flex w-fit flex-row items-center gap-2">
            <p className="text-text group-hover:underline">
                {href === "#" && "(?) "}
                {children}
            </p>
            <img src="images/redirect.svg" alt="" className="scale-75" />
        </a>
    );
};
