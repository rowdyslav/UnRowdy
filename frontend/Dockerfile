FROM node:24-alpine AS builder

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

COPY . .
RUN npm run build

EXPOSE 80

CMD ["npm", "run", "dev", "--", "--port", "80", "--host"]
