# Build stage
FROM node:20-alpine AS build

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .
RUN npm run build

# Production stage
FROM node:20-alpine

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci --omit=dev

# Copy built frontend
COPY --from=build /app/dist ./dist

# Copy backend
COPY server.js ./
COPY api ./api

EXPOSE 5175

ENV NODE_ENV=production
ENV PORT=5175

CMD ["node", "server.js"]
