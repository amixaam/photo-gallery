export const TextInput = ({
    type = "text",
    name = "Input",
    onchange = () => {},
    error = "",
    disabled = false,
}) => {
    return (
        <div className="flex flex-col">
            <input
                type={type}
                name={name}
                placeholder={name}
                onChange={onchange}
                disabled={disabled}
                className={`w-full rounded-md px-4 py-2 font-medium text-text outline-none transition-all duration-200 focus:outline-text50
                    ${error ? "bg-error20 placeholder-error" : "bg-footersecondary placeholder-text50"}
                    `}
            />
            {error && <p className="text-error">{error}</p>}
        </div>
    );
};
