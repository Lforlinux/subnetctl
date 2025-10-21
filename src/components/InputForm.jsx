import React, { useState } from 'react';
import { validateCIDR } from '../utils/subnetUtils';

const InputForm = ({ onCalculate, isLoading }) => {
  const [cidr, setCidr] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!cidr.trim()) {
      setError('Please enter a CIDR notation');
      return;
    }

    const validation = validateCIDR(cidr.trim());
    if (!validation.isValid) {
      setError(validation.error);
      return;
    }

    onCalculate(cidr.trim());
  };

  const handleChange = (e) => {
    setCidr(e.target.value);
    setError('');
  };

  const exampleCIDRs = [
    '192.168.1.0/24',
    '10.0.0.0/8',
    '172.16.0.0/12',
    '203.0.113.0/24'
  ];

  return (
    <div className="card p-8">
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-3">
          CIDR Subnet Calculator
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Enter a CIDR notation to calculate subnet information, network details, and binary representations.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="cidr" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
            CIDR Notation
          </label>
          <div className="relative">
            <input
              type="text"
              id="cidr"
              value={cidr}
              onChange={handleChange}
              placeholder="e.g., 192.168.1.0/24"
              className={`tech-input ${error ? 'border-red-500 focus:ring-red-500' : ''}`}
              disabled={isLoading}
            />
            {error && (
              <div className="absolute -bottom-6 left-0 text-sm text-red-500 font-medium">
                {error}
              </div>
            )}
          </div>
        </div>

        <div className="flex justify-center">
          <button
            type="submit"
            disabled={isLoading || !cidr.trim()}
            className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span className="btn-icon">🔍</span>
            {isLoading ? 'Calculating...' : 'Calculate Subnet'}
          </button>
        </div>
      </form>

      <div className="mt-8">
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 font-medium">Example CIDR notations:</p>
        <div className="flex flex-wrap gap-3 justify-center">
          {exampleCIDRs.map((example) => (
            <button
              key={example}
              onClick={() => setCidr(example)}
              className="btn-secondary"
            >
              {example}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default InputForm;
