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
  
  // Response Time (Max 30 points)
  if (data.responseTime < 300) score += 30;
  else if (data.responseTime < 800) score += 20;
  else if (data.responseTime < 1500) score += 10;

  // SSL (20 points)
  if (data.ssl) score += 20;

  // Status (20 points)
  if (data.status === 200) score += 20;

  // SEO (Max 15 points)
  if (data.seo.title !== "N/A") score += 5;
  if (data.seo.description !== "N/A") score += 5;
  if (data.seo.robotsTxt) score += 5;

  // Security Headers (Max 15 points)
  const headers = data.headers;
  if (headers['content-security-policy']) score += 5;
  if (headers['strict-transport-security']) score += 5;
  if (headers['x-frame-options']) score += 5;

  return score;
}
