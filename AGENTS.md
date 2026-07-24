# AGENTS.md - RedactdCanvasAnti

If the user says something is wrong, give a short sense check before editing.

## Plugin Update Rule

This repo is an Antigravity plugin installed to:
- `~/.gemini/config/plugins/redactd-canvas` (skills and plugin manifest)
- `~/.gemini/antigravity/mcp/redactd-canvas` (MCP schemas)

When changing anything under `plugins/` that affects plugin behavior, skills, bundled assets, MCP tools, component knowledge, or metadata:

1. Reinstall/synchronize with `npm run install:antigravity` (or `npm run refresh:plugin`) inside `plugins/`.
2. Verify updated files in `~/.gemini/config/plugins/redactd-canvas` and `~/.gemini/antigravity/mcp/redactd-canvas`.

