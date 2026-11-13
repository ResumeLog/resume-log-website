/** The build date, e.g. "November 14, 2026" — identical in the prerendered HTML and the hydrated page. */
export function formatEffectiveDate(): string {
  return new Date(`${__BUILD_DATE__}T00:00:00Z`).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
  })
}
