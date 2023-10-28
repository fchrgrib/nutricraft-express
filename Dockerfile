FROM node:latest

WORKDIR ./app/nutricraft-express

COPY package*.json .
COPY tsconfig.json ./tsconfig.json

RUN npm install

COPY . .

RUN npm run build

CMD ["npm", "start"]
