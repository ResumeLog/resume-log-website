// Fictional demo data for website screenshots. No real people or companies.
import fs from 'node:fs';

const NOW = Date.now();
const DAY = 86400000;
const ago = (d, h = 10) => new Date(NOW - d * DAY + h * 3600000 - 12 * 3600000).toISOString();
let n = 0;
const uid = (p) => `${p}-0000-4000-8000-${String(++n).padStart(12, '0')}`;

const JD = fs.readFileSync(new URL('./fixtures/jd.txt', import.meta.url), 'utf8');
const desc = (title, company) =>
  `${title} at ${company}.\n\nYou'll join a small product team and own features end to end. We work in React and TypeScript, ship weekly, and care about performance and accessibility.\n\nRequirements\n- 4+ years building web apps\n- Strong React and TypeScript\n- Good written communication`;

const J = [
  // title, company, location, status, daysAgo, expectations
  ['Senior Frontend Engineer', 'Northwind Labs', 'Remote · APAC', 'Interviewing', 9, 4200],
  ['Frontend Engineer', 'Harbourline', 'Colombo, Sri Lanka', 'Applied', 21, 3000],
  ['React Developer', 'Tidewater Analytics', 'Remote', 'Applied', 17, 3500],
  ['Software Engineer, Web', 'Quillstack', 'Singapore', 'Negotiating', 26, 5200],
  ['UI Engineer', 'Lumen & Co.', 'Remote · EU', 'Applied', 33, 3800],
  ['Full Stack Engineer', 'Copperfield Health', 'Bengaluru, India', 'Closed', 40, 3200],
  ['Senior React Engineer', 'Atlas Freight', 'Remote', 'Interviewing', 12, 4800],
  ['Frontend Developer', 'Greenbay Studio', 'Colombo, Sri Lanka', 'Bookmarked', 1, 0],
  ['Product Engineer', 'Orbitly', 'Remote · APAC', 'Bookmarked', 2, 0],
  ['Web Platform Engineer', 'Kestrel Pay', 'Dubai, UAE', 'Applied', 6, 5000],
  ['Junior Frontend Engineer', 'Bluebell Learning', 'Remote', 'Closed', 52, 1800],
  ['TypeScript Engineer', 'Fernhill Systems', 'Melbourne, Australia', 'Applied', 15, 6000],
  ['Frontend Lead', 'Saltmarsh Media', 'Remote', 'Bookmarked', 3, 0],
  ['Design Engineer', 'Paperkite', 'Remote · Global', 'Interviewing', 19, 4500],
  ['Software Engineer', 'Riverstone Bank', 'Colombo, Sri Lanka', 'Closed', 61, 2600],
  ['React Native Developer', 'Wayfinder Travel', 'Remote', 'Bookmarked', 4, 0],
  ['Frontend Engineer II', 'Cobalt Robotics', 'Singapore', 'Applied', 2, 4400],
  ['Senior UI Developer', 'Marigold Retail', 'Remote · APAC', 'Accepted', 70, 5600],
  ['Web Developer', 'Hollow Pine', 'Kandy, Sri Lanka', 'Closed', 45, 1500],
  ['Frontend Engineer', 'Sparrow Insights', 'Remote', 'Bookmarked', 0, 0],
];
export const jobs = J.map(([title, company, location, status, d, expectations]) => ({
  id: uid('a1b2c3d4'),
  linkedinJobId: String(4100000000 + n * 7919),
  url: `https://www.linkedin.com/jobs/view/${4100000000 + n * 7919}/`,
  title, company, location, status, expectations,
  description: title === 'Senior Frontend Engineer' ? JD : desc(title, company),
  capturedAt: ago(d), createdAt: ago(d),
}));

const C = [
  ['Northwind Labs', 'Software Development', '51-200 employees', 'Remote', 9],
  ['Quillstack', 'Financial Services', '201-500 employees', 'Singapore', 26],
  ['Atlas Freight', 'Transportation & Logistics', '501-1,000 employees', 'Rotterdam, Netherlands', 12],
  ['Paperkite', 'Design Services', '11-50 employees', 'Wellington, New Zealand', 19],
  ['Harbourline', 'Maritime', '201-500 employees', 'Colombo, Sri Lanka', 21],
  ['Kestrel Pay', 'Fintech', '51-200 employees', 'Dubai, UAE', 6],
  ['Tidewater Analytics', 'Data & Analytics', '11-50 employees', 'Remote', 17],
  ['Fernhill Systems', 'IT Services', '1,001-5,000 employees', 'Melbourne, Australia', 15],
];
export const companies = C.map(([name, industry, size, location, d]) => ({
  id: uid('c0ffee00'),
  linkedinCompanySlug: name.toLowerCase().replace(/[^a-z]+/g, '-'),
  url: `https://www.linkedin.com/company/${name.toLowerCase().replace(/[^a-z]+/g, '-')}/`,
  name, industry, size, location, capturedAt: ago(d, 9), createdAt: ago(d, 9),
}));

const P = [
  ['Priya Raman', 'Engineering Manager, Web', 'Northwind Labs', 8],
  ['Daniel Okafor', 'Technical Recruiter', 'Atlas Freight', 12],
  ['Sofia Lindqvist', 'Head of Design', 'Paperkite', 18],
  ['Kasun Perera', 'Senior Software Engineer', 'Harbourline', 20],
  ['Mei Tanaka', 'Talent Partner', 'Quillstack', 25],
  ['Arjun Mehta', 'Staff Engineer', 'Kestrel Pay', 6],
];
export const people = P.map(([name, headline, currentCompany, d]) => ({
  id: uid('beef0000'),
  linkedinProfileSlug: name.toLowerCase().replace(/ /g, '-') + '-demo',
  url: `https://www.linkedin.com/in/${name.toLowerCase().replace(/ /g, '-')}-demo/`,
  name, headline, currentCompany, capturedAt: ago(d, 8), createdAt: ago(d, 8),
}));

export const me = {
  id: uid('11111111'), email: 'jordan.ellis@example.com', firstName: 'Jordan', lastName: 'Ellis',
  pictureUrl: '', paddleCustomerId: null,
};

const FEATURES = ['jobs.tracked','companies.tracked','people.tracked','boards.indeed','applications.easy_apply','cv.job_attachments','resumes.files','editor.files','editor.publish_pdf','ats.scans','ats.missing_keywords','ats.fix_details','ats.history','dashboard.follow_ups','dashboard.outcome_funnel','dashboard.recent_activity','cover_letter.generator','auth.sso','support.direct_channel'];
const LIMITS = new Set(['jobs.tracked','companies.tracked','people.tracked','resumes.files','editor.files','ats.scans']);
export const entitlements = {
  plan: { id: 'plan-pro', name: 'Pro' },
  features: Object.fromEntries(FEATURES.map((k) => [k, LIMITS.has(k)
    ? { kind: 'limit', enabled: true, limit: null, resetPeriod: k === 'ats.scans' ? 'rolling_24h' : 'none', used: 3 }
    : { kind: 'flag', enabled: !['auth.sso','support.direct_channel'].includes(k), limit: null, resetPeriod: 'none', used: null }])),
};

const plan = (id, name, description, price, details) => ({
  id, name, description, price, currency: 'USD', interval: 'month', isActive: true,
  details: details.map((label, i) => ({ label, sortOrder: i })),
});
export const subscriptions = [
  plan('plan-free', 'Free', 'Everything you need to start logging your job search.', '0.00',
    ['Up to 5 ATS scans per day', 'See up to 5 missing keywords per resume', 'View all passed ATS checks']),
  plan('plan-pro', 'Pro', 'For active job seekers who want every application remembered.', '12.00',
    ['Unlimited ATS scans', 'Unlimited missing keywords', 'See all ATS fixes and passed points', 'Unlimited ATS history', 'Follow-ups & reminders']),
];
export const mySubscription = {
  id: uid('5ub50000'), status: 'active', currentPeriodStart: ago(10), currentPeriodEnd: ago(-20),
  canceledAt: null, subscription: subscriptions[1],
};

export const resumes = [
  ['Jordan Ellis – Frontend (Northwind).pdf', 2, true],
  ['Jordan Ellis – Resume 2026.pdf', 14, false],
  ['Jordan Ellis – Full Stack.pdf', 30, false],
  ['Jordan Ellis – Design Engineer.pdf', 19, false],
].map(([fileName, d, favorite]) => ({
  id: uid('f11e0000'), fileName, size: 43724, contentType: 'application/pdf', uploadedAt: ago(d), favorite,
}));
export const editorFiles = [
  ['Jordan Ellis – Frontend.docx', 1, true],
  ['Jordan Ellis – Base resume.docx', 22, false],
].map(([fileName, d, favorite]) => ({
  id: uid('d0c00000'), fileName, size: 8651, contentType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', uploadedAt: ago(d), favorite,
}));

const atsResult = JSON.parse(fs.readFileSync(new URL('./fixtures/ats-result.json', import.meta.url), 'utf8'));
export const atsScan = {
  id: uid('a75c0000'), documentId: editorFiles[0].id, jobId: jobs[0].id,
  jobTitle: jobs[0].title, company: jobs[0].company, jobDescription: JD,
  score: atsResult.score, algorithmVersion: atsResult.algorithmVersion, createdAt: ago(0, 9), result: atsResult,
};

export const cv = [{ jobId: jobs[0].id, fileName: resumes[0].fileName, size: 43724, contentType: 'application/pdf', submittedAt: ago(9) }];
