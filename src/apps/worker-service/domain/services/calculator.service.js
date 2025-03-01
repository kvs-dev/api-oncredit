/**
 * Service class for performing calculations using different strategies.
 */
export class CalculatorService {
    /**
     * Creates an instance of CalculatorService.
     */
    constructor() {
        this.strategy = null;
    }

    /**
     * Sets the strategy to be used for calculations.
     * @param {Object} strategy - The strategy object that implements an execute method.
     */
    setStrategy(strategy) {
        this.strategy = strategy;
    }

    /**
     * Performs a calculation using the set strategy.
     * @param {number} a - The first number.
     * @param {number} b - The second number.
     * @returns {number} The result of the calculation.
     * @throws {Error} If no strategy is set.
     */
    calculate(a, b) {
        if (!this.strategy) {
            throw new Error('No strategy set');
        }
        return this.strategy.execute(a, b);
    }
}


