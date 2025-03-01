# API_Oncredit

A Node.js API service built with Express, project architecture based on [Node.js Best Practices](https://github.com/goldbergyoni/nodebestpractices).

## Project Overview

This project implements a scalable API service with the following features:

- **Calculator Service**: Performs mathematical operations using the Strategy pattern
- **Worker Pool**: Handles CPU-intensive tasks using Node.js worker threads
- **Dependency Injection**: Uses a custom container for managing dependencies

## Project Structure

```
API_Oncredit/
├── node_modules/
├── package.json
├── pnpm-lock.yaml
└── src/
    └── apps/
        ├── infrastructure/
        │   ├── container.js       # Dependency injection container
        │   └── server.js          # Express server setup
        │
        ├── shared/
        │   ├── utils/
        │   │   └── libs/
        │   │       └── helpers.js # Utility functions
        │   └── workers/
        │       ├── worker.js      # Worker thread implementation
        │       └── worker-pool.js # Worker pool for managing threads
        │
        └── worker-service/
            ├── domain/
            │   ├── services/
            │   │   └── calculator.service.js # Calculator service
            │   └── strategies/
            │       ├── index.js              # Strategy exports
            │       ├── multiply.strategy.js  # Multiply operation
            │       └── sum.strategy.js       # Sum operation
            │
            └── entry-points/
                └── api/
                    └── api.controller.js     # API endpoints
```


## API Endpoints

The API provides the following endpoints:

- **POST /api/calculate**: Performs mathematical operations
  - Request body: `{ "a": number, "b": number, "operation": "sum" | "multiply" }`
  - Response: `{ "result": number }`

- **POST /api/heavy-task**: Executes CPU-intensive tasks using worker threads
  - Request body: `{ "number": number }`
  - Response: `{ "result": number }`

- **GET /api/buggy-endpoint**: Test endpoint that simulates random delays
  - Response: `{ "message": "Response reached" }`

## Explanation

The problem in /buggy-endpoint lies in how Node handles synchronous and asynchronous tasks. The while loop with the stop parameter blocks the Event Loop. Node executes synchronous code first before processing any asynchronous tasks, As the while is a blocking operation, the Event Loop cannot advance to the next execution, the setTimeout is an asynchronous operation that is placed in the Event Loop's timer queue, however, as the while blocks the main execution, Node never gets to process the setTimeout until the cycle ends, as the Event Loop is trapped, it cannot handle new HTTP requests and this causes the server to block completely, affecting its responsiveness.


## Design Patterns Used

1. **Singleton Pattern**: Used in the dependency injection container and worker pool
2. **Strategy Pattern**: Used for different calculation operations
3. **Dependency Injection**: Used for managing service dependencies
4. **Worker Pool Pattern**: Used for handling CPU-intensive tasks

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- pnpm package manager

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/API_Oncredit.git
cd API_Oncredit

# Install dependencies
pnpm install
```

### Running the Application

```bash
# Start the development server
pnpm dev
```

The server will start on port 3000. You can access the API at `http://localhost:3000/api`.
