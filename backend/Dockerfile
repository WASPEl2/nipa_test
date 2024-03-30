# Use the official Node.js 16 image as a parent image
FROM node:lts AS builder

RUN groupadd -r  app && useradd -r -g app app-user

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json (if available) to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install --production

# Bundle your app's source code inside the Docker image
COPY . .

# Rebuild native dependencies specifically for the container environment
RUN npm rebuild bcrypt --build-from-source

# Start a new, final stage to keep the image small
FROM node:lts

WORKDIR /app

# Copy the built node modules and compiled code from the builder stage
COPY --from=builder /app .

# Your app binds to port 3000 so you'll use the EXPOSE instruction to have it mapped by the docker daemon
EXPOSE 5000

# Define the command to run your app using CMD which defines your runtime
CMD [ "node", "index.js" ]