# Pastes Lite

A web for text sharing via link.

## Description
Welcome to Pastes Lite, where you can create and store text with a shareable link, featuring expiration dates and view limits for secure access anywhere on the internet.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

web site will available at [http://localhost:3000](http://localhost:3000) 

## Persistence Layer
In Pastes Lite, I have achieved data persistence using Redis to store and remove data according to TTL (Time to Live) and time limits.


## apis
 
 / - Load html page and option to fill pastes text and submit
 /p/<id> - load Html and show the Past
 /api/healthz/ - use for check server works proprly
 /api/pastes/   - post method to create pastes
 /api/pastes/<id>   - get method to retrieve pastes