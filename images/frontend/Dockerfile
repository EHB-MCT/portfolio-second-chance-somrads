FROM node:latest

RUN mkdir -p /usr/src/app

COPY package*.json ./

WORKDIR /usr/src

RUN npm install

COPY ./ ./

RUN npm run build

EXPOSE 5000

VOLUME /usr/src

CMD ["npm", "run" , "dev"]