FROM node:lts-alpine AS build
WORKDIR /app
COPY package.json* package-lock.json* ./
RUN npm cache clean --force
RUN npm install && npm cache clean --force
COPY . .
RUN npm run build --output-hashing=all
FROM nginx:latest
COPY --from=build /app/dist/citcontrol-angular /usr/share/nginx/html