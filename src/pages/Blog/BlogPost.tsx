import { useRef, useState, useEffect } from 'react';
import { Link, useLoaderData } from 'react-router';
import { ArrowLeft, Clock, User, Calendar, List, ExternalLink } from 'lucide-react';
import { gsap, ScrollTrigger } from '../../lib/gsap';
import { getPublishedBlogs, getBlogBySlug, type BlogPost } from '../../lib/blogStore.server';
import type { Route } from "./+types/BlogPost";
import './BlogPost.css';

export async function loader({ params }: Route.LoaderArgs) {
  const post = await getBlogBySlug(params.slug || '');
  const related = post
    ? (await getPublishedBlogs())
        .filter((p) => p.id !== post.id)
        .slice(0, 3)
    : [];
  return { post, related };
}

export const meta: Route.MetaFunction = ({ data }: { data: Awaited<ReturnType<typeof loader>> }) => {
  const post = data?.post;
  if (!post) return [{ title: "Blog Not Found | Cogent Agency" }];

  return [
    { title: `${post.metaTitle || post.title} | Cogent Agency` },
    { name: "description", content: post.metaDescription },
    { property: "og:title", content: post.metaTitle || post.title },
    { property: "og:description", content: post.metaDescription },
    { property: "og:image", content: "https://cogent.agency/og-blog.jpg" },
  ];
};

const CATEGORY_COLORS: Record<string, string> = {
  'SEO':                    '#00d4aa',
  'Performance Marketing':  '#a855f7',
  'Brand Strategy':         '#f59e0b',
  'Web Design':             '#6c63ff',
  'Social Media':           '#ec4899',
  'Influencer Marketing':   '#ff6b6b',
  'Studio':                 '#ff6b6b',
};

function formatDate(iso: string | null): string {
  if (!iso) return '';
  return new Date(iso).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

interface TocItem {
  id: string;
  text: string;
  level: 'h2' | 'h3';
}

function parseToc(html: string): TocItem[] {
  const matches = [...html.matchAll(/<(h2|h3)[^>]*>(.*?)<\/\1>/gi)];
  return matches.map((m, i) => {
    const raw = m[2].replace(/<[^>]+>/g, '');
    const id = `heading-${i}-${raw.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')}`;
    return { id, text: raw, level: m[1].toLowerCase() as 'h2' | 'h3' };
  });
}

function injectHeadingIds(html: string, toc: TocItem[]): string {
  let result = html;
  let idx = 0;
  result = result.replace(/<(h2|h3)([^>]*)>/gi, (_match, tag, attrs) => {
    const item = toc[idx];
    idx++;
    return `<${tag}${attrs} id="${item?.id || `heading-${idx}`}">`;
  });
  return result;
}

function TableOfContents({ toc, activeId }: { toc: TocItem[]; activeId: string }) {
  if (toc.length === 0) return null;
  return (
    <nav className="blog-toc">
      <div className="blog-toc__header">
        <List size={15} />
        <span>Table of Contents</span>
      </div>
      <ul className="blog-toc__list">
        {toc.map(item => (
          <li key={item.id} className={`blog-toc__item blog-toc__item--${item.level}`}>
            <a
              href={`#${item.id}`}
              className={`blog-toc__link ${activeId === item.id ? 'active' : ''}`}
            >
              {item.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

function RelatedPosts({ posts }: { posts: BlogPost[] }) {
  if (posts.length === 0) return null;
  return (
    <div className="blog-related">
      <h4 className="blog-related__title">Related Articles</h4>
      <ul className="blog-related__list">
        {posts.map(post => (
          <li key={post.id}>
            <Link to={`/blog/${post.slug}`} className="blog-related__item">
              <span
                className="blog-related__dot"
                style={{ background: CATEGORY_COLORS[post.category] || '#6c63ff' }}
              />
              <span className="blog-related__text">{post.title}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

function InternalLinksPanel({ links }: { links: BlogPost['internalLinks'] }) {
  if (!links || links.length === 0) return null;
  return (
    <div className="blog-internal-links">
      <h4 className="blog-internal-links__title">
        <ExternalLink size={14} /> Explore More
      </h4>
      <ul className="blog-internal-links__list">
        {links.map(link => (
          <li key={link.url}>
            <Link to={link.url} className="blog-internal-links__link">
              <ArrowLeft size={12} style={{ transform: 'rotate(180deg)' }} />
              {link.text}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function BlogPostPage() {
  const { post, related } = useLoaderData<typeof loader>();
  const pageRef = useRef<HTMLDivElement>(null);
  const [toc, setToc] = useState<TocItem[]>([]);
  const [processedContent, setProcessedContent] = useState('');
  const [activeHeading, setActiveHeading] = useState('');

  useEffect(() => {
    if (!post) return;
    const parsedToc = parseToc(post.content);
    setToc(parsedToc);
    setProcessedContent(injectHeadingIds(post.content, parsedToc));
  }, [post]);

  // GSAP animations
  useEffect(() => {
    if (!post) return;
    let ctx: ReturnType<typeof gsap.context>;

    const rafId = requestAnimationFrame(() => {
      ctx = gsap.context(() => {
        gsap.fromTo(
          '.blog-post__back',
          { opacity: 0, x: -20 },
          { opacity: 1, x: 0, duration: 0.5, ease: 'power3.out', delay: 0.1 }
        );
        gsap.fromTo(
          '.blog-post__hero-tag',
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out', delay: 0.2 }
        );
        gsap.fromTo(
          '.blog-post__title',
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', delay: 0.35 }
        );
        gsap.fromTo(
          '.blog-post__excerpt',
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out', delay: 0.5 }
        );
        gsap.fromTo(
          '.blog-post__meta-row',
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out', delay: 0.6 }
        );
        gsap.fromTo(
          '.blog-post__cover',
          { opacity: 0, scale: 0.98 },
          { opacity: 1, scale: 1, duration: 0.9, ease: 'power3.out', delay: 0.7 }
        );
        gsap.fromTo(
          '.blog-content',
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: '.blog-content',
              start: 'top 85%',
            },
          }
        );
        gsap.fromTo(
          '.blog-post__sidebar',
          { opacity: 0, x: 20 },
          {
            opacity: 1,
            x: 0,
            duration: 0.7,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: '.blog-post__sidebar',
              start: 'top 80%',
            },
          }
        );
      }, pageRef);

      ScrollTrigger.refresh();
    });

    return () => {
      cancelAnimationFrame(rafId);
      ctx?.revert();
    };
  }, [post]);

  // Intersection observer for TOC active state
  useEffect(() => {
    if (toc.length === 0) return;
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setActiveHeading(entry.target.id);
          }
        });
      },
      { rootMargin: '-10% 0px -60% 0px', threshold: 0 }
    );

    toc.forEach(item => {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [toc, processedContent]);

  // 404 state
  if (!post) {
    return (
      <div className="blog-post-notfound">
        <div className="container blog-post-notfound__inner">
          <h1>404</h1>
          <p>This article doesn't exist or has been removed.</p>
          <Link to="/blog" className="btn btn-outline">
            <ArrowLeft size={16} />
            Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  const catColor = CATEGORY_COLORS[post.category] || '#6c63ff';

  return (
    <div ref={pageRef} className="blog-post-page">
      <div className="container blog-post__container">
        {/* Back link */}
        <Link to="/blog" className="blog-post__back">
          <ArrowLeft size={16} />
          Back to Blog
        </Link>

        {/* Hero */}
        <header className="blog-post__hero">
          <span
            className="blog-post__hero-tag blog-category-badge"
            style={{ '--cat-color': catColor } as React.CSSProperties}
          >
            {post.category}
          </span>
          <h1 className="blog-post__title">{post.title}</h1>
          <p className="blog-post__excerpt">{post.excerpt}</p>
          <div className="blog-post__meta-row">
            <span className="blog-post__meta-item">
              <User size={14} />
              <strong>{post.author}</strong>
              <span className="blog-post__meta-role">· {post.authorRole}</span>
            </span>
            <span className="blog-post__meta-divider" />
            <span className="blog-post__meta-item">
              <Calendar size={14} />
              {formatDate(post.publishedAt)}
            </span>
            <span className="blog-post__meta-divider" />
            <span className="blog-post__meta-item">
              <Clock size={14} />
              {post.readTime} min read
            </span>
          </div>
        </header>

        {/* Cover */}
        <div
          className="blog-post__cover"
          style={{ background: post.coverGradient }}
          aria-hidden="true"
        />

        {/* Content + Sidebar layout */}
        <div className="blog-post__body">
          {/* Main content */}
          <div
            className="blog-content"
            dangerouslySetInnerHTML={{ __html: processedContent }}
          />

          {/* Sidebar */}
          <aside className="blog-post__sidebar">
            <TableOfContents toc={toc} activeId={activeHeading} />
            <RelatedPosts posts={related} />
            <InternalLinksPanel links={post.internalLinks} />
          </aside>
        </div>

        {/* Tags */}
        {post.tags.length > 0 && (
          <div className="blog-post__tags">
            {post.tags.map(tag => (
              <span key={tag} className="blog-post__tag">#{tag}</span>
            ))}
          </div>
        )}

        {/* Bottom nav */}
        <div className="blog-post__bottom">
          <Link to="/blog" className="btn btn-outline blog-post__back-btn">
            <ArrowLeft size={16} />
            All Articles
          </Link>
        </div>
      </div>
    </div>
  );
}
