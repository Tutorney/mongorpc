FROM node:10-alpine

WORKDIR /mongorpc
COPY ./package.json ./package-lock.json ./
RUN npm ci
COPY ./server.js ./mongoRpc.js ./
CMD ["npm", "start"]
