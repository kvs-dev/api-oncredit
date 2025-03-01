/**
 * Checks if both arguments are valid numbers.
 *
 * @param {number} a - The first number to validate.
 * @param {number} b - The second number to validate.
 * @returns {string|undefined} Returns an error message if either argument is not a number, otherwise returns undefined.
 */
export const isValidNumbers = (a,b) => {
    if (typeof a !== 'number' || typeof b !== 'number') {
        return "Both arguments must be numbers";
    }
}