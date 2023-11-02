FROM node:latest

WORKDIR ./app/nutricraft-express

COPY package*.json .
COPY tsconfig.json ./tsconfig.json

RUN npm install
RUN npm uninstall bcrypt
RUN npm install @types/bcrypt
RUN npm install @types/cookie-parser
RUN npm install prisma typescript ts-node @types/node --save-dev

COPY . .

RUN npm install @prisma/client
RUN npm run build

CMD ["npm", "start"]
