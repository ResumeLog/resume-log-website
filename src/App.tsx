import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import { comparisons } from './data/comparisons'
import { guides } from './data/guides'
import { landingPages } from './data/landing'
import About from './pages/About'
import Alternatives from './pages/Alternatives'
import Compare from './pages/Compare'
import Faq from './pages/Faq'
import Features from './pages/Features'
import GetStarted from './pages/GetStarted'
import Guide from './pages/Guide'
import Guides from './pages/Guides'
import Home from './pages/Home'
import HowItWorks from './pages/HowItWorks'
import Landing from './pages/Landing'
import NotFound from './pages/NotFound'
import Pricing from './pages/Pricing'
import PrivacyPolicy from './pages/PrivacyPolicy'
import RefundPolicy from './pages/RefundPolicy'
import TermsAndConditions from './pages/TermsAndConditions'

/** The route tree, shared by the browser router (below) and the build-time prerender (entry-server.tsx). */
export function AppRoutes() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="features" element={<Features />} />
        <Route path="how-it-works" element={<HowItWorks />} />
        <Route path="pricing" element={<Pricing />} />
        <Route path="faq" element={<Faq />} />
        {landingPages.map((p) => (
          <Route key={p.slug} path={p.slug} element={<Landing page={p} />} />
        ))}
        <Route path="alternatives" element={<Alternatives />} />
        {comparisons.map((c) => (
          <Route key={c.slug} path={`compare/${c.slug}`} element={<Compare c={c} />} />
        ))}
        <Route path="guides" element={<Guides />} />
        {guides.map((g) => (
          <Route key={g.slug} path={`guides/${g.slug}`} element={<Guide guide={g} />} />
        ))}
        <Route path="about" element={<About />} />
        <Route path="get-started" element={<GetStarted />} />
        <Route path="privacy-policy" element={<PrivacyPolicy />} />
        <Route path="terms-and-conditions" element={<TermsAndConditions />} />
        <Route path="refund-policy" element={<RefundPolicy />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}

function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  )
}

export default App
