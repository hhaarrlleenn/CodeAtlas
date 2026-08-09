# CodeAtlas

CodeAtlas is a full-stack developer tool that converts API specifications and database schemas into interactive visual diagrams.

It helps developers understand complex backend structures by automatically parsing API and SQL files and representing their relationships visually.

## Features

- Upload API specification files
- Parse OpenAPI / Swagger definitions
- Parse SQL database schemas
- Automatically generate interactive diagrams
- Visualize API endpoints and database relationships
- Interactive frontend for exploring generated diagrams

##Tech Stack

### Frontend
- React
- Vite
- JavaScript
- React Flow

### Backend
- Node.js
- Express.js
- JavaScript
- OpenAPI parsing
- SQL parsing

## Project Structure

```text
CodeAtlas/
├── backend/
│   ├── graph/
│   ├── parsers/
│   ├── routes/
│   ├── server.js
│   └── package.json
│
├── frontend/
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── vite.config.js
│
└── README.md