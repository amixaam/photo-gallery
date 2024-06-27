export const TextInput = ({
    type = "text",
    name = "Input",
    value = "",
    onchange = () => {},
    error = "",
    disabled = false,
}) => {
    // Capitalize first letter, replace underscores with spaces and add elipses
    const createPlaceholder = () => {
        return (
            name.charAt(0).toUpperCase() +
            name.slice(1).replace(/_/g, " ") +
            "..."
        );
    };

    return (
        <div className="flex flex-col">
            <input
                type={type}
                name={name}
                placeholder={createPlaceholder()}
                onChange={onchange}
                value={value}
                disabled={disabled}
                className={`w-full rounded-md px-4 py-2 font-medium text-text outline-none transition-all duration-200 focus:outline-secondary
                    ${error ? "bg-error bg-opacity-20 placeholder-error" : "bg-text bg-opacity-10 placeholder-text placeholder-opacity-50"}
                    `}
            />
            {error && <p className="text-error">{error}</p>}
        </div>
    );
};
