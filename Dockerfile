FROM node:14.18.1-alpine

WORKDIR /home/node/

COPY package.json .
COPY package-lock.json .
RUN npm install
COPY . .
RUN npm run build; exit 0

CMD ["npm", "run", "start:prod"]

EXPOSE 80
