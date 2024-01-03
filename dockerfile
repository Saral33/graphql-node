FROM node

WORKDIR /usr/src/app

COPY . .

RUN npm i nodemon -g

RUN   npm install

EXPOSE 5000

CMD ["npm","run","dev"]