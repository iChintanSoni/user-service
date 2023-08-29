# Base image
FROM node:20-slim

# Create app directory
WORKDIR /usr/src/app

# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./

# Copies .cert to the Docker environment
COPY ./.cert/cert.pem ./
COPY ./.cert/key.pem ./

# Bundle app source
COPY . .

# Install app dependencies
RUN npm install --f

# Port to be exposed
EXPOSE 3000

# Creates a "dist" folder with the production build
RUN npm run build

# Start the server using the production build
CMD [ "npm", "run", "start:prod" ]