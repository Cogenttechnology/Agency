import { useEffect, useRef, useState } from 'react';
import { Link, useLoaderData } from 'react-router';
import { ArrowRight, Clock, User, Tag } from 'lucide-react';
import { gsap, ScrollTrigger } from '../../lib/gsap';
import type { BlogPost } from '../../lib/blogStore';
import { getPublishedBlogs } from '../../lib/blogStore.server';
import type { Route } from "./+types/Blog";
import './Blog.css';

export async function loader() {
  return { posts: getPublishedBlogs() };
}

export const meta: Route.MetaFunction = () => {
  return [
    { title: "Insights & Ideas | Cogent Agency" },
    { name: "description", content: "Professional insights on SEO, performance marketing, and brand strategy from the Cogent team." },
  ];
};

const CATEGORIES = ['All', 'SEO', 'Performance Marketing', 'Brand Strategy', 'Web Design', 'Social Media'];

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

function CategoryBadge({ category }: { category: string }) {
  const color = CATEGORY_COLORS[category] || '#6c63ff';
  return (
    <span
      className="blog-category-badge"
      style={{ '--cat-color': color } as React.CSSProperties}
    >
      {category}
    </span>
  );
}

function FeaturedCard({ post }: { post: BlogPost }) {
  return (
    <div className="blog-featured">
      <div
        className="blog-featured__cover"
        style={{ background: post.coverGradient }}
        aria-hidden="true"
      >
        <div className="blog-featured__cover-overlay" />
        <CategoryBadge category={post.category} />
      </div>
      <div className="blog-featured__body">
        <div className="blog-featured__meta">
          <span className="blog-featured__meta-item">
            <Clock size={13} />
            {post.readTime} min read
          </span>
          <span className="blog-featured__meta-item">
            <User size={13} />
            {post.author}
          </span>
          <span className="blog-featured__meta-date">
            {formatDate(post.publishedAt)}
          </span>
        </div>
        <h2 className="blog-featured__title">{post.title}</h2>
        <p className="blog-featured__excerpt">{post.excerpt}</p>
        <Link to={`/blog/${post.slug}`} className="btn btn-primary blog-featured__cta">
          <span>Read Article</span>
          <ArrowRight size={16} />
        </Link>
      </div>
    </div>
  );
}

function BlogCard({ post }: { post: BlogPost }) {
  return (
    <article className="blog-card">
      <Link to={`/blog/${post.slug}`} className="blog-card__cover-link">
        <div
          className="blog-card__cover"
          style={{ background: post.coverGradient }}
          aria-hidden="true"
        >
          <div className="blog-card__cover-overlay" />
        </div>
      </Link>
      <div className="blog-card__body">
        <CategoryBadge category={post.category} />
        <h3 className="blog-card__title">
          <Link to={`/blog/${post.slug}`}>{post.title}</Link>
        </h3>
        <p className="blog-card__excerpt">{post.excerpt}</p>
        <div className="blog-card__footer">
          <div className="blog-card__meta">
            <span className="blog-card__meta-item">
              <Clock size={12} />
              {post.readTime} min
            </span>
            <span className="blog-card__meta-item">
              <User size={12} />
              {post.author}
            </span>
          </div>
          <Link to={`/blog/${post.slug}`} className="blog-card__arrow" aria-label="Read article">
            <ArrowRight size={16} />
          </Link>
        </div>
        <div className="blog-card__date">{formatDate(post.publishedAt)}</div>
      </div>
    </article>
  );
}

export default function Blog() {
  const { posts: initialPosts } = useLoaderData<typeof loader>();
  const pageRef = useRef<HTMLDivElement>(null);
  const [posts] = useState<BlogPost[]>(initialPosts);
  const [activeCategory, setActiveCategory] = useState('All');

  useEffect(() => {
    let ctx: ReturnType<typeof gsap.context>;

    const rafId = requestAnimationFrame(() => {
      ctx = gsap.context(() => {
        // Hero entrance
        gsap.fromTo(
          '.blog-hero__tag',
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out', delay: 0.1 }
        );
        gsap.fromTo(
          '.blog-hero__title',
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', delay: 0.25 }
        );
        gsap.fromTo(
          '.blog-hero__sub',
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out', delay: 0.4 }
        );

        // Featured post
        gsap.fromTo(
          '.blog-featured',
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: '.blog-featured',
              start: 'top 80%',
            },
          }
        );

        // Filter tabs
        gsap.fromTo(
          '.blog-filter-tabs',
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: '.blog-filter-tabs',
              start: 'top 85%',
            },
          }
        );

        // Cards stagger
        gsap.fromTo(
          '.blog-card',
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            stagger: 0.12,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: '.blog-grid',
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
  }, [posts]);

  const filtered =
    activeCategory === 'All'
      ? posts
      : posts.filter(p => p.category === activeCategory);

  const [featured, ...rest] = filtered;

  return (
    <div ref={pageRef} className="blog-page">
      {/* Hero */}
      <section className="blog-hero section">
        <div className="container">
          <span className="blog-hero__tag tag">From the Cogent Team</span>
          <h1 className="blog-hero__title">
            Insights &amp; <span className="text-gradient">Ideas</span>
          </h1>
          <p className="blog-hero__sub">
            Strategy, performance, and brand thinking from the people building
            growth for forward-thinking businesses.
          </p>
        </div>
      </section>

      <div className="container blog-content-area">
        {/* Filter Tabs */}
        <div className="blog-filter-tabs">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              className={`blog-filter-tab ${activeCategory === cat ? 'active' : ''}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Empty state — no published posts at all */}
        {posts.length === 0 && (
          <div className="blog-empty-state">
            <Tag size={48} />
            <h3>No posts yet</h3>
            <p>Check back soon — great content is on the way.</p>
          </div>
        )}

        {/* Featured post */}
        {featured && <FeaturedCard post={featured} />}

        {/* Grid of remaining posts */}
        {rest.length > 0 && (
          <div className="blog-grid">
            {rest.map(post => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>
        )}

        {/* Empty state — no posts in selected category */}
        {posts.length > 0 && filtered.length === 0 && (
          <div className="blog-empty-state">
            <Tag size={48} />
            <h3>No posts in this category yet</h3>
            <p>Try another category or check back soon.</p>
          </div>
        )}
      </div>
    </div>
  );
}
