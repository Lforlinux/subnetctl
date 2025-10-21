import React, { useState, useEffect } from 'react';
import InputForm from './components/InputForm';
import SubnetResults from './components/SubnetResults';
import ThemeToggle from './components/ThemeToggle';
import { parseCIDR } from './utils/subnetUtils';

function App() {
  const [subnetInfo, setSubnetInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [isDark, setIsDark] = useState(false);

  const handleCalculate = async (cidr) => {
    setIsLoading(true);
    setError('');
    
    try {
      const result = parseCIDR(cidr);
      setSubnetInfo(result);
    } catch (err) {
      setError(err.message);
      setSubnetInfo(null);
    } finally {
      setIsLoading(false);
    }
  };

  // Theme management
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      setIsDark(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    if (newTheme) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <ThemeToggle isDark={isDark} onToggle={toggleTheme} />
      <div className="container mx-auto px-4 py-8 flex-1">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2" style={{textShadow: '0 2px 4px rgba(0, 0, 0, 0.3)'}}>
            subnetctl
          </h1>
          <p className="text-white" style={{opacity: 0.9, textShadow: '0 1px 2px rgba(0, 0, 0, 0.2)'}}>
            CIDR Subnet Calculator for network administrators and developers.
          </p>
        </header>

        <div className="space-y-8">
          {/* Input Form */}
          <InputForm onCalculate={handleCalculate} isLoading={isLoading} />
          
          {/* Error Display */}
          {error && (
            <div className="card p-4 border-l-4 border-red-500 bg-red-50 dark:bg-red-900/20">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-red-800 dark:text-red-200">
                    Calculation Error
                  </h3>
                  <div className="mt-2 text-sm text-red-700 dark:text-red-300">
                    {error}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Results */}
          {subnetInfo && <SubnetResults subnetInfo={subnetInfo} />}
        </div>
      </div>
      
      <footer className="footer">
        <div className="container mx-auto px-4">
          <p>&copy; 2025 Lekshmi Kolappan | View this project on <a href="https://github.com/Lforlinux/subnetctl" target="_blank" rel="noopener noreferrer">GitHub</a></p>
        </div>
      </footer>
    </div>
  );
}

export default App;
