import { startServer } from './mcp/server.js';

if (process.argv.includes('--smoke')) {
  process.stdout.write('redactd-canvas smoke ok\n');
} else {
  startServer();
}
