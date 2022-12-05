FROM node:18

COPY ./* /app/
WORKDIR /app

RUN npm install

ENTRYPOINT ["npm", "run"]
CMD ["prod"]