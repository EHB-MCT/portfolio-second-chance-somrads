# Use an official Node.js runtime as the base image
FROM node:latest

# Set the working directory inside the container
WORKDIR /usr/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json .

# Install dependencies
RUN npm install --quiet

# Copy the rest of the application to the working directory
COPY ./ ./ 

# Start the server
CMD ["npm", "start"] 