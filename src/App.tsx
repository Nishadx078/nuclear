import { BrowserRouter, Route, Routes } from 'react-router-dom'
import NavBar from './components/NavBar'
import Footer from './components/Footer'
import ScrollManager from './components/ScrollManager'
import TopicMarker from './components/TopicMarker'
import { ProgressProvider } from './hooks/useProgress'
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
import QuizPage from './pages/QuizPage'
import SimulatorPage from './pages/SimulatorPage'
import Model3DPage from './pages/Model3DPage'
import DashboardPage from './pages/DashboardPage'
import NotFoundPage from './pages/NotFoundPage'

export default function App() {
  return (
    <ProgressProvider>
      <BrowserRouter>
        <ScrollManager />
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <NavBar />
        <main id="main" className="min-h-[60vh]">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route
              path="/fundamentals"
              element={
                <TopicMarker topic="basics">
                  <FundamentalsPage />
                </TopicMarker>
              }
            />
            <Route
              path="/types"
              element={
                <TopicMarker topic="waste-types">
                  <TypesPage />
                </TopicMarker>
              }
            />
            <Route
              path="/origins"
              element={
                <TopicMarker topic="environmental-impact">
                  <OriginsPage />
                </TopicMarker>
              }
            />
            <Route
              path="/cycle"
              element={
                <TopicMarker topic="management-journey">
                  <CyclePage />
                </TopicMarker>
              }
            />
            <Route
              path="/handling"
              element={
                <TopicMarker topic="safe-handling">
                  <HandlingPage />
                </TopicMarker>
              }
            />
            <Route
              path="/solutions"
              element={
                <TopicMarker topic="recovery-concepts">
                  <SolutionsPage />
                </TopicMarker>
              }
            />
            <Route
              path="/disposal"
              element={
                <TopicMarker topic="long-term-disposal">
                  <DisposalPage />
                </TopicMarker>
              }
            />
            <Route
              path="/future"
              element={
                <TopicMarker topic="future-technologies">
                  <FuturePage />
                </TopicMarker>
              }
            />
            <Route
              path="/model3d"
              element={
                <TopicMarker topic="model3d">
                  <Model3DPage />
                </TopicMarker>
              }
            />
            <Route path="/quiz" element={<QuizPage />} />
            <Route path="/simulator" element={<SimulatorPage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/safety" element={<SafetyPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>
        <Footer />
      </BrowserRouter>
    </ProgressProvider>
  )
}