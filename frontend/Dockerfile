FROM node:20

WORKDIR /app

RUN rm -rf node_modules package-lock.json

COPY package.json ./

RUN npm install

COPY . .

EXPOSE 5173

CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]
