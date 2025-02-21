FROM node:20.12.0-alpine3.19

WORKDIR /app

COPY package* tsconfig.json turbo.json ./

COPY packages ./packages
COPY apps ./apps

RUN npm install
RUN npm run db:generate

RUN npm run build

CMD ["npm", "run", "start-userapp"]

