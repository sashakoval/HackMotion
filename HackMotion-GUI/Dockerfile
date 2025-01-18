FROM node:16 AS build

WORKDIR /app

RUN npm install -g @angular/cli@15

COPY package*.json ./

RUN npm install

COPY . .

RUN ng build

FROM nginx:alpine

COPY --from=build /app/dist/hack-motion-gui /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]