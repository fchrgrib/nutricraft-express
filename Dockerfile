FROM node:latest

WORKDIR ./app/nutricraft-express

COPY package*.json .
COPY tsconfig.json ./tsconfig.json

RUN npm install
RUN npm install prisma typescript ts-node @types/node --save-dev

COPY . .

RUN npx prisma migrate dev --name init
RUN npm install @prisma/client
RUN npm run build

CMD ["npm", "start"]
