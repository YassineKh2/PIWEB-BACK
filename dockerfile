FROM node:16-alpine
WORKDIR /app
COPY . /app
RUN addgroup app && adduser -S -G app app

USER app

WORKDIR /app

COPY --chown=node:node package*.json ./

RUN npm install

COPY --chown=node:node . .
RUN npm run build-dev
EXPOSE 5000
CMD ["npm", "start"]

