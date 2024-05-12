export const Link = ({ text = "No text given", href = "#" }) => {
    return (
        <a
            href={href}
            className="flex flex-row gap-2 items-center hover:scale-110 transition-all"
        >
            <p className="text-text link">
                {text}
                {href === "#" ? " (Missing link)" : ""}
            </p>
            <img src="images/redirect.svg" alt="" className="scale-75" />
        </a>
    );
};
