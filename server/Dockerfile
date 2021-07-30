FROM node:14-slim
WORKDIR /
COPY package*.json ./
RUN npm i --only=production
COPY . ./ 
CMD ["node", "./build/app.js"]