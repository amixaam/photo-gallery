/**
 * Truncates a string if it's longer than the specified number of characters.
 * @param {string} str - The string to truncate.
 * @param {number} n - The number of characters to keep.
 * @returns {string} - The truncated string.
 */
export const Truncate = (str, n) => {
    return str.length > n ? str.substr(0, n) + "..." : str;
};
