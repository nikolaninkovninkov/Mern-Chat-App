FROM node:14-slim
WORKDIR /
COPY package*.json ./
RUN npm i && npm i -g typescript && tsc
COPY . ./ 
CMD ["node", "./build/app.js"]