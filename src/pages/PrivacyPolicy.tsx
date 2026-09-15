import LegalPage, { type LegalSection } from '../components/LegalPage'

const sections: LegalSection[] = [
  {
    heading: '1. Information We Collect',
    paragraphs: [
      'This Privacy Policy describes how ResumeLog ("we", "us", or "our") collects, uses, and protects your information when you use our website, web application, and browser extension (collectively, the "Service").',
      'To provide our core functionality of tracking job applications, we collect the following types of data:',
    ],
    bullets: [
      'Personally Identifiable Information: Name and email address when you create an account.',
      'Authentication Information: Passwords or secure tokens used to log into your account.',
      'User-Generated Content: Information you actively save, including job titles, company names, recruiter contact details, application statuses, and notes.',
      'Website Content: When you use the ResumeLog extension to save a job, we may read the text and URLs of the specific job board page you are actively interacting with to extract job details.',
    ],
  },
  {
    heading: '2. How We Use Your Information (Single Purpose)',
    paragraphs: [
      'We use the collected data strictly to provide and improve our single purpose: helping you track and manage your job applications.',
    ],
    bullets: [
      'We use your authentication data to secure your account.',
      'We use your saved job data to populate your ResumeLog dashboard.',
      'We do not use your data to determine creditworthiness or for any lending purposes.',
    ],
  },
  {
    heading: '3. Chrome Web Store Limited Use Disclosure',
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
    heading: '4. Data Storage and Security',
    paragraphs: [
      'All personal and sensitive user data is transmitted over secure, encrypted connections (HTTPS/WSS) and is stored at rest using strong encryption.',
    ],
  },
  {
    heading: '5. Third-Party Services',
    paragraphs: [
      'We may use trusted third-party services (such as cloud hosting or database providers) solely to operate our Service. These providers are bound by strict confidentiality agreements and are not permitted to use your data for their own purposes.',
    ],
  },
  {
    heading: '6. Your Rights and Data Deletion',
    paragraphs: [
      'You have the right to access, correct, or delete your personal data. You can request a full deletion of your account and all associated job application data by contacting us or using the deletion option within your account settings.',
    ],
  },
  {
    heading: '7. Contact Us',
    paragraphs: [
      'If you have any questions about this Privacy Policy, please contact us at: itsresumelog@gmail.com',
    ],
  },
]

export default function PrivacyPolicy() {
  return <LegalPage title="Privacy Policy" sections={sections} />
}
