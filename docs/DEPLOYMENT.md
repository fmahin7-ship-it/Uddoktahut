# Deployment Guide

**📚 Documentation Navigation:**
[🏠 README](../README.md) | [🏗️ Architecture](./ARCHITECTURE.md) | [🔌 API Guide](./API.md) | [📋 Testing Guide](./TESTING.md) | **🚀 Deployment Guide**

---

## 🚀 Deployment Overview

This guide covers deploying UddoktaHut Frontend to various platforms with optimal configuration for production environments.

## 📋 Table of Contents

- [Prerequisites](#prerequisites)
- [Production Build](#production-build)
- [Environment Configuration](#environment-configuration)
- [Deployment Platforms](#deployment-platforms)
  - [Vercel (Recommended)](#vercel-recommended)
  - [Netlify](#netlify)
  - [Docker Deployment](#docker-deployment)
  - [Traditional Hosting](#traditional-hosting)
- [Performance Optimization](#performance-optimization)
- [Monitoring & Analytics](#monitoring--analytics)
- [Troubleshooting](#troubleshooting)

## ✅ Prerequisites

### System Requirements

- Node.js 18+ for build process
- npm or yarn package manager
- Git for version control
- SSL certificate for HTTPS (production)

### Backend Requirements

- UddoktaHut Backend API deployed and accessible
- Database connection established
- Authentication service configured
- CORS configured for frontend domain

## 🏗️ Production Build

### Build Process

```bash
# Install dependencies
npm install

# Run production build
npm run build

# Test production build locally
npm start
```

### Build Optimization

The production build includes:

- **Automatic Code Splitting** - Route-based and dynamic imports
- **Bundle Optimization** - Tree shaking and minification
- **Image Optimization** - Next.js automatic image processing
- **Static Generation** - Pre-rendered pages where possible
- **Lazy Loading** - Dynamic component loading for better performance

### Build Analysis

```bash
# Analyze bundle size
npm run analyze

# Check for build issues
npm run build -- --debug
```

## ⚙️ Environment Configuration

### Production Environment Variables

Create `.env.production` or configure platform environment variables:

```env
# Production API Configuration
NEXT_PUBLIC_API_URL=https://your-backend-domain.com
NEXT_PUBLIC_APP_URL=https://your-frontend-domain.com

# Authentication
NEXT_PUBLIC_JWT_SECRET=your-production-jwt-secret

# App Metadata
NEXT_PUBLIC_APP_NAME=UddoktaHut
NEXT_PUBLIC_APP_DESCRIPTION=Modern E-commerce Platform
NEXT_PUBLIC_APP_VERSION=1.0.0

# Analytics & Monitoring
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
NEXT_PUBLIC_SENTRY_DSN=your-sentry-dsn

# Feature Flags
NEXT_PUBLIC_ENABLE_ANALYTICS=true
NEXT_PUBLIC_ENABLE_ERROR_REPORTING=true

# Build Configuration
NODE_ENV=production
```

### Security Configuration

```env
# HTTPS Enforcement
NEXT_PUBLIC_FORCE_HTTPS=true

# Content Security Policy
NEXT_PUBLIC_CSP_ENABLED=true

# API Rate Limiting
NEXT_PUBLIC_API_RATE_LIMIT=100

# Session Security
NEXT_PUBLIC_SECURE_COOKIES=true
```

## 🌐 Deployment Platforms

### Vercel (Recommended)

Vercel provides the best Next.js deployment experience with zero configuration.

#### Automatic Deployment

1. **Connect Repository**

   ```bash
   # Push to GitHub/GitLab
   git push origin main
   ```

2. **Import Project to Vercel**

   - Visit [vercel.com/new](https://vercel.com/new)
   - Import your GitHub repository
   - Configure environment variables
   - Deploy automatically

3. **Configuration (vercel.json)**
   ```json
   {
     "framework": "nextjs",
     "buildCommand": "npm run build",
     "devCommand": "npm run dev",
     "installCommand": "npm install",
     "functions": {
       "app/**/*.js": {
         "maxDuration": 30
       }
     },
     "regions": ["iad1", "sfo1"],
     "headers": [
       {
         "source": "/(.*)",
         "headers": [
           {
             "key": "X-Content-Type-Options",
             "value": "nosniff"
           },
           {
             "key": "X-Frame-Options",
             "value": "DENY"
           },
           {
             "key": "X-XSS-Protection",
             "value": "1; mode=block"
           }
         ]
       }
     ]
   }
   ```

#### Manual Deployment

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy to Vercel
vercel

# Deploy to production
vercel --prod
```

### Netlify

Netlify offers excellent static site hosting with edge functions support.

#### Configuration (netlify.toml)

```toml
[build]
  publish = ".next"
  command = "npm run build"

[build.environment]
  NODE_VERSION = "18"
  NPM_VERSION = "8"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "DENY"
    X-XSS-Protection = "1; mode=block"
    X-Content-Type-Options = "nosniff"

[functions]
  directory = "netlify/functions"
```

#### Deployment Steps

1. **Build Settings**

   - Build command: `npm run build`
   - Publish directory: `.next`
   - Node version: 18

2. **Environment Variables**

   - Configure in Netlify dashboard
   - Add all production environment variables

3. **Deploy**

   ```bash
   # Install Netlify CLI
   npm install -g netlify-cli

   # Deploy
   netlify deploy

   # Deploy to production
   netlify deploy --prod
   ```

### Docker Deployment

Containerized deployment for consistent environments across platforms.

#### Dockerfile

```dockerfile
# Use official Node.js runtime as base image
FROM node:18-alpine AS base

# Install dependencies only when needed
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Copy package files
COPY package.json package-lock.json* ./
RUN npm ci --only=production

# Build the application
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Build Next.js application
RUN npm run build

# Production image
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Create non-root user
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy built application
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

CMD ["node", "server.js"]
```

#### Docker Compose

```yaml
version: "3.8"

services:
  uddoktahut-frontend:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - NEXT_PUBLIC_API_URL=https://your-backend-domain.com
      - NEXT_PUBLIC_APP_URL=https://your-domain.com
    restart: unless-stopped
    networks:
      - uddoktahut-network

networks:
  uddoktahut-network:
    external: true
```

#### Deploy with Docker

```bash
# Build image
docker build -t uddoktahut-frontend .

# Run container
docker run -p 3000:3000 \
  -e NEXT_PUBLIC_API_URL=https://your-backend-domain.com \
  -e NEXT_PUBLIC_APP_URL=https://your-domain.com \
  uddoktahut-frontend

# Using Docker Compose
docker-compose up -d
```

### Traditional Hosting

Deploy to VPS, shared hosting, or cloud servers.

#### PM2 Configuration

```javascript
// ecosystem.config.js
module.exports = {
  apps: [
    {
      name: "uddoktahut-frontend",
      script: "npm",
      args: "start",
      instances: "max",
      exec_mode: "cluster",
      env: {
        NODE_ENV: "production",
        PORT: 3000,
        NEXT_PUBLIC_API_URL: "https://your-backend-domain.com",
      },
      error_file: "./logs/err.log",
      out_file: "./logs/out.log",
      log_file: "./logs/combined.log",
      time: true,
    },
  ],
};
```

#### Nginx Configuration

```nginx
server {
    listen 80;
    server_name your-domain.com;
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name your-domain.com;

    ssl_certificate /path/to/certificate.crt;
    ssl_certificate_key /path/to/private.key;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }

    # Static assets caching
    location /_next/static/ {
        alias /app/.next/static/;
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

#### Deployment Script

```bash
#!/bin/bash
# deploy.sh

echo "🚀 Starting deployment..."

# Pull latest changes
git pull origin main

# Install dependencies
npm ci --only=production

# Build application
npm run build

# Restart PM2
pm2 restart ecosystem.config.js

# Reload Nginx
sudo systemctl reload nginx

echo "✅ Deployment completed!"
```

## ⚡ Performance Optimization

### CDN Configuration

```javascript
// next.config.mjs
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["your-cdn-domain.com"],
    loader: "custom",
    loaderFile: "./lib/imageLoader.js",
  },
  assetPrefix:
    process.env.NODE_ENV === "production" ? "https://your-cdn-domain.com" : "",
  compress: true,
  poweredByHeader: false,
};

export default nextConfig;
```

### Caching Strategy

```javascript
// Cache configuration
const cacheConfig = {
  "Cache-Control": "public, max-age=31536000, immutable", // Static assets
  "Cache-Control": "public, max-age=86400", // API responses
  "Cache-Control": "no-cache, no-store, must-revalidate", // Dynamic pages
};
```

### Bundle Analysis

```bash
# Analyze bundle size after deployment
npx @next/bundle-analyzer

# Check for unused dependencies
npx depcheck

# Performance audit
npx lighthouse https://your-domain.com --output=json
```

## 📊 Monitoring & Analytics

### Error Tracking

```javascript
// lib/sentry.js
import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  environment: process.env.NODE_ENV,
  tracesSampleRate: 1.0,
});
```

### Performance Monitoring

```javascript
// lib/analytics.js
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

export { Analytics, SpeedInsights };
```

### Health Check Endpoint

```javascript
// pages/api/health.js
export default function handler(req, res) {
  res.status(200).json({
    status: "healthy",
    timestamp: new Date().toISOString(),
    version: process.env.NEXT_PUBLIC_APP_VERSION,
  });
}
```

## 🐛 Troubleshooting

### Common Issues

#### Build Failures

```bash
# Clear Next.js cache
rm -rf .next
npm run build

# Check for memory issues
node --max-old-space-size=4096 node_modules/.bin/next build

# Debug build process
DEBUG=* npm run build
```

#### Environment Variable Issues

```bash
# Verify environment variables
npm run env:check

# Test environment configuration
node -e "console.log(process.env.NEXT_PUBLIC_API_URL)"
```

#### Performance Issues

```bash
# Bundle size analysis
npm run analyze

# Memory usage monitoring
node --inspect npm start

# Profile application
npm run build && npm run start -- --profile
```

### Deployment Checklist

- [ ] Environment variables configured
- [ ] SSL certificate installed
- [ ] Domain DNS configured
- [ ] Backend API accessible
- [ ] CORS configuration updated
- [ ] Error tracking configured
- [ ] Analytics implemented
- [ ] Performance monitoring active
- [ ] Backup strategy in place
- [ ] CI/CD pipeline configured

### Support Resources

- **Vercel Documentation**: [vercel.com/docs](https://vercel.com/docs)
- **Next.js Deployment Guide**: [nextjs.org/docs/deployment](https://nextjs.org/docs/deployment)
- **Docker Documentation**: [docs.docker.com](https://docs.docker.com)
- **PM2 Documentation**: [pm2.keymetrics.io](https://pm2.keymetrics.io)

---

**Need help with deployment? Contact f.mahin7@gmail.com or create an issue on GitHub.**
