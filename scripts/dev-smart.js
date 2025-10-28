const { spawn } = require('child_process');
const net = require('net');
const fs = require('fs');
const path = require('path');

// Common development ports to avoid
const AVOID_PORTS = [3000, 3001, 3002, 3003, 3004, 3005, 8000, 8080, 5000, 4000, 9000];

// Function to check if a port is available
function isPortAvailable(port) {
  return new Promise((resolve) => {
    const server = net.createServer();
    
    server.listen(port, () => {
      server.once('close', () => {
        resolve(true);
      });
      server.close();
    });
    
    server.on('error', () => {
      resolve(false);
    });
  });
}

// Function to clean up lock files
function cleanupLockFiles() {
  const lockPath = path.join(process.cwd(), '.next', 'dev', 'lock');
  if (fs.existsSync(lockPath)) {
    try {
      fs.unlinkSync(lockPath);
      console.log('🧹 Cleaned up lock file');
    } catch (error) {
      console.warn('⚠️  Could not remove lock file:', error.message);
    }
  }
}

// Function to find the next available port, avoiding common development ports
async function findAvailablePort() {
  // First, try to find a port that's not in the avoid list
  for (let port = 3006; port <= 3100; port++) {
    if (!AVOID_PORTS.includes(port) && await isPortAvailable(port)) {
      return port;
    }
  }
  
  // If no "safe" ports found, fall back to any available port
  for (let port = 3000; port <= 3200; port++) {
    if (await isPortAvailable(port)) {
      return port;
    }
  }
  
  throw new Error('No available ports found');
}

// Main function
async function startDevServer() {
  try {
    console.log('🔍 Smart port detection (avoiding common dev ports)...');
    
    // Clean up any existing lock files
    cleanupLockFiles();
    
    const port = await findAvailablePort();
    
    console.log(`🚀 Starting development server on port ${port}...`);
    console.log(`📱 Local: http://localhost:${port}`);
    console.log(`🌐 Network: http://192.168.56.1:${port}`);
    console.log('💡 This port avoids common development conflicts');
    
    // Start the Next.js development server
    const child = spawn('npx', ['next', 'dev', '-p', port.toString()], {
      stdio: 'inherit',
      shell: true,
      env: { ...process.env, PORT: port.toString() }
    });
    
    child.on('error', (error) => {
      console.error('❌ Failed to start development server:', error);
      process.exit(1);
    });
    
    child.on('exit', (code) => {
      if (code !== 0) {
        console.error(`❌ Development server exited with code ${code}`);
        process.exit(code);
      }
    });
    
    // Handle graceful shutdown
    const shutdown = () => {
      console.log('\n🛑 Shutting down development server...');
      child.kill('SIGINT');
      process.exit(0);
    };
    
    process.on('SIGINT', shutdown);
    process.on('SIGTERM', shutdown);
    
  } catch (error) {
    console.error('❌ Error starting development server:', error);
    process.exit(1);
  }
}

// Start the server
startDevServer();





