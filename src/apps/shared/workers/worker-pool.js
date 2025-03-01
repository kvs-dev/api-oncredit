import { Worker } from 'node:worker_threads';

/**
 * Class representing a pool of workers.
 */
export class WorkerPool {
  /**
   * Creates an instance of WorkerPool.
   * Implements a singleton pattern to ensure only one instance exists.
   */
  constructor() {
    if (!WorkerPool.instance) {
      WorkerPool.instance = this;
    }
    return WorkerPool.instance;
  }

  /**
   * Executes a task using a worker.
   * 
   * @param {string} workerFile - The path to the worker file.
   * @param {*} data - The data to be passed to the worker.
   * @returns {Promise<*>} A promise that resolves with the worker's response or rejects with an error.
   */
  executeTask(workerFile, data) {
    return new Promise((resolve, reject) => {
      const worker = new Worker(workerFile);
      worker.postMessage(data);
      worker.on('message', resolve);
      worker.on('error', reject);
    });
  }
}


