
export interface Tool {
  id: string;
  name: string;
  category: 'SEO' | 'Network' | 'DNS' | 'Domain' | 'Links' | 'Text' | 'Code' | 'Encoder' | 'Color' | 'Binary' | 'Other';
  description: string;
  isAi?: boolean;
}

export const tools: Tool[] = [
  // FEATURED / SEO
  { id: 'seo-audit', name: 'SEO Audit Tool', category: 'SEO', description: 'Complete website SEO analysis with 18+ automated checks', isAi: true },
  { id: 'robots-gen', name: 'Robots.txt Generator', category: 'SEO', description: 'AI-powered robots.txt file generator with live preview', isAi: true },
  { id: 'http-status', name: 'HTTP Status Checker', category: 'Network', description: 'Check 200, 301, 404, 500 status codes instantly' },
  { id: 'meta-gen', name: 'Meta Tag Generator', category: 'SEO', description: 'Generate SEO-friendly title tags and meta descriptions', isAi: true },
  { id: 'keyword-density', name: 'Keyword Density Checker', category: 'SEO', description: 'Analyze keyword frequency and density in content' },
  { id: 'da-checker', name: 'Domain Authority Checker', category: 'Domain', description: 'Check domain authority and spam score instantly' },
  
  // TEXT
  { id: 'word-counter', name: 'Word Counter', category: 'Text', description: 'Count words and characters' },
  { id: 'case-converter', name: 'Case Converter', category: 'Text', description: 'Convert text case (upper, lower, sentence)' },
  { id: 'text-cleaner', name: 'Text Cleaner', category: 'Text', description: 'Remove extra spaces or formatting' },
  { id: 'lorem-ipsum', name: 'Lorem Ipsum Generator', category: 'Text', description: 'Generate placeholder text' },
  
  // CODE
  { id: 'json-beautifier', name: 'JSON Beautifier', category: 'Code', description: 'Format and validate JSON' },
  { id: 'html-formatter', name: 'HTML Beautifier', category: 'Code', description: 'Format or minify HTML code' },
  { id: 'css-formatter', name: 'CSS Beautifier', category: 'Code', description: 'Format or minify CSS code' },
  
  // ENCODER
  { id: 'base64-encode', name: 'Base64 Encoder/Decoder', category: 'Encoder', description: 'Encode/decode Base64' },
  { id: 'url-encode', name: 'URL Encoder/Decoder', category: 'Encoder', description: 'Encode/decode URLs' },
  { id: 'jwt-decoder', name: 'JWT Decoder', category: 'Encoder', description: 'Decode JWT tokens without secret' },
  
  // COLOR
  { id: 'hex-rgb', name: 'HEX to RGB Converter', category: 'Color', description: 'Convert HEX to RGB' },
  { id: 'rgb-hex', name: 'RGB to HEX Converter', category: 'Color', description: 'Convert RGB to HEX' },
  { id: 'palette-gen', name: 'Color Palette Generator', category: 'Color', description: 'Generate matching palettes', isAi: true },
  
  // BINARY
  { id: 'binary-converter', name: 'Binary Converter', category: 'Binary', description: 'Convert binary numbers' },
  { id: 'binary-decimal', name: 'Binary to Decimal', category: 'Binary', description: 'Convert binary to decimal' },
  
  // NEW FROM USER LIST
  { id: 'schema-gen', name: 'Schema Markup Generator', category: 'SEO', description: 'Create JSON-LD structured data', isAi: true },
  { id: 'faq-schema', name: 'FAQ Schema Generator', category: 'SEO', description: 'Generate FAQ schema markup', isAi: true },
  { id: 'keyword-density', name: 'Keyword Density Checker', category: 'SEO', description: 'Analyze keyword frequency' },
  { id: 'heading-analyzer', name: 'Heading Tag Analyzer', category: 'SEO', description: 'Check H1-H6 structure' },
  { id: 'sitemap-gen', name: 'Sitemap Generator', category: 'SEO', description: 'Create XML/HTML sitemaps', isAi: true },
  { id: 'redirect-checker', name: 'Redirect Checker', category: 'Network', description: 'Trace redirect chains and loops' },
  { id: 'broken-links', name: 'Broken Links Checker', category: 'Links', description: 'Find dead links on your site', isAi: true },
  { id: 'dns-lookup', name: 'DNS Records Checker', category: 'DNS', description: 'Check A, AAAA, MX, TXT records' },
  { id: 'ip-location', name: 'IP Location Finder', category: 'Domain', description: 'Find physical location of any IP' },
  { id: 'word-counter', name: 'Word Counter', category: 'Text', description: 'Count words and characters' },
  { id: 'case-converter', name: 'Case Converter', category: 'Text', description: 'Change text casing styles' },
  { id: 'html-editor', name: 'HTML Editor', category: 'Code', description: 'WYSIWYG HTML editor with source mode' },
  { id: 'sql-formatter', name: 'SQL Formatter', category: 'Code', description: 'Format SQL queries' },
  { id: 'jwt-decode', name: 'JWT Decoder', category: 'Encoder', description: 'Decode JSON Web Tokens' },
  { id: 'md5-gen', name: 'MD5 Generator', category: 'Encoder', description: 'Generate MD5 hashes' },
  { id: 'favicon-gen', name: 'Favicon Converter', category: 'Other', description: 'Convert images to favicons' },
  { id: 'alt-gen', name: 'Alt Text Generator', category: 'SEO', description: 'Generate image alt text', isAi: true },
  { id: 'meta-description-gen', name: 'Meta Description Generator', category: 'SEO', description: 'Generate high-CTR meta descriptions', isAi: true },
  { id: 'ping-tool', name: 'Ping Multiple URLs', category: 'Network', description: 'Ping multiple targets simultaneously' },
  { id: 'port-scanner', name: 'Server Port Scanner', category: 'Network', description: 'Scan common server ports' },
  { id: 'traceroute', name: 'Traceroute Tool', category: 'Network', description: 'Trace network path' },
  { id: 'dns-propagation', name: 'DNS Propagation Checker', category: 'DNS', description: 'Check DNS records globally', isAi: true },
  { id: 'domain-age', name: 'Domain Age Checker', category: 'Domain', description: 'Check how old a domain is' },
  { id: 'whois-checker', name: 'WHOIS Checker', category: 'Domain', description: 'Lookup domain registration info' },
  { id: 'link-extractor', name: 'Link Extractor', category: 'Links', description: 'Extract all links from a page' },
  { id: 'backlink-maker', name: 'Backlinks Maker', category: 'Links', description: 'Generate free backlinks summary', isAi: true },
  { id: 'text-to-slug', name: 'Text to Slug', category: 'Text', description: 'Convert text to URL-friendly slugs' },
  { id: 'diff-checker', name: 'Text Diff Checker', category: 'Text', description: 'Compare two text blocks' },
  { id: 'char-frequency', name: 'Character Frequency', category: 'Text', description: 'Count character probability' },
  { id: 'php-beautifier', name: 'PHP Beautifier', category: 'Code', description: 'Format PHP code' },
  { id: 'python-formatter', name: 'Python Formatter', category: 'Code', description: 'Format Python code' },
  { id: 'regex-tester', name: 'Regex Tester', category: 'Code', description: 'Test PCRE regular expressions' },
  { id: 'sha256-gen', name: 'SHA256 Generator', category: 'Encoder', description: 'Generate SHA256 hashes' },
  { id: 'rgb-cmyk', name: 'RGB to CMYK', category: 'Color', description: 'Convert RGB for print' },
  { id: 'binary-calculator', name: 'Binary Calculator', category: 'Binary', description: 'Add/subtract binary values' },
  { id: 'image-compress', name: 'Image Compressor', category: 'Other', description: 'Shrink image file size', isAi: true },

  // OTHER
  { id: 'qr-gen', name: 'QR Code Generator', category: 'Other', description: 'Create branded QR codes' },
  { id: 'sci-calc', name: 'Scientific Calculator', category: 'Other', description: 'Free scientific calculator' }
];

export const categories = [
  'All', 'SEO', 'Network', 'DNS', 'Domain', 'Links', 'Text', 'Code', 'Encoder', 'Color', 'Binary', 'Other'
] as const;
