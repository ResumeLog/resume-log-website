import LegalPage, { type LegalSection } from '../components/LegalPage'

const sections: LegalSection[] = [
  {
    heading: '1. Description of Service',
    paragraphs: [
      'Welcome to ResumeLog. By accessing or using our website, web application, or browser extension, you agree to be bound by these Terms and Conditions.',
      'ResumeLog provides a platform and browser extension to help users track job applications, save company profiles, and manage recruiter contacts.',
    ],
  },
  {
    heading: '2. User Accounts',
    paragraphs: [
      'To use certain features, you must create an account. You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. You agree to provide accurate and complete information when registering.',
    ],
  },
  {
    heading: '3. Acceptable Use',
    paragraphs: ['You agree not to use the Service to:'],
    bullets: [
      'Violate any laws or regulations.',
      'Infringe upon the rights of others.',
      'Attempt to gain unauthorized access to our systems or other users’ accounts.',
      'Transmit malware, viruses, or any other malicious code.',
    ],
  },
  {
    heading: '4. Intellectual Property',
    paragraphs: [
      'All content, features, and functionality of the Service (including the extension code, design, and branding) are owned by ResumeLog and are protected by international copyright and intellectual property laws.',
    ],
  },
  {
    heading: '5. Limitation of Liability',
    paragraphs: [
      'To the maximum extent permitted by law, ResumeLog shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of or inability to use the Service, including but not limited to lost job opportunities or data loss.',
    ],
  },
  {
    heading: '6. Termination',
    paragraphs: [
      'We reserve the right to suspend or terminate your account at our discretion, without notice, for conduct that we believe violates these Terms or is harmful to other users of the Service, us, or third parties.',
    ],
  },
  {
    heading: '7. Governing Law',
    paragraphs: [
      'These Terms shall be governed and construed in accordance with the laws of Sri Lanka, without regard to its conflict of law provisions.',
    ],
  },
  {
    heading: '8. Changes to Terms',
    paragraphs: [
      'We reserve the right to modify these Terms at any time. We will notify users of any significant changes by posting the new Terms on our website.',
    ],
  },
]

export default function TermsAndConditions() {
  return <LegalPage title="Terms and Conditions" sections={sections} />
}
