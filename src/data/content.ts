/*
 * Shared shapes for the content pages (landing, comparison, guide, FAQ).
 * Copy may contain `[label](/path)` links and `{proPrice}`; see components/RichText.tsx
 * and lib/pricing.ts `withPrice`.
 */

export type Faq = { q: string; a: string }

export type Block =
  | { type: 'p'; text: string }
  | { type: 'ul' | 'ol'; items: string[] }
  | { type: 'table'; head: string[]; rows: string[][]; caption?: string }

/** One question-led section: an H2, a 40–60 word direct answer, then optional detail. */
export type ContentSection = { id: string; heading: string; answer: string; blocks?: Block[] }

export type RelatedLink = { to: string; label: string }

/** `[label](/path)` → `label`, for meta descriptions and JSON-LD. */
export function plain(text: string): string {
  return text.replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
}
