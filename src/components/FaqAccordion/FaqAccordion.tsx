import { useState } from 'react';
import { Plus } from 'lucide-react';

interface FaqItem {
  q: string;
  a: string;
}

interface FaqAccordionProps {
  items: FaqItem[];
  /** CSS class prefix, e.g. "svc" → "svc-faq-item", "about" → "about-faq-item" */
  classBase?: string;
}

export default function FaqAccordion({ items, classBase = 'svc' }: FaqAccordionProps) {
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  const b = `${classBase}-faq-item`;

  return (
    <>
      {items.map((item, i) => (
        <div key={item.q} className={`${b}${openIdx === i ? ` ${b}--open` : ''}`}>
          <button className={`${b}__trigger`} onClick={() => setOpenIdx(openIdx === i ? null : i)}>
            <span>{item.q}</span>
            <span className={`${b}__icon`}><Plus size={14} /></span>
          </button>
          <div className={`${b}__body`}>
            <div className={`${b}__body-inner`}>
              <p className={`${b}__answer`}>{item.a}</p>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}
