# Helpdesk ticket management

## Prerequisites

List of prerequisites or requirements to run the project. Include any software, libraries, or tools needed.

- Node.js version 21.6.1
- npm
- yarn
- MySQL

## Installation

Step-by-step instructions on how to install and set up the project on a local machine.

### Backend

1. Clone the repository.
2. Navigate to the `backend` directory.
3. Create a `.env` file with the required configurations (see `.env.example`).
4. Install dependencies: `npm install`.
5. Start the server: `npm start`.

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

