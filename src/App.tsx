import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import About from './pages/About'
import Features from './pages/Features'
import GetStarted from './pages/GetStarted'
import Home from './pages/Home'
import HowItWorks from './pages/HowItWorks'
import NotFound from './pages/NotFound'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="features" element={<Features />} />
          <Route path="how-it-works" element={<HowItWorks />} />
          <Route path="about" element={<About />} />
          <Route path="get-started" element={<GetStarted />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
