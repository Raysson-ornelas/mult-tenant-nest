FROM node:20-alpine

RUN apk add --no-cache libc6-compat gcompat bash curl

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm ci

COPY . .

RUN npx prisma generate --schema=prisma/schema.prisma --force

EXPOSE 3000
CMD ["npm", "run", "start:dev"]
