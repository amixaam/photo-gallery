export const TextInput = ({
    type = "text",
    name = "Input",
    onchange = () => {},
    error = "",
}) => {
    return (
        <label className="flex flex-col">
            <input
                type={type}
                name={name}
                placeholder={name}
                onChange={onchange}
                className={`px-4 py-2 rounded-md text-text font-medium transition-all duration-200 outline-none focus:outline-text50
                    ${error ? "bg-error20 placeholder-error" : "bg-footersecondary placeholder-text50"}
                    `}
            />
            {error && <p className="text-error">{error}</p>}
        </label>
    );
};
