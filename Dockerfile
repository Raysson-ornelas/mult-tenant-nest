FROM node:20-alpine

# Bibliotecas necessárias para Prisma
RUN apk add --no-cache libc6-compat gcompat bash curl

WORKDIR /usr/src/app

# Copia package.json e instala dependências
COPY package*.json ./
RUN npm ci

# Copia o código fonte e o schema
COPY . .

# Gera Prisma Client no output customizado
RUN npx prisma generate --schema=prisma/schema.prisma --force

EXPOSE 3000
CMD ["npm", "run", "start:dev"]
