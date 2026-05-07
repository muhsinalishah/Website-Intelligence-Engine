export interface AnalysisResult {
  status: number;
  responseTime: number;
  headers: Record<string, string>;
  seo: {
    title: string;
    description: string;
    robots: string;
    robotsTxt: boolean;
    sitemapXml: boolean;
  };
  url: string;
  ssl: boolean;
  server: string;
  lastChecked: string;
  healthScore?: number;
  aiInsights?: string;
}

export interface HistoryItem {
  id: string;
  url: string;
  timestamp: string;
  status: number;
  healthScore: number;
}
