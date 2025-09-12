# Stage 1: Build
FROM oven/bun:latest as builder
WORKDIR /app
COPY . .
RUN bun install
RUN bun run build

# Stage 2: Run
FROM oven/bun:latest
WORKDIR /app
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json
RUN bun install --production
EXPOSE 3000
CMD ["bun", "run", "start"]
