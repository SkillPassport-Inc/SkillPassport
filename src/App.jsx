import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AnimatePresence } from 'framer-motion';
import Landing from './pages/Landing.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import Onboarding from './pages/Onboarding.jsx';
import DashboardLayout from './layouts/DashboardLayout.jsx';
import Dashboard from './pages/Dashboard.jsx';
import Skills from './pages/Skills.jsx';
import SkillGraph from './pages/SkillGraph.jsx';
import Repositories from './pages/Repositories.jsx';
import ResumeBuilder from './pages/ResumeBuilder.jsx';
import Analytics from './pages/Analytics.jsx';
import CareerCoach from './pages/CareerCoach.jsx';
import PublicProfile from './pages/PublicProfile.jsx';
import RecruiterDashboard from './pages/RecruiterDashboard.jsx';
import RecruiterSearch from './pages/RecruiterSearch.jsx';
import Jobs from './pages/Jobs.jsx';
import Pricing from './pages/Pricing.jsx';
import Settings from './pages/Settings.jsx';
import CommandPalette from './components/CommandPalette.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import PublicOnlyRoute from './components/PublicOnlyRoute.jsx';
import './index.css';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
      retry: 1,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <CommandPalette />
        <AnimatePresence mode="wait">
          <Routes>
            {/* 🌐 Public Shareable Routes */}
            <Route path="/" element={<Landing />} />
            <Route path="/u/:username" element={<PublicProfile />} />

            {/* 🔑 Guest Only Auth Routes */}
            <Route element={<PublicOnlyRoute />}>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
            </Route>

            {/* 💻 Protected Developer Only Routes */}
            <Route element={<ProtectedRoute allowedRoles={['developer']} />}>
              <Route path="/onboarding" element={<Onboarding />} />
              <Route path="/pricing" element={<Pricing />} />
              <Route element={<DashboardLayout />}>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/skills" element={<Skills />} />
                <Route path="/skills/graph" element={<SkillGraph />} />
                <Route path="/repositories" element={<Repositories />} />
                <Route path="/resume" element={<ResumeBuilder />} />
                <Route path="/analytics" element={<Analytics />} />
                <Route path="/career" element={<CareerCoach />} />
                <Route path="/jobs" element={<Jobs />} />
                <Route path="/settings" element={<Settings />} />
              </Route>
            </Route>

            {/* 👔 Protected Recruiter Only Routes */}
            <Route element={<ProtectedRoute allowedRoles={['recruiter']} />}>
              <Route element={<DashboardLayout variant="recruiter" />}>
                <Route path="/recruiter" element={<RecruiterDashboard />} />
                <Route path="/recruiter/search" element={<RecruiterSearch />} />
              </Route>
            </Route>
          </Routes>
        </AnimatePresence>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
