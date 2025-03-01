import { isValidNumbers } from "../../../shared/utils/libs/helpers.js";
/**
 * Class representing a sum strategy.
 */
export class SumStrategy {
        /**
     * Executes the sum strategy.
     * @param {number} a - The first number.
     * @param {number} b - The second number.
     * @returns {number} The result of add `a` and `b`.
     * @throws {Error} If the numbers are not valid.
     */
    execute(a, b) {
        const isValid = isValidNumbers(a, b);
        if (isValid) {
            throw new Error(isValid);
        }
        return a + b;
    }
}

