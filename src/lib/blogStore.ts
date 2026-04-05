/* ─────────────────────────────────────────────────────────
   Blog Store — localStorage-based persistence
   ───────────────────────────────────────────────────────── */

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  excerpt: string;
  content: string; // HTML string
  category: string;
  tags: string[];
  coverGradient: string; // CSS gradient used as cover placeholder
  coverImage: string | null;  // Supabase Storage public URL
  author: string;
  authorRole: string;
  status: 'draft' | 'published';
  internalLinks: { text: string; url: string }[];
  createdAt: string;
  updatedAt: string;
  publishedAt: string | null;
  readTime: number; // minutes
}

const KEY = 'cogent_blogs';

const SEED_POSTS: BlogPost[] = [
  {
    id: 'blog_seed_001',
    slug: '10-seo-mistakes-killing-google-rankings-2025',
    title: '10 SEO Mistakes That Are Killing Your Google Rankings in 2025',
    metaTitle: '10 SEO Mistakes Killing Your Google Rankings in 2025 | Cogent Agency',
    metaDescription: 'Discover the 10 most damaging SEO mistakes businesses make in 2025 — from ignoring Core Web Vitals to thin content — and learn how to fix them fast.',
    excerpt: 'Most businesses unknowingly sabotage their own search rankings. From ignoring Core Web Vitals to building toxic backlinks, these ten mistakes are costing you visibility, traffic, and revenue — here\'s how to fix every one of them.',
    content: `<h2>Why Most SEO Efforts Fall Short</h2>
<p>Search engine optimisation has never been more competitive — or more misunderstood. With Google rolling out multiple algorithm updates per year and AI-driven results reshaping the SERP landscape, outdated tactics don't just fail to work; they actively harm your rankings. In our experience working with brands across Mumbai and beyond, the same critical mistakes appear again and again. Here are the ten most damaging ones and exactly how to fix them.</p>

<h2>1. Ignoring Core Web Vitals</h2>
<p>Since Google's Page Experience update, Core Web Vitals — Largest Contentful Paint (LCP), Interaction to Next Paint (INP), and Cumulative Layout Shift (CLS) — are direct ranking signals. A site that loads in 4 seconds loses rankings to a competitor loading in 1.8 seconds, even if your content is superior.</p>
<p><strong>The fix:</strong> Run your site through Google PageSpeed Insights and address the flagged issues. Compress images to WebP, defer non-critical JavaScript, and use a CDN. Aim for LCP under 2.5 seconds and CLS below 0.1.</p>

<h2>2. Publishing Thin, Low-Value Content</h2>
<p>The era of 300-word keyword-stuffed articles is over. Google's Helpful Content system specifically targets pages that exist to rank rather than to genuinely help users. Thin content signals low expertise and poor user experience.</p>
<p><strong>The fix:</strong> Audit your existing content using Google Search Console. Consolidate or expand pages with low impressions and high bounce rates. Each piece should comprehensively answer the searcher's query and demonstrate genuine topical authority.</p>

<h2>3. Neglecting Technical SEO Fundamentals</h2>
<p>Broken internal links, missing canonical tags, duplicate meta descriptions, and crawl errors silently drain your ranking potential. If Googlebot can't efficiently crawl and index your pages, even your best content won't rank.</p>
<ul>
  <li>Conduct a full technical audit using Screaming Frog or Ahrefs Site Audit monthly</li>
  <li>Fix all 4xx errors and redirect chains</li>
  <li>Ensure every important page is in your XML sitemap and is crawlable</li>
  <li>Use structured data markup (JSON-LD) for articles, products, and FAQs</li>
</ul>

<h2>4. Targeting the Wrong Keywords</h2>
<p>Ranking for high-volume head terms is vanity. Most conversions happen through long-tail keywords that signal clear purchase intent. A bakery ranking for "cakes" gets browsers; ranking for "custom wedding cakes Mumbai under 5000" gets buyers.</p>
<p><strong>The fix:</strong> Build a keyword map that aligns search terms to buyer journey stages. Use tools like Semrush or Ahrefs to identify keywords where you can realistically compete — and where the intent matches your offering. Our <a href="/services/seo">SEO service</a> includes full keyword architecture planning.</p>

<h2>5. Building Low-Quality Backlinks</h2>
<p>Paid link schemes, private blog networks, and mass directory submissions still cause manual penalties. Google's Spam Brain system is better than ever at detecting unnatural link profiles. A handful of strong, relevant editorial links beats hundreds of spammy ones.</p>
<p><strong>The fix:</strong> Audit your backlink profile with Google Search Console's Links report. Disavow toxic links. Focus link-building efforts on digital PR, guest contributions to industry publications, and creating genuinely linkable assets.</p>

<h2>6. Skipping Local SEO Optimisation</h2>
<p>If your business serves a geographic area, neglecting Google Business Profile is leaving significant traffic on the table. Local pack results appear above organic listings for most local queries and receive 44% of total clicks.</p>
<ul>
  <li>Verify and fully complete your Google Business Profile</li>
  <li>Maintain consistent NAP (Name, Address, Phone) across all directories</li>
  <li>Respond to every review — positive and negative</li>
  <li>Post weekly updates to signal an active, relevant business</li>
</ul>

<h2>7. Ignoring Mobile Usability</h2>
<p>Google uses mobile-first indexing — meaning it crawls and indexes the mobile version of your site first. A desktop-optimised site with a poor mobile experience will see rankings suffer across all devices.</p>
<p><strong>The fix:</strong> Test every key page with Google's Mobile-Friendly Test. Ensure tap targets are at least 48px, text is legible without zooming, and no content is hidden behind horizontal scroll. Our <a href="/services/web-development">web development team</a> builds mobile-first from day one.</p>

<h2>8. Forgetting About E-E-A-T</h2>
<p>Experience, Expertise, Authoritativeness, and Trustworthiness (E-E-A-T) aren't direct ranking factors, but they influence how Google's quality raters evaluate your content — and those evaluations shape algorithm training. YMYL (Your Money or Your Life) sectors are especially affected.</p>
<p><strong>The fix:</strong> Add proper author bios with credentials, cite reputable sources, earn mentions from authoritative sites in your industry, and ensure your About page and contact information are prominent and credible.</p>

<h2>9. Not Tracking the Right Metrics</h2>
<p>Obsessing over keyword position while ignoring organic traffic, click-through rates, and conversions leads to misallocated effort. Position 1 for a keyword nobody searches is worthless; position 4 for a high-intent query may drive more revenue.</p>
<p><strong>The fix:</strong> Build a proper SEO dashboard in Google Looker Studio that connects Search Console, GA4, and your CRM. Track organic sessions, goal completions from organic, average CTR, and indexed page count — not just keyword rankings.</p>

<h2>10. Treating SEO as a One-Time Project</h2>
<p>SEO is not a campaign — it's an ongoing programme. Competitors are publishing content, earning links, and improving their technical foundations every single day. A site that was well-optimised two years ago will naturally lose ground without continuous investment.</p>
<p>The most successful brands treat SEO as a permanent channel with dedicated monthly budget for content creation, technical maintenance, and link acquisition. If you're ready to build a sustainable organic growth engine, <a href="/services/seo">our SEO team</a> is here to help.</p>

<h3>Final Thoughts</h3>
<p>Fixing these ten mistakes won't produce overnight results — organic SEO typically takes 3–6 months to show meaningful movement. But the compounding returns are unmatched. Paid ads stop the moment you cut the budget; a well-built organic presence keeps driving traffic and revenue for years. Start with a thorough audit, prioritise the highest-impact fixes, and stay consistent.</p>`,
    category: 'SEO',
    tags: ['SEO', 'Google Rankings', 'Core Web Vitals', 'Technical SEO', 'Content Strategy'],
    coverGradient: 'linear-gradient(135deg, #0a0a1a 0%, #0d1f3c 40%, #00d4aa22 100%)',
    coverImage: null,
    author: 'Rohan Mehta',
    authorRole: 'SEO Strategist',
    status: 'published',
    internalLinks: [
      { text: 'Our SEO Services', url: '/services/seo' },
      { text: 'Web Development', url: '/services/web-development' },
      { text: 'Performance Marketing', url: '/services/performance-marketing' },
    ],
    createdAt: '2025-01-10T09:00:00.000Z',
    updatedAt: '2025-01-12T11:30:00.000Z',
    publishedAt: '2025-01-12T12:00:00.000Z',
    readTime: 7,
  },
  {
    id: 'blog_seed_002',
    slug: 'how-to-get-8x-roas-meta-ads-proven-framework',
    title: 'How to Get 8× ROAS on Meta Ads: Our Proven Framework',
    metaTitle: 'How to Get 8× ROAS on Meta Ads: Cogent Agency\'s Proven Framework',
    metaDescription: 'Learn the exact Meta Ads framework Cogent Agency uses to deliver 8× ROAS for e-commerce clients — from campaign structure to creative strategy and audience targeting.',
    excerpt: 'Getting 8× return on ad spend on Meta isn\'t magic — it\'s methodology. This is the exact campaign architecture, creative strategy, and optimisation framework we\'ve used to scale e-commerce brands from ₹50K/month ad spend to over ₹5L/month while maintaining elite ROAS.',
    content: `<h2>The 8× ROAS Problem (and Why Most Brands Never Get There)</h2>
<p>The average ROAS on Meta Ads across e-commerce is around 2.5–3×. Many brands celebrate hitting 4×. So when we tell clients we consistently deliver 7–10× ROAS, they're sceptical — until they see the numbers in their own Ads Manager. The gap isn't luck or budget. It's architecture, creative, and a relentless testing culture. Here's the exact framework.</p>

<h2>Phase 1: Account Architecture That Scales</h2>
<p>The single biggest mistake brands make is running everything in one ad set with broad audiences and letting Meta "figure it out." That approach worked in 2019. Today, you need intentional structure.</p>
<p>We use a three-campaign stack:</p>
<ul>
  <li><strong>Prospecting Campaign (60% of budget):</strong> Broad audiences (interests + lookalikes) using Advantage+ targeting. 3–5 ad sets testing different audience segments. Objective: Purchases with 7-day click / 1-day view attribution.</li>
  <li><strong>Retargeting Campaign (25% of budget):</strong> Segmented by funnel stage — website visitors (90 days), add-to-cart abandoners (14 days), video viewers (75%+). Objective: Purchases.</li>
  <li><strong>Loyalty / Retention Campaign (15% of budget):</strong> Existing customer lists. Objective: repeat purchases, upsells, cross-sells.</li>
</ul>

<h2>Phase 2: The Creative Engine</h2>
<p>Creative is the number one variable in Meta ad performance — it accounts for roughly 70% of campaign outcomes. Our creative framework runs on a 4-format rotation:</p>
<ul>
  <li><strong>UGC-style videos (hero format):</strong> 15–30 second authentic testimonial or demo videos. Hook in first 3 frames. These consistently outperform polished brand films by 2–3× on CPM and CVR.</li>
  <li><strong>Static carousels:</strong> Product-benefit-focused. Each card addresses one objection or highlight. Best for retargeting.</li>
  <li><strong>Reels-native short video:</strong> Platform-native content that doesn't look like an ad. 6–15 seconds. High reach efficiency.</li>
  <li><strong>Dynamic Product Ads (DPA):</strong> Automated retargeting using your product catalogue. Essential for e-commerce with 50+ SKUs.</li>
</ul>
<p>We test a minimum of 6 creatives per ad set at launch. Kill anything that doesn't reach 3× ROAS within the first ₹3,000–5,000 of spend. Scale the winners fast.</p>

<h2>Phase 3: Audience Strategy</h2>
<p>With iOS 14+ privacy changes, cookie-based audiences are less reliable than they were. Our audience strategy adapts:</p>
<ul>
  <li><strong>First-party data first:</strong> Upload your customer email list as a Custom Audience. Use it as the seed for 1–2% Lookalike Audiences — these consistently outperform interest-based targeting by 40–60%.</li>
  <li><strong>Engagement audiences:</strong> Instagram and Facebook page engagers (90 days), video viewers, lead form submitters. These are warm and cheap to retarget.</li>
  <li><strong>Broad + Advantage+:</strong> Don't fear broad audiences. Meta's algorithm is powerful enough to find buyers without heavy interest layering. Give it room to work with a wide net and compelling creative.</li>
</ul>

<h2>Phase 4: The Offer Stack</h2>
<p>Even perfect targeting and creative can't overcome a weak offer. High-ROAS campaigns are built on irresistible offers. Our offer testing matrix:</p>
<ul>
  <li>Percentage discount vs. fixed amount (test both — results vary by category)</li>
  <li>Free shipping threshold vs. flat free shipping</li>
  <li>Bundle offers (2+1, buy more save more)</li>
  <li>Scarcity and urgency signals (limited time, limited stock — must be authentic)</li>
  <li>Risk reversal (30-day guarantee, easy returns)</li>
</ul>
<p>We run offer tests in isolation — one variable at a time — so we know exactly what's driving improvement. Learn more about our systematic approach on our <a href="/services/performance-marketing">Performance Marketing service page</a>.</p>

<h2>Phase 5: Optimisation Cadence</h2>
<p>Discipline in optimisation is what separates brands that hit 8× ROAS from those that plateau at 3×. Our weekly cadence:</p>
<ul>
  <li><strong>Daily:</strong> Check delivery, budget pacing, and flag any CPMs spiking above threshold. No structural changes — only pause catastrophically underperforming ads.</li>
  <li><strong>Wednesday:</strong> Review creative performance. Kill creatives below 2× ROAS with sufficient spend (₹3K+). Promote winners to broader ad sets.</li>
  <li><strong>Friday:</strong> Review audience performance. Adjust bidding. Refresh retargeting audiences. Plan next week's creative tests.</li>
  <li><strong>Monthly:</strong> Full funnel audit. Review attribution, LTV trends, and budget allocation. Recalibrate target ROAS based on current margins.</li>
</ul>

<h2>The Attribution Challenge</h2>
<p>One reason brands think their ROAS is lower than it is: they're measuring it wrong. Meta's native attribution is imperfect post-iOS 14. We use a blended attribution model — comparing Meta-reported data against GA4, Shopify, and Facebook Conversions API (CAPI) data. CAPI alone typically recovers 15–30% of conversions that Meta's pixel misses.</p>
<p>Set up Conversions API through your e-commerce platform (native integrations exist for Shopify, WooCommerce, and most major platforms). This is non-negotiable for accurate measurement.</p>

<h2>Real Results: Case Study</h2>
<p>One of our D2C fashion clients came to us spending ₹80,000/month on Meta with a 2.8× reported ROAS. Within 90 days, using this exact framework, we scaled them to ₹3,20,000/month at 7.4× ROAS. The key changes: restructured campaign architecture, refreshed creative every two weeks, implemented CAPI, and introduced a free-shipping-at-₹999 offer that increased average order value by 22%.</p>

<h3>Ready to Scale Your Meta Ads?</h3>
<p>This framework requires consistent execution, strong creative production, and deep understanding of attribution. If you'd like our team to implement it for your brand, <a href="/services/performance-marketing">explore our Performance Marketing service</a> or <a href="/contact">get in touch directly</a>.</p>`,
    category: 'Performance Marketing',
    tags: ['Meta Ads', 'ROAS', 'Facebook Ads', 'E-commerce Marketing', 'Paid Social'],
    coverGradient: 'linear-gradient(135deg, #0a0a1a 0%, #1a0a2e 40%, #a855f722 100%)',
    coverImage: null,
    author: 'Priya Sharma',
    authorRole: 'Head of Performance Marketing',
    status: 'published',
    internalLinks: [
      { text: 'Performance Marketing Services', url: '/services/performance-marketing' },
      { text: 'Social Media Marketing', url: '/services/social-media-marketing' },
      { text: 'Contact Us', url: '/contact' },
    ],
    createdAt: '2025-01-20T09:00:00.000Z',
    updatedAt: '2025-01-22T14:00:00.000Z',
    publishedAt: '2025-01-22T15:00:00.000Z',
    readTime: 8,
  },
  {
    id: 'blog_seed_003',
    slug: 'why-brand-identity-is-your-most-valuable-marketing-asset',
    title: 'Why Your Brand Identity Is Your Most Valuable Marketing Asset',
    metaTitle: 'Why Brand Identity Is Your Most Valuable Marketing Asset | Cogent Agency',
    metaDescription: 'A strong brand identity reduces CAC, commands price premiums, and builds lasting loyalty. Learn how to build and leverage brand identity as a strategic business asset.',
    excerpt: 'Businesses obsess over performance channels while neglecting the single asset that makes every channel more effective: brand identity. A strong brand doesn\'t just look good — it reduces your cost per acquisition, commands premium pricing, and creates a loyal customer base that no competitor can easily steal.',
    content: `<h2>The Most Undervalued Asset in Your Marketing Stack</h2>
<p>When a startup or growing business thinks about marketing investment, they naturally gravitate toward the measurable — Google Ads, Meta campaigns, SEO rankings. These are quantifiable, attributable, and satisfying to report on. Brand identity, by contrast, feels soft, expensive, and hard to justify in a quarterly review. This is a costly misconception, and it's one of the primary reasons that businesses with large ad budgets still struggle to build lasting market position.</p>
<p>Your brand identity — the visual language, tone of voice, positioning, and personality of your business — is the multiplier that makes every other marketing investment more effective. Here's why, and how to build it into a genuine competitive moat.</p>

<h2>What Brand Identity Actually Is (and Isn't)</h2>
<p>Brand identity is not your logo. It's not your colour palette. These are visual expressions of something deeper — your brand's positioning, personality, values, and promise. A strong brand identity encompasses:</p>
<ul>
  <li><strong>Strategic positioning:</strong> Who you serve, what problem you solve, and why you're the best choice — in one clear, differentiating statement</li>
  <li><strong>Brand personality:</strong> If your brand were a person, how would they speak, dress, and behave? Consistent personality builds recognition and affinity</li>
  <li><strong>Visual identity system:</strong> Logo, typography, colour palette, photography style, and design principles that create immediate visual recognition</li>
  <li><strong>Tone of voice:</strong> The language patterns, vocabulary, and communication style used consistently across every touchpoint</li>
  <li><strong>Brand story:</strong> The founding narrative, mission, and values that give your brand meaning beyond the transaction</li>
</ul>

<h2>How Strong Brand Identity Reduces Customer Acquisition Cost</h2>
<p>Here's the direct business case. When your brand identity is weak or inconsistent, every new customer acquisition starts from scratch — you're fighting purely on price, feature comparison, or ad spend. When your brand is strong, you benefit from several efficiency multipliers:</p>
<ul>
  <li><strong>Word-of-mouth becomes more frequent:</strong> People don't refer "a company that does X" — they refer brands they believe in. Strong identity creates believers, not just buyers.</li>
  <li><strong>Organic reach improves:</strong> A distinct visual and tonal identity makes your social media content more shareable and memorable, reducing reliance on paid amplification.</li>
  <li><strong>Conversion rates increase:</strong> Users who recognise and trust a brand convert at 2–4× the rate of cold traffic. Every ad becomes more efficient.</li>
  <li><strong>Retention improves:</strong> Brand loyalty reduces churn. Acquiring a new customer costs 5–7× more than retaining one — brand is the primary driver of retention beyond product quality.</li>
</ul>

<h2>The Price Premium Effect</h2>
<p>Commodity businesses compete on price. Branded businesses compete on value. Apple charges a 30–40% premium over comparable specifications because of brand. Starbucks charges ₹400 for coffee that objectively costs ₹20 to produce. In the Indian D2C market, brands like Mamaearth and boAt command significant premiums over unbranded alternatives purely through brand equity.</p>
<p>This isn't irrational consumer behaviour — it's the rational calculation that known, trusted brands reduce purchase risk. The consumer pays more because the brand reduces their uncertainty. Building this trust is the highest-leverage thing a business can do for long-term profitability.</p>

<h2>Building Brand Identity That Compounds</h2>
<p>Strong brand identity is built through consistency and deliberate differentiation, not by following trends. The framework we use with clients at Cogent involves four stages:</p>
<h3>Stage 1: Positioning Clarity</h3>
<p>Before any visual work, we define the strategic foundation. Who is the primary customer? What is the one thing this brand does better than anyone else? What's the brand's reason for existing beyond profit? This positioning statement becomes the filter for every subsequent decision.</p>
<h3>Stage 2: Personality and Voice</h3>
<p>We define 3–5 brand personality traits (e.g., bold, approachable, expert, irreverent) and develop a tone of voice guide that translates these into concrete language rules. Does the brand use humour? How formal is the vocabulary? Does it challenge conventions or reassure?</p>
<h3>Stage 3: Visual Identity System</h3>
<p>With positioning and personality defined, visual identity design has clear direction. We develop a system — not just individual elements — ensuring the logo, typography, colours, and photography style work together coherently across all contexts: website, social media, packaging, print, video.</p>
<h3>Stage 4: Rollout and Governance</h3>
<p>A brand guide is only as valuable as its implementation. We create practical brand guidelines, templates, and governance processes so that in-house teams and external partners can maintain consistency as the business scales.</p>

<h2>The Consistency Imperative</h2>
<p>Research by Lucidpress found that consistent brand presentation increases revenue by 10–20%. The mechanism is simple: consistency builds recognition; recognition builds familiarity; familiarity builds trust. Every time a brand is inconsistent — different logo versions, inconsistent tone, mismatched visuals — it erodes the accumulated equity of every previous impression.</p>
<p>The brands that dominate their categories don't necessarily have the biggest budgets. They have the most consistent brand execution over the longest period of time. This is entirely replicable for businesses of any size.</p>

<h2>When to Invest in Brand Identity</h2>
<p>The best time to build your brand identity is before you scale marketing spend. The second best time is now. We frequently see businesses spending ₹5L/month on performance marketing with inconsistent branding, and cutting that budget in half — with better results — after a brand identity project, simply because every ad becomes more effective and memorable.</p>
<p>If you're launching a new product line, entering a new market, or finding that your current brand no longer reflects where your business has grown, it's time for a brand review. Our <a href="/services">strategy team</a> works with businesses at every stage to build brand identity that drives real commercial outcomes. <a href="/contact">Get in touch</a> to discuss what's possible for your brand.</p>

<h3>The Bottom Line</h3>
<p>Performance marketing drives short-term revenue. Brand identity drives long-term enterprise value. The businesses that win over a decade are those that invest consistently in both — using performance channels to acquire customers, and brand to retain and compound that customer base into a durable competitive advantage. Don't treat your brand as a cost. Treat it as the asset it is.</p>`,
    category: 'Brand Strategy',
    tags: ['Brand Identity', 'Brand Strategy', 'Marketing Strategy', 'Brand Equity', 'Positioning'],
    coverGradient: 'linear-gradient(135deg, #0a0a1a 0%, #1a1000 40%, #f59e0b22 100%)',
    coverImage: null,
    author: 'Ananya Kapoor',
    authorRole: 'Brand Strategist',
    status: 'published',
    internalLinks: [
      { text: 'Our Services', url: '/services' },
      { text: 'Performance Marketing', url: '/services/performance-marketing' },
      { text: 'Contact Us', url: '/contact' },
    ],
    createdAt: '2025-02-01T09:00:00.000Z',
    updatedAt: '2025-02-03T10:00:00.000Z',
    publishedAt: '2025-02-03T11:00:00.000Z',
    readTime: 6,
  },
];

function initStore(): void {
  if (typeof window === 'undefined') return;
  try {
    const existing = window.localStorage.getItem(KEY);
    if (!existing || JSON.parse(existing).length === 0) {
      window.localStorage.setItem(KEY, JSON.stringify(SEED_POSTS));
    }
  } catch {
    window.localStorage.setItem(KEY, JSON.stringify(SEED_POSTS));
  }
}

// Initialise on module load
initStore();

export function getBlogs(): BlogPost[] {
  if (typeof window === 'undefined') return SEED_POSTS;
  try {
    return JSON.parse(window.localStorage.getItem(KEY) || JSON.stringify(SEED_POSTS));
  } catch {
    return SEED_POSTS;
  }
}

export function getPublishedBlogs(): BlogPost[] {
  return getBlogs()
    .filter(p => p.status === 'published' && p.publishedAt !== null)
    .sort((a, b) => new Date(b.publishedAt!).getTime() - new Date(a.publishedAt!).getTime());
}

export function getBlogBySlug(slug: string): BlogPost | null {
  return getBlogs().find(p => p.slug === slug) ?? null;
}

export function saveBlog(data: Omit<BlogPost, 'id' | 'createdAt' | 'updatedAt'>): BlogPost {
  const now = new Date().toISOString();
  const post: BlogPost = {
    ...data,
    id: `blog_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
    createdAt: now,
    updatedAt: now,
  };
  const all = getBlogs();
  all.unshift(post);
  if (typeof window !== 'undefined') {
    window.localStorage.setItem(KEY, JSON.stringify(all));
  }
  return post;
}

export function updateBlog(id: string, data: Partial<BlogPost>): BlogPost | null {
  const all = getBlogs();
  const idx = all.findIndex(p => p.id === id);
  if (idx === -1) return null;
  const updated: BlogPost = { ...all[idx], ...data, updatedAt: new Date().toISOString() };
  all[idx] = updated;
  if (typeof window !== 'undefined') {
    window.localStorage.setItem(KEY, JSON.stringify(all));
  }
  return updated;
}

export function deleteBlog(id: string): void {
  const all = getBlogs().filter(p => p.id !== id);
  if (typeof window !== 'undefined') {
    window.localStorage.setItem(KEY, JSON.stringify(all));
  }
}

export function publishBlog(id: string): BlogPost | null {
  return updateBlog(id, {
    status: 'published',
    publishedAt: new Date().toISOString(),
  });
}

export function unpublishBlog(id: string): BlogPost | null {
  return updateBlog(id, {
    status: 'draft',
    publishedAt: null,
  });
}
