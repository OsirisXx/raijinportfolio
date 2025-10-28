# Development Scripts

This directory contains custom development scripts for the portfolio project.

## Scripts Available

### `dev-robust.js` (Default - Recommended)
- **Command**: `npm run dev`
- **Purpose**: Smart port detection that avoids conflicts without killing processes
- **Features**:
  - Avoids ports 3000-3005, 8000, 8080, 5000, 4000, 9000
  - Starts from port 3006+ to avoid conflicts
  - Cleans up only lock files (non-aggressive)
  - Doesn't interfere with other running processes
  - Best for avoiding port conflicts safely

### `dev-smart.js` (Smart)
- **Command**: `npm run dev:smart`
- **Purpose**: Smart port detection that avoids common development ports
- **Features**:
  - Avoids ports 3000-3005, 8000, 8080, 5000, 4000, 9000
  - Starts from port 3006+ to avoid conflicts
  - Cleans up lock files
  - Shows local and network URLs
  - Good for avoiding conflicts with other dev servers

### `dev-simple.js` (Simple)
- **Command**: `npm run dev:simple`
- **Purpose**: Basic port detection starting from 3000
- **Features**:
  - Automatically detects port conflicts
  - Finds next available port (3000, 3001, 3002, etc.)
  - Cleans up lock files
  - Shows local and network URLs

### `dev-clean.js` (Recommended for Lock Issues)
- **Command**: `npm run dev:clean`
- **Purpose**: Aggressive cleanup for stubborn lock file issues
- **Features**:
  - Finds available port
  - Removes lock files and dev directory
  - Kills existing Next.js processes
  - Forces clean restart
  - Best for persistent lock file problems

### `dev.js` (Full Version)
- **Command**: `npm run dev:full`
- **Purpose**: Advanced port management with cleanup
- **Features**:
  - Finds available port
  - Cleans up lock files
  - Kills existing Next.js processes
  - More aggressive cleanup (use with caution)

### Standard Next.js
- **Command**: `npm run dev:next`
- **Purpose**: Standard Next.js development server
- **Features**: Uses Next.js default port handling

## How It Works

1. **Port Detection**: Scripts check if port 3000 is available
2. **Port Increment**: If port 3000 is busy, automatically tries 3001, 3002, etc.
3. **Server Start**: Launches Next.js development server on the found port
4. **URL Display**: Shows both local and network URLs for easy access

## Usage Examples

```bash
# Use the robust port finder (recommended - safe port detection)
npm run dev

# Use the smart port finder (avoids common dev ports)
npm run dev:smart

# Use the simple port finder (basic detection)
npm run dev:simple

# Use the clean version (for lock file issues)
npm run dev:clean

# Use the full version with aggressive cleanup
npm run dev:full

# Use standard Next.js (may conflict with existing servers)
npm run dev:next
```

## Troubleshooting

- **Port conflicts**: All scripts automatically handle this
- **Lock file issues**: Use `npm run dev` (robust) for best results
- **Multiple instances**: All scripts will find the next available port
- **Safe operation**: Use `npm run dev` (robust) - doesn't kill other processes
- **Stubborn issues**: Use `npm run dev:full` for maximum cleanup
- **Config changes**: Use `npm run dev` (robust) to handle restarts

## Benefits

✅ **No more port conflicts** - Automatically finds available ports  
✅ **Clean startup** - Handles existing processes gracefully  
✅ **Clear feedback** - Shows exactly which port is being used  
✅ **Network access** - Displays both local and network URLs  
✅ **Graceful shutdown** - Properly handles Ctrl+C termination
