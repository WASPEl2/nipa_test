# Helpdesk ticket management

## specification

## Prerequisites

List of prerequisites or requirements to run the project. Include any software, libraries, or tools needed.

- Node.js version 21.6.1
- npm
- yarn
- MySQL
- Docker

## Installation

Step-by-step instructions on how to install and set up the project on a local machine.

### Docker (if not using Docker you can skip)

To run the project with Docker:
1. Navigate to the `database` directory
2. Copy all script and execute in mysql server
3. Pull the latest frontend and backend Docker images:

   ```bash
   docker pull ghcr.io/waspel2/nipa_test/test-frontend:v1.0
   docker pull ghcr.io/waspel2/nipa_test/test-backend:v1.0
   docker run --rm -d -p 3000:3000 ghcr.io/waspel2/nipa_test/test-frontend:v1.0
   docker run --rm -d -p 5000:5000 -e DB_HOST=host.docker.internal -e DB_USER=test_user -e DB_PASSWORD=sam1234 -e DB_NAME=nipa_test ghcr.io/waspel2/nipa_test/test-backend:v1.0
   ```
*** youcan change `DB_HOST` `DB_USER` `DB_PASSWORD` `DB_NAME` to your env

### Backend

1. Clone the repository.
2. Navigate to the `database` directory
2. Copy all script and execute in mysql server
3. Navigate to the `backend` directory.
4. Create a `.env` file with the required configurations (see `.env.example`).
5. Install dependencies: `npm install`.
6. Start the server: `npm start`.

### Frontend

1. Navigate to the `frontend` directory.
2. Open the `frontend/src/config.js` file in your code editor.
3. Locate the `API_HOST` variable declaration.
4. Replace the `your_api_host` placeholder with the URL of your API.
5. If the API is running locally, you can leave the fallback value as `"http://localhost:5000"`.
6. Save the changes.
7. Install dependencies: `yarn install`.
8. Start the development server: `yarn dev`.

## Usage

Instructions on how to use or run the project once it's set up.

1. Access the backend API at `<your_backend_server_url>`.
2. Open the frontend application in your web browser.


