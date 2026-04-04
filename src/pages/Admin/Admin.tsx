import { useEffect, useRef, useState } from 'react';
import {
  LogOut, Mail, Phone, Inbox, CheckCircle, XCircle,
  Trash2, Eye, Search, BarChart2, Users, TrendingUp, RefreshCw,
  FileText, Plus, Edit2, Globe, EyeOff, ChevronLeft, Bold, Italic,
  List, Link as LinkIcon, Heading, Minus, Code2, ToggleLeft, ToggleRight,
} from 'lucide-react';
import type { Enquiry, EnquiryStatus } from '../../lib/enquiryStore';
import type { BlogPost } from '../../lib/blogStore';
import type { PageSeo, PageSchema } from '../../lib/seoStore';
import {
  getScripts, saveScripts, addScript, updateScript, deleteScript,
  type TrackingScript,
} from '../../lib/scriptStore';
import './Admin.css';

/* ── Auth ─────────────────────────────────────────────────── */
const ADMIN_ID  = 'admin@gmail.com';
const ADMIN_PWD = 'admin@123';
const AUTH_KEY  = 'cogent_admin_auth';

const serviceLabels: Record<string, string> = {
  performance: 'Performance Marketing',
  video: 'Video Production',
  seo: 'SEO',
  social: 'Social Media',
  influencer: 'Influencer Marketing',
  web: 'Web Design & Dev',
  studio: 'Cogent Studio',
};

const budgetLabels: Record<string, string> = {
  'under50':  'Under ₹50K',
  '50-150':   '₹50K – ₹1.5L',
  '150-500':  '₹1.5L – ₹5L',
  '500plus':  '₹5L+',
};

const statusConfig: Record<EnquiryStatus, { label: string; color: string; icon: React.ReactNode }> = {
  new:     { label: 'New',     color: '#6c63ff', icon: <Inbox size={13} /> },
  read:    { label: 'Read',    color: '#f59e0b', icon: <Eye size={13} /> },
  replied: { label: 'Replied', color: '#00d4aa', icon: <CheckCircle size={13} /> },
  closed:  { label: 'Closed',  color: '#606080', icon: <XCircle size={13} /> },
};

function formatDate(iso: string) {
  const d = new Date(iso);
  return d.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }) +
    ' · ' + d.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' });
}

function formatDateShort(iso: string | null) {
  if (!iso) return '—';
  return new Date(iso).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
}

/* ── Blog constants ──────────────────────────────────────── */
const BLOG_CATEGORIES = [
  'SEO', 'Performance Marketing', 'Brand Strategy',
  'Web Design', 'Social Media', 'Influencer Marketing', 'Studio',
];

const COVER_GRADIENTS = [
  { label: 'Deep Ocean',    value: 'linear-gradient(135deg, #0a0a1a 0%, #0d1f3c 40%, #00d4aa22 100%)' },
  { label: 'Cosmic Purple', value: 'linear-gradient(135deg, #0a0a1a 0%, #1a0a2e 40%, #a855f722 100%)' },
  { label: 'Ember Gold',    value: 'linear-gradient(135deg, #0a0a1a 0%, #1a1000 40%, #f59e0b22 100%)' },
  { label: 'Crimson Night', value: 'linear-gradient(135deg, #0a0a1a 0%, #1a0808 40%, #ff6b6b22 100%)' },
  { label: 'Indigo Haze',   value: 'linear-gradient(135deg, #0a0a1a 0%, #0d0d2e 40%, #6c63ff22 100%)' },
  { label: 'Rose Smoke',    value: 'linear-gradient(135deg, #0a0a1a 0%, #1a0814 40%, #ec489922 100%)' },
  { label: 'Forest Deep',   value: 'linear-gradient(135deg, #060a06 0%, #0a1a0a 40%, #22c55e22 100%)' },
  { label: 'Slate Storm',   value: 'linear-gradient(135deg, #080810 0%, #10101c 40%, #64748b22 100%)' },
];

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

/* ── Login Screen ─────────────────────────────────────────── */
function LoginScreen({ onLogin }: { onLogin: () => void }) {
  const [email, setEmail]   = useState('');
  const [pwd, setPwd]       = useState('');
  const [error, setError]   = useState('');
  const [loading, setLoading] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      if (email === ADMIN_ID && pwd === ADMIN_PWD) {
        localStorage.setItem(AUTH_KEY, '1');
        onLogin();
      } else {
        setError('Invalid email or password.');
        setLoading(false);
        if (cardRef.current) {
          cardRef.current.classList.add('admin-login__card--shake');
          setTimeout(() => cardRef.current?.classList.remove('admin-login__card--shake'), 500);
        }
      }
    }, 600);
  };

  return (
    <div className="admin-login">
      <div className="admin-login__bg">
        <div className="admin-login__orb admin-login__orb--1" />
        <div className="admin-login__orb admin-login__orb--2" />
      </div>
      <div ref={cardRef} className="admin-login__card">
        <div className="admin-login__logo">
          <span className="admin-login__logo-text">Cogent</span>
          <span className="admin-login__logo-badge">Admin</span>
        </div>
        <h1 className="admin-login__title">Welcome back</h1>
        <p className="admin-login__sub">Sign in to manage your enquiries</p>

        <form onSubmit={handleLogin} className="admin-login__form">
          <div className="admin-input-group">
            <label>Email</label>
            <input
              type="email" required autoComplete="email"
              value={email} onChange={e => setEmail(e.target.value)}
              placeholder="admin@gmail.com"
            />
          </div>
          <div className="admin-input-group">
            <label>Password</label>
            <input
              type="password" required autoComplete="current-password"
              value={pwd} onChange={e => setPwd(e.target.value)}
              placeholder="••••••••"
            />
          </div>
          {error && <p className="admin-login__error">{error}</p>}
          <button type="submit" className="admin-login__btn" disabled={loading}>
            {loading ? <span className="admin-spinner" /> : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  );
}

/* ── Enquiry Detail Modal ──────────────────────────────────── */
function EnquiryDetail({
  enquiry, onClose, onStatusChange, onDelete,
}: {
  enquiry: Enquiry;
  onClose: () => void;
  onStatusChange: (id: string, s: EnquiryStatus) => void;
  onDelete: (id: string) => void;
}) {
  const statuses: EnquiryStatus[] = ['new', 'read', 'replied', 'closed'];

  return (
    <div className="admin-modal-overlay" onClick={e => { if (e.currentTarget === e.target) onClose(); }}>
      <div className="admin-modal">
        <div className="admin-modal__header">
          <div>
            <h2 className="admin-modal__name">{enquiry.name}</h2>
            <p className="admin-modal__meta">{formatDate(enquiry.createdAt)} · via {enquiry.source === 'modal' ? 'Enquiry Modal' : 'Contact Page'}</p>
          </div>
          <button className="admin-modal__close" onClick={onClose}><XCircle size={20} /></button>
        </div>

        <div className="admin-modal__body">
          <div className="admin-modal__grid">
            <div className="admin-modal__field">
              <span className="admin-modal__field-label">Email</span>
              <a href={`mailto:${enquiry.email}`} className="admin-modal__field-value admin-modal__link">{enquiry.email}</a>
            </div>
            <div className="admin-modal__field">
              <span className="admin-modal__field-label">Phone</span>
              {enquiry.phone
                ? <a href={`tel:${enquiry.phone}`} className="admin-modal__field-value admin-modal__link">{enquiry.phone}</a>
                : <span className="admin-modal__field-value">—</span>}
            </div>
            <div className="admin-modal__field">
              <span className="admin-modal__field-label">Company</span>
              <span className="admin-modal__field-value">{enquiry.company || '—'}</span>
            </div>
            <div className="admin-modal__field">
              <span className="admin-modal__field-label">Budget</span>
              <span className="admin-modal__field-value">{budgetLabels[enquiry.budget] || '—'}</span>
            </div>
            <div className="admin-modal__field">
              <span className="admin-modal__field-label">Status</span>
              <div className="admin-modal__status-select">
                {statuses.map(s => (
                  <button
                    key={s}
                    className={`admin-status-btn ${enquiry.status === s ? 'active' : ''}`}
                    style={{ '--sc': statusConfig[s].color } as React.CSSProperties}
                    onClick={() => onStatusChange(enquiry.id, s)}
                  >
                    {statusConfig[s].icon} {statusConfig[s].label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {enquiry.services.length > 0 && (
            <div className="admin-modal__field admin-modal__field--full">
              <span className="admin-modal__field-label">Services Interested In</span>
              <div className="admin-modal__tags">
                {enquiry.services.map(s => (
                  <span key={s} className="admin-tag">{serviceLabels[s] || s}</span>
                ))}
              </div>
            </div>
          )}

          <div className="admin-modal__field admin-modal__field--full">
            <span className="admin-modal__field-label">Message</span>
            <p className="admin-modal__message">{enquiry.message}</p>
          </div>
        </div>

        <div className="admin-modal__footer">
          <a href={`mailto:${enquiry.email}`} className="admin-btn admin-btn--primary">
            <Mail size={15} /> Reply via Email
          </a>
          {enquiry.phone && (
            <a href={`tel:${enquiry.phone}`} className="admin-btn admin-btn--secondary">
              <Phone size={15} /> Call {enquiry.phone}
            </a>
          )}
          <button className="admin-btn admin-btn--danger" onClick={() => { onDelete(enquiry.id); onClose(); }}>
            <Trash2 size={15} /> Delete
          </button>
        </div>
      </div>
    </div>
  );
}

/* ── Blog Editor ──────────────────────────────────────────── */
interface EditorState {
  title: string;
  slug: string;
  category: string;
  tags: string;
  excerpt: string;
  metaTitle: string;
  metaDescription: string;
  coverGradient: string;
  author: string;
  authorRole: string;
  readTime: number;
  internalLinks: { text: string; url: string }[];
  content: string;
}

const EMPTY_EDITOR: EditorState = {
  title: '',
  slug: '',
  category: 'SEO',
  tags: '',
  excerpt: '',
  metaTitle: '',
  metaDescription: '',
  coverGradient: COVER_GRADIENTS[0].value,
  author: '',
  authorRole: '',
  readTime: 5,
  internalLinks: [],
  content: '',
};

function charCountColor(count: number, warn: number, max: number): string {
  if (count <= warn) return '#00d4aa';
  if (count <= max) return '#f59e0b';
  return '#ff6b6b';
}

function BlogEditor({
  post,
  onSave,
  onBack,
}: {
  post: BlogPost | null;
  onSave: () => void;
  onBack: () => void;
}) {
  const contentRef = useRef<HTMLTextAreaElement>(null);
  const [showPreview, setShowPreview] = useState(false);
  const [slugManual, setSlugManual] = useState(!!post);
  const [form, setForm] = useState<EditorState>(() => {
    if (!post) return EMPTY_EDITOR;
    return {
      title: post.title,
      slug: post.slug,
      category: post.category,
      tags: post.tags.join(', '),
      excerpt: post.excerpt,
      metaTitle: post.metaTitle,
      metaDescription: post.metaDescription,
      coverGradient: post.coverGradient,
      author: post.author,
      authorRole: post.authorRole,
      readTime: post.readTime,
      internalLinks: post.internalLinks,
      content: post.content,
    };
  });

  const set = <K extends keyof EditorState>(key: K, value: EditorState[K]) => {
    setForm(prev => ({ ...prev, [key]: value }));
  };

  const handleTitleChange = (val: string) => {
    set('title', val);
    if (!slugManual) {
      set('slug', slugify(val));
    }
  };

  const insertAtCursor = (before: string, after = '') => {
    const ta = contentRef.current;
    if (!ta) return;
    const start = ta.selectionStart;
    const end = ta.selectionEnd;
    const selected = ta.value.substring(start, end);
    const newVal = ta.value.substring(0, start) + before + selected + after + ta.value.substring(end);
    set('content', newVal);
    requestAnimationFrame(() => {
      ta.focus();
      ta.setSelectionRange(start + before.length, start + before.length + selected.length);
    });
  };

  const toolbarActions = [
    { label: 'H2', icon: <Heading size={14} />, action: () => insertAtCursor('<h2>', '</h2>') },
    { label: 'H3', icon: <Heading size={12} />, action: () => insertAtCursor('<h3>', '</h3>') },
    { label: 'B',  icon: <Bold size={14} />,    action: () => insertAtCursor('<strong>', '</strong>') },
    { label: 'I',  icon: <Italic size={14} />,  action: () => insertAtCursor('<em>', '</em>') },
    { label: 'UL', icon: <List size={14} />,    action: () => insertAtCursor('<ul>\n  <li>', '</li>\n</ul>') },
    { label: 'A',  icon: <LinkIcon size={14} />, action: () => insertAtCursor('<a href="">', '</a>') },
  ];

  const addInternalLink = () => {
    set('internalLinks', [...form.internalLinks, { text: '', url: '' }]);
  };

  const removeInternalLink = (idx: number) => {
    set('internalLinks', form.internalLinks.filter((_, i) => i !== idx));
  };

  const updateInternalLink = (idx: number, field: 'text' | 'url', value: string) => {
    const updated = form.internalLinks.map((link, i) =>
      i === idx ? { ...link, [field]: value } : link
    );
    set('internalLinks', updated);
  };

  const buildPayload = (): Omit<BlogPost, 'id' | 'createdAt' | 'updatedAt'> => ({
    title: form.title,
    slug: form.slug || slugify(form.title),
    category: form.category,
    tags: form.tags.split(',').map(t => t.trim()).filter(Boolean),
    excerpt: form.excerpt,
    metaTitle: form.metaTitle,
    metaDescription: form.metaDescription,
    coverGradient: form.coverGradient,
    author: form.author,
    authorRole: form.authorRole,
    readTime: form.readTime,
    internalLinks: form.internalLinks.filter(l => l.text && l.url),
    content: form.content,
    status: post?.status ?? 'draft',
    publishedAt: post?.publishedAt ?? null,
  });

  const blogApi = (body: Record<string, unknown>) =>
    fetch('/api/blogs', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-admin-token': 'cogent_admin_auth' },
      body: JSON.stringify(body),
    });

  const handleDraft = async () => {
    const payload = buildPayload();
    if (post) {
      await blogApi({ _action: 'update', id: post.id, ...payload, status: 'draft' });
    } else {
      await blogApi({ _action: 'create', ...payload, status: 'draft', publishedAt: null });
    }
    onSave();
  };

  const handlePublish = async () => {
    const payload = buildPayload();
    if (post) {
      await blogApi({
        _action: 'update',
        id: post.id,
        ...payload,
        status: 'published',
        publishedAt: post.publishedAt ?? new Date().toISOString(),
      });
    } else {
      const res = await blogApi({ _action: 'create', ...payload, status: 'draft', publishedAt: null });
      const saved: BlogPost = await res.json();
      await blogApi({ _action: 'publish', id: saved.id });
    }
    onSave();
  };

  const handleUnpublish = async () => {
    if (post) {
      await blogApi({ _action: 'unpublish', id: post.id });
      onSave();
    }
  };

  return (
    <div className="blog-editor">
      {/* Header */}
      <div className="blog-editor__header">
        <button className="blog-editor__back" onClick={onBack}>
          <ChevronLeft size={16} /> Back to Posts
        </button>
        <h2 className="blog-editor__heading">{post ? 'Edit Post' : 'New Post'}</h2>
        <div className="blog-editor__actions">
          {post && post.status === 'published' && (
            <button className="admin-btn admin-btn--warning" onClick={handleUnpublish}>
              <EyeOff size={15} /> Unpublish
            </button>
          )}
          <button className="admin-btn admin-btn--secondary" onClick={handleDraft}>
            Save Draft
          </button>
          <button className="admin-btn admin-btn--primary" onClick={handlePublish}>
            <Globe size={15} /> Publish
          </button>
        </div>
      </div>

      <div className="blog-editor__body">
        {/* Left column — main fields */}
        <div className="blog-editor__main">
          {/* Title */}
          <div className="admin-input-group">
            <label>Title</label>
            <input
              type="text"
              value={form.title}
              onChange={e => handleTitleChange(e.target.value)}
              placeholder="Enter post title…"
            />
          </div>

          {/* Slug */}
          <div className="admin-input-group">
            <label>Slug</label>
            <input
              type="text"
              value={form.slug}
              onChange={e => { setSlugManual(true); set('slug', slugify(e.target.value)); }}
              placeholder="auto-generated-from-title"
            />
            {form.slug && (
              <span className="blog-editor__slug-preview">/blog/{form.slug}</span>
            )}
          </div>

          {/* Excerpt */}
          <div className="admin-input-group">
            <label>
              Excerpt
              <span className="blog-editor__char-count" style={{ color: charCountColor(form.excerpt.length, 120, 160) }}>
                {form.excerpt.length}/160
              </span>
            </label>
            <textarea
              rows={3}
              maxLength={180}
              value={form.excerpt}
              onChange={e => set('excerpt', e.target.value)}
              placeholder="A brief summary of the post (shown on cards and in SEO)…"
            />
          </div>

          {/* Content Editor */}
          <div className="admin-input-group">
            <div className="blog-editor__content-header">
              <label>Content (HTML)</label>
              <div className="blog-editor__content-meta">
                <span className="blog-editor__char-count" style={{ color: '#606080' }}>
                  {form.content.length} chars
                </span>
                <button
                  className={`blog-editor__preview-toggle ${showPreview ? 'active' : ''}`}
                  onClick={() => setShowPreview(v => !v)}
                  type="button"
                >
                  <Eye size={13} /> {showPreview ? 'Hide Preview' : 'Preview'}
                </button>
              </div>
            </div>

            {/* Toolbar */}
            <div className="blog-editor__toolbar">
              {toolbarActions.map(action => (
                <button
                  key={action.label}
                  type="button"
                  className="blog-editor__toolbar-btn"
                  title={action.label}
                  onClick={action.action}
                >
                  {action.icon}
                  <span>{action.label}</span>
                </button>
              ))}
            </div>

            <textarea
              ref={contentRef}
              rows={20}
              className="blog-editor__content-textarea"
              value={form.content}
              onChange={e => set('content', e.target.value)}
              placeholder="<h2>Section heading</h2>&#10;<p>Your content here…</p>"
            />

            {showPreview && (
              <div
                className="blog-editor__preview blog-content"
                dangerouslySetInnerHTML={{ __html: form.content }}
              />
            )}
          </div>
        </div>

        {/* Right column — meta + settings */}
        <div className="blog-editor__sidebar">
          {/* Category */}
          <div className="admin-input-group">
            <label>Category</label>
            <select
              value={form.category}
              onChange={e => set('category', e.target.value)}
              className="blog-editor__select"
            >
              {BLOG_CATEGORIES.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          {/* Tags */}
          <div className="admin-input-group">
            <label>Tags <span className="blog-editor__hint">(comma-separated)</span></label>
            <input
              type="text"
              value={form.tags}
              onChange={e => set('tags', e.target.value)}
              placeholder="SEO, Content, Strategy"
            />
          </div>

          {/* Author */}
          <div className="admin-input-group">
            <label>Author Name</label>
            <input
              type="text"
              value={form.author}
              onChange={e => set('author', e.target.value)}
              placeholder="Jane Doe"
            />
          </div>

          {/* Author Role */}
          <div className="admin-input-group">
            <label>Author Role</label>
            <input
              type="text"
              value={form.authorRole}
              onChange={e => set('authorRole', e.target.value)}
              placeholder="SEO Strategist"
            />
          </div>

          {/* Read Time */}
          <div className="admin-input-group">
            <label>Read Time (minutes)</label>
            <input
              type="number"
              min={1}
              max={60}
              value={form.readTime}
              onChange={e => set('readTime', parseInt(e.target.value) || 5)}
            />
          </div>

          {/* Cover Gradient */}
          <div className="admin-input-group">
            <label>Cover Gradient</label>
            <div className="blog-editor__gradient-grid">
              {COVER_GRADIENTS.map(g => (
                <button
                  key={g.value}
                  type="button"
                  className={`blog-editor__gradient-swatch ${form.coverGradient === g.value ? 'active' : ''}`}
                  style={{ background: g.value }}
                  title={g.label}
                  onClick={() => set('coverGradient', g.value)}
                >
                  {form.coverGradient === g.value && <CheckCircle size={14} />}
                </button>
              ))}
            </div>
            {form.coverGradient && (
              <div
                className="blog-editor__gradient-preview"
                style={{ background: form.coverGradient }}
              />
            )}
          </div>

          {/* Meta Title */}
          <div className="admin-input-group">
            <label>
              Meta Title
              <span
                className="blog-editor__char-count"
                style={{ color: charCountColor(form.metaTitle.length, 60, 70) }}
              >
                {form.metaTitle.length}/60
              </span>
            </label>
            <input
              type="text"
              value={form.metaTitle}
              onChange={e => set('metaTitle', e.target.value)}
              placeholder="SEO-optimised page title…"
            />
          </div>

          {/* Meta Description */}
          <div className="admin-input-group">
            <label>
              Meta Description
              <span
                className="blog-editor__char-count"
                style={{ color: charCountColor(form.metaDescription.length, 120, 160) }}
              >
                {form.metaDescription.length}/160
              </span>
            </label>
            <textarea
              rows={3}
              value={form.metaDescription}
              onChange={e => set('metaDescription', e.target.value)}
              placeholder="Compelling meta description for search results…"
            />
          </div>

          {/* Internal Links */}
          <div className="admin-input-group">
            <label>Internal Links</label>
            <div className="blog-editor__links">
              {form.internalLinks.map((link, idx) => (
                <div key={idx} className="blog-editor__link-row">
                  <input
                    type="text"
                    placeholder="Link text"
                    value={link.text}
                    onChange={e => updateInternalLink(idx, 'text', e.target.value)}
                  />
                  <input
                    type="text"
                    placeholder="/services/seo"
                    value={link.url}
                    onChange={e => updateInternalLink(idx, 'url', e.target.value)}
                  />
                  <button
                    type="button"
                    className="blog-editor__link-remove"
                    onClick={() => removeInternalLink(idx)}
                  >
                    <Minus size={14} />
                  </button>
                </div>
              ))}
              <button
                type="button"
                className="blog-editor__add-link"
                onClick={addInternalLink}
              >
                <Plus size={14} /> Add Link
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Blog Manager ─────────────────────────────────────────── */
type BlogView = 'list' | 'editor';

function BlogManager() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [view, setView] = useState<BlogView>('list');
  const [editPost, setEditPost] = useState<BlogPost | null>(null);
  const [statusFilter, setStatusFilter] = useState<'all' | 'published' | 'draft'>('all');

  const blogApi = (body: Record<string, unknown>) =>
    fetch('/api/blogs', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-admin-token': 'cogent_admin_auth' },
      body: JSON.stringify(body),
    });

  const load = async () => {
    const res = await fetch('/api/blogs', {
      headers: { 'x-admin-token': 'cogent_admin_auth' },
    });
    const data: BlogPost[] = await res.json();
    setPosts(data);
  };

  useEffect(() => { load(); }, []);

  const handleEdit = (post: BlogPost) => {
    setEditPost(post);
    setView('editor');
  };

  const handleNew = () => {
    setEditPost(null);
    setView('editor');
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Delete this post? This action cannot be undone.')) {
      await blogApi({ _action: 'delete', id });
      load();
    }
  };

  const handleTogglePublish = async (post: BlogPost) => {
    if (post.status === 'published') {
      await blogApi({ _action: 'unpublish', id: post.id });
    } else {
      await blogApi({ _action: 'publish', id: post.id });
    }
    load();
  };

  const handleEditorSave = () => {
    load();
    setView('list');
    setEditPost(null);
  };

  const filtered = posts.filter(p => {
    if (statusFilter === 'all') return true;
    return p.status === statusFilter;
  });

  const counts = {
    all: posts.length,
    published: posts.filter(p => p.status === 'published').length,
    draft: posts.filter(p => p.status === 'draft').length,
  };

  if (view === 'editor') {
    return (
      <BlogEditor
        post={editPost}
        onSave={handleEditorSave}
        onBack={() => setView('list')}
      />
    );
  }

  return (
    <div className="blog-manager">
      {/* Topbar */}
      <header className="admin-topbar">
        <div>
          <h1 className="admin-topbar__title">Blog Posts</h1>
          <p className="admin-topbar__sub">Manage your published and draft articles</p>
        </div>
        <button className="admin-btn admin-btn--primary" onClick={handleNew}>
          <Plus size={15} /> New Post
        </button>
      </header>

      {/* Stats */}
      <div className="admin-stats-grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
        <div className="admin-stat-card" style={{ '--ac': '#6c63ff' } as React.CSSProperties}>
          <div className="admin-stat-card__icon"><FileText size={20} /></div>
          <div className="admin-stat-card__info">
            <span className="admin-stat-card__value">{counts.all}</span>
            <span className="admin-stat-card__label">Total Posts</span>
          </div>
        </div>
        <div className="admin-stat-card" style={{ '--ac': '#00d4aa' } as React.CSSProperties}>
          <div className="admin-stat-card__icon"><Globe size={20} /></div>
          <div className="admin-stat-card__info">
            <span className="admin-stat-card__value">{counts.published}</span>
            <span className="admin-stat-card__label">Published</span>
          </div>
        </div>
        <div className="admin-stat-card" style={{ '--ac': '#f59e0b' } as React.CSSProperties}>
          <div className="admin-stat-card__icon"><Edit2 size={20} /></div>
          <div className="admin-stat-card__info">
            <span className="admin-stat-card__value">{counts.draft}</span>
            <span className="admin-stat-card__label">Drafts</span>
          </div>
        </div>
      </div>

      {/* Filter */}
      <div className="admin-toolbar">
        <div className="admin-filter-tabs">
          {(['all', 'published', 'draft'] as const).map(key => (
            <button
              key={key}
              className={`admin-filter-tab ${statusFilter === key ? 'active' : ''}`}
              onClick={() => setStatusFilter(key)}
            >
              {key.charAt(0).toUpperCase() + key.slice(1)} ({counts[key]})
            </button>
          ))}
        </div>
        <button className="admin-refresh" onClick={load} title="Refresh">
          <RefreshCw size={16} />
        </button>
      </div>

      {/* Table */}
      <div className="admin-table-wrap">
        {filtered.length === 0 ? (
          <div className="admin-empty">
            <FileText size={48} />
            <p>{posts.length === 0 ? 'No blog posts yet. Click "New Post" to create your first article.' : 'No posts match this filter.'}</p>
          </div>
        ) : (
          <table className="admin-table">
            <thead>
              <tr>
                <th>Status</th>
                <th>Title</th>
                <th>Category</th>
                <th>Author</th>
                <th>Published</th>
                <th>Updated</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(post => (
                <tr key={post.id} className="admin-table__row">
                  <td>
                    <span className={`admin-blog-status ${post.status}`}>
                      {post.status === 'published' ? (
                        <><Globe size={11} /> Published</>
                      ) : (
                        <><Edit2 size={11} /> Draft</>
                      )}
                    </span>
                  </td>
                  <td className="admin-table__name blog-table__title">{post.title}</td>
                  <td>
                    <span className="admin-tag admin-tag--sm">{post.category}</span>
                  </td>
                  <td className="admin-muted">{post.author || '—'}</td>
                  <td className="admin-muted">{formatDateShort(post.publishedAt)}</td>
                  <td className="admin-muted">{formatDateShort(post.updatedAt)}</td>
                  <td>
                    <div className="admin-table__actions">
                      <button
                        className="admin-action-btn"
                        title="Edit"
                        onClick={() => handleEdit(post)}
                      >
                        <Edit2 size={15} />
                      </button>
                      <button
                        className="admin-action-btn"
                        title={post.status === 'published' ? 'Unpublish' : 'Publish'}
                        onClick={() => handleTogglePublish(post)}
                      >
                        {post.status === 'published' ? <EyeOff size={15} /> : <Globe size={15} />}
                      </button>
                      <button
                        className="admin-action-btn admin-action-btn--danger"
                        title="Delete"
                        onClick={() => handleDelete(post.id)}
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

/* ── SEO Manager ───────────────────────────────────────────── */
const SCHEMA_LABELS: Record<PageSchema['type'], string> = {
  Organization:    'Organization',
  LocalBusiness:   'Local Business',
  WebPage:         'Web Page',
  Service:         'Service',
  Article:         'Article',
  FAQPage:         'FAQ Page',
  BreadcrumbList:  'Breadcrumb List',
};

function SeoManager() {
  const [pages, setPages]           = useState<PageSeo[]>([]);
  const [editing, setEditing]       = useState<PageSeo | null>(null);
  const [jsonErrors, setJsonErrors] = useState<Record<number, string>>({});
  const [saved, setSaved]           = useState(false);

  const seoApi = (body: Record<string, unknown>) =>
    fetch('/api/seo', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-admin-token': 'cogent_admin_auth' },
      body: JSON.stringify(body),
    });

  const loadPages = async () => {
    const res = await fetch('/api/seo', { headers: { 'x-admin-token': 'cogent_admin_auth' } });
    const data: PageSeo[] = await res.json();
    setPages(data);
  };

  useEffect(() => { loadPages(); }, []);

  const openPage = (page: PageSeo) => {
    setEditing(JSON.parse(JSON.stringify(page))); // deep clone
    setJsonErrors({});
    setSaved(false);
  };

  const closeEditor = () => { setEditing(null); setSaved(false); };

  const updateField = (field: keyof PageSeo, value: string) => {
    setEditing(prev => prev ? { ...prev, [field]: value } : null);
  };

  const updateSchema = (idx: number, field: keyof PageSchema, value: string | boolean) => {
    setEditing(prev => {
      if (!prev) return null;
      const schemas = [...prev.schemas];
      schemas[idx] = { ...schemas[idx], [field]: value };
      // validate JSON if updating custom field
      if (field === 'custom') {
        try { JSON.parse(value as string); setJsonErrors(e => { const n = { ...e }; delete n[idx]; return n; }); }
        catch { setJsonErrors(e => ({ ...e, [idx]: 'Invalid JSON' })); }
      }
      return { ...prev, schemas };
    });
  };

  const handleSave = async () => {
    if (!editing) return;
    if (Object.keys(jsonErrors).length > 0) return;
    await seoApi({ _action: 'save', ...editing });
    await loadPages();
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const handleReset = async (id: string) => {
    if (!confirm('Reset this page to default SEO values?')) return;
    await seoApi({ _action: 'reset', id });
    const res = await fetch('/api/seo', { headers: { 'x-admin-token': 'cogent_admin_auth' } });
    const fresh: PageSeo[] = await res.json();
    setPages(fresh);
    const updated = fresh.find(p => p.id === id);
    if (updated) setEditing(JSON.parse(JSON.stringify(updated)));
    setJsonErrors({});
  };

  return (
    <div className="seo-manager">
      {/* Header */}
      <header className="admin-topbar">
        <div>
          <h1 className="admin-topbar__title">SEO Manager</h1>
          <p className="admin-topbar__sub">Manage meta tags and JSON-LD schemas for each page</p>
        </div>
      </header>

      {/* Page list */}
      {!editing && (
        <div className="seo-page-list">
          {pages.map(page => (
            <div key={page.id} className="seo-page-row" onClick={() => openPage(page)}>
              <div className="seo-page-row__info">
                <span className="seo-page-row__label">{page.label}</span>
                <span className="seo-page-row__path">{page.path}</span>
              </div>
              <div className="seo-page-row__meta">
                <span className="seo-page-row__title-preview">{page.metaTitle || page.title}</span>
                <span className="seo-page-row__schemas">{page.schemas.filter(s => s.enabled).length} schema{page.schemas.filter(s => s.enabled).length !== 1 ? 's' : ''}</span>
              </div>
              <Edit2 size={15} className="seo-page-row__edit-icon" />
            </div>
          ))}
        </div>
      )}

      {/* Page editor */}
      {editing && (
        <div className="seo-editor">
          {/* Editor header */}
          <div className="seo-editor__header">
            <button className="seo-editor__back" onClick={closeEditor}>
              <ChevronLeft size={16} /> All Pages
            </button>
            <div className="seo-editor__header-right">
              <button className="seo-editor__reset" onClick={() => handleReset(editing.id)}>
                <RefreshCw size={14} /> Reset to Default
              </button>
              <button
                className={`seo-editor__save ${saved ? 'saved' : ''}`}
                onClick={handleSave}
                disabled={Object.keys(jsonErrors).length > 0}
              >
                {saved ? <><CheckCircle size={14} /> Saved!</> : 'Save Changes'}
              </button>
            </div>
          </div>

          <div className="seo-editor__body">
            {/* Page info */}
            <div className="seo-editor__section-title">Page: <span>{editing.label}</span> <code>{editing.path}</code></div>

            {/* Meta fields */}
            <div className="seo-fields-grid">
              {/* Title */}
              <div className="seo-field">
                <div className="seo-field__label-row">
                  <label>Page Title <span className="seo-field__hint">(&lt;title&gt;)</span></label>
                  <span className={`seo-field__counter ${editing.title.length > 60 ? 'over' : ''}`}>{editing.title.length}/60</span>
                </div>
                <input
                  className="seo-field__input"
                  value={editing.title}
                  onChange={e => updateField('title', e.target.value)}
                  placeholder="Page title shown in browser tab"
                />
              </div>

              {/* Meta Title */}
              <div className="seo-field">
                <div className="seo-field__label-row">
                  <label>Meta Title <span className="seo-field__hint">(OG + Twitter)</span></label>
                  <span className={`seo-field__counter ${editing.metaTitle.length > 60 ? 'over' : ''}`}>{editing.metaTitle.length}/60</span>
                </div>
                <input
                  className="seo-field__input"
                  value={editing.metaTitle}
                  onChange={e => updateField('metaTitle', e.target.value)}
                  placeholder="og:title and twitter:title"
                />
              </div>

              {/* Meta Description */}
              <div className="seo-field seo-field--full">
                <div className="seo-field__label-row">
                  <label>Meta Description</label>
                  <span className={`seo-field__counter ${editing.metaDescription.length > 160 ? 'over' : ''}`}>{editing.metaDescription.length}/160</span>
                </div>
                <textarea
                  className="seo-field__input"
                  rows={2}
                  value={editing.metaDescription}
                  onChange={e => updateField('metaDescription', e.target.value)}
                  placeholder="Shown in search results snippets"
                />
              </div>

              {/* Keywords */}
              <div className="seo-field seo-field--full">
                <div className="seo-field__label-row">
                  <label>Keywords</label>
                </div>
                <input
                  className="seo-field__input"
                  value={editing.keywords}
                  onChange={e => updateField('keywords', e.target.value)}
                  placeholder="comma, separated, keywords"
                />
              </div>

              {/* Canonical */}
              <div className="seo-field">
                <div className="seo-field__label-row">
                  <label>Canonical URL</label>
                </div>
                <input
                  className="seo-field__input"
                  value={editing.canonical}
                  onChange={e => updateField('canonical', e.target.value)}
                  placeholder="https://cogent.agency/page"
                />
              </div>

              {/* OG Image */}
              <div className="seo-field">
                <div className="seo-field__label-row">
                  <label>OG Image URL</label>
                </div>
                <input
                  className="seo-field__input"
                  value={editing.ogImage}
                  onChange={e => updateField('ogImage', e.target.value)}
                  placeholder="https://cogent.agency/og-page.jpg"
                />
              </div>

              {/* Robots */}
              <div className="seo-field">
                <div className="seo-field__label-row">
                  <label>Robots</label>
                </div>
                <select
                  className="seo-field__input seo-field__select"
                  value={editing.robots}
                  onChange={e => updateField('robots', e.target.value)}
                >
                  <option value="index, follow">index, follow</option>
                  <option value="noindex, follow">noindex, follow</option>
                  <option value="index, nofollow">index, nofollow</option>
                  <option value="noindex, nofollow">noindex, nofollow</option>
                </select>
              </div>
            </div>

            {/* Schemas */}
            {editing.schemas.length > 0 && (
              <>
                <div className="seo-editor__section-title" style={{ marginTop: '2rem' }}>JSON-LD Schemas</div>
                <div className="seo-schemas-list">
                  {editing.schemas.map((schema, idx) => (
                    <div key={idx} className={`seo-schema-card ${schema.enabled ? '' : 'disabled'}`}>
                      <div className="seo-schema-card__header">
                        <div className="seo-schema-card__type">
                          <Globe size={14} />
                          {SCHEMA_LABELS[schema.type] ?? schema.type}
                        </div>
                        <label className="seo-schema-toggle">
                          <input
                            type="checkbox"
                            checked={schema.enabled}
                            onChange={e => updateSchema(idx, 'enabled', e.target.checked)}
                          />
                          <span className="seo-schema-toggle__track" />
                          <span className="seo-schema-toggle__label">{schema.enabled ? 'Enabled' : 'Disabled'}</span>
                        </label>
                      </div>
                      <div className="seo-schema-card__body">
                        <textarea
                          className={`seo-schema-card__json ${jsonErrors[idx] ? 'invalid' : ''}`}
                          rows={8}
                          value={schema.custom}
                          onChange={e => updateSchema(idx, 'custom', e.target.value)}
                          spellCheck={false}
                        />
                        {jsonErrors[idx] && (
                          <span className="seo-schema-card__error"><XCircle size={12} /> {jsonErrors[idx]}</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

/* ── Scripts Manager ───────────────────────────────────────── */
const SCRIPT_PRESETS = [
  { name: 'Meta Pixel',        placement: 'head'       as const },
  { name: 'Google Tag Manager',placement: 'head'       as const },
  { name: 'GA4 (gtag.js)',     placement: 'head'       as const },
  { name: 'Hotjar',            placement: 'head'       as const },
  { name: 'Custom Script',     placement: 'body_end'   as const },
];

const PLACEMENT_LABELS: Record<TrackingScript['placement'], string> = {
  head:       '<head>',
  body_start: '<body> start',
  body_end:   '<body> end',
};

const EMPTY_SCRIPT: Omit<TrackingScript, 'id'> = {
  name: '',
  placement: 'head',
  code: '',
  enabled: true,
};

function ScriptsManager() {
  const [scripts, setScripts]   = useState<TrackingScript[]>([]);
  const [editing, setEditing]   = useState<TrackingScript | null>(null);
  const [isNew, setIsNew]       = useState(false);
  const [saved, setSaved]       = useState(false);
  const [form, setForm]         = useState<Omit<TrackingScript, 'id'>>(EMPTY_SCRIPT);

  const load = () => setScripts(getScripts());
  useEffect(() => { load(); }, []);

  const openNew = (preset?: typeof SCRIPT_PRESETS[0]) => {
    setForm(preset ? { ...EMPTY_SCRIPT, name: preset.name, placement: preset.placement } : EMPTY_SCRIPT);
    setEditing(null);
    setIsNew(true);
    setSaved(false);
  };

  const openEdit = (s: TrackingScript) => {
    setForm({ name: s.name, placement: s.placement, code: s.code, enabled: s.enabled });
    setEditing(s);
    setIsNew(false);
    setSaved(false);
  };

  const closeForm = () => { setEditing(null); setIsNew(false); };

  const handleSave = () => {
    if (!form.name.trim() || !form.code.trim()) return;
    if (isNew) {
      addScript(form);
    } else if (editing) {
      updateScript(editing.id, form);
    }
    load();
    setSaved(true);
    setTimeout(() => { setSaved(false); closeForm(); }, 900);
  };

  const handleToggle = (id: string, enabled: boolean) => {
    updateScript(id, { enabled });
    load();
  };

  const handleDelete = (id: string) => {
    if (!confirm('Delete this script? It will stop loading on the site immediately.')) return;
    deleteScript(id);
    load();
  };

  const showForm = isNew || !!editing;

  return (
    <div className="scripts-manager">
      <header className="admin-topbar">
        <div>
          <h1 className="admin-topbar__title">Tracking Scripts</h1>
          <p className="admin-topbar__sub">Add Meta Pixel, GTM, GA4 and other scripts — injected globally on every page</p>
        </div>
        {!showForm && (
          <button className="admin-btn admin-btn--primary" onClick={() => openNew()}>
            <Plus size={15} /> Add Script
          </button>
        )}
      </header>

      {/* Quick-add presets */}
      {!showForm && (
        <div className="scripts-presets">
          <span className="scripts-presets__label">Quick Add:</span>
          {SCRIPT_PRESETS.map(p => (
            <button key={p.name} className="scripts-preset-btn" onClick={() => openNew(p)}>
              <Plus size={12} /> {p.name}
            </button>
          ))}
        </div>
      )}

      {/* Script list */}
      {!showForm && (
        <div className="scripts-list">
          {scripts.length === 0 ? (
            <div className="admin-empty">
              <Code2 size={48} />
              <p>No scripts added yet. Add Meta Pixel, GTM, or any custom script above.</p>
            </div>
          ) : (
            scripts.map(s => (
              <div key={s.id} className={`scripts-item ${s.enabled ? '' : 'scripts-item--disabled'}`}>
                <div className="scripts-item__left">
                  <span className="scripts-item__name">{s.name}</span>
                  <span className="scripts-item__placement">{PLACEMENT_LABELS[s.placement]}</span>
                </div>
                <div className="scripts-item__actions">
                  <button
                    className={`scripts-toggle ${s.enabled ? 'on' : 'off'}`}
                    onClick={() => handleToggle(s.id, !s.enabled)}
                    title={s.enabled ? 'Disable' : 'Enable'}
                  >
                    {s.enabled ? <ToggleRight size={22} /> : <ToggleLeft size={22} />}
                    <span>{s.enabled ? 'Live' : 'Off'}</span>
                  </button>
                  <button className="admin-action-btn" title="Edit" onClick={() => openEdit(s)}>
                    <Edit2 size={15} />
                  </button>
                  <button className="admin-action-btn admin-action-btn--danger" title="Delete" onClick={() => handleDelete(s.id)}>
                    <Trash2 size={15} />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* Add / Edit form */}
      {showForm && (
        <div className="scripts-form">
          <div className="seo-editor__header">
            <button className="seo-editor__back" onClick={closeForm}>
              <ChevronLeft size={16} /> All Scripts
            </button>
            <button
              className={`seo-editor__save ${saved ? 'saved' : ''}`}
              onClick={handleSave}
              disabled={!form.name.trim() || !form.code.trim()}
            >
              {saved ? <><CheckCircle size={14} /> Saved!</> : isNew ? 'Add Script' : 'Save Changes'}
            </button>
          </div>

          <div className="scripts-form__body">
            <div className="scripts-form__row">
              <div className="admin-input-group">
                <label>Script Name</label>
                <input
                  type="text"
                  placeholder="e.g. Meta Pixel, GTM, GA4"
                  value={form.name}
                  onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                />
              </div>
              <div className="admin-input-group">
                <label>Placement</label>
                <select
                  value={form.placement}
                  onChange={e => setForm(f => ({ ...f, placement: e.target.value as TrackingScript['placement'] }))}
                >
                  <option value="head">In &lt;head&gt; (recommended for pixels &amp; GTM)</option>
                  <option value="body_start">After &lt;body&gt; opens</option>
                  <option value="body_end">Before &lt;/body&gt; closes</option>
                </select>
              </div>
            </div>

            <div className="admin-input-group">
              <label>Script Code</label>
              <p className="scripts-form__hint">Paste the full snippet including <code>&lt;script&gt;</code> tags or any HTML provided by the platform.</p>
              <textarea
                className="scripts-form__code"
                rows={14}
                placeholder={'<!-- Paste your script here -->\n<script>\n  // e.g. Meta Pixel base code\n  !function(f,b,e,v,n,t,s){...}(window, document, \'script\', \'https://connect.facebook.net/en_US/fbevents.js\');\n  fbq(\'init\', \'YOUR_PIXEL_ID\');\n  fbq(\'track\', \'PageView\');\n</script>'}
                value={form.code}
                onChange={e => setForm(f => ({ ...f, code: e.target.value }))}
                spellCheck={false}
              />
            </div>

            <label className="scripts-form__enabled">
              <input
                type="checkbox"
                checked={form.enabled}
                onChange={e => setForm(f => ({ ...f, enabled: e.target.checked }))}
              />
              <span>Active — inject this script on the live site</span>
            </label>
          </div>
        </div>
      )}
    </div>
  );
}

/* ── Dashboard ─────────────────────────────────────────────── */
type ActiveSection = 'enquiries' | 'blog' | 'seo' | 'scripts';

function Dashboard({ onLogout }: { onLogout: () => void }) {
  const [enquiries, setEnquiries]     = useState<Enquiry[]>([]);
  const [search, setSearch]           = useState('');
  const [filterStatus, setFilterStatus] = useState<EnquiryStatus | 'all'>('all');
  const [selected, setSelected]       = useState<Enquiry | null>(null);
  const [activeSection, setActiveSection] = useState<ActiveSection>('enquiries');

  const enquiryApi = (body: Record<string, unknown>) =>
    fetch('/api/enquiries', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-admin-token': 'cogent_admin_auth' },
      body: JSON.stringify(body),
    });

  const load = async () => {
    const res = await fetch('/api/enquiries', {
      headers: { 'x-admin-token': 'cogent_admin_auth' },
    });
    const data: Enquiry[] = await res.json();
    setEnquiries(data);
  };

  useEffect(() => { load(); }, []);

  const handleStatusChange = async (id: string, status: EnquiryStatus) => {
    await enquiryApi({ _action: 'updateStatus', id, status });
    load();
    if (selected?.id === id) setSelected(prev => prev ? { ...prev, status } : null);
  };

  const handleDelete = async (id: string) => {
    await enquiryApi({ _action: 'delete', id });
    load();
  };

  const handleRowClick = (enq: Enquiry) => {
    if (enq.status === 'new') handleStatusChange(enq.id, 'read');
    setSelected(enq);
  };

  const filtered = enquiries.filter(e => {
    const matchSearch =
      e.name.toLowerCase().includes(search.toLowerCase()) ||
      e.email.toLowerCase().includes(search.toLowerCase()) ||
      e.company.toLowerCase().includes(search.toLowerCase()) ||
      e.message.toLowerCase().includes(search.toLowerCase());
    const matchStatus = filterStatus === 'all' || e.status === filterStatus;
    return matchSearch && matchStatus;
  });

  const counts = {
    all:     enquiries.length,
    new:     enquiries.filter(e => e.status === 'new').length,
    read:    enquiries.filter(e => e.status === 'read').length,
    replied: enquiries.filter(e => e.status === 'replied').length,
    closed:  enquiries.filter(e => e.status === 'closed').length,
  };

  const statCards = [
    { label: 'Total Enquiries', value: counts.all,     icon: <Inbox size={20} />,      color: '#6c63ff' },
    { label: 'New / Unread',    value: counts.new,     icon: <TrendingUp size={20} />, color: '#ff6b6b' },
    { label: 'Replied',         value: counts.replied, icon: <CheckCircle size={20} />, color: '#00d4aa' },
    { label: 'Closed',          value: counts.closed,  icon: <BarChart2 size={20} />,  color: '#f59e0b' },
  ];

  const filterTabs: { key: EnquiryStatus | 'all'; label: string }[] = [
    { key: 'all',     label: `All (${counts.all})` },
    { key: 'new',     label: `New (${counts.new})` },
    { key: 'read',    label: `Read (${counts.read})` },
    { key: 'replied', label: `Replied (${counts.replied})` },
    { key: 'closed',  label: `Closed (${counts.closed})` },
  ];

  return (
    <div className="admin-dashboard">
      {/* Sidebar */}
      <aside className="admin-sidebar">
        <div className="admin-sidebar__logo">
          <span className="admin-sidebar__logo-text">Cogent</span>
          <span className="admin-sidebar__logo-badge">Admin</span>
        </div>
        <nav className="admin-sidebar__nav">
          <div
            className={`admin-sidebar__nav-item ${activeSection === 'enquiries' ? 'active' : ''}`}
            onClick={() => setActiveSection('enquiries')}
          >
            <Inbox size={18} /> Enquiries
            {counts.new > 0 && <span className="admin-sidebar__badge">{counts.new}</span>}
          </div>
          <div
            className={`admin-sidebar__nav-item ${activeSection === 'blog' ? 'active' : ''}`}
            onClick={() => setActiveSection('blog')}
          >
            <FileText size={18} /> Blog
          </div>
          <div
            className={`admin-sidebar__nav-item ${activeSection === 'seo' ? 'active' : ''}`}
            onClick={() => setActiveSection('seo')}
          >
            <Globe size={18} /> SEO
          </div>
          <div
            className={`admin-sidebar__nav-item ${activeSection === 'scripts' ? 'active' : ''}`}
            onClick={() => setActiveSection('scripts')}
          >
            <Code2 size={18} /> Scripts
          </div>
          <div className="admin-sidebar__nav-item">
            <Users size={18} /> Contacts
          </div>
          <div className="admin-sidebar__nav-item">
            <BarChart2 size={18} /> Analytics
          </div>
        </nav>
        <button className="admin-sidebar__logout" onClick={onLogout}>
          <LogOut size={16} /> Sign Out
        </button>
      </aside>

      {/* Main */}
      <main className="admin-main">
        {activeSection === 'enquiries' && (
          <>
            {/* Top bar */}
            <header className="admin-topbar">
              <div>
                <h1 className="admin-topbar__title">Enquiries</h1>
                <p className="admin-topbar__sub">All incoming leads from your website forms</p>
              </div>
              <button className="admin-refresh" onClick={load} title="Refresh">
                <RefreshCw size={16} />
              </button>
            </header>

            {/* Stat cards */}
            <div className="admin-stats-grid">
              {statCards.map(c => (
                <div key={c.label} className="admin-stat-card" style={{ '--ac': c.color } as React.CSSProperties}>
                  <div className="admin-stat-card__icon">{c.icon}</div>
                  <div className="admin-stat-card__info">
                    <span className="admin-stat-card__value">{c.value}</span>
                    <span className="admin-stat-card__label">{c.label}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Filters + Search */}
            <div className="admin-toolbar">
              <div className="admin-filter-tabs">
                {filterTabs.map(t => (
                  <button
                    key={t.key}
                    className={`admin-filter-tab ${filterStatus === t.key ? 'active' : ''}`}
                    onClick={() => setFilterStatus(t.key)}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
              <div className="admin-search">
                <Search size={15} />
                <input
                  type="text"
                  placeholder="Search enquiries…"
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                />
              </div>
            </div>

            {/* Table */}
            <div className="admin-table-wrap">
              {filtered.length === 0 ? (
                <div className="admin-empty">
                  <Inbox size={48} />
                  <p>{enquiries.length === 0 ? 'No enquiries yet. Submit a form on the website to see it here.' : 'No results match your filter.'}</p>
                </div>
              ) : (
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Status</th>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Company</th>
                      <th>Services</th>
                      <th>Budget</th>
                      <th>Source</th>
                      <th>Date</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filtered.map(enq => (
                      <tr
                        key={enq.id}
                        className={`admin-table__row ${enq.status === 'new' ? 'admin-table__row--new' : ''}`}
                        onClick={() => handleRowClick(enq)}
                      >
                        <td onClick={e => e.stopPropagation()}>
                          <select
                            className="admin-status-select"
                            value={enq.status}
                            style={{ '--sc': statusConfig[enq.status].color } as React.CSSProperties}
                            onChange={e => handleStatusChange(enq.id, e.target.value as EnquiryStatus)}
                          >
                            {(['new', 'read', 'replied', 'closed'] as EnquiryStatus[]).map(s => (
                              <option key={s} value={s}>{statusConfig[s].label}</option>
                            ))}
                          </select>
                        </td>
                        <td className="admin-table__name">
                          {enq.status === 'new' && <span className="admin-table__dot" />}
                          {enq.name}
                        </td>
                        <td><a href={`mailto:${enq.email}`} className="admin-table__link" onClick={e => e.stopPropagation()}>{enq.email}</a></td>
                        <td>{enq.company || '—'}</td>
                        <td>
                          <div className="admin-table__tags">
                            {enq.services.slice(0, 2).map(s => (
                              <span key={s} className="admin-tag admin-tag--sm">{serviceLabels[s] || s}</span>
                            ))}
                            {enq.services.length > 2 && <span className="admin-tag admin-tag--sm admin-tag--more">+{enq.services.length - 2}</span>}
                            {enq.services.length === 0 && <span className="admin-muted">—</span>}
                          </div>
                        </td>
                        <td>{budgetLabels[enq.budget] || '—'}</td>
                        <td>
                          <span className={`admin-source-badge ${enq.source}`}>
                            {enq.source === 'modal' ? 'Modal' : 'Contact'}
                          </span>
                        </td>
                        <td className="admin-muted">{formatDate(enq.createdAt)}</td>
                        <td onClick={e => e.stopPropagation()}>
                          <div className="admin-table__actions">
                            <button className="admin-action-btn" title="View" onClick={() => handleRowClick(enq)}>
                              <Eye size={15} />
                            </button>
                            <button className="admin-action-btn admin-action-btn--danger" title="Delete" onClick={() => handleDelete(enq.id)}>
                              <Trash2 size={15} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </>
        )}

        {activeSection === 'blog' && <BlogManager />}
        {activeSection === 'seo' && <SeoManager />}
        {activeSection === 'scripts' && <ScriptsManager />}
      </main>

      {/* Detail modal */}
      {selected && activeSection === 'enquiries' && (
        <EnquiryDetail
          enquiry={selected}
          onClose={() => setSelected(null)}
          onStatusChange={handleStatusChange}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
}

/* ── Root ──────────────────────────────────────────────────── */
export default function Admin() {
  const [authed, setAuthed] = useState<boolean | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setAuthed(localStorage.getItem(AUTH_KEY) === '1');
    }
  }, []);

  const handleLogout = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(AUTH_KEY);
    }
    setAuthed(false);
  };

  const handleLogin = () => {
    setAuthed(true);
  };

  // Prevent flash or server mismatch
  if (authed === null) {
    return (
      <div className="admin-loading">
        <div className="admin-spinner" />
      </div>
    );
  }

  if (!authed) return <LoginScreen onLogin={handleLogin} />;
  return <Dashboard onLogout={handleLogout} />;
}
