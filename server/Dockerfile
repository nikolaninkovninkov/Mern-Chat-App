FROM node:14-slim
WORKDIR /
COPY package*.json ./
RUN npm i && npm i -g ts-node
COPY . ./ 
CMD ["ts-node", "./src/app.ts"]