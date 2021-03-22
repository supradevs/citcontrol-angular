FROM node:lts-alpine AS build
WORKDIR /app
COPY package.json* package-lock.json* ./
RUN npm cache clean --force
RUN npm install
COPY . .
RUN npm run build
FROM nginx:latest
COPY --from=build /app/dist/citcontrol-angular /usr/share/nginx/html