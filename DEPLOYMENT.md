# Deployment Guide (Frontend + Backend)

This project is a full-stack Express app with EJS views.
That means frontend pages and backend routes are deployed together as one service.

## Option 1: Render (Recommended)

1. Push your code to GitHub.
2. In Render, create a new **Web Service** from this repository.
3. Use these settings:
   - Build Command: `npm install`
   - Start Command: `npm start`
   - Environment: `Node`
4. Add environment variables in Render:
   - `NODE_ENV=production`
   - `ATLASDB_URL=<your mongodb atlas url>`
   - `SECRET=<strong random secret>`
   - `CLOUD_NAME=<cloudinary name>`
   - `CLOUD_API_KEY=<cloudinary key>`
   - `CLOUD_API_SECRET=<cloudinary secret>`
   - `MAP_TOKEN=<mapbox token>`
5. Deploy.
6. Open `https://<your-render-service>.onrender.com/health` to confirm backend is up.
7. Open `https://<your-render-service>.onrender.com/` to confirm frontend pages load.

## Option 2: Vercel (Serverless)

1. Import repository in Vercel.
2. Keep framework as **Other**.
3. Ensure [vercel.json](vercel.json) is present (already configured).
4. Add these Vercel environment variables:
   - `NODE_ENV=production`
   - `VERCEL=1`
   - `ATLASDB_URL`
   - `SECRET`
   - `CLOUD_NAME`
   - `CLOUD_API_KEY`
   - `CLOUD_API_SECRET`
   - `MAP_TOKEN`
5. Deploy.
6. Verify:
   - `https://<your-vercel-domain>/health`
   - `https://<your-vercel-domain>/`

## Common Deployment Failures

1. Missing `ATLASDB_URL`: app fails while connecting MongoDB.
2. Missing Cloudinary or Mapbox vars: listing upload/map features fail.
3. Cookie/session issues after login: fixed in code by enabling proxy trust in production.
4. Wrong static paths: fixed in layout for favicon and rating CSS.

## Quick Checklist

- `npm start` works locally.
- All required env vars are set in the hosting dashboard.
- Database is reachable from hosted service.
- `/health` returns `{ "ok": true }`.
- Home page loads and login works.
