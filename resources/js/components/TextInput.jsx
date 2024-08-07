import { createPlaceholder } from "../utils/createPlaceholder";

export const TextInput = ({
    type = "text",
    name = "Input",
    value = "",
    onchange = () => {},
    error = "",
    disabled = false,
    icon,
}) => {
    // Capitalize first letter, replace underscores with spaces and add elipses

    return (
        <div className="flex flex-col">
            <input
                type={type}
                name={name}
                placeholder={createPlaceholder(name)}
                onChange={onchange}
                value={value}
                disabled={disabled}
                className={`w-full rounded-md px-4 py-3 font-medium text-text outline-none transition-all duration-200 focus:outline-secondary
                    ${error ? "bg-error bg-opacity-20 placeholder-error" : "bg-text bg-opacity-10 placeholder-text placeholder-opacity-50"}
                    `}
                style={
                    icon && {
                        backgroundImage: "url(/images/search.svg)",
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "left 10px center",
                        paddingLeft: "40px",
                    }
                }
            />
            {error && <p className="text-error">{error}</p>}
        </div>
    );
};
