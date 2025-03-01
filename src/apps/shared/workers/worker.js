import {parentPort} from 'node:worker_threads'

parentPort.on('message', (number) => {
  /**
   * A variable to store the result of a computation.
   * @type {number}
   */
  let result = 0;
  for (let i = 0; i < number; i++) {
    result += Math.sqrt(i);
  }
  parentPort.postMessage(result);
});
