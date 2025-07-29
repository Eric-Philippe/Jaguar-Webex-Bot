# Use the latest Node.js image as the base image
FROM node:latest

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json (if applicable) to install dependencies
COPY package*.json ./

# Install project dependencies
RUN npm install

# Copy the rest of the application files
COPY . .

# Build the application
RUN npm run build

# Download and install ngrok
RUN wget https://bin.equinox.io/c/bNyj1mQVY4c/ngrok-v3-stable-linux-amd64.tgz && \
    tar -xvzf ngrok-v3-stable-linux-amd64.tgz && \
    mv ngrok /usr/local/bin/ngrok

# Command to configure ngrok and start the application when the container starts
CMD ["sh", "-c", "ngrok config add-authtoken $(grep NGROK_AUTHTOKEN .env | cut -d '=' -f2) && ngrok http --domain=$(grep NGROK_DOMAIN .env | cut -d '=' -f2) 3000 & npm start"]
