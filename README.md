# Pastes Lite

A web for text sharing via link.

## Description

Welcome to Pastes Lite, where you can create and store text with a shareable link, featuring expiration dates and view limits for secure access anywhere on the internet.

## Getting Started

First, change the `env-example` file to `.env` and provide the variables.

Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

The website will be available at [http://localhost:3000](http://localhost:3000)

## Persistence Layer

In Pastes Lite, I have achieved data persistence using Redis to store and remove data according to TTL (Time to Live) and time limits.

## APIs

| Endpoint           | Description                                                     |
| ------------------ | --------------------------------------------------------------- |
| `/`                | Load HTML page with an option to fill in paste text and submit. |
| `/p/<id>`          | Load HTML and display the specific paste.                       |
| `/api/healthz/`    | Used to check if the server is working properly.                |
| `/api/pastes/`     | POST method to create a new paste.                              |
| `/api/pastes/<id>` | GET method to retrieve a specific paste.                        |
