# subnetctl

A professional CIDR subnet calculator for network administrators and developers. Built with React and modern web technologies, subnetctl provides comprehensive subnet analysis with binary representations, network classification, and a clean, technical interface.

🌐 **Live Demo**: [https://l4linux.com/subnetctl](https://l4linux.com/subnetctl/)

---

## Screenshot

![subnetctl screenshot](subnetctl.png)

---

## Features

### Core Functionality
- **CIDR Parsing** - Intelligent parsing of CIDR notation with validation
- **Complete Subnet Analysis** - Network address, broadcast address, subnet mask, wildcard mask
- **Host Range Calculation** - First and last usable host addresses
- **Binary Representations** - Full binary display for all network components
- **Network Classification** - Automatic detection of network class and address type

### Advanced Features
- **Multiple Format Support** - Decimal, binary, and hexadecimal representations
- **Private/Public Detection** - Automatic classification of private vs public addresses
- **Copy Functionality** - One-click copying of all calculated values
- **Real-time Validation** - Instant feedback on invalid CIDR notation
- **Responsive Design** - Works seamlessly on desktop and mobile devices

### Visual Features
- **Dark/Light Theme** - Toggle between themes with persistent user preference
- **Modern UI** - Clean, technical interface with monospace fonts
- **Tech-focused Design** - Professional blue/cyan color scheme
- **Binary Display** - Formatted binary representations with dots for readability
- **Network Statistics** - Comprehensive host count and range information

## Tech Stack

- **React 18** - Modern React with hooks
- **Vite** - Fast build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Custom Subnet Logic** - Proprietary CIDR calculation algorithms
- **Docker** - Containerized deployment

## Getting Started

### Option 1: Docker (Recommended)

#### Prerequisites
- Docker and Docker Compose installed on your system

#### Quick Start with Docker

1. Clone the repository:
```bash
git clone <repository-url>
cd subnetctl
```

2. Build and run with Docker Compose:
```bash
docker-compose up --build
```

3. Open your browser and navigate to `http://localhost:3000`

#### Docker Commands

- **Start the application**: `docker-compose up`
- **Build and start**: `docker-compose up --build`
- **Stop the application**: `docker-compose down`
- **View logs**: `docker-compose logs -f`

### Option 2: Local Development

#### Prerequisites
- Node.js (version 18 or higher)
- npm or yarn

#### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd subnetctl
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

### Building for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## Usage

### Basic Subnet Calculation
1. Enter a CIDR notation in the input field (e.g., `192.168.1.0/24`)
2. Click "Calculate Subnet" to see the analysis
3. View comprehensive subnet information including:
   - Network and broadcast addresses
   - Subnet and wildcard masks
   - Host range and count
   - Binary representations
   - Network classification

### Example CIDR Notations
- `192.168.1.0/24` - Common home network
- `10.0.0.0/8` - Large private network
- `172.16.0.0/12` - Medium private network
- `203.0.113.0/24` - Public network example

### Copy Functionality
- Click the copy button next to any value to copy it to your clipboard
- All binary representations are formatted with dots for readability
- Copy individual values or entire CIDR notations

### Theme Toggle
- Click the theme toggle button in the top-right corner
- Your preference is saved and will persist across sessions
- Supports both light and dark themes

## Project Structure

```
subnetctl/
├── public/
│   └── index.html              # Main HTML file
├── src/
│   ├── components/
│   │   ├── InputForm.jsx       # CIDR input form
│   │   ├── SubnetResults.jsx   # Results display
│   │   ├── BinaryDisplay.jsx   # Binary representation component
│   │   ├── CopyButton.jsx      # Copy to clipboard functionality
│   │   └── ThemeToggle.jsx     # Theme toggle component
│   ├── utils/
│   │   └── subnetUtils.js      # CIDR calculation utilities
│   ├── App.jsx                 # Main application component
│   ├── index.css               # Tailwind CSS styles
│   └── main.jsx                # Application entry point
├── nginx.conf                  # Nginx configuration
├── Dockerfile                  # Docker configuration
├── docker-compose.yml          # Docker Compose setup
├── tailwind.config.js          # Tailwind configuration
├── postcss.config.js           # PostCSS configuration
├── package.json                # Dependencies and scripts
└── README.md                  # This file
```

## Features in Detail

### CIDR Parsing
The tool intelligently parses CIDR notation and provides:
- **Input Validation** - Real-time validation of CIDR format
- **Error Handling** - Clear error messages for invalid input
- **Format Support** - Standard CIDR notation (x.x.x.x/y)

### Subnet Analysis
For each CIDR input, the tool calculates:
- **Network Address** - The network portion of the CIDR
- **Broadcast Address** - The broadcast address for the subnet
- **Subnet Mask** - Network mask in decimal and binary
- **Wildcard Mask** - Inverse of subnet mask
- **Host Range** - First and last usable host addresses
- **Host Count** - Total and usable host counts

### Binary Representations
- **Formatted Binary** - Binary strings with dots for readability
- **Multiple Formats** - Decimal, binary, and hexadecimal
- **Copy Functionality** - Easy copying of all values
- **Visual Formatting** - Clear separation of octets

### Network Classification
- **Network Class** - Automatic detection (A, B, C, D, E)
- **Address Type** - Private vs public classification
- **Special Networks** - Loopback, link-local detection
- **RFC Compliance** - Follows standard network classification

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [Vite](https://vitejs.dev/) - Next generation frontend tooling
- [React](https://reactjs.org/) - JavaScript library for building user interfaces
- [JetBrains Mono](https://www.jetbrains.com/mono/) - Monospace font for technical display
