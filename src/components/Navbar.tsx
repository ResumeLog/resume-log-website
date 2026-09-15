import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'

const links = [
  { to: '/', label: 'Home' },
  { to: '/features', label: 'Features' },
  { to: '/how-it-works', label: 'How It Works' },
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
                ? 'border-foreground border-b text-foreground'
                : 'text-muted-foreground hover:text-foreground border-b border-transparent'
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
        scrolled ? 'bg-background/95 border-border border-b backdrop-blur' : 'border-b border-transparent'
      }`}
    >
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-6 md:px-16">
        <NavLink to="/" className="font-mono text-base font-semibold tracking-tight">
          Resume<span className="text-muted-foreground">Log</span>
        </NavLink>

        <nav className="hidden items-center gap-8 md:flex">
          <NavLinks />
        </nav>

        <div className="hidden md:block">
          <NavLink to="/get-started" className="btn-solid">
            Get Started
          </NavLink>
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
            className="bg-background border-border overflow-hidden border-b md:hidden"
          >
            <div className="flex flex-col gap-4 px-6 py-6">
              <NavLinks onClick={() => setMobileOpen(false)} />
              <NavLink to="/get-started" className="btn-solid mt-2" onClick={() => setMobileOpen(false)}>
                Get Started
              </NavLink>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
