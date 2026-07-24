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

const instructionsContent = `# Redactd Canvas MCP Server

Provides tools to query Redactd canvas context, retrieve component knowledge, and queue component trees directly to redactd.xyz via API.

## Available Tools
- create_redactd_recipe: Queue a Redactd component tree into active canvas. Requires tree and optional apiKey.
- get_redactd_context: Query active canvas library context.
- get_redactd_component_knowledge: Retrieve bundled component registry schema.
`;
writeFileSync(resolve(antigravityMcpDir, 'instructions.md'), instructionsContent);
console.log('✓ Created MCP instructions.md');

console.log('✓ Successfully installed Redactd Canvas into Antigravity!');
