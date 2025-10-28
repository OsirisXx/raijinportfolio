const { spawn, exec } = require('child_process');
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

// Function to clean up lock files and .next directory
function cleanupNextFiles() {
  const nextDir = path.join(process.cwd(), '.next');
  const lockPath = path.join(nextDir, 'dev', 'lock');
  
  try {
    // Remove lock file
    if (fs.existsSync(lockPath)) {
      fs.unlinkSync(lockPath);
      console.log('🧹 Cleaned up lock file');
    }
    
    // Remove dev directory to force clean start
    const devDir = path.join(nextDir, 'dev');
    if (fs.existsSync(devDir)) {
      fs.rmSync(devDir, { recursive: true, force: true });
      console.log('🧹 Cleaned up dev directory');
    }
  } catch (error) {
    console.warn('⚠️  Could not clean up some files:', error.message);
  }
}

// Function to kill any existing Next.js processes
function killNextProcesses() {
  return new Promise((resolve) => {
    const isWindows = process.platform === 'win32';
    const command = isWindows 
      ? 'tasklist /FI "IMAGENAME eq node.exe" /FO CSV | findstr next'
      : 'ps aux | grep next | grep -v grep';
    
    exec(command, (error, stdout) => {
      if (stdout && stdout.trim()) {
        console.log('🔄 Found existing Next.js processes, cleaning up...');
        if (isWindows) {
          exec('taskkill /F /IM node.exe /FI "WINDOWTITLE eq *next*"', () => {
            setTimeout(resolve, 1000); // Wait for cleanup
          });
        } else {
          exec('pkill -f next', () => {
            setTimeout(resolve, 1000); // Wait for cleanup
          });
        }
      } else {
        resolve();
      }
    });
  });
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
    console.log('🔍 Cleaning up and finding available port...');
    
    // Clean up lock files and dev directory
    cleanupNextFiles();
    
    // Kill any existing Next.js processes
    await killNextProcesses();
    
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
