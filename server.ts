import express from "express";
import { createServer as createViteServer } from "vite";
import axios from "axios";
import path from "path";
import https from "https";

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Endpoint for Website Analysis
  app.post("/api/analyze", async (req: any, res: any) => {
    const { url } = req.body;
    console.log(`[SERVER] Received analysis request for: ${url}`);
    
    if (!url) {
      return res.status(400).json({ error: "URL is required" });
    }

    try {
      const startTime = Date.now();
      const formattedUrl = url.startsWith("http") ? url : `https://${url}`;
      
      const response = await axios.get(formattedUrl, {
        timeout: 10000,
        validateStatus: () => true, // Analyze all statuses
        headers: {
          'User-Agent': 'Mozilla/5.0 (IbrahimAnalytical/1.0; WebsiteHealthChecker)',
        },
        maxRedirects: 5,
      });

      const endTime = Date.now();
      const responseTime = endTime - startTime;

      // Basic SEO extraction (via regex for speed and simplicity in this context)
      const html = response.data;
      const titleMatch = html.match(/<title>(.*?)<\/title>/i);
      const descMatch = html.match(/<meta name="description" content="(.*?)"/i);
      const robotMatch = html.match(/<meta name="robots" content="(.*?)"/i);
      
      // Check for robots.txt and sitemap
      let robotsTxt = false;
      let sitemapXml = false;
      try {
        const domain = new URL(formattedUrl).origin;
        const robotsRes = await axios.head(`${domain}/robots.txt`).catch(() => null);
        const sitemapRes = await axios.head(`${domain}/sitemap.xml`).catch(() => null);
        robotsTxt = !!(robotsRes && robotsRes.status === 200);
        sitemapXml = !!(sitemapRes && sitemapRes.status === 200);
      } catch (e) {
        // Ignore errors for individual file checks
      }

      res.json({
        status: response.status,
        responseTime,
        headers: response.headers,
        seo: {
          title: titleMatch ? titleMatch[1] : "N/A",
          description: descMatch ? descMatch[1] : "N/A",
          robots: robotMatch ? robotMatch[1] : "N/A",
          robotsTxt,
          sitemapXml,
        },
        url: formattedUrl,
        ssl: formattedUrl.startsWith("https"),
        server: response.headers['server'] || "Unknown",
        lastChecked: new Date().toISOString(),
      });
    } catch (error: any) {
      console.error("Analysis error:", error.message);
      res.status(500).json({ 
        error: "Failed to analyze website", 
        details: error.message,
        fallback: true 
      });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
