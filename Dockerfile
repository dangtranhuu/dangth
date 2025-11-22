# Stage 1: Build
FROM node:20-alpine AS builder
WORKDIR /app

# Tối ưu cache: chỉ copy file khai báo trước
COPY package*.json ./
# Nếu có lockfile thì nên dùng npm ci
RUN npm ci --legacy-peer-deps || npm install --legacy-peer-deps

# Copy source và build
COPY . .
ENV NODE_ENV=production
RUN npm run build

# Stage 2: Runtime (giữ cùng version với builder để tránh lệch ABI)
FROM node:20-alpine
WORKDIR /app

# Chỉ copy những gì cần cho runtime
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
# (tùy dự án) config build-time nếu app cần ở runtime
# COPY --from=builder /app/tailwind.config.ts ./tailwind.config.ts
# COPY --from=builder /app/postcss.config.mjs ./postcss.config.mjs

ENV NODE_ENV=production
ENV PORT=1210
EXPOSE 1210

# Đảm bảo Next.js nghe đúng PORT=1210
CMD ["npm", "run", "start", "--", "-p", "1210"]