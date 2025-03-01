import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { container } from '../../../infrastructure/container.js';
import { SumStrategy, MultiplyStrategy } from '../../domain/strategies/index.js';

const router = express.Router();

/**
 * Endpoint to perform calculations based on the provided strategy.
 * 
 * @param {Object} req - The request object.
 * @param {Object} req.body - The body of the request.
 * @param {string} req.body.strategy - The strategy to use for calculation (e.g., 'sum', 'multiply').
 * @param {number,number} req.body - The values to be used in the calculation.
 * @param {Object} res - The response object.
 * 
 * @returns {void}
 * 
 * @example
 * // Request body
 * {
 *   "strategy": "sum",
 *   "a": 2,
 *   "b": 4
 * }
 * 
 * // Response
 * {
 *   "result": 6
 * }
 */

router.post('/calculate', async (req, res) => {
  try {
    const { a, b, operation } = req.body;

    if (!a || !b || !operation) {
      return res.status(400).json({ error: 'Missing parameters' });
    }


    const strategies = {
      sum: SumStrategy,
      multiply: MultiplyStrategy
    };

    const StrategyClass = strategies[operation];
    if (!StrategyClass) {
      return res.status(400).json({ error: 'Invalid operation' });
    }

    const strategy = new StrategyClass();

    const calculator = container.resolve('CalculatorService');
    calculator.setStrategy(strategy);

    return res.json({ result: calculator.calculate(a, b) });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

/**
 * Endpoint to handle heavy tasks.
 * 
 * @constant {string} workerPath - The path to the worker script.
 * 

 * @param {Object} req - The request object.
 * @param {Object} req.body - The body of the request.
 * @param {number} req.body.number - The number to be processed by the worker.
 * @param {Object} res - The response object.
 * 
 * @returns {object} 200 - Task successfully processed
 * @returns {Error}  default - Unexpected error
 * 
 * @example
 * // Request body
 * {
 *   "number": 5
 * }
 * 
 * // Response
 * {
 *   "result": 6.14...
 * }
 */

router.post('/heavy-task', async (req, res) => {
  try {
    const { number } = req.body;


    if (typeof number !== 'number' || number <= 0) {
      return res.status(400).json({ error: 'Invalid number input' });
    }

    const workerPool = container.resolve('WorkerPool');
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);


    const workerPath = path.join(__dirname, '../../../shared/workers/worker.js');
    const result = await workerPool.executeTask(workerPath, number);

    return res.json({ result });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

/**
 * Endpoint to simulate a buggy behavior with a random delay.
 * 
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * 
 * @returns {void}
 * 
 * @example
 * // Response
 * {
 *   "message": "Response reached"
 * }
 */

router.get('/buggy-endpoint', async (req, res) => {
  try {
    console.log('Start request');

    await new Promise((resolve) => setTimeout(resolve, Math.random() * 100));

    console.log('Timeout executed');
    res.status(200).json({ message: 'Response reached' });
  } catch (error) {
    console.error('Error in buggy-endpoint:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

export { router };
