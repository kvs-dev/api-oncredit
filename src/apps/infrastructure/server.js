/**
 * @fileoverview This file sets up and starts an Express server for the API_Oncredit application.
 * It registers services in the dependency injection container and sets up the API routes.
 */

import express from 'express';
import { container } from './container.js';
import { CalculatorService } from '../worker-service/domain/services/calculator.service.js';
import { WorkerPool } from '../shared/workers/worker-pool.js';
import {router} from '../worker-service/entry-points/api/api.controller.js';
import cors from 'cors';

cors()
/**
 * Express application instance.
 * @type {import('express').Application}
 */
const app = express();

/**
 * Middleware to parse JSON request bodies.
 */
app.use(express.json());

/**
 * Registers the CalculatorService and WorkerPool in the dependency injection container.
 */
container.register('CalculatorService', new CalculatorService());
container.register('WorkerPool', new WorkerPool());

/**
 * Sets up the API routes.
 * @name /api
 * @function
 * @memberof module:express.Router
 */
app.use('/api', router);

/**
 * Starts the Express server on port 3000.
 * @function
 * @memberof module:express.Application
 * @param {number} port - The port number on which the server listens.
 * @param {Function} callback - Callback function to execute once the server starts.
 */
app.listen(3000, () => console.log('Server running on port 3000'));
