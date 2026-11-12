import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { dashboardUrl, extensionUrl } from '../lib/links'

const links = [
  { to: '/features', label: 'Features' },
  { to: '/how-it-works', label: 'How it works' },
  { to: '/pricing', label: 'Pricing' },
  { to: '/about', label: 'About' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <header className="border-line fixed inset-x-0 top-0 z-50 border-b bg-white/85 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-[1200px] items-center justify-between px-5 md:px-8">
        <div className="flex items-center gap-10">
          <NavLink to="/" className="flex items-center gap-2 text-[15px] font-semibold tracking-tight">
            <img src="/resumelog-icon.svg" alt="" width="17" height="19" />
            ResumeLog
          </NavLink>
          <nav className="hidden items-center gap-1 md:flex">
            {links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
                    isActive ? 'text-foreground bg-panel' : 'text-muted-foreground hover:text-foreground'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>
        </div>

        <div className="hidden items-center gap-2 md:flex">
          <a href={dashboardUrl} className="btn-outline !h-8 !px-3">
            Log in
          </a>
          <a href={extensionUrl} target="_blank" rel="noopener noreferrer" className="btn-solid !h-8 !px-3">
            Add to Chrome
          </a>
        </div>

        <button
          type="button"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          className="text-foreground -mr-1 p-1 md:hidden"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="border-line overflow-hidden border-t bg-white md:hidden"
          >
            <div className="flex flex-col px-5 py-4">
              {links.map((link) => (
                <NavLink key={link.to} to={link.to} onClick={() => setOpen(false)} className="py-2.5 text-[15px] font-medium">
                  {link.label}
                </NavLink>
              ))}
              <div className="mt-3 grid grid-cols-2 gap-2">
                <a href={dashboardUrl} className="btn-outline">
                  Log in
                </a>
                <a href={extensionUrl} target="_blank" rel="noopener noreferrer" className="btn-solid">
                  Add to Chrome
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
