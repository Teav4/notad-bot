FROM node:12

WORKDIR /app

COPY package.json /app
RUN npm install
RUN npm install typescript -g
COPY . /app
RUN tsc

CMD [ "node", "build/server.js" ]
