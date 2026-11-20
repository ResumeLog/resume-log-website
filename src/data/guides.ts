/*
 * /guides/<slug>: long-form, answer-first articles for informational searches
 * and AI answer engines. Every H2 is a question with a 40–60 word answer first.
 * No invented statistics. Bump `updated` when the content changes (it feeds
 * dateModified and the sitemap lastmod).
 */
import type { ContentSection, Faq, RelatedLink } from './content'

export type Guide = {
  slug: string
  title: string
  /** H1 / card title. */
  headline: string
  description: string
  /** TL;DR shown at the top; also the Article description. */
  summary: string
  published: string
  updated: string
  readMinutes: number
  /** Ordered steps also emitted as HowTo structured data. */
  howTo?: { name: string; steps: { name: string; text: string }[] }
  sections: ContentSection[]
  faqs: Faq[]
  related: RelatedLink[]
}

export const guides: Guide[] = [
  {
    slug: 'how-to-track-job-applications',
    title: 'How to Track Job Applications (Step by Step) | ResumeLog',
    headline: 'How to track job applications without it becoming a second job',
    description:
      'A simple system to track job applications: what to record, which statuses to use, when to follow up, and how to keep it up to date in minutes a week.',
    summary:
      'Record every job the moment you find it, keep one status per application, store the exact resume and answers you sent, and review once a week to follow up on anything quiet for two weeks. A tracker that fills itself in is the one you’ll keep using.',
    published: '2026-11-18',
    updated: '2026-11-18',
    readMinutes: 6,
    howTo: {
      name: 'How to track job applications',
      steps: [
        { name: 'Capture every job when you find it', text: 'Save the job with its full description before you apply, so you have it after the posting closes.' },
        { name: 'Use a fixed set of statuses', text: 'Bookmarked, Applied, Interviewing, Negotiating, Accepted, Closed.' },
        { name: 'Attach what you sent', text: 'Keep the exact resume version and any application answers with the job.' },
        { name: 'Note the people', text: 'Record the recruiter or hiring manager and the company alongside the job.' },
        { name: 'Review weekly', text: 'Update statuses and follow up on applications with no reply after about two weeks.' },
      ],
    },
    sections: [
      {
        id: 'why',
        heading: 'Why should you track job applications?',
        answer:
          'Because a recruiter can call weeks after you applied. Tracking tells you which job it was, what the description said, which resume you sent and what you answered, and it shows which applications need a follow-up. It also shows whether your search is working.',
      },
      {
        id: 'what-to-record',
        heading: 'What should you record for each application?',
        answer:
          'At minimum: job title, company, link, the full job description, date applied, status, the resume version you sent and any screening answers. Useful extras: salary expectation, the recruiter’s name, and notes from each conversation.',
        blocks: [
          {
            type: 'table',
            head: ['Field', 'Why it matters'],
            rows: [
              ['Full job description', 'Postings get taken down; you’ll need it to prepare for interviews'],
              ['Resume version sent', 'So you can talk to what they actually read'],
              ['Screening answers', 'Notice period, salary and visa answers must stay consistent'],
              ['Date applied', 'Tells you when to follow up'],
              ['Status', 'One glance at where every application stands'],
              ['Contact', 'Who to follow up with'],
            ],
          },
        ],
      },
      {
        id: 'statuses',
        heading: 'Which statuses should you use?',
        answer:
          'Keep it short and fixed: Bookmarked (found, not applied), Applied, Interviewing, Negotiating, Accepted and Closed. Fewer statuses mean less to maintain, and a fixed set lets you count your response rate and see where applications tend to stall.',
      },
      {
        id: 'spreadsheet-or-app',
        heading: 'Should you use a spreadsheet or a job tracker app?',
        answer:
          'A spreadsheet is fine for a handful of applications. Past that, the copy-and-paste becomes the reason people stop updating it. A job tracker app that saves the job in one click, keeps the description and flags follow-ups removes that friction.',
        blocks: [
          {
            type: 'p',
            text: 'ResumeLog is one option: a free [job application tracker](/job-application-tracker) that saves LinkedIn jobs from a Chrome side panel. See [how the popular trackers compare](/alternatives).',
          },
        ],
      },
      {
        id: 'routine',
        heading: 'How often should you update your tracker?',
        answer:
          'Capture jobs as you find them, update a status when something happens, and do one weekly review. In that review, follow up on anything quiet for two weeks, close what’s clearly dead, and look at your response rate to decide what to change.',
      },
    ],
    faqs: [
      {
        q: 'What is the best way to keep track of job applications?',
        a: 'Use one list with a fixed set of statuses, save the full job description and the resume you sent with each application, and review it weekly. A tracker that fills itself in from the job page is the easiest to keep up.',
      },
      {
        q: 'How many job applications should I track?',
        a: 'All of them, including ones you only bookmarked. Your response rate is only meaningful if every application is counted.',
      },
    ],
    related: [
      { to: '/job-application-tracker', label: 'Free job application tracker' },
      { to: '/guides/how-to-follow-up-on-a-job-application', label: 'How to follow up on an application' },
      { to: '/alternatives', label: 'Job tracker alternatives compared' },
    ],
  },
  {
    slug: 'what-is-an-ats',
    title: 'What Is an ATS and How Does It Read Your Resume? | ResumeLog',
    headline: 'What is an ATS, and how do you get your resume past it?',
    description:
      'What an applicant tracking system (ATS) is, how it reads resumes, what actually matters (keywords, titles, parseable formatting) and the myths to ignore.',
    summary:
      'An ATS is software employers use to collect and organise applications. It parses your resume into fields and lets recruiters search and filter by keywords. To do well: mirror the job’s real keywords and title, use standard section headings, and keep the formatting simple enough to parse.',
    published: '2026-11-18',
    updated: '2026-11-18',
    readMinutes: 7,
    sections: [
      {
        id: 'definition',
        heading: 'What is an ATS?',
        answer:
          'An applicant tracking system (ATS) is software companies use to receive, store and manage job applications. It parses each resume into structured fields such as name, experience and skills, and lets recruiters search, filter and move candidates through hiring stages. Greenhouse, Lever and Workday are common examples.',
      },
      {
        id: 'how-it-reads',
        heading: 'How does an ATS read a resume?',
        answer:
          'It extracts text from your file and maps it to fields: contact details, job titles, employers, dates, education and skills. Recruiters then search that data by keyword or filter on answers to screening questions. If text can’t be extracted cleanly, the parsed profile can come out incomplete.',
      },
      {
        id: 'rejection-myth',
        heading: 'Does an ATS automatically reject resumes?',
        answer:
          'Usually not on its own. Most rejections come from people, or from knockout screening questions the employer configured, such as work authorisation. What the ATS does do is decide what a recruiter sees when they search, so a resume missing the job’s keywords is easy to overlook.',
      },
      {
        id: 'what-matters',
        heading: 'What actually helps a resume in an ATS?',
        answer:
          'Matching the job’s real language, a recognisable job title, standard sections and a file that parses cleanly. These are the same things a recruiter skimming for ten seconds looks for, so optimising for one helps with the other.',
        blocks: [
          {
            type: 'ul',
            items: [
              'Use the job’s exact terms for skills you genuinely have (e.g. “PostgreSQL”, not just “databases”)',
              'Put a title close to the role’s title near the top',
              'Use standard headings: Experience, Education, Skills',
              'Avoid text inside images, and keep tables and columns simple',
              'Save as .docx or a text-based PDF',
            ],
          },
        ],
      },
      {
        id: 'check',
        heading: 'How can you check your resume against an ATS?',
        answer:
          'Run an ATS resume check against the specific job description. It lists the keywords you have and the ones you’re missing, and flags parsing or structure problems. Then edit honestly and check again.',
        blocks: [
          {
            type: 'p',
            text: 'ResumeLog’s [free ATS resume checker](/ats-resume-checker) scores your resume in six visible parts against the job you saved or any pasted description. Five scans a day are free.',
          },
        ],
      },
    ],
    faqs: [
      {
        q: 'What does ATS stand for?',
        a: 'Applicant tracking system: software employers use to collect, organise and search job applications.',
      },
      {
        q: 'Is a PDF or Word resume better for an ATS?',
        a: 'Both usually work if the PDF is text-based (not a scanned image). Word (.docx) is the safest when an employer doesn’t say.',
      },
      {
        q: 'Should I copy the whole job description into my resume?',
        a: 'No. Use the job’s language for skills and experience you really have. Keyword stuffing is obvious to the human who reads it next.',
      },
    ],
    related: [
      { to: '/ats-resume-checker', label: 'Free ATS resume checker' },
      { to: '/guides/how-to-tailor-your-resume', label: 'How to tailor your resume for each job' },
      { to: '/compare/jobscan', label: 'ResumeLog vs Jobscan' },
    ],
  },
  {
    slug: 'how-to-follow-up-on-a-job-application',
    title: 'How to Follow Up on a Job Application (+ Timing) | ResumeLog',
    headline: 'How (and when) to follow up on a job application',
    description:
      'When to follow up on a job application, who to contact, what to write, and how many times. A short, practical guide with a message template.',
    summary:
      'Follow up about two weeks after applying if you’ve heard nothing, preferably with a named recruiter or hiring manager. Keep it to three or four sentences: the role, one line on fit, and a polite question. Follow up once more after another week or so, then move on.',
    published: '2026-11-18',
    updated: '2026-11-18',
    readMinutes: 5,
    sections: [
      {
        id: 'when',
        heading: 'When should you follow up on a job application?',
        answer:
          'About two weeks after applying, if you haven’t heard anything. Sooner if the posting gave a closing date that has passed, or if you have a competing offer. After an interview, send a thank-you within a day and follow up if the timeline they gave you passes.',
      },
      {
        id: 'who',
        heading: 'Who should you send the follow-up to?',
        answer:
          'A named person beats a generic inbox: the recruiter on the posting, the hiring manager, or someone on the team you’ve spoken to. LinkedIn is a reasonable channel if you don’t have an email address.',
      },
      {
        id: 'what',
        heading: 'What should a follow-up message say?',
        answer:
          'Name the role and when you applied, add one specific line about why you fit, and ask whether there’s an update on the timeline. Keep it short, friendly and easy to answer.',
        blocks: [
          {
            type: 'p',
            text: 'Template: “Hi [name], I applied for the [role] position on [date] and wanted to check in. My experience with [one relevant thing] lines up closely with what the team needs. Is there any update on the timeline? Thanks, [you]”',
          },
        ],
      },
      {
        id: 'how-many',
        heading: 'How many times should you follow up?',
        answer:
          'Once, then once more after another week or so. If there’s still no reply, mark the application closed and put the time into new ones. A tracker that shows how long each application has waited makes this easy to keep straight.',
        blocks: [
          {
            type: 'p',
            text: 'ResumeLog Pro lists applications with no reply after two weeks, oldest first, on your dashboard. See the [job application tracker](/job-application-tracker).',
          },
        ],
      },
    ],
    faqs: [
      {
        q: 'Is it OK to follow up on a job application?',
        a: 'Yes. A short, polite follow-up after about two weeks is normal and can put your application back in front of a person.',
      },
      {
        q: 'Should I follow up by email or LinkedIn?',
        a: 'Email if you have a named contact’s address; otherwise a LinkedIn message to the recruiter or hiring manager.',
      },
    ],
    related: [
      { to: '/guides/how-to-track-job-applications', label: 'How to track job applications' },
      { to: '/linkedin-job-tracker', label: 'LinkedIn job tracker' },
      { to: '/job-search-organizer', label: 'Job search organizer' },
    ],
  },
  {
    slug: 'how-to-tailor-your-resume',
    title: 'How to Tailor Your Resume for Each Job | ResumeLog',
    headline: 'How to tailor your resume for each job in 15 minutes',
    description:
      'A fast, repeatable way to tailor your resume to a job description: pick the keywords, adjust title and summary, reorder bullets, keep versions organised.',
    summary:
      'Start from one strong base resume. For each job, pull out the five to ten requirements that matter most, mirror their wording where it’s true for you, adjust your title and summary, reorder bullets so the most relevant come first, run an ATS check, and save the version with the job.',
    published: '2026-11-18',
    updated: '2026-11-18',
    readMinutes: 6,
    howTo: {
      name: 'How to tailor a resume to a job description',
      steps: [
        { name: 'Read the job for requirements', text: 'List the five to ten skills and responsibilities the description repeats or puts first.' },
        { name: 'Mirror the wording', text: 'Use the job’s terms for skills and tools you genuinely have.' },
        { name: 'Adjust title and summary', text: 'Make the top third of the page read like the role you’re applying for.' },
        { name: 'Reorder bullets', text: 'Move the most relevant achievements to the top of each role.' },
        { name: 'Run an ATS check', text: 'Compare against the job description and fix honest gaps.' },
        { name: 'Save the version with the job', text: 'Keep the exact PDF you sent attached to the application.' },
      ],
    },
    sections: [
      {
        id: 'why',
        heading: 'Why tailor your resume for each job?',
        answer:
          'Recruiters and ATS searches look for the specific skills in the job description. A tailored resume puts those first, in the job’s own words, so both the software and the person skimming it see the match quickly. A generic resume makes them do the work.',
      },
      {
        id: 'keywords',
        heading: 'How do you find the right keywords?',
        answer:
          'Look for skills, tools and responsibilities the description repeats, lists under requirements, or mentions first. Those are the keywords. Use the exact form they use (an acronym or the full name) and only for things you can talk about in an interview.',
      },
      {
        id: 'how-much',
        heading: 'How much should you change for each application?',
        answer:
          'Usually the title line, the summary, the skills section and the order of bullets: about 15 minutes. Rewrite more only for roles you really want. Keep a base resume so you’re editing, not starting over.',
      },
      {
        id: 'organise',
        heading: 'How do you keep tailored versions organised?',
        answer:
          'Name versions by role or company, keep them in one library, and attach the exact file you sent to the job you’re tracking. When the recruiter calls, you’ll know what they read.',
        blocks: [
          {
            type: 'p',
            text: 'ResumeLog’s [resume manager](/resume-manager) edits Word resumes in the browser, publishes PDFs to a library, and runs the [ATS check](/ats-resume-checker) against the job while you edit.',
          },
        ],
      },
    ],
    faqs: [
      {
        q: 'Is it worth tailoring a resume for every job?',
        a: 'For jobs you genuinely want, yes. A 15-minute pass on title, summary, skills and bullet order is usually enough.',
      },
      {
        q: 'Can I use the same resume for similar jobs?',
        a: 'Yes. Keep one tailored version per type of role and adjust only the details for each company.',
      },
    ],
    related: [
      { to: '/ats-resume-checker', label: 'Free ATS resume checker' },
      { to: '/resume-manager', label: 'Resume manager' },
      { to: '/guides/what-is-an-ats', label: 'What is an ATS?' },
    ],
  },
]
