import { Link } from 'react-router-dom'
import LegalPage, { type LegalSection } from '../components/LegalPage'

const contactEmail = 'contact@resumeloghq.com'

const emailLink = (
  <a href={`mailto:${contactEmail}`} className="text-foreground underline underline-offset-4">
    {contactEmail}
  </a>
)

const sections: LegalSection[] = [
  {
    heading: 'Overview',
    paragraphs: [
      'Every ResumeLog payment comes with a 14-day money-back guarantee. If ResumeLog isn’t right for you, ask within 14 days and we’ll refund you in full.',
      <>
        This policy covers all ResumeLog subscriptions, monthly and annual. It forms part of our{' '}
        <Link to="/terms-and-conditions" className="text-foreground underline underline-offset-4">
          Terms of Service
        </Link>
        .
      </>,
    ],
  },
  {
    heading: '14-day money-back guarantee',
    paragraphs: [
      'You can request a full refund within 14 days of any payment. No questions asked on your first payment.',
    ],
    table: {
      columns: ['Payment', 'Refund window', 'What you get back'],
      rows: [
        [
          'First payment (monthly or annual)',
          '14 days from the charge',
          'Full refund, no questions asked',
        ],
        [
          'Monthly renewal',
          '14 days from the renewal charge',
          'Full refund if you haven’t used ResumeLog since the renewal',
        ],
        [
          'Annual renewal',
          '14 days from the renewal charge',
          'Full refund if you haven’t used ResumeLog since the renewal',
        ],
      ],
    },
    closingParagraphs: [
      'We send a reminder email before each annual renewal, so you have time to cancel if you no longer need ResumeLog.',
      'After 14 days, payments are non-refundable, except where the law requires otherwise or where we decide to make an exception (see below).',
    ],
  },
  {
    heading: 'Cancelling your subscription',
    paragraphs: [
      'You can cancel anytime from your account settings or the link in your Paddle receipt email. Cancelling stops future charges. You keep access until the end of the period you’ve already paid for.',
      'Cancelling does not refund the current period by itself. If you’re still inside the 14-day window, request a refund as well (see below).',
    ],
  },
  {
    heading: 'When we may decline a refund',
    paragraphs: ['We may decline or partly refund a request when:'],
    bullets: [
      'The request comes more than 14 days after the charge.',
      'The account was suspended for breaking our Terms of Service, such as fraud or abuse.',
      'We see a pattern of repeated subscribe-and-refund requests on the same or linked accounts.',
    ],
    closingParagraphs: [
      'We review exceptions case by case. If something went wrong on our side, like a long outage or a billing error, we’ll make it right even outside the 14-day window.',
    ],
  },
  {
    heading: 'Chargebacks',
    paragraphs: [
      'Please contact us before filing a chargeback with your bank. We can usually resolve refunds faster than a dispute. Filing a chargeback may pause your account while it’s reviewed.',
    ],
  },
  {
    heading: 'Customers in the EU and UK',
    paragraphs: [
      'If you’re a consumer in the EU or UK, you have a statutory right to withdraw within 14 days of purchase. Nothing in this policy limits your legal rights.',
    ],
  },
  {
    heading: 'How to request a refund',
    paragraphs: [
      <>
        Email us at {emailLink} with the email address on your account and your order number (it’s
        in your Paddle receipt).
      </>,
      'We reply to refund requests within 2 business days.',
    ],
  },
  {
    heading: 'How refunds are paid',
    paragraphs: [
      'Approved refunds go back to your original payment method usually within 5–10 business days, depending on your bank or card provider. Your subscription ends when the refund is issued.',
    ],
  },
  {
    heading: 'Changes to this policy',
    paragraphs: [
      'We may update this policy from time to time. The version in force when you paid applies to that payment. We’ll post changes on this page and update the date above.',
    ],
  },
  {
    heading: 'Contact',
    paragraphs: ['ResumeLog, Galle, Sri Lanka', <>Email: {emailLink}</>],
  },
]

export default function RefundPolicy() {
  return (
    <LegalPage
      title="Refund Policy"
      sections={sections}
      dateLabel="Last updated"
      date="29 September 2026"
    />
  )
}
