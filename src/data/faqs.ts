/** How-it-works FAQ. Also emitted as FAQPage structured data (src/lib/seo.ts). */
export const faqs: { q: string; a: string }[] = [
  { q: 'Does it apply to jobs for me?', a: 'No. ResumeLog never submits anything on your behalf. It records what you did.' },
  {
    q: 'What does the extension read?',
    a: 'Only the LinkedIn page in front of you: when you press Save, and the Easy Apply review screen when you press Submit. Not your messages, not your feed.',
  },
  {
    q: 'Who can see my log?',
    a: 'Only you. Everything is tied to your Google sign-in and is never shared or sold. You can delete any entry at any time.',
  },
  {
    q: 'Which browsers does it work in?',
    a: 'Chrome. Other Chromium browsers that install from the Chrome Web Store may work, but only Chrome is tested.',
  },
  {
    q: 'Does it work outside LinkedIn?',
    a: 'Saving works on LinkedIn today. The résumé editor and ATS check work with any job: pick one you saved, or paste the description.',
  },
  {
    q: 'What does it cost?',
    a: 'Free covers saving, the editor and five ATS scans a day. Pro is $12 a month with a 14-day money-back guarantee.',
  },
]
