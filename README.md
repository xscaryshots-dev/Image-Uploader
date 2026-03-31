# GTA5M Gallery — Setup Guide

## What's in this folder

| File | What it does |
|------|-------------|
| `index.html` | The upload page your players visit |
| `server.js` | Tiny Node.js server that signs uploads securely |
| `.env.example` | Template for your Cloudinary credentials |

---

## Step 1 — Install Node.js
Download and install Node.js from https://nodejs.org (LTS version)

---

## Step 2 — Install dependencies
Open a terminal in this folder and run:
```
npm init -y
npm install express cors dotenv
```

---

## Step 3 — Add your Cloudinary credentials
1. Sign up free at https://cloudinary.com
2. Go to your Cloudinary Dashboard → Settings → API Keys
3. Copy the file `.env.example`, rename it to `.env`, and fill it in:

```
CLOUDINARY_CLOUD_NAME=your_cloud_name_here
CLOUDINARY_API_KEY=your_api_key_here
CLOUDINARY_API_SECRET=your_api_secret_here
```

⚠️  Never share your .env file or commit it to GitHub — it contains your secret key.

---

## Step 4 — Run locally (testing)
```
node server.js
```
Then open `index.html` in your browser directly (double-click it).
The SERVER_URL in index.html is already set to http://localhost:3001 for local testing.

---

## Step 5 — Host it online (so your players can use it)

### Option A: Railway (easiest, free tier)
1. Push this folder to a GitHub repo (don't include .env — add it to .gitignore)
2. Go to https://railway.app → New Project → Deploy from GitHub
3. Add your environment variables in Railway's dashboard (Settings → Variables)
4. Railway gives you a URL like `https://yourapp.up.railway.app`
5. Open index.html, find `const SERVER_URL =` and paste your Railway URL
6. Enable GitHub Pages on your repo for the HTML file

### Option B: Render (free tier)
Same process as Railway — https://render.com

### Option C: Glitch (simplest, instant)
1. Go to https://glitch.com → New Project → Import from GitHub
2. Add your secrets in the Glitch .env panel (it has a built-in secrets manager)
3. Glitch gives you an instant URL — paste it into index.html

---

## Folder structure for GitHub Pages

If you want the HTML on GitHub Pages and the server on Railway/Render,
put them in the same repo like this:

```
your-repo/
  index.html       ← hosted by GitHub Pages
  server.js        ← deployed to Railway/Render
  package.json     ← created automatically by npm init
  .env             ← NEVER commit this
  .gitignore       ← add .env to this file
```

Your `.gitignore` should contain:
```
.env
node_modules/
```
