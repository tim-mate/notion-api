FROM node

WORKDIR /app

COPY . .

RUN npm install

EXPOSE 5000

CMD ["node", "dist/bin/server.js"]