import React, { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import MembersPage from './pages/MembersPage';
import ConstitutionPage from './pages/ConstitutionPage';
import ContactPage from './pages/ContactPage';
import AdminLoginPage from './pages/AdminLoginPage';
import AdminDashboardPage from './pages/AdminDashboardPage';
import ApplyModal from './components/ApplyModal';

function AppContent() {
  const [activeView, setActiveView] = useState('home');
  const [isApplyOpen, setIsApplyOpen] = useState(false);
  const { isAuthenticated } = useAuth();

  // Route selector
  const renderCurrentView = () => {
    switch (activeView) {
      case 'home':
        return (
          <HomePage
            setActiveView={setActiveView}
            onOpenApply={() => setIsApplyOpen(true)}
          />
        );
      case 'members':
        return (
          <MembersPage
            onOpenApply={() => setIsApplyOpen(true)}
          />
        );
      case 'constitution':
        return <ConstitutionPage />;
      case 'contact':
        return <ContactPage />;
      case 'admin-login':
        return (
          <AdminLoginPage
            onSuccess={() => setActiveView('admin')}
            onCancel={() => setActiveView('home')}
          />
        );
      case 'admin':
        if (!isAuthenticated) {
          return (
            <AdminLoginPage
              onSuccess={() => setActiveView('admin')}
              onCancel={() => setActiveView('home')}
            />
          );
        }
        return <AdminDashboardPage />;
      default:
        return (
          <HomePage
            setActiveView={setActiveView}
            onOpenApply={() => setIsApplyOpen(true)}
          />
        );
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 font-sans transition-colors duration-200">
      {/* Modern Top Navigation Bar */}
      <Navbar
        activeView={activeView}
        setActiveView={setActiveView}
        onOpenApply={() => setIsApplyOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {renderCurrentView()}
      </main>

      {/* Global Recruitment Application Modal */}
      <ApplyModal
        isOpen={isApplyOpen}
        onClose={() => setIsApplyOpen(false)}
        onSuccess={() => {}}
      />

      {/* Collegiate Institutional Footer with Theme Toggle */}
      <Footer
        setActiveView={setActiveView}
        onOpenApply={() => setIsApplyOpen(true)}
      />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </ThemeProvider>
  );
}
