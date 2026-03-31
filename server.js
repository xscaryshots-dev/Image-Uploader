// =============================================================
//  server.js — Cloudinary Signing Server
//  This tiny server signs upload requests so your API secret
//  is NEVER exposed in the browser. Run with: node server.js
//
//  FREE HOSTING OPTIONS FOR YOUR MATE:
//    • Railway  → railway.app  (just connect GitHub repo, done)
//    • Render   → render.com   (free tier, auto-deploys)
//    • Glitch   → glitch.com   (paste code, instant URL)
//
//  INSTALL DEPENDENCIES FIRST (run once in the folder):
//    npm init -y
//    npm install express cors crypto-js dotenv
//
//  Then create a file called .env in the same folder and
//  add your Cloudinary credentials there (see below).
// =============================================================

require('dotenv').config(); // loads your .env file
const express = require('express');
const cors    = require('cors');
const crypto  = require('crypto');

const app = express();
app.use(cors());        // allows the HTML page to call this server
app.use(express.json());

// ─────────────────────────────────────────────────────────────
//  YOUR CLOUDINARY CREDENTIALS
//  Do NOT paste these here directly — put them in a .env file:
//
//  Create a file called ".env" in the same folder and write:
//
//    CLOUDINARY_API_KEY=your_api_key_here
//    CLOUDINARY_API_SECRET=your_api_secret_here
//    CLOUDINARY_CLOUD_NAME=your_cloud_name_here
//
//  Find these on your Cloudinary dashboard → Settings → API Keys
// ─────────────────────────────────────────────────────────────
const API_KEY    = process.env.CLOUDINARY_API_KEY;
const API_SECRET = process.env.CLOUDINARY_API_SECRET;
const CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME;


// ─────────────────────────────────────────────────────────────
//  SIGNING ENDPOINT
//  The front-end calls /sign-upload to get a secure signature.
//  Cloudinary then verifies the signature before accepting
//  the upload — your API secret is never sent to the browser.
// ─────────────────────────────────────────────────────────────
app.post('/sign-upload', (req, res) => {
  const timestamp = Math.round(Date.now() / 1000); // unix timestamp

  // Build the string to sign — must match exactly what you send to Cloudinary
  const stringToSign = `timestamp=${timestamp}${API_SECRET}`;

  // SHA-1 hash it (Cloudinary's required algorithm)
  const signature = crypto
    .createHash('sha1')
    .update(stringToSign)
    .digest('hex');

  // Send back everything the front-end needs to build the upload request
  res.json({
    signature,
    timestamp,
    api_key:    API_KEY,
    cloud_name: CLOUD_NAME,
  });
});


// ─────────────────────────────────────────────────────────────
//  START THE SERVER
//  Runs on port 3001 locally. On Railway/Render it will
//  automatically use their PORT environment variable instead.
// ─────────────────────────────────────────────────────────────
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`✓ Signing server running at http://localhost:${PORT}`);
  console.log(`  Cloud: ${CLOUD_NAME || '⚠ CLOUD_NAME not set in .env'}`);
});
