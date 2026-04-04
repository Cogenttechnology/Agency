/* ── scriptStore.ts — persists custom tracking scripts in localStorage ── */

export interface TrackingScript {
  id: string;
  name: string;          // "Meta Pixel", "GTM", "GA4", etc.
  placement: 'head' | 'body_start' | 'body_end';
  code: string;          // raw HTML/JS snippet
  enabled: boolean;
}

const STORE_KEY = 'cogent_tracking_scripts';

export function getScripts(): TrackingScript[] {
  if (typeof window === 'undefined') return [];
  try {
    return JSON.parse(localStorage.getItem(STORE_KEY) || '[]');
  } catch {
    return [];
  }
}

export function saveScripts(scripts: TrackingScript[]): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORE_KEY, JSON.stringify(scripts));
}

export function addScript(script: Omit<TrackingScript, 'id'>): TrackingScript {
  const newScript: TrackingScript = { ...script, id: `script_${Date.now()}` };
  saveScripts([...getScripts(), newScript]);
  return newScript;
}

export function updateScript(id: string, updates: Partial<TrackingScript>): void {
  saveScripts(getScripts().map(s => s.id === id ? { ...s, ...updates } : s));
}

export function deleteScript(id: string): void {
  saveScripts(getScripts().filter(s => s.id !== id));
}
