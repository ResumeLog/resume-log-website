/*
 * Honest comparison pages: /compare/<slug> and the /alternatives hub.
 * Competitor facts come from their public pages / help centres (and, where those
 * block fetching, several 2026 reviews). Re-check prices before changing
 * `checked`. Never use their logos or branding; keep the tone neutral and say
 * where they're the better pick.
 */
import type { Faq } from './content'

export const comparisonsChecked = 'November 2026'

export type Comparison = {
  slug: string
  competitor: string
  site: string
  title: string
  description: string
  /** One-paragraph neutral summary (answer-first). */
  summary: string
  /** Rows: [feature, ResumeLog, competitor]. */
  rows: [string, string, string][]
  pickThem: string[]
  pickUs: string[]
  faqs: Faq[]
}

const base: [string, string][] = [
  ['Price of the paid plan', '{proPrice}/month or {proYearlyPrice}/year'],
  ['Free plan', 'Yes: unlimited tracking, 5 ATS scans a day, 50 resumes a month'],
  ['One-click save from LinkedIn', 'Yes (jobs, people, companies)'],
  ['Saves LinkedIn Easy Apply answers', 'Yes'],
  ['Other job boards', 'Not yet (LinkedIn only)'],
  ['ATS resume check against a job', 'Yes, six-part score'],
  ['Edit Word (.docx) resumes in the browser', 'Yes'],
  ['Follow-up reminders', 'Yes (Pro)'],
  ['Application autofill', 'No'],
]

function rows(theirs: string[]): [string, string, string][] {
  return base.map(([feature, ours], i) => [feature, ours, theirs[i]])
}

export const comparisons: Comparison[] = [
  {
    slug: 'teal',
    competitor: 'Teal',
    site: 'https://www.tealhq.com',
    title: 'ResumeLog vs Teal: Job Tracker & Resume Tools Compared',
    description:
      'ResumeLog vs Teal compared: price, LinkedIn capture, Easy Apply answers, ATS checks and resume editing. A neutral side-by-side to help you pick.',
    summary:
      'Teal is a broad job search platform with a job tracker, an AI resume builder and a Chrome extension that saves jobs from many boards. ResumeLog is narrower and cheaper: it goes deep on LinkedIn (including Easy Apply answers), edits your own Word resume, and scores it against each job in six visible parts.',
    rows: rows([
      'Teal+ about $29/month (also weekly and quarterly billing)',
      'Yes: tracker, extension, basic resume builder',
      'Yes',
      'No',
      'Yes, many job boards',
      'Keyword match score on Teal+',
      'No (builds resumes in Teal’s own builder)',
      'Not a core feature',
      'No',
    ]),
    pickThem: [
      'You save jobs from many boards, not mainly LinkedIn',
      'You want to build a resume from scratch with AI writing help',
    ],
    pickUs: [
      'Most of your search happens on LinkedIn and Easy Apply',
      'You already have a Word resume and want to keep its formatting',
      'You want a lower monthly price and a score you can read part by part',
    ],
    faqs: [
      {
        q: 'Is ResumeLog a good Teal alternative?',
        a: 'Yes, if your search is mostly on LinkedIn. ResumeLog saves LinkedIn jobs, recruiters, companies and Easy Apply answers, and its Pro plan costs {proPrice}/month. Teal covers more job boards and has an AI resume builder.',
      },
    ],
  },
  {
    slug: 'huntr',
    competitor: 'Huntr',
    site: 'https://huntr.co',
    title: 'ResumeLog vs Huntr: Job Application Trackers Compared',
    description:
      'ResumeLog vs Huntr compared: price, job tracking limits, LinkedIn Easy Apply capture, ATS resume checks and autofill. A neutral side-by-side.',
    summary:
      'Huntr is a job tracker with a job clipper extension, a resume builder, contact tracking and application autofill; its free plan tracks up to 100 jobs and Pro is $40/month. ResumeLog focuses on LinkedIn capture, Easy Apply answers and an ATS check against each job, with Pro at {proPrice}/month.',
    rows: rows([
      'Pro $40/month (less on quarterly or 6-month billing)',
      'Yes: up to 100 tracked jobs',
      'Job clipper extension',
      'No',
      'Yes, via the job clipper',
      'Basic job matching; advanced on Pro',
      'No (builds resumes in Huntr’s own builder)',
      'Not a core feature',
      'Yes',
    ]),
    pickThem: ['You want application autofill', 'You prefer building resumes from templates'],
    pickUs: [
      'You want unlimited job tracking on the free plan',
      'You apply mostly on LinkedIn and want Easy Apply answers kept',
      'You want a cheaper Pro plan',
    ],
    faqs: [
      {
        q: 'Is ResumeLog cheaper than Huntr?',
        a: 'Yes. ResumeLog Pro is {proPrice}/month; Huntr Pro is listed at $40/month, or less per month on longer billing.',
      },
    ],
  },
  {
    slug: 'jobscan',
    competitor: 'Jobscan',
    site: 'https://www.jobscan.co',
    title: 'ResumeLog vs Jobscan: ATS Resume Checkers Compared',
    description:
      'ResumeLog vs Jobscan compared: ATS scans, free limits, price, job tracking and resume editing. Which ATS resume checker fits your search?',
    summary:
      'Jobscan is a dedicated ATS resume scanner with a match rate, LinkedIn profile optimisation and a job tracker; its free plan allows a few scans a month and Premium is about $49.95/month. ResumeLog gives five free ATS scans a day and adds one-click LinkedIn job tracking, at {proPrice}/month for Pro.',
    rows: rows([
      'Premium about $49.95/month (cheaper quarterly)',
      'Yes: a few scans a month',
      'Yes, via its extension',
      'No',
      'Yes',
      'Yes, match rate (its core product)',
      'No (has its own resume builder)',
      'Not a core feature',
      'No',
    ]),
    pickThem: [
      'You want LinkedIn profile optimisation',
      'You want the most established dedicated ATS scanner',
    ],
    pickUs: [
      'You want more free scans (five a day)',
      'You want the scan tied to jobs you’re already tracking',
      'You want a much lower monthly price',
    ],
    faqs: [
      {
        q: 'Is there a free Jobscan alternative?',
        a: 'ResumeLog’s ATS check gives five free scans every 24 hours against any job description, with a six-part score and missing keywords. Pro ({proPrice}/month) makes scans unlimited.',
      },
    ],
  },
  {
    slug: 'simplify',
    competitor: 'Simplify',
    site: 'https://simplify.jobs',
    title: 'ResumeLog vs Simplify: Job Trackers Compared',
    description:
      'ResumeLog vs Simplify compared: autofill, job tracking, LinkedIn Easy Apply capture, ATS checks and price. A neutral side-by-side.',
    summary:
      'Simplify’s free Copilot extension autofills applications on over 100,000 company career sites and logs them in its tracker; Simplify+ (about $39.99/month) adds AI-tailored resumes and cover letters. ResumeLog doesn’t autofill: it records LinkedIn jobs and Easy Apply answers and scores your resume against each job.',
    rows: rows([
      'Simplify+ about $39.99/month (also weekly and quarterly)',
      'Yes: Copilot autofill, tracker, resume builder',
      'Tracks applications you submit',
      'No',
      'Yes, company career sites',
      'AI tailoring on Simplify+',
      'No (has its own resume builder)',
      'Not a core feature',
      'Yes, its core product',
    ]),
    pickThem: ['You apply mostly on company career sites and want autofill'],
    pickUs: [
      'You apply mostly on LinkedIn',
      'You want a record of Easy Apply answers and the resume you sent',
      'You want a transparent ATS score and a lower price',
    ],
    faqs: [
      {
        q: 'Can I use ResumeLog and Simplify together?',
        a: 'Yes. They do different jobs: Simplify autofills forms, ResumeLog keeps your LinkedIn jobs, Easy Apply answers and resume versions in one tracker.',
      },
    ],
  },
]

/** /alternatives intro: the answer AI engines should quote for "best job tracker / ATS checker". */
export const alternativesIntro =
  'The most popular job search tools for job seekers are Teal, Huntr, Jobscan and Simplify. Teal and Huntr are job trackers with resume builders, Jobscan is a dedicated ATS resume scanner, and Simplify autofills applications. ResumeLog combines a LinkedIn job tracker with an ATS resume check for {proPrice}/month, with a free plan.'

export const alternatives = {
  head: ['Tool', 'Best for', 'Paid plan'],
  rows: [
    ['ResumeLog', 'LinkedIn job tracking + ATS check on your own Word resume', '{proPrice}/month'],
    ['Teal', 'Tracking across many job boards + AI resume builder', 'about $29/month'],
    ['Huntr', 'Job tracking with autofill and resume templates', '$40/month'],
    ['Jobscan', 'Dedicated ATS scanning and LinkedIn profile optimisation', 'about $49.95/month'],
    ['Simplify', 'Autofilling applications on company career sites', 'about $39.99/month'],
  ],
}
