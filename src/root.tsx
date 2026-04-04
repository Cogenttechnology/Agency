import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLocation,
} from "react-router";

import type { Route } from "./+types/root";
import "./styles/globals.css";
import "./lib/gsap"; // registers GSAP plugins globally

import Cursor from "./components/Cursor/Cursor";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import { EnquiryProvider } from "./context/EnquiryContext";
import EnquiryModal from "./components/EnquiryModal/EnquiryModal";
import FloatingCTA from "./components/FloatingCTA/FloatingCTA";
import useLenis, { getLenis } from "./hooks/useLenis";
import { useEffect } from "react";
import { getSeoByPath } from "./lib/seoStore.server";
import { ScrollTrigger } from "./lib/gsap";
import { reportWebVitals } from "./lib/webVitals";
import { getScripts } from "./lib/scriptStore";

export async function loader({ request }: Route.LoaderArgs) {
  const url = new URL(request.url);
  const seo = getSeoByPath(url.pathname);
  return { seo };
}

export const meta: Route.MetaFunction = ({ data }: { data?: Awaited<ReturnType<typeof loader>> }) => {
  const seo = data?.seo;
  if (!seo) return [{ title: "Cogent Agency" }];

  return [
    { title: seo.title || seo.metaTitle || "Cogent Agency" },
    { name: "description", content: seo.metaDescription },
    { name: "keywords", content: seo.keywords },
    { property: "og:title", content: seo.metaTitle },
    { property: "og:description", content: seo.metaDescription },
    { property: "og:image", content: seo.ogImage },
    { property: "og:url", content: seo.canonical },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: seo.metaTitle },
    { name: "twitter:description", content: seo.metaDescription },
    { name: "twitter:image", content: seo.ogImage },
  ];
};

export const links: Route.LinksFunction = () => [
  { rel: "dns-prefetch", href: "https://fonts.googleapis.com" },
  { rel: "dns-prefetch", href: "https://fonts.gstatic.com" },
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Outfit:wght@400;600;700;800&family=Plus+Jakarta+Sans:wght@400;500;600&display=swap",
  },
];

// Layout is a pure HTML shell — no router hooks allowed here
export function Layout({ children }: { children: React.ReactNode }) {
  const scripts = typeof window !== 'undefined' ? getScripts() : [];
  const headScripts     = scripts.filter(s => s.enabled && s.placement === 'head');
  const bodyStartScripts = scripts.filter(s => s.enabled && s.placement === 'body_start');
  const bodyEndScripts  = scripts.filter(s => s.enabled && s.placement === 'body_end');

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#0a0a0f" />
        <Meta />
        <Links />
        {headScripts.map(s => (
          <script key={s.id} dangerouslySetInnerHTML={{ __html: s.code.replace(/<\/?script[^>]*>/gi, '') }} />
        ))}
      </head>
      <body>
        {bodyStartScripts.map(s => (
          <div key={s.id} dangerouslySetInnerHTML={{ __html: s.code }} />
        ))}
        {children}
        <ScrollRestoration />
        <Scripts />
        {bodyEndScripts.map(s => (
          <div key={s.id} dangerouslySetInnerHTML={{ __html: s.code }} />
        ))}
      </body>
    </html>
  );
}

// App runs inside the router — useLocation is safe here
export default function App() {
  const location = useLocation();
  const isAdmin = location.pathname === "/admin";
  useLenis();

  useEffect(() => { reportWebVitals(); }, []);

  useEffect(() => {
    const lenis = getLenis();
    if (lenis) {
      lenis.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo(0, 0);
    }
    ScrollTrigger.refresh();
  }, [location.pathname]);

  return (
    <EnquiryProvider>
      <Cursor />
      {!isAdmin && <Navbar />}
      <main className={!isAdmin ? "page-content" : ""}>
        <Outlet />
      </main>
      {!isAdmin && <Footer />}
      {!isAdmin && <EnquiryModal />}
      {!isAdmin && <FloatingCTA />}
    </EnquiryProvider>
  );
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details =
      error.status === 404
        ? "The requested page could not be found."
        : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main className="pt-16 p-4 container mx-auto">
      <h1>{message}</h1>
      <p>{details}</p>
      {stack && (
        <pre className="w-full p-4 overflow-x-auto">
          <code>{stack}</code>
        </pre>
      )}
    </main>
  );
}
