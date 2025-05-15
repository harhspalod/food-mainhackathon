const express = require("express");
const fetch = require("node-fetch");
const cors = require("cors");
const https = require("https");

const app = express();
app.use(cors());

const httpsAgent = new https.Agent({ rejectUnauthorized: false });

app.get("/api/product/:barcode", async (req, res) => {
  const barcode = req.params.barcode;
  const url = `https://world.openfoodfacts.org/api/v2/product/${barcode}`; // ✅ use `.org` domain

  try {
    const response = await fetch(url, {
      agent: httpsAgent,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
        'Accept': 'application/json',
        'Accept-Language': 'en-US,en;q=0.9',
        'Referer': 'https://world.openfoodfacts.org/',
        'Origin': 'https://world.openfoodfacts.org'
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP status ${response.status}`);
    }

    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error("❌ Proxy error:", error.message);
    res.status(500).json({ error: "Failed to fetch product" });
  }
});

app.listen(5000, () => {
  console.log("🚀 Proxy server running at http://localhost:5000");
});
