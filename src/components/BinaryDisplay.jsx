import React from 'react';
import CopyButton from './CopyButton';

const BinaryDisplay = ({ label, value, binary, className = '' }) => {
  return (
    <div className={`relative card p-6 ${className}`}>
      <CopyButton text={binary} />
      <div className="mb-4">
        <h4 className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">{label}</h4>
        <p className="text-sm font-mono text-gray-900 dark:text-gray-100 bg-gray-50 dark:bg-gray-800 px-3 py-2 rounded-lg">{value}</p>
      </div>
      <div className="binary-display">
        <div className="text-xs text-gray-500 dark:text-gray-400 mb-2 font-medium">Binary:</div>
        <div className="font-mono text-xs text-gray-800 dark:text-gray-200 break-all leading-relaxed">
          {binary}
        </div>
      </div>
    </div>
  );
};

export default BinaryDisplay;
