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
import useLenis, { getLenis } from "./hooks/useLenis";
import { useEffect } from "react";
import { getSeoByPath } from "./lib/seoStore.server";
import { ScrollTrigger } from "./lib/gsap";
import { reportWebVitals } from "./lib/webVitals";

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
  // DNS prefetch as a fast non-blocking hint
  { rel: "dns-prefetch", href: "https://fonts.googleapis.com" },
  { rel: "dns-prefetch", href: "https://fonts.gstatic.com" },
  // Preconnect to establish early TLS handshake
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  // Load fonts — display=swap prevents FOIT
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Outfit:wght@400;600;700;800&family=Plus+Jakarta+Sans:wght@400;500;600&display=swap",
  },
];

export function Layout({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const isAdmin = location.pathname === "/admin";

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#0a0a0f" />
        <Meta />
        <Links />
      </head>
      <body>
        <EnquiryProvider>
          <Cursor />
          {!isAdmin && <Navbar />}
          <main className={!isAdmin ? "page-content" : ""}>
            {children}
          </main>
          {!isAdmin && <Footer />}
          {!isAdmin && <EnquiryModal />}
        </EnquiryProvider>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  const location = useLocation();
  useLenis();

  useEffect(() => { reportWebVitals(); }, []);

  useEffect(() => {
    const lenis = getLenis();
    if (lenis) {
      lenis.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo(0, 0);
    }
    // After route change + scroll reset, re-measure scroll positions
    ScrollTrigger.refresh();
  }, [location.pathname]);

  return <Outlet />;
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
