FROM node:18

COPY . /app
WORKDIR /app

RUN npm install

EXPOSE 8080

ENTRYPOINT ["npm", "run", "serve"]

