import LegalPage, { type LegalSection } from '../components/LegalPage'

const sections: LegalSection[] = [
  {
    heading: '1. Information We Collect and How We Collect It',
    paragraphs: [
      'This Privacy Policy describes how ResumeLog ("we", "us", or "our") collects, handles, stores, uses, and shares your information when you use our website, web application, and browser extension (collectively, the "Service").',
      'To provide our core functionality of tracking job applications, we collect the following user data:',
    ],
    bullets: [
      'Personally Identifiable Information: We collect your Name and Email Address directly from you when you actively submit them to create a ResumeLog account.',
      'Authentication Information: Passwords or secure authentication tokens generated when you log in.',
      'User-Generated Content: Data you actively input and save into our application, including job titles, company names, recruiter contact details, application statuses, and personal notes.',
      'Website Content (Extension Data): When you actively click the ResumeLog extension to save a job, the extension reads the text (DOM elements) and URL of the specific job board page you are currently viewing to extract relevant job details (such as job title and company). The extension does not track your general web browsing history or read data on pages where you do not actively invoke it.',
    ],
  },
  {
    heading: '2. How We Use Your Information',
    paragraphs: [
      'We use the collected data strictly to provide and improve our single purpose: helping you track and manage your job applications.',
    ],
    bullets: [
      'Authentication data is used solely to secure and grant access to your account.',
      'User-generated and extracted website content is used exclusively to populate your personal ResumeLog tracking dashboard.',
      'We do not use your data to determine creditworthiness, for lending purposes, or for any personalized advertising.',
    ],
  },
  {
    heading: '3. Data Storage, Handling, and Retention',
    paragraphs: [
      'Handling & Security: All personal and sensitive user data is transmitted securely over encrypted connections (HTTPS/TLS) and stored at rest using strong encryption protocols.',
      'Retention: We retain your account data and saved job applications for as long as your account is active. If you choose to delete your account, all associated personally identifiable information and user-generated data are permanently deleted from our active databases within 30 days.',
    ],
  },
  {
    heading: '4. Data Sharing and All Parties Data is Shared With',
    paragraphs: [
      'To operate our Service, we must share your data with specific third-party service providers who act as data processors on our behalf. These providers are bound by strict confidentiality agreements, cannot use your data for their own purposes, and only process data to keep our Service running. We share data exclusively with the following parties:',
    ],
    bullets: [
      'Cloud Hosting & Infrastructure: Google Cloud Platform (GCP) and Vercel for hosting our web application and API endpoints.',
      'Database Providers: PostgreSQL hosted on Google Cloud Platform (GCP) for securely storing your account credentials and job application data.',
      'Authentication Services: Google OAuth.',
    ],
  },
  {
    heading: '5. Chrome Web Store Limited Use Disclosure',
    paragraphs: [
      "The ResumeLog extension's use and transfer to any other app of information received from Google APIs will adhere to the Chrome Web Store User Data Policy, including the Limited Use requirements. Specifically:",
    ],
    bullets: [
      'We do not sell your data to third parties.',
      'We do not transfer or use your data for personalized advertising.',
      'We do not allow humans to read your data unless we have your affirmative agreement for specific messages, doing so is necessary for security purposes such as investigating abuse, to comply with applicable laws, or for the extension’s internal operations and even then only when the data has been aggregated and anonymized.',
    ],
  },
  {
    heading: '6. Your Rights and Data Deletion',
    paragraphs: [
      'You have the right to access, correct, or delete your personal data. You can request a full, permanent deletion of your account and all associated data by using the deletion option within your account settings or by contacting us at: itsresumelog@gmail.com.',
    ],
  },
]

export default function PrivacyPolicy() {
  return <LegalPage title="Privacy Policy" sections={sections} />
}
