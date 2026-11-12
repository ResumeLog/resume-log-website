import { Link } from 'react-router-dom'
import { contactEmail, dashboardUrl, extensionUrl } from '../lib/links'

const columns = [
  {
    title: 'Product',
    links: [
      { label: 'Features', to: '/features' },
      { label: 'How it works', to: '/how-it-works' },
      { label: 'Pricing', to: '/pricing' },
      { label: 'Chrome extension', href: extensionUrl, external: true },
      { label: 'Log in', href: dashboardUrl },
    ],
  },
  {
    title: 'About',
    links: [
      { label: 'Why I built it', to: '/about' },
      { label: 'Get started', to: '/get-started' },
      { label: 'Email me', href: `mailto:${contactEmail}` },
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
    <footer className="border-ash-100 border-t bg-white">
      <div className="mx-auto flex max-w-6xl flex-col gap-12 px-6 py-16 md:px-12">
        <div className="flex flex-col justify-between gap-10 md:flex-row">
          <div className="max-w-xs">
            <Link to="/" className="flex items-center gap-2 text-base font-semibold tracking-tight">
              <img src="/resumelog-icon.svg" alt="" width="18" height="20" />
              ResumeLog
            </Link>
            <p className="text-ash-600 mt-4 text-sm leading-relaxed">
              A log of every job you save, every résumé you send and every application still waiting
              on a reply.
            </p>
            <p className="hand mt-5 text-xl">good luck out there ✶</p>
          </div>

          <div className="flex flex-wrap gap-x-14 gap-y-8">
            {columns.map((column) => (
              <div key={column.title} className="flex flex-col gap-3">
                <span className="text-ink text-sm font-semibold">{column.title}</span>
                {column.links.map((link) =>
                  'to' in link && link.to ? (
                    <Link key={link.label} to={link.to} className="text-ash-600 text-sm">
                      {link.label}
                    </Link>
                  ) : (
                    <a
                      key={link.label}
                      href={link.href}
                      className="text-ash-600 text-sm"
                      {...('external' in link && link.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                    >
                      {link.label}
                    </a>
                  ),
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="rough-rule" />
        <p className="text-ash-500 -mt-6 text-xs">© {new Date().getFullYear()} ResumeLog</p>
      </div>
    </footer>
  )
}
