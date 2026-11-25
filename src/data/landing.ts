/*
 * Search-intent landing pages: one route per thing people search for
 * ("job application tracker", "ATS resume checker", …). Rendered by
 * pages/Landing.tsx, registered in lib/seo.ts, prerendered + sitemapped.
 * Claims must match the product (see pages/Features.tsx).
 */
import type { ScreenKey } from '../lib/screens'
import type { ContentSection, Faq, RelatedLink } from './content'

export type LandingPage = {
  slug: string
  /** Short name used in nav, footer and breadcrumbs. */
  name: string
  title: string
  description: string
  h1: { lead: string; tail: string }
  /** Answer-first definition right under the H1 (40–60 words). */
  intro: string
  screen: ScreenKey
  sections: ContentSection[]
  faqs: Faq[]
  related: RelatedLink[]
}

export const landingPages: LandingPage[] = [
  {
    slug: 'job-application-tracker',
    name: 'Job application tracker',
    title: 'Free Job Application Tracker | ResumeLog',
    description:
      'Track every job application in one table. ResumeLog saves LinkedIn jobs in one click, keeps statuses, resumes and answers, and flags what needs a follow-up.',
    h1: { lead: 'A job application tracker', tail: 'that fills itself in.' },
    intro:
      'ResumeLog is a free job application tracker for Chrome. Press Save on a LinkedIn job and it lands in one sortable table with the full description, your status, salary expectation and the resume you sent, so you always know where every application stands.',
    screen: 'jobsTable',
    sections: [
      {
        id: 'what',
        heading: 'What is a job application tracker?',
        answer:
          'A job application tracker is one place that lists every job you’ve saved or applied to, with its status, dates, contacts and the documents you sent. It replaces scattered bookmarks, emails and spreadsheets, so you can follow up on time and prepare for interviews with the right details.',
      },
      {
        id: 'how',
        heading: 'How do I track my job applications with ResumeLog?',
        answer:
          'Install the Chrome extension, sign in with Google, and press Save on any LinkedIn job. The job appears in your tracker as Bookmarked. Move it to Applied, Interviewing, Negotiating, Accepted or Closed as things happen.',
        blocks: [
          {
            type: 'ol',
            items: [
              'Add ResumeLog to Chrome and sign in with Google (about two minutes).',
              'Open a job on LinkedIn and press Save in the side panel.',
              'Apply. With Easy Apply, your answers and resume are saved when you press Submit.',
              'Update the status as replies arrive; the dashboard works out your response rate.',
            ],
          },
        ],
      },
      {
        id: 'what-is-saved',
        heading: 'What does each row keep?',
        answer:
          'Each job keeps the title, company, location and the full job description, plus your status, salary expectation, the PDF resume you sent and any Easy Apply questions and answers. You choose which columns you see and can add your own.',
      },
      {
        id: 'vs-spreadsheet',
        heading: 'Is it better than a job search spreadsheet?',
        answer:
          'A spreadsheet works until you stop updating it. ResumeLog fills the row in when you press Save, keeps the job description after LinkedIn takes the posting down, and shows which applications have gone two weeks without a reply.',
        blocks: [
          {
            type: 'table',
            head: ['', 'Spreadsheet', 'ResumeLog'],
            rows: [
              ['Adding a job', 'Copy and paste by hand', 'One click on LinkedIn'],
              ['Job description', 'Lost when the posting closes', 'Saved in full'],
              ['Resume you sent', 'Separate folder', 'Attached to the job'],
              ['Follow-ups', 'Remember yourself', 'Flagged after two weeks (Pro)'],
              ['Response rate', 'Formulas', 'Worked out for you'],
            ],
          },
        ],
      },
    ],
    faqs: [
      {
        q: 'Is the job tracker free?',
        a: 'Yes. Saving jobs, people and companies and tracking them with statuses is free. Pro ({proPrice}/month or {proYearlyPrice}/year) adds follow-up reminders and unlimited ATS scans.',
      },
      {
        q: 'Can I track applications from sites other than LinkedIn?',
        a: 'One-click saving works on LinkedIn today. You can still check your resume against any job by pasting its description into the ATS check.',
      },
      {
        q: 'Does the tracker apply to jobs for me?',
        a: 'No. ResumeLog never submits applications. You apply; it remembers.',
      },
    ],
    related: [
      { to: '/linkedin-job-tracker', label: 'LinkedIn job tracker' },
      { to: '/job-search-organizer', label: 'Job search organizer' },
      { to: '/guides/how-to-track-job-applications', label: 'How to track job applications' },
    ],
  },
  {
    slug: 'job-tracker-chrome-extension',
    name: 'Job tracker Chrome extension',
    title: 'Job Tracker Chrome Extension | ResumeLog',
    description:
      'A free Chrome extension that saves LinkedIn jobs, companies and recruiters in one click and syncs them to your job tracker dashboard. No copy and paste.',
    h1: { lead: 'The job tracker', tail: 'that lives in Chrome.' },
    intro:
      'ResumeLog is a free Chrome extension that opens as a side panel next to LinkedIn. It recognises whether you’re on a job, a company page or a profile, and saves it to your job tracker in one click, with the full description, synced to your dashboard.',
    screen: 'extensionDetected',
    sections: [
      {
        id: 'what-it-does',
        heading: 'What does the ResumeLog Chrome extension do?',
        answer:
          'It saves what you’re looking at on LinkedIn. On a job it keeps the title, company, location and full description; on a company page, size, industry and location; on a profile, the person’s name, headline and company. Everything appears in your dashboard.',
      },
      {
        id: 'offline',
        heading: 'What happens if my connection drops?',
        answer:
          'Saves are stored in the extension first and then synced, so a dropped connection doesn’t lose anything. The side panel shows a history of what you’ve saved and whether it has synced.',
      },
      {
        id: 'permissions',
        heading: 'What can the extension see?',
        answer:
          'Only the job board page in front of you (LinkedIn, Indeed, Glassdoor, Ashby or Y Combinator), and nothing is saved until you press Save. Chrome’s install prompt says it can read data on all websites because we ask for all sites once, so new job boards work without another prompt. It doesn’t read other sites, your messages or your feed, and it never applies to jobs for you.',
      },
      {
        id: 'install',
        heading: 'How do I install it?',
        answer:
          'Add ResumeLog from the Chrome Web Store and pin it. The first time you open the side panel it asks you to sign in: the dashboard opens, you continue with Google, and the extension connects itself. There’s no new password.',
      },
    ],
    faqs: [
      { q: 'Is the extension free?', a: 'Yes. The extension and the job tracker are free.' },
      {
        q: 'Does it work in Edge or Brave?',
        a: 'Chromium browsers that install from the Chrome Web Store may work, but only Chrome is tested.',
      },
      {
        q: 'Which sites does it save from?',
        a: 'LinkedIn jobs, company pages and profiles today.',
      },
    ],
    related: [
      { to: '/job-application-tracker', label: 'Job application tracker' },
      { to: '/linkedin-job-tracker', label: 'LinkedIn job tracker' },
      { to: '/get-started', label: 'Get started in two minutes' },
    ],
  },
  {
    slug: 'linkedin-job-tracker',
    name: 'LinkedIn job tracker',
    title: 'LinkedIn Job Tracker & Easy Apply Log | ResumeLog',
    description:
      'Track LinkedIn jobs and Easy Apply applications automatically. ResumeLog saves the job, your answers and the resume you sent, so nothing gets lost.',
    h1: { lead: 'Track every LinkedIn job', tail: 'and every Easy Apply.' },
    intro:
      'ResumeLog is a LinkedIn job tracker for Chrome. It saves LinkedIn jobs, recruiters and companies in one click, and when you submit an Easy Apply it keeps the questions, your answers and the resume you uploaded, stored with the job in your tracker.',
    screen: 'jobDetail',
    sections: [
      {
        id: 'easy-apply',
        heading: 'How do I keep track of LinkedIn Easy Apply applications?',
        answer:
          'LinkedIn’s own “Applied” list doesn’t keep your answers or a copy of the job description. With ResumeLog installed, pressing Submit on Easy Apply saves the questions, your answers and the resume you sent against the job, so you can review them before a recruiter calls.',
      },
      {
        id: 'saved-jobs',
        heading: 'Why not just use LinkedIn’s saved jobs?',
        answer:
          'LinkedIn saved jobs can’t hold a status, your notes, the resume version you sent or a salary expectation, and closed postings lose their description. ResumeLog keeps all of that in a table you can sort, filter and customise.',
      },
      {
        id: 'people',
        heading: 'Can I track recruiters and hiring managers?',
        answer:
          'Yes. On a LinkedIn profile, press Save to keep the person’s name, headline and current company. Companies get their own list too, with size, industry and location.',
      },
    ],
    faqs: [
      {
        q: 'Does ResumeLog read my LinkedIn messages?',
        a: 'No. It only reads the page in front of you when you press Save, and the Easy Apply review screen when you press Submit.',
      },
      {
        q: 'Will LinkedIn know I’m using it?',
        a: 'ResumeLog only reads pages you open yourself and never clicks, applies or messages on your behalf.',
      },
    ],
    related: [
      { to: '/job-tracker-chrome-extension', label: 'Job tracker Chrome extension' },
      { to: '/job-application-tracker', label: 'Job application tracker' },
      { to: '/guides/how-to-follow-up-on-a-job-application', label: 'How to follow up on an application' },
    ],
  },
  {
    slug: 'ats-resume-checker',
    name: 'ATS resume checker',
    title: 'Free ATS Resume Checker & Keyword Scanner | ResumeLog',
    description:
      'Check your resume against any job description. ResumeLog’s free ATS scan scores six parts, lists missing keywords and shows specific fixes. 5 free scans a day.',
    h1: { lead: 'A free ATS resume checker', tail: 'for the job you’re applying to.' },
    intro:
      'ResumeLog’s ATS resume checker scans your resume against a specific job description and scores it out of 100 in six visible parts: keyword match, job title, sections, parseability, content and qualifications. You see missing keywords and specific fixes. Five scans a day are free.',
    screen: 'editorAts',
    sections: [
      {
        id: 'what-is-ats',
        heading: 'What is an ATS resume checker?',
        answer:
          'An ATS (applicant tracking system) resume checker compares your resume with a job description the way employer software does: it looks for the job’s keywords and checks your resume is easy to parse. It shows what’s missing before a recruiter ever sees it.',
      },
      {
        id: 'score',
        heading: 'How is the ATS score calculated?',
        answer:
          'Your score out of 100 is built from six parts, each with its reason. Click a found keyword to highlight it in your resume.',
        blocks: [
          {
            type: 'ul',
            items: [
              'Keyword match: which of the job’s keywords you have, and which are missing',
              'Job title: whether your resume reflects the role you’re applying for',
              'Sections: whether the standard sections are present',
              'Parseability: whether software can read the file cleanly',
              'Content: the substance of what you wrote',
              'Qualifications: how your experience lines up with the requirements',
            ],
          },
        ],
      },
      {
        id: 'how-to',
        heading: 'How do I check my resume against a job?',
        answer:
          'Upload your resume as a Word file, open it in the editor, then pick a job you saved from LinkedIn or paste any job description. Run the ATS check, add the missing keywords that are genuinely true for you, and publish a PDF.',
      },
      {
        id: 'free-vs-pro',
        heading: 'What’s free and what’s Pro?',
        answer:
          'Free: five scans every 24 hours, up to five missing keywords per resume and all passed checks. Pro ({proPrice}/month): unlimited scans, every missing keyword, every fix and your full scan history.',
      },
      {
        id: 'not-an-ats',
        heading: 'Is this an applicant tracking system for recruiters?',
        answer:
          'No. If you’re hiring, you need an applicant tracking system like Greenhouse or Lever. ResumeLog is for job seekers: it checks your resume against ATS-style matching and tracks your own applications.',
      },
    ],
    faqs: [
      {
        q: 'Do I have to save the job on LinkedIn first?',
        a: 'No. You can paste any job description into the ATS check.',
      },
      {
        q: 'Will adding keywords guarantee an interview?',
        a: 'No tool can promise that. The check shows gaps; only add keywords that honestly describe your experience.',
      },
    ],
    related: [
      { to: '/guides/what-is-an-ats', label: 'What is an ATS and how does it read resumes?' },
      { to: '/guides/how-to-tailor-your-resume', label: 'How to tailor your resume for each job' },
      { to: '/resume-manager', label: 'Resume manager' },
    ],
  },
  {
    slug: 'resume-manager',
    name: 'Resume manager',
    title: 'Resume Manager: Every Version, Every Job | ResumeLog',
    description:
      'Keep every tailored resume in one library, edit Word resumes in the browser, publish PDFs and attach the exact version you sent to each job application.',
    h1: { lead: 'A resume manager', tail: 'that knows which version you sent.' },
    intro:
      'ResumeLog is a resume manager for job seekers. Upload a Word resume, edit it in the browser with its formatting intact, publish tailored PDFs to one library, and attach the exact version you sent to each job, so “cv-final-v3.pdf” is never a mystery again.',
    screen: 'resumeLibrary',
    sections: [
      {
        id: 'versions',
        heading: 'How do I manage multiple resume versions?',
        answer:
          'Keep one base resume, then publish a tailored PDF for each kind of role or each important application. ResumeLog stores them together in a library; star the versions you use most and attach the right one to every job you track.',
      },
      {
        id: 'editor',
        heading: 'Can I edit my Word resume online?',
        answer:
          'Yes. Upload a .docx and edit it in the browser: fonts, lists, headings and comments are kept, and it saves as you go. When it’s ready, publish a PDF to your library in one click.',
      },
      {
        id: 'tailor',
        heading: 'How does it help me tailor a resume?',
        answer:
          'Run the [ATS check](/ats-resume-checker) against the job while you edit. It lists the job’s missing keywords and specific fixes, so each version is tailored to a real description instead of guesswork.',
      },
    ],
    faqs: [
      {
        q: 'Which file types does the editor support?',
        a: 'Upload Word (.docx) resumes to edit. Published versions are saved as PDF.',
      },
      {
        q: 'Is the resume manager free?',
        a: 'Yes, with monthly limits on Free: 50 resumes and 5 draft resumes a month. Pro ({proPrice}/month or {proYearlyPrice}/year) makes both unlimited.',
      },
    ],
    related: [
      { to: '/ats-resume-checker', label: 'ATS resume checker' },
      { to: '/guides/how-to-tailor-your-resume', label: 'How to tailor your resume' },
      { to: '/job-application-tracker', label: 'Job application tracker' },
    ],
  },
  {
    slug: 'job-search-organizer',
    name: 'Job search organizer',
    title: 'Job Search Organizer & Job Hunt CRM | ResumeLog',
    description:
      'Organise your whole job search: jobs, recruiters, companies, resumes and follow-ups in one dashboard, with a response rate and outcome funnel. Free to start.',
    h1: { lead: 'Your whole job search,', tail: 'organised in one place.' },
    intro:
      'ResumeLog is a job search organizer: a free Chrome extension plus a dashboard that keeps your jobs, recruiters, companies and resumes together. It shows your response rate, an outcome funnel from saved to accepted, and which applications need a follow-up.',
    screen: 'dashboard',
    sections: [
      {
        id: 'organize',
        heading: 'How do I organise my job search?',
        answer:
          'Keep one list of every job with a clear status, one place for every resume version, and a weekly check-in. ResumeLog does the first two as you browse LinkedIn; the dashboard makes the weekly check-in a two-minute job.',
        blocks: [
          {
            type: 'ol',
            items: [
              'Save every job you might apply to, as you find it.',
              'Tailor and attach the resume you send to each one.',
              'Update statuses as replies arrive.',
              'Once a week, follow up on anything quiet for two weeks.',
            ],
          },
        ],
      },
      {
        id: 'crm',
        heading: 'Is ResumeLog a job search CRM?',
        answer:
          'In practice, yes. Jobs, people and companies each have their own list, so you can see the recruiter and company behind an application. It isn’t a mass-outreach tool: it never sends messages or applications for you.',
      },
      {
        id: 'metrics',
        heading: 'How do I know if my job search is working?',
        answer:
          'The dashboard shows how many applications got a response by week (last 7 days, 30 days or 3 months) and a funnel from saved to accepted, so you can see whether the problem is getting replies or converting interviews.',
      },
    ],
    faqs: [
      {
        q: 'Does it replace my spreadsheet?',
        a: 'Yes. Rows fill themselves in from LinkedIn, and you can add your own columns.',
      },
      {
        q: 'Is my data private?',
        a: 'Your log is tied to your Google sign-in. Nobody else can see it and nothing is sold.',
      },
    ],
    related: [
      { to: '/job-application-tracker', label: 'Job application tracker' },
      { to: '/guides/how-to-track-job-applications', label: 'How to track job applications' },
      { to: '/alternatives', label: 'Job tracker alternatives compared' },
    ],
  },
]
