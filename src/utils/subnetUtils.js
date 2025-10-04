/**
 * Utility functions for CIDR and subnet calculations
 */

/**
 * Parse CIDR notation and return network information
 * @param {string} cidr - CIDR notation (e.g., "192.168.1.0/24")
 * @returns {Object} Network information object
 */
export function parseCIDR(cidr) {
  if (!cidr || typeof cidr !== 'string') {
    throw new Error('Invalid CIDR input');
  }

  const parts = cidr.trim().split('/');
  if (parts.length !== 2) {
    throw new Error('Invalid CIDR format. Expected format: x.x.x.x/y');
  }

  const [ipAddress, prefixLength] = parts;
  const prefix = parseInt(prefixLength, 10);

  if (prefix < 0 || prefix > 32) {
    throw new Error('Prefix length must be between 0 and 32');
  }

  // Validate IP address
  const ipParts = ipAddress.split('.');
  if (ipParts.length !== 4) {
    throw new Error('Invalid IP address format');
  }

  const ipBytes = ipParts.map(part => {
    const byte = parseInt(part, 10);
    if (isNaN(byte) || byte < 0 || byte > 255) {
      throw new Error('Invalid IP address: each octet must be 0-255');
    }
    return byte;
  });

  const ip = (ipBytes[0] << 24) | (ipBytes[1] << 16) | (ipBytes[2] << 8) | ipBytes[3];
  const mask = (0xFFFFFFFF << (32 - prefix)) >>> 0;
  const network = ip & mask;
  const broadcast = network | (~mask >>> 0);
  const wildcard = ~mask >>> 0;

  return {
    ipAddress,
    prefixLength: prefix,
    ip,
    mask,
    network,
    broadcast,
    wildcard,
    hostBits: 32 - prefix,
    totalHosts: Math.pow(2, 32 - prefix),
    usableHosts: Math.max(0, Math.pow(2, 32 - prefix) - 2),
    networkClass: getNetworkClass(ipBytes[0]),
    isPrivate: isPrivateIP(ipBytes),
    isPublic: !isPrivateIP(ipBytes)
  };
}

/**
 * Convert IP address to binary string
 * @param {number} ip - IP address as 32-bit integer
 * @returns {string} Binary representation
 */
export function ipToBinary(ip) {
  return (ip >>> 0).toString(2).padStart(32, '0');
}

/**
 * Convert IP address to dotted decimal notation
 * @param {number} ip - IP address as 32-bit integer
 * @returns {string} Dotted decimal notation
 */
export function ipToDecimal(ip) {
  return [
    (ip >>> 24) & 0xFF,
    (ip >>> 16) & 0xFF,
    (ip >>> 8) & 0xFF,
    ip & 0xFF
  ].join('.');
}

/**
 * Get network class based on first octet
 * @param {number} firstOctet - First octet of IP address
 * @returns {string} Network class
 */
export function getNetworkClass(firstOctet) {
  if (firstOctet >= 1 && firstOctet <= 126) return 'A';
  if (firstOctet >= 128 && firstOctet <= 191) return 'B';
  if (firstOctet >= 192 && firstOctet <= 223) return 'C';
  if (firstOctet >= 224 && firstOctet <= 239) return 'D (Multicast)';
  if (firstOctet >= 240 && firstOctet <= 255) return 'E (Reserved)';
  return 'Unknown';
}

/**
 * Check if IP address is private
 * @param {Array} ipBytes - IP address as array of bytes
 * @returns {boolean} True if private IP
 */
export function isPrivateIP(ipBytes) {
  const [a, b, c, d] = ipBytes;
  
  // 10.0.0.0/8
  if (a === 10) return true;
  
  // 172.16.0.0/12
  if (a === 172 && b >= 16 && b <= 31) return true;
  
  // 192.168.0.0/16
  if (a === 192 && b === 168) return true;
  
  // 127.0.0.0/8 (loopback)
  if (a === 127) return true;
  
  // 169.254.0.0/16 (link-local)
  if (a === 169 && b === 254) return true;
  
  return false;
}

/**
 * Get host range (first and last usable hosts)
 * @param {number} network - Network address
 * @param {number} broadcast - Broadcast address
 * @param {number} totalHosts - Total number of hosts
 * @returns {Object} Host range information
 */
export function getHostRange(network, broadcast, totalHosts) {
  if (totalHosts <= 2) {
    return {
      firstHost: null,
      lastHost: null,
      hasUsableHosts: false
    };
  }

  const firstHost = network + 1;
  const lastHost = broadcast - 1;

  return {
    firstHost,
    lastHost,
    hasUsableHosts: true
  };
}

/**
 * Format binary string with dots for readability
 * @param {string} binary - Binary string
 * @returns {string} Formatted binary string
 */
export function formatBinary(binary) {
  return binary.replace(/(.{8})/g, '$1.').slice(0, -1);
}

/**
 * Get subnet mask in different formats
 * @param {number} prefixLength - CIDR prefix length
 * @returns {Object} Subnet mask information
 */
export function getSubnetMask(prefixLength) {
  const mask = (0xFFFFFFFF << (32 - prefixLength)) >>> 0;
  return {
    decimal: ipToDecimal(mask),
    binary: formatBinary(ipToBinary(mask)),
    hex: '0x' + mask.toString(16).toUpperCase()
  };
}

/**
 * Get wildcard mask in different formats
 * @param {number} prefixLength - CIDR prefix length
 * @returns {Object} Wildcard mask information
 */
export function getWildcardMask(prefixLength) {
  const wildcard = (~(0xFFFFFFFF << (32 - prefixLength)) >>> 0);
  return {
    decimal: ipToDecimal(wildcard),
    binary: formatBinary(ipToBinary(wildcard)),
    hex: '0x' + wildcard.toString(16).toUpperCase()
  };
}

/**
 * Validate CIDR input
 * @param {string} cidr - CIDR notation to validate
 * @returns {Object} Validation result
 */
export function validateCIDR(cidr) {
  try {
    parseCIDR(cidr);
    return { isValid: true, error: null };
  } catch (error) {
    return { isValid: false, error: error.message };
  }
}
