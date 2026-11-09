import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import DataInput from './components/DataInput';
import Settings from './components/Settings';
import DataTable from './components/DataTable';
import { ViewState, SurveillanceData, AppSettings } from './types';
import { MOCK_DATA } from './constants';
import { Menu, Sun, Moon } from 'lucide-react';

// Attempt to get API key from env if available
const DEFAULT_API_KEY = process.env.API_KEY || '';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewState>(ViewState.DASHBOARD);
  const [data, setData] = useState<SurveillanceData[]>(MOCK_DATA);
  const [settings, setSettings] = useState<AppSettings>({
    apiKey: DEFAULT_API_KEY,
    model: 'gemini-2.5-flash-latest'
  });
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // Check system preference or local storage for theme
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setIsDarkMode(true);
    }
  }, []);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const handleAddData = (newData: SurveillanceData) => {
    setData((prev) => [...prev, newData]);
    setCurrentView(ViewState.DASHBOARD);
  };

  const renderContent = () => {
    switch (currentView) {
      case ViewState.DASHBOARD:
        return <Dashboard data={data} />;
      case ViewState.INPUT:
        return <DataInput settings={settings} onAddData={handleAddData} />;
      case ViewState.SETTINGS:
        return <Settings settings={settings} onSave={setSettings} />;
      case ViewState.DATA_TABLE:
        return <DataTable data={data} />;
      default:
        return <Dashboard data={data} />;
    }
  };

  const getPageTitle = () => {
    switch (currentView) {
      case ViewState.DASHBOARD: return 'Dashboard';
      case ViewState.INPUT: return 'Input Feed';
      case ViewState.SETTINGS: return 'Settings';
      case ViewState.DATA_TABLE: return 'Data Logs';
      default: return 'Dashboard';
    }
  };

  return (
    <div className="flex h-screen bg-slate-50 dark:bg-slate-950 overflow-hidden">
      {/* Sidebar Overlay for Mobile */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 z-20 bg-slate-900/50 backdrop-blur-sm lg:hidden transition-opacity"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <Sidebar 
        currentView={currentView} 
        setView={(view) => {
            setCurrentView(view);
            setIsSidebarOpen(false);
        }}
        isOpen={isSidebarOpen} 
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        
        {/* Header */}
        <header className="flex items-center justify-between px-6 py-4 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 shadow-sm z-10">
          <div className="flex items-center">
            <button 
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="lg:hidden p-2 rounded-md text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 focus:outline-none"
            >
              <Menu className="w-6 h-6" />
            </button>
            <h1 className="ml-4 lg:ml-0 text-2xl font-bold text-slate-800 dark:text-white tracking-tight">
              {getPageTitle()}
            </h1>
          </div>
          
          <div className="flex items-center space-x-4">
             {/* Data Counter Badge */}
             <div className="hidden sm:flex items-center px-3 py-1 bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300 rounded-full text-xs font-semibold">
                <span className="w-2 h-2 rounded-full bg-primary-500 mr-2 animate-pulse"></span>
                {data.length} Records Analyzed
             </div>

            {/* Theme Toggle */}
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="p-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition-colors"
            >
              {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
          </div>
        </header>

        {/* Scrollable Content */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
            <div className="max-w-7xl mx-auto">
                {renderContent()}
            </div>
        </main>
      </div>
    </div>
  );
};

export default App;