import React, { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import MembersPage from './pages/MembersPage';
import ConstitutionPage from './pages/ConstitutionPage';
import AdminLoginPage from './pages/AdminLoginPage';
import AdminDashboardPage from './pages/AdminDashboardPage';
import ApplyModal from './components/ApplyModal';

function AppContent() {
  const [activeView, setActiveView] = useState('home');
  const [isApplyOpen, setIsApplyOpen] = useState(false);
  const { isAuthenticated } = useAuth();

  // If user navigates to admin but is not authenticated, show login page
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
    <div className="min-h-screen flex flex-col bg-slate-50 font-sans">
      {/* Top Navigation */}
      <Navbar
        activeView={activeView}
        setActiveView={setActiveView}
        onOpenApply={() => setIsApplyOpen(true)}
      />

      {/* Main View Area */}
      <main className="flex-1">
        {renderCurrentView()}
      </main>

      {/* Global Recruitment Application Modal */}
      <ApplyModal
        isOpen={isApplyOpen}
        onClose={() => setIsApplyOpen(false)}
        onSuccess={() => {}}
      />

      {/* Footer (shown on all public views and login) */}
      <Footer
        setActiveView={setActiveView}
        onOpenApply={() => setIsApplyOpen(true)}
      />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}
