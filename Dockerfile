FROM node:16.18-alpine
ENV NODE_ENV=production

WORKDIR /app
RUN npm install -g npm

COPY src/package* ./
RUN npm install --omit=dev && npm cache clean --force  

COPY src .

EXPOSE 5000
CMD ["npm", "start"]
