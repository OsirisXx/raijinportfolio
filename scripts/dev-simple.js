const { spawn } = require('child_process');
const net = require('net');
const fs = require('fs');
const path = require('path');

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

// Function to find the next available port
async function findAvailablePort(startPort = 3000) {
  let port = startPort;
  
  // Skip port 3000 if it's already in use and start from 3001
  if (!(await isPortAvailable(3000))) {
    console.log('⚠️  Port 3000 is already in use, starting from 3001...');
    port = 3001;
  }
  
  while (port < startPort + 100) { // Check up to 100 ports
    if (await isPortAvailable(port)) {
      return port;
    }
    port++;
  }
  
  throw new Error(`No available ports found starting from ${startPort}`);
}

// Main function
async function startDevServer() {
  try {
    console.log('🔍 Finding available port...');
    
    // Clean up any existing lock files
    cleanupLockFiles();
    
    const port = await findAvailablePort(3000);
    
    console.log(`🚀 Starting development server on port ${port}...`);
    console.log(`📱 Local: http://localhost:${port}`);
    console.log(`🌐 Network: http://192.168.56.1:${port}`);
    
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
