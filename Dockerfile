FROM node:22-alpine
WORKDIR /app

RUN apk add --no-cache openssl libc6-compat curl

COPY package.json package-lock.json* ./
RUN npm ci --include=dev

COPY . .

RUN npx prisma generate

RUN npm run build

EXPOSE 3333
CMD ["npm", "run", "start"]