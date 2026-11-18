import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { useSeo } from '../lib/useSeo'
import Footer from './Footer'
import Navbar from './Navbar'

export default function Layout() {
  const { pathname } = useLocation()
  useSeo(pathname)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 pt-14">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
