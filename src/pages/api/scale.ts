/**
 * Resource route: /scale
 * Serves the static Curious Apes lead-gen landing page from public/scale/index.html.
 * A plain static file wouldn't be reachable at the extensionless /scale path
 * because the app router intercepts it first — so we read and return it here.
 */

import { readFile } from 'node:fs/promises';
import path from 'node:path';
import type { Route } from './+types/scale';

export async function loader(_: Route.LoaderArgs) {
  const filePath = path.join(process.cwd(), 'public', 'scale', 'index.html');
  const html = await readFile(filePath, 'utf-8');
  return new Response(html, {
    headers: { 'Content-Type': 'text/html; charset=utf-8' },
  });
}
