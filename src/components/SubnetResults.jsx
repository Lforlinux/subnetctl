import React from 'react';
import BinaryDisplay from './BinaryDisplay';
import CopyButton from './CopyButton';
import { 
  ipToDecimal, 
  ipToBinary, 
  formatBinary, 
  getHostRange, 
  getSubnetMask, 
  getWildcardMask 
} from '../utils/subnetUtils';

const SubnetResults = ({ subnetInfo }) => {
  if (!subnetInfo) return null;

  const {
    ipAddress,
    prefixLength,
    network,
    broadcast,
    wildcard,
    totalHosts,
    usableHosts,
    networkClass,
    isPrivate,
    isPublic
  } = subnetInfo;

  const hostRange = getHostRange(network, broadcast, totalHosts);
  const subnetMask = getSubnetMask(prefixLength);
  const wildcardMask = getWildcardMask(prefixLength);

  const networkAddress = ipToDecimal(network);
  const broadcastAddress = ipToDecimal(broadcast);
  const wildcardAddress = ipToDecimal(wildcard);

  return (
    <div className="space-y-8">
      {/* Basic Information */}
      <div className="card p-8">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
            Subnet Information
          </h3>
          <CopyButton text={`${ipAddress}/${prefixLength}`} />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="result-item">
            <span className="result-label">Network Address:</span>
            <span className="result-value">{networkAddress}</span>
          </div>
          <div className="result-item">
            <span className="result-label">Broadcast Address:</span>
            <span className="result-value">{broadcastAddress}</span>
          </div>
          <div className="result-item">
            <span className="result-label">Subnet Mask:</span>
            <span className="result-value">{subnetMask.decimal}</span>
          </div>
          <div className="result-item">
            <span className="result-label">Wildcard Mask:</span>
            <span className="result-value">{wildcardAddress}</span>
          </div>
          <div className="result-item">
            <span className="result-label">Prefix Length:</span>
            <span className="result-value">/{prefixLength}</span>
          </div>
          <div className="result-item">
            <span className="result-label">Host Bits:</span>
            <span className="result-value">{32 - prefixLength}</span>
          </div>
        </div>
      </div>

      {/* Host Information */}
      <div className="card p-8">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-6">
          Host Information
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="result-item">
            <span className="result-label">Total Hosts:</span>
            <span className="result-value">{totalHosts.toLocaleString()}</span>
          </div>
          <div className="result-item">
            <span className="result-label">Usable Hosts:</span>
            <span className="result-value">{usableHosts.toLocaleString()}</span>
          </div>
          {hostRange.hasUsableHosts && (
            <>
              <div className="result-item">
                <span className="result-label">First Host:</span>
                <span className="result-value">{ipToDecimal(hostRange.firstHost)}</span>
              </div>
              <div className="result-item">
                <span className="result-label">Last Host:</span>
                <span className="result-value">{ipToDecimal(hostRange.lastHost)}</span>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Network Classification */}
      <div className="card p-8">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-6">
          Network Classification
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="result-item">
            <span className="result-label">Network Class:</span>
            <span className="result-value">{networkClass}</span>
          </div>
          <div className="result-item">
            <span className="result-label">Address Type:</span>
            <span className={`result-value ${isPrivate ? 'text-orange-600 dark:text-orange-400' : 'text-green-600 dark:text-green-400'}`}>
              {isPrivate ? 'Private' : 'Public'}
            </span>
          </div>
        </div>
      </div>

      {/* Binary Representations */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <BinaryDisplay
          label="Network Address"
          value={networkAddress}
          binary={formatBinary(ipToBinary(network))}
        />
        <BinaryDisplay
          label="Broadcast Address"
          value={broadcastAddress}
          binary={formatBinary(ipToBinary(broadcast))}
        />
        <BinaryDisplay
          label="Subnet Mask"
          value={subnetMask.decimal}
          binary={subnetMask.binary}
        />
        <BinaryDisplay
          label="Wildcard Mask"
          value={wildcardAddress}
          binary={wildcardMask.binary}
        />
      </div>

      {/* Additional Formats */}
      <div className="card p-8">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-6">
          Additional Formats
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">Subnet Mask</h4>
            <div className="space-y-2">
              <div className="result-item">
                <span className="result-label">Decimal:</span>
                <span className="result-value">{subnetMask.decimal}</span>
              </div>
              <div className="result-item">
                <span className="result-label">Hexadecimal:</span>
                <span className="result-value">{subnetMask.hex}</span>
              </div>
            </div>
          </div>
          
          <div>
            <h4 className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">Wildcard Mask</h4>
            <div className="space-y-2">
              <div className="result-item">
                <span className="result-label">Decimal:</span>
                <span className="result-value">{wildcardMask.decimal}</span>
              </div>
              <div className="result-item">
                <span className="result-label">Hexadecimal:</span>
                <span className="result-value">{wildcardMask.hex}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubnetResults;
