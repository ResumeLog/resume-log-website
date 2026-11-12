import { Link } from 'react-router-dom'
import { contactEmail, dashboardUrl, extensionUrl } from '../lib/links'

type FooterLink = { label: string; to?: string; href?: string; external?: boolean }

const columns: { title: string; links: FooterLink[] }[] = [
  {
    title: 'Product',
    links: [
      { label: 'Features', to: '/features' },
      { label: 'How it works', to: '/how-it-works' },
      { label: 'Pricing', to: '/pricing' },
      { label: 'Chrome extension', href: extensionUrl, external: true },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About', to: '/about' },
      { label: 'Get started', to: '/get-started' },
      { label: 'Contact', href: `mailto:${contactEmail}` },
      { label: 'Log in', href: dashboardUrl },
    ],
  },
  {
    title: 'Legal',
    links: [
      { label: 'Privacy policy', to: '/privacy-policy' },
      { label: 'Terms and conditions', to: '/terms-and-conditions' },
      { label: 'Refund policy', to: '/refund-policy' },
    ],
  },
]

export default function Footer() {
  return (
    <footer className="border-line border-t">
      <div className="frame">
        <div className="grid md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div className="border-line border-b p-8 md:border-r md:border-b-0">
            <Link to="/" className="flex items-center gap-2 text-[15px] font-semibold tracking-tight">
              <img src="/resumelog-icon.svg" alt="" width="17" height="19" />
              ResumeLog
            </Link>
            <p className="text-muted-foreground mt-3 max-w-xs text-sm leading-relaxed">
              The job search log that keeps up with you. Save jobs, tailor your résumé, follow up on time.
            </p>
          </div>
          {columns.map((column, i) => (
            <div
              key={column.title}
              className={`border-line flex flex-col gap-2.5 p-8 ${i < columns.length - 1 ? 'border-b md:border-r md:border-b-0' : ''}`}
            >
              <span className="text-subtle mb-1 text-[13px] font-medium">{column.title}</span>
              {column.links.map((link) =>
                link.to ? (
                  <Link key={link.label} to={link.to} className="text-muted-foreground hover:text-foreground text-sm">
                    {link.label}
                  </Link>
                ) : (
                  <a
                    key={link.label}
                    href={link.href}
                    className="text-muted-foreground hover:text-foreground text-sm"
                    {...(link.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                  >
                    {link.label}
                  </a>
                ),
              )}
            </div>
          ))}
        </div>
        <div className="border-line text-subtle flex items-center justify-between border-t px-8 py-5 text-[13px]">
          <span>© {new Date().getFullYear()} ResumeLog</span>
          <span>Made for job seekers</span>
        </div>
      </div>
    </footer>
  )
}
