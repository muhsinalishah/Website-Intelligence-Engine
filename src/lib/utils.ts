import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatTime(ms: number) {
  if (ms < 1000) return `${ms}ms`;
  return `${(ms / 1000).toFixed(2)}s`;
}

export function getHealthScore(data: any) {
  let score = 0;
  
  // Latency (High Impact - Max 35 points)
  if (data.responseTime < 150) score += 35;
  else if (data.responseTime < 300) score += 30;
  else if (data.responseTime < 600) score += 20;
  else if (data.responseTime < 1200) score += 10;
  else if (data.responseTime < 3000) score += 5;

  // SSL/Encryption (Critical - 20 points)
  if (data.ssl) score += 20;

  // Stability (Core - 15 points)
  if (data.status === 200) score += 15;
  else if (data.status >= 300 && data.status < 400) score += 10;

  // Search Optimization (SEO - Max 15 points)
  if (data.seo.title && data.seo.title !== "N/A" && data.seo.title.length > 10) score += 5;
  if (data.seo.description && data.seo.description !== "N/A" && data.seo.description.length > 50) score += 5;
  if (data.seo.robotsTxt || data.seo.sitemapXml) score += 5;

  // Professional Security Headers (Strategic - Max 15 points)
  const headers = data.headers;
  if (headers['content-security-policy']) score += 4;
  if (headers['strict-transport-security']) score += 4;
  if (headers['x-frame-options']) score += 4;
  if (headers['x-content-type-options']) score += 3;

  return Math.min(100, score);
}
