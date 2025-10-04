import React, { useState } from 'react';
import InputForm from './components/InputForm';
import SubnetResults from './components/SubnetResults';
import ThemeToggle from './components/ThemeToggle';
import { parseCIDR } from './utils/subnetUtils';

function App() {
  const [subnetInfo, setSubnetInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

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

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      {/* Header */}
      <header className="bg-white dark:bg-gray-900 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex-1"></div>
            <div className="flex flex-col items-center text-center">
              <h1 className="text-3xl font-bold header-gradient mb-1">
                subnetctl
              </h1>
              <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">
                CIDR Subnet Calculator
              </p>
            </div>
            <div className="flex-1 flex justify-end">
              <ThemeToggle />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          {/* Input Form */}
          <InputForm onCalculate={handleCalculate} isLoading={isLoading} />
          
          {/* Error Display */}
          {error && (
            <div className="tech-card p-4 border-l-4 border-red-500 bg-red-50 dark:bg-red-900/20">
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
      </main>

      {/* Footer */}
      <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 mt-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Built for network administrators and developers • 
              <a 
                href="https://github.com/Lforlinux/subnetctl" 
                className="ml-1 text-blue-600 hover:text-blue-700 transition-colors duration-200"
                target="_blank"
                rel="noopener noreferrer"
              >
                View on GitHub
              </a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
