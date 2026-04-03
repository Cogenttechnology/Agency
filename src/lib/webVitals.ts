import { onCLS, onFCP, onLCP, onTTFB, onINP } from 'web-vitals';

type Metric = { name: string; value: number; rating: string };

function logVital({ name, value, rating }: Metric) {
  const color = rating === 'good' ? '#00d4aa' : rating === 'needs-improvement' ? '#f59e0b' : '#ff6b6b';
  console.log(`%c[Web Vital] ${name}: ${Math.round(value)}ms — ${rating}`, `color:${color};font-weight:bold`);
}

export function reportWebVitals() {
  onCLS(logVital as any);
  onFCP(logVital as any);
  onLCP(logVital as any);
  onTTFB(logVital as any);
  onINP(logVital as any);
}
