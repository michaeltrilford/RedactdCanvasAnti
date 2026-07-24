# Redactd Canvas for Antigravity

Redactd Canvas lets you prompt UI in Antigravity and send it directly to your active Redactd canvas on redactd.xyz. Ask Antigravity for a form, dashboard, pricing section, onboarding flow, or other interface, then open the returned Redactd link or review on canvas to keep editing.

## What You Need

- Google Antigravity (AGY CLI, Antigravity IDE, desktop app).
- A Redactd account.
- An open Redactd canvas in your browser, or a Redactd API key for the API fallback.

You can find your API key in Redactd at Profile > Settings or Team Settings > Account Settings > API Key. An API key is not required when Antigravity can paste directly into an already-open Redactd canvas.

## Using Redactd Canvas in Antigravity

### Option 1: Native Plugin & MCP Registration (Recommended)
Run the installation script inside `plugins/` to install Redactd Canvas into your Antigravity user environment (`~/.gemini/config/plugins/redactd-canvas` and `~/.gemini/antigravity/mcp/redactd-canvas`):

```bash
cd plugins
npm run install:antigravity
```

### Option 2: Project-Level MCP
Antigravity automatically detects the project root `.mcp.json` when opening this repository. The `redactd-canvas` MCP server provides the following tools:
- `get_redactd_context`: Query active Redactd canvas library state.
- `create_redactd_recipe`: Queue component trees to active canvas via API.
- `get_redactd_component_knowledge`: Retrieve bundled component registry schema.

## Canvas Skill Adapters

Redactd supports different canvas component systems through separate, namespaced skills under `plugins/skills`:

```text
plugins/skills/
└── redactd-canvas-muibook/
    └── SKILL.md
```

The Muibook adapter owns component-knowledge routing while following the same Redactd JSON tree and browser-paste workflow.

## Example Prompts

```text
Create a sign in form on my Redactd canvas.
```

```text
Add a dashboard layout with metrics, recent activity, and a filter bar.
```

```text
Create a three-tier pricing section for a SaaS product.
```

## How It Works

Redactd Canvas gives Antigravity a Redactd-aware design tool. Antigravity uses the Muibook adapter and its available knowledge source to create valid UI. It pastes the result directly into an open browser canvas when possible, or queues it through the API fallback.

After a direct browser paste, the design is already open on the active canvas. After a successful API request, Antigravity returns a Redactd canvas link that you can open to review and continue editing.

## Troubleshooting

If Antigravity cannot send UI to Redactd, check that:

- The `redactd-canvas` plugin/skill is installed and enabled in Antigravity.
- Redactd is open in the browser when using direct paste.
- Your Redactd API key is correct when using the API fallback.
- Your Redactd account has access to the workspace you want to update.
- You have an active internet connection.

For help, visit [redactd.xyz](https://redactd.xyz).
