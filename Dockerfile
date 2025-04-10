FROM node:20.19.0-alpine3.20 AS builder

WORKDIR /app

COPY package*.json .

RUN npm ci

COPY . .

RUN npx prisma generate

RUN npm run build

FROM node:20.19.0-alpine3.20 AS runner

WORKDIR /app

COPY --from=builder /app/package*.json .

COPY --from=builder /app/dist ./dist

COPY --from=builder /app/prisma ./prisma

RUN npm ci --omit=dev

CMD ["sh", "-c", "npm run migrate:deploy && npm run start:prod"]