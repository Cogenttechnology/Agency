import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("pages/Home/Home.tsx"),
  route("about", "pages/About/About.tsx"),
  route("services", "pages/Services/Services.tsx"),
  route("services/performance-marketing", "pages/Services/PerformanceMarketing.tsx"),
  route("services/video-production", "pages/Services/VideoProduction.tsx"),
  route("services/seo", "pages/Services/SEO.tsx"),
  route("services/social-media-marketing", "pages/Services/SocialMediaMarketing.tsx"),
  route("services/influencer-marketing", "pages/Services/InfluencerMarketing.tsx"),
  route("services/web-development", "pages/Services/WebDevelopment.tsx"),
  route("services/360-digital-marketing", "pages/Services/Digital360.tsx"),
  route("portfolio", "pages/Portfolio/Portfolio.tsx"),
  route("studio", "pages/Studio/Studio.tsx"),
  route("contact", "pages/Contact/Contact.tsx"),
  route("thank-you", "pages/ThankYou/ThankYou.tsx"),
  route("blog", "pages/Blog/Blog.tsx"),
  route("blog/:slug", "pages/Blog/BlogPost.tsx"),
  route("admin", "pages/Admin/Admin.tsx"),
  route("api/blogs", "pages/api/blogs.ts"),
  route("api/seo", "pages/api/seo.ts"),
] as RouteConfig;
