/*
 * Every FAQ on the site. /faq shows all groups (FAQPage structured data);
 * /how-it-works shows the `howItWorks` picks. Keep answers factual and short:
 * AI answer engines and featured snippets quote them as-is.
 */
import type { Faq } from './content'

export type FaqGroup = { id: string; title: string; faqs: (Faq & { howItWorks?: boolean })[] }

export const faqGroups: FaqGroup[] = [
  {
    id: 'about',
    title: 'About ResumeLog',
    faqs: [
      {
        q: 'What is ResumeLog?',
        a: 'ResumeLog is a free Chrome extension and web dashboard for job seekers. It saves LinkedIn jobs, companies and recruiters in one click, tracks every application in one table, checks your resume against each job with an ATS scan, and reminds you to follow up.',
      },
      {
        q: 'Is ResumeLog free?',
        a: 'Yes. Unlimited jobs, people and companies, the resume editor (50 resumes and 5 draft resumes a month) and five ATS scans a day are free, with no time limit. Pro is {proPrice} a month or {proYearlyPrice} a year for unlimited scans and resumes, every keyword and fix, scan history, follow-up reminders, Google Calendar integration and a cover letter generator.',
      },
      {
        q: 'Is there an annual plan?',
        a: 'Yes. Pro is {proYearlyPrice} a year, {yearlySaving} less than paying {proPrice} a month. Monthly and yearly Pro include exactly the same features.',
      },
      {
        q: 'Is ResumeLog an applicant tracking system (ATS)?',
        a: 'No. An applicant tracking system is software employers use to manage candidates. ResumeLog is for job seekers: it tracks your own applications and checks your resume against a job description the way ATS keyword matching does, so you can fix gaps before you apply.',
      },
      {
        q: 'Does it apply to jobs for me?',
        a: 'No. ResumeLog never submits anything on your behalf. It records what you did.',
        howItWorks: true,
      },
      {
        q: 'Which browsers does it work in?',
        a: 'Chrome. Other Chromium browsers that install from the Chrome Web Store may work, but only Chrome is tested.',
        howItWorks: true,
      },
      {
        q: 'Does it work outside LinkedIn?',
        a: 'Saving works on LinkedIn today. The resume editor and ATS check work with any job: pick one you saved, or paste the description.',
        howItWorks: true,
      },
    ],
  },
  {
    id: 'job-tracking',
    title: 'Job application tracking',
    faqs: [
      {
        q: 'How do I track job applications with ResumeLog?',
        a: 'Install the Chrome extension and sign in with Google. On any LinkedIn job, press Save in the side panel: the job, with its full description, lands in your jobs table as Bookmarked. Change the status as you apply, interview and hear back.',
      },
      {
        q: 'What statuses can a job have?',
        a: 'Bookmarked, Applied, Interviewing, Negotiating, Accepted and Closed. Your response rate and outcome funnel on the dashboard are worked out from them.',
      },
      {
        q: 'Can I save recruiters and companies too?',
        a: 'Yes. On a LinkedIn profile the extension saves the person’s name, headline and current company. On a company page it saves size, industry and location. People and companies have their own lists in the dashboard.',
      },
      {
        q: 'Does ResumeLog save my LinkedIn Easy Apply answers?',
        a: 'Yes. When you press Submit on an Easy Apply form, ResumeLog keeps the questions, your answers and the resume you sent, stored against the job, so you can see exactly what you told them before an interview.',
      },
      {
        q: 'Why use a job tracker instead of a spreadsheet?',
        a: 'A spreadsheet only works if you keep typing into it. ResumeLog fills the row in for you when you press Save, including the full job description, which LinkedIn removes once a posting closes.',
      },
    ],
  },
  {
    id: 'ats',
    title: 'ATS resume checker',
    faqs: [
      {
        q: 'What is an ATS resume check?',
        a: 'An ATS resume check compares your resume with a specific job description and reports how well they match: which keywords you have, which are missing, and whether your resume is easy for applicant tracking software to read.',
      },
      {
        q: 'How is the ResumeLog ATS score calculated?',
        a: 'The score out of 100 is made of six parts you can see: keyword match, job title, sections, parseability, content and qualifications. Each part shows its reason, so you know what to change instead of guessing.',
      },
      {
        q: 'How many free ATS scans do I get?',
        a: 'Five scans every 24 hours on the free plan, with up to five missing keywords shown per resume. Pro gives unlimited scans, every missing keyword, every fix and your full scan history.',
      },
      {
        q: 'Can I check my resume against a job that isn’t on LinkedIn?',
        a: 'Yes. In the resume editor, pick a job you saved or paste any job description, then run the ATS check against it.',
      },
    ],
  },
  {
    id: 'resumes',
    title: 'Resumes',
    faqs: [
      {
        q: 'Can I keep several versions of my resume?',
        a: 'Yes. Upload a Word (.docx) resume, edit it in the browser with its formatting intact, and publish each tailored version as a PDF to your resume library. Free includes 50 resumes and 5 draft resumes a month; Pro is unlimited.',
      },
      {
        q: 'How do I remember which resume I sent to which job?',
        a: 'Attach the PDF you sent to the job in your tracker. With LinkedIn Easy Apply, the resume you uploaded is saved with the job automatically.',
      },
    ],
  },
  {
    id: 'privacy-pricing',
    title: 'Privacy and pricing',
    faqs: [
      {
        q: 'What does the extension read?',
        a: 'Only the LinkedIn page in front of you: when you press Save, and the Easy Apply review screen when you press Submit. Not your messages, not your feed.',
        howItWorks: true,
      },
      {
        q: 'Who can see my log?',
        a: 'Only you. Everything is tied to your Google sign-in and is never shared or sold. You can delete any entry at any time.',
        howItWorks: true,
      },
      {
        q: 'What does it cost?',
        a: 'Free covers saving, the job tracker, the editor and five ATS scans a day. Pro is {proPrice} a month or {proYearlyPrice} a year, with a 14-day money-back guarantee.',
        howItWorks: true,
      },
      {
        q: 'Can I get a refund?',
        a: 'Yes. Every payment has a 14-day money-back guarantee. You can cancel any time from your account settings or the link in your Paddle receipt, and keep access until the end of the period you paid for.',
      },
    ],
  },
]

/** All FAQs, flattened. */
export const allFaqs: Faq[] = faqGroups.flatMap((g) => g.faqs)

/** The short list shown on /how-it-works. */
export const faqs: Faq[] = allFaqs.filter((f) => 'howItWorks' in f && f.howItWorks)
