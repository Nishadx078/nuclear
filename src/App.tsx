import { BrowserRouter, Route, Routes } from 'react-router-dom'
import NavBar from './components/NavBar'
import Footer from './components/Footer'
import ScrollManager from './components/ScrollManager'
import HomePage from './pages/HomePage'
import FundamentalsPage from './pages/FundamentalsPage'
import TypesPage from './pages/TypesPage'
import OriginsPage from './pages/OriginsPage'
import CyclePage from './pages/CyclePage'
import HandlingPage from './pages/HandlingPage'
import SolutionsPage from './pages/SolutionsPage'
import DisposalPage from './pages/DisposalPage'
import FuturePage from './pages/FuturePage'
import SafetyPage from './pages/SafetyPage'
import NotFoundPage from './pages/NotFoundPage'

export default function App() {
  return (
    <BrowserRouter>
      <ScrollManager />
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <NavBar />
      <main id="main" className="min-h-[60vh]">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/fundamentals" element={<FundamentalsPage />} />
          <Route path="/types" element={<TypesPage />} />
          <Route path="/origins" element={<OriginsPage />} />
          <Route path="/cycle" element={<CyclePage />} />
          <Route path="/handling" element={<HandlingPage />} />
          <Route path="/solutions" element={<SolutionsPage />} />
          <Route path="/disposal" element={<DisposalPage />} />
          <Route path="/future" element={<FuturePage />} />
          <Route path="/safety" element={<SafetyPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  )
}
