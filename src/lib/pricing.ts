/*
 * Price helpers for copy. Plans are hard-coded in src/data/pricing.ts (no API
 * call), so every page, the JSON-LD and llms.txt render the same prices.
 */
import { formatUsd, proPlan, yearlySaving } from '../data/pricing'

/** Pro's monthly price, e.g. "$11.99". */
export function proPrice(): string {
  return formatUsd(proPlan.monthly!)
}

/** Pro's yearly price, e.g. "$129.49". */
export function proYearlyPrice(): string {
  return formatUsd(proPlan.yearly!)
}

/** Replaces `{proPrice}`, `{proYearlyPrice}` and `{yearlySaving}` in copy. */
export function withPrice(text: string): string {
  return text
    .replaceAll('{proPrice}', proPrice())
    .replaceAll('{proYearlyPrice}', proYearlyPrice())
    .replaceAll('{yearlySaving}', `${yearlySaving(proPlan)}%`)
}
