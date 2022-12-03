FROM node:16.18-alpine
COPY src /node-app
WORKDIR /node-app

ENV NODE_ENV=production

RUN npm install -g npm
RUN npm install
RUN npm cache clean --force

CMD ["npm", "start"]

EXPOSE 5000
