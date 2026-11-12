import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { dashboardUrl, extensionUrl } from '../lib/links'

const links = [
  { to: '/', label: 'Home' },
  { to: '/features', label: 'Features' },
  { to: '/how-it-works', label: 'How It Works' },
  { to: '/pricing', label: 'Pricing' },
  { to: '/about', label: 'About' },
]

function NavLinks({ onClick }: { onClick?: () => void }) {
  return (
    <>
      {links.map((link) => (
        <NavLink
          key={link.to}
          to={link.to}
          end={link.to === '/'}
          onClick={onClick}
          className={({ isActive }) =>
            `text-sm font-medium transition-colors ${
              isActive
                ? 'decoration-ink text-foreground underline decoration-wavy decoration-1 underline-offset-[6px]'
                : 'text-ash-600 hover:text-foreground'
            }`
          }
        >
          {link.label}
        </NavLink>
      ))}
    </>
  )
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-200 ${
        scrolled ? 'bg-paper/95 border-ash-100 border-b backdrop-blur' : 'border-b border-transparent'
      }`}
    >
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-6 md:px-12">
        <NavLink to="/" className="flex items-center gap-2 text-base font-semibold tracking-tight">
          <img src="/resumelog-icon.svg" alt="" width="18" height="20" />
          ResumeLog
        </NavLink>

        <nav className="hidden items-center gap-8 md:flex">
          <NavLinks />
        </nav>

        <div className="hidden items-center gap-5 md:flex">
          <a href={dashboardUrl} className="text-ash-600 text-sm font-medium">
            Log in
          </a>
          <a href={extensionUrl} target="_blank" rel="noopener noreferrer" className="btn-solid !px-4 !py-2">
            Add to Chrome
          </a>
        </div>

        <button
          type="button"
          aria-label="Toggle menu"
          className="text-foreground md:hidden"
          onClick={() => setMobileOpen((v) => !v)}
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="bg-paper border-ash-100 overflow-hidden border-b md:hidden"
          >
            <div className="flex flex-col gap-4 px-6 py-6">
              <NavLinks onClick={() => setMobileOpen(false)} />
              <a href={dashboardUrl} className="text-sm font-medium">
                Log in
              </a>
              <a href={extensionUrl} target="_blank" rel="noopener noreferrer" className="btn-solid mt-2">
                Add to Chrome
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
