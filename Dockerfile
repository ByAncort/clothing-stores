FROM node:20-alpine AS builder
WORKDIR /app

COPY package.json package-lock.json ./
COPY tsconfig.json ./
COPY vite.config.ts ./

RUN npm ci --silent

COPY . .

RUN npx react-router typegen
RUN npm run build

FROM node:20-alpine AS production
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci --silent --only=production

# Copiar todo el build, no solo partes
COPY --from=builder /app/build ./build

# Crear symlink o estructura necesaria para assets
RUN ln -sf /app/build/client/assets /app/assets || true

EXPOSE 3000
CMD ["npm", "start"]