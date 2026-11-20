/*
 * What each plan includes: the Figma "PlanComparison" grid (ResumeLog file,
 * node 892:468), verbatim. Same rows as resume-log-be `/entitlements/comparison`.
 * Cells are [Free, Pro, Enterprise]. Update together with the DB / Figma.
 */

export type ComparisonCell = { included: boolean; label: string }
export type ComparisonRow = { key: string; cells: [ComparisonCell, ComparisonCell, ComparisonCell] }
export type ComparisonGroup = { name: string; rows: ComparisonRow[] }

/** Column order of `cells`. */
export const comparisonPlans = ['Free', 'Pro', 'Enterprise'] as const

const yes = (label: string): ComparisonCell => ({ included: true, label })
const no = (label: string): ComparisonCell => ({ included: false, label })
const all = (label: string): ComparisonRow['cells'] => [yes(label), yes(label), yes(label)]
const paid = (label: string): ComparisonRow['cells'] => [no(label), yes(label), yes(label)]
const enterpriseOnly = (label: string): ComparisonRow['cells'] => [no(label), no(label), yes(label)]

export const planComparison: ComparisonGroup[] = [
  {
    name: 'Records',
    rows: [
      { key: 'jobs.tracked', cells: all('Unlimited jobs') },
      { key: 'people.tracked', cells: all('Unlimited people') },
      { key: 'companies.tracked', cells: all('Unlimited companies') },
      { key: 'resumes.files', cells: [yes('50 resumes per month'), yes('Unlimited resumes'), yes('Unlimited resumes')] },
    ],
  },
  {
    name: 'Documents',
    rows: [
      {
        key: 'editor.files',
        cells: [yes('5 draft resumes per month'), yes('Unlimited draft resumes'), yes('Unlimited draft resumes')],
      },
      { key: 'cover_letter.generator', cells: paid('Cover letter generator') },
      { key: 'editor.publish_pdf', cells: all('Publish as PDF') },
    ],
  },
  {
    name: 'ATS',
    rows: [
      { key: 'ats.scans', cells: [yes('5 scans per 24 hours'), yes('Unlimited scans'), yes('Unlimited scans')] },
      {
        key: 'ats.missing_keywords',
        cells: [yes('5 missing keywords'), yes('Every missing keyword'), yes('Every missing keyword')],
      },
      { key: 'ats.fix_count', cells: all('Fix count only') },
      { key: 'ats.fix_details', cells: paid('Fix suggestions') },
      {
        key: 'ats.history',
        cells: [no('Latest scan only'), yes('Unlimited scan history'), yes('Unlimited scan history')],
      },
    ],
  },
  {
    name: 'Integrations',
    rows: [
      { key: 'dashboard.follow_ups', cells: paid('Follow-ups and reminders') },
      { key: 'integrations.google_calendar', cells: paid('Google Calendar integration') },
    ],
  },
  {
    name: 'Security and support',
    rows: [
      { key: 'auth.sso', cells: enterpriseOnly('SAML / SSO') },
      { key: 'support.direct_channel', cells: enterpriseOnly('Direct support channel') },
    ],
  },
]

/** A plan's included features, in table order (for llms.txt and card summaries). */
export function includedFeatures(planIndex: 0 | 1 | 2): string[] {
  return planComparison.flatMap((g) => g.rows.map((r) => r.cells[planIndex])).filter((c) => c.included).map((c) => c.label)
}
