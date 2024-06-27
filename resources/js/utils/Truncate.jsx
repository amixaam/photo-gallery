export const Truncate = (str, n) => {
    return str.length > n ? str.substr(0, n) + "..." : str;
};
