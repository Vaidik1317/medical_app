const path = require('path');
const fs = require('fs');
const Service = require('node-windows').Service;
require('dotenv').config(); // Load .env automatically

// -------------------------------
// Paths
// -------------------------------
const serverPath = path.join(__dirname, 'src', 'server.js');
const logFolder = path.join(__dirname, 'logs');

// Check server.js exists
if (!fs.existsSync(serverPath)) {
  console.error('❌ server.js not found at:', serverPath);
  process.exit(1);
}

// Create logs folder if missing
if (!fs.existsSync(logFolder)) {
  fs.mkdirSync(logFolder, { recursive: true });
  console.log('✅ Created logs folder at:', logFolder);
}

// -------------------------------
// Create Windows Service
// -------------------------------
const svc = new Service({
  name: 'MedicalAppBackend',
  description: 'Backend service for Medical App using Node.js & Express',
  script: serverPath,
  nodeOptions: ['--harmony', '--max_old_space_size=4096'],
  workingDirectory: __dirname,
  logpath: logFolder,
  // Pass environment variables from .env
  env: Object.keys(process.env).map(key => ({
    name: key,
    value: process.env[key]
  }))
});

// -------------------------------
// Service Event Listeners
// -------------------------------
svc.on('install', () => {
  console.log('✅ Service installed successfully. Starting now...');
  svc.start();
});

svc.on('alreadyinstalled', () => {
  console.log('⚠️ Service is already installed.');
});

svc.on('start', () => {
  console.log('🚀 Service started successfully.');
});

svc.on('stop', () => {
  console.log('🛑 Service stopped.');
});

svc.on('uninstall', () => {
  console.log('🗑️ Service uninstalled.');
});

svc.on('error', (err) => {
  console.error('❌ Service error:', err);
});

// -------------------------------
// Install / Reinstall Logic
// -------------------------------
if (process.argv.includes('--uninstall')) {
  svc.uninstall();
} else {
  svc.install();
}
