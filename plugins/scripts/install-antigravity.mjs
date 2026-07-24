import { cpSync, mkdirSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { TOOL_DEFINITIONS } from '../src/tools/definitions.js';

const scriptDir = dirname(fileURLToPath(import.meta.url));
const pluginRoot = resolve(scriptDir, '..');
const repoRoot = resolve(pluginRoot, '..');
const homeDir = process.env.HOME || '/Users/michaeltrilford';

const antigravityPluginsDir = resolve(homeDir, '.gemini/config/plugins/redactd-canvas');
const antigravityMcpDir = resolve(homeDir, '.gemini/antigravity/mcp/redactd-canvas');

console.log('Installing Redactd Canvas into Antigravity...');

// 1. Copy plugin manifest and skills to ~/.gemini/config/plugins/redactd-canvas
mkdirSync(antigravityPluginsDir, { recursive: true });

const indexJsPath = resolve(pluginRoot, 'src/index.js');

writeFileSync(
  resolve(antigravityPluginsDir, 'plugin.json'),
  JSON.stringify(
    {
      name: 'redactd-canvas',
      version: '0.1.0',
      description: 'Prompt UI from Antigravity to redactd.xyz.',
      skills: './skills/',
      mcpServers: './mcp.json'
    },
    null,
    2
  ) + '\n'
);

writeFileSync(
  resolve(antigravityPluginsDir, 'mcp.json'),
  JSON.stringify(
    {
      mcpServers: {
        'redactd-canvas': {
          command: 'node',
          args: [indexJsPath]
        }
      }
    },
    null,
    2
  ) + '\n'
);

const skillsSource = resolve(pluginRoot, 'skills');
const skillsDest = resolve(antigravityPluginsDir, 'skills');
cpSync(skillsSource, skillsDest, { recursive: true });
console.log(`✓ Synchronized skills and mcp.json to ${antigravityPluginsDir}`);

// 2. Generate MCP schemas in ~/.gemini/antigravity/mcp/redactd-canvas
mkdirSync(antigravityMcpDir, { recursive: true });

for (const tool of TOOL_DEFINITIONS) {
  const schemaPath = resolve(antigravityMcpDir, `${tool.name}.json`);
  writeFileSync(schemaPath, JSON.stringify(tool, null, 2) + '\n');
  console.log(`✓ Created MCP tool schema: ${tool.name}.json`);
}

console.log('✓ Successfully installed Redactd Canvas into Antigravity!');
