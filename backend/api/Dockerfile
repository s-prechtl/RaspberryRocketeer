FROM node:18

COPY . /app
WORKDIR /app

RUN npm install

EXPOSE 3000

ENTRYPOINT ["npm", "run"]
CMD ["prod"]