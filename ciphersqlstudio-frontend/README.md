# CipherSQLStudio

CipherSQLStudio is a browser-based SQL practice platform where users can solve
SQL assignments in an isolated PostgreSQL sandbox.

## Features
- Assignment-based SQL practice
- Browser SQL editor (Monaco)
- SELECT-only query execution
- PostgreSQL schema-based sandboxing
- Real-time query results
- Conceptual hints (no solutions)

## Tech Stack
- Frontend: React + SCSS
- Backend: Node.js + Express
- Database: PostgreSQL (sandbox), MongoDB (assignments)

## How Sandbox Works
Each assignment runs inside its own PostgreSQL schema.  
Before executing a query, the backend sets:




This allows clean SQL while preventing cross-assignment access.

## Running Locally

### Backend
```bash
cd ciphersqlstudio-backend
npm install
npm run dev


### frontend
cd ciphersqlstudio-frontend
npm install
npm run dev
