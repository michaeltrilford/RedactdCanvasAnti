import { execFileSync } from 'node:child_process';
import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const scriptDir = dirname(fileURLToPath(import.meta.url));
const pluginRoot = resolve(scriptDir, '..');
const repoRoot = resolve(pluginRoot, '..');
const helperRoot = '/Users/michaeltrilford/.codex/skills/.system/plugin-creator/scripts';
const manifestPath = resolve(pluginRoot, '.codex-plugin/plugin.json');
const packagePath = resolve(pluginRoot, 'package.json');

function run(command, args, options = {}) {
  execFileSync(command, args, {
    cwd: options.cwd ?? pluginRoot,
    env: { ...process.env, ...(options.env ?? {}) },
    stdio: 'inherit',
  });
}

function readJson(path) {
  return JSON.parse(readFileSync(path, 'utf8'));
}

run('python3', [resolve(helperRoot, 'update_plugin_cachebuster.py'), pluginRoot]);

const manifest = readJson(manifestPath);
const packageJson = readJson(packagePath);
packageJson.version = manifest.version;
writeFileSync(packagePath, `${JSON.stringify(packageJson, null, 2)}\n`);

run('npm', ['run', 'validate:plugin']);
run('npm', ['run', 'test:smoke']);
run('codex', ['plugin', 'add', 'redactd-canvas@redactd-canvas'], { cwd: repoRoot });

const installedRoot = resolve(
  process.env.HOME,
  '.codex/plugins/cache/redactd-canvas/redactd-canvas',
  manifest.version,
);
run('diff', ['-rq', pluginRoot, installedRoot], { cwd: repoRoot });

console.log(`Redactd Canvas refreshed: ${manifest.version}`);
