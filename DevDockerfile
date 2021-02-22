FROM node:lts-alpine 

# Install global npm packages
RUN npm install -g @angular/cli

# Set working directory
WORKDIR /app

# Copy and install local npm packages
COPY package.json* package-lock.json* ./

RUN npm install

# Copy the remaining source code
COPY . .