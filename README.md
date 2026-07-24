# Redactd Canvas for Antigravity & Codex

Redactd Canvas lets you prompt UI in Antigravity or Codex and send it directly to your active Redactd canvas on redactd.xyz. Ask Antigravity for a form, dashboard, pricing section, onboarding flow, or other interface, then open the returned Redactd link or review on canvas to keep editing.

## What You Need

- Google Antigravity (AGY CLI, Antigravity IDE, desktop app) or Codex with plugin support.
- A Redactd account.
- An open Redactd canvas in your browser, or a Redactd API key for the API fallback.

You can find your API key in Redactd at Profile > Settings or Team Settings > Account Settings > API Key. An API key is not required when Antigravity/Codex can paste directly into an already-open Redactd canvas.

## Using Redactd Canvas in Antigravity

### Option 1: Native Plugin & MCP Registration
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

## Add Redactd Canvas to Codex

### Option 1: Add from GitHub

In Codex, add this repository as a plugin marketplace:

```text
Source: michaeltrilford/RedactdCanvas
Git ref: main
Sparse paths:
.agents/plugins
plugins
```

The full GitHub URL also works: `https://github.com/michaeltrilford/RedactdCanvas.git`.

You can also add it from the Codex CLI:

```bash
codex plugin marketplace add michaeltrilford/RedactdCanvas
```

Then install the plugin named `Redactd Canvas`.

### Option 2: Add from a local checkout

1. Download or clone this repository to your computer.
2. Open Codex.
3. Add this repository as a plugin marketplace.
4. Install the plugin named `Redactd Canvas`.
5. Start a new Codex chat and ask Codex to create UI on your Redactd canvas.

When Codex can access an open Redactd canvas in its browser, it pastes the design directly. It asks for your Redactd API key only when it needs to use the API fallback.

## Install Only the Muibook Canvas Skill

The Muibook Canvas skill can also be installed without the Redactd API backend. Install the following GitHub folder as a global Codex skill:

```text
plugins/skills/redactd-canvas-muibook
```

The standalone skill can create basic layouts independently, then paste them into an already-open `redactd.xyz` canvas through Codex Browser. Pair it with the standalone `muibook-components` skill for the recommended lightweight workflow and broader component, prop, slot, token, and composition knowledge.

Install the companion skill from `michaeltrilford/muibook` at:

```text
skills/muibook-components
```

The Muibook Knowledge MCP and full Redactd Canvas plugin remain optional richer paths. The browser workflow does not require the Redactd API backend or an API key.

The skill's source of truth remains in this repository. Standalone installations are local copies and must be reinstalled from the same GitHub path to receive future updates.

## Canvas Skill Adapters

Redactd supports different canvas component systems through separate, namespaced skills under `plugins/skills`:

```text
plugins/skills/
└── redactd-canvas-muibook/
    └── SKILL.md
```

The Muibook adapter is the first supported skill. Future adapters may support native HTML elements or other component systems, but they are not included yet. Each adapter owns its component-knowledge routing while following the same Redactd JSON tree and browser-paste workflow.

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

Redactd Canvas gives Codex a Redactd-aware design tool. Codex uses the Muibook adapter and its available knowledge source to create valid UI. It pastes the result directly into an open Codex browser canvas when possible, or queues it through the API fallback.

After a direct browser paste, the design is already open on the active canvas. After a successful API request, Codex returns a Redactd canvas link that you can open to review and continue editing.

## Troubleshooting

If Codex cannot send UI to Redactd, check that:

- The full `Redactd Canvas` plugin or the standalone `redactd-canvas-muibook` skill is installed and enabled in Codex.
- The Muibook knowledge MCP is available when using the standalone skill.
- Redactd is open in the Codex browser when using direct paste.
- Your Redactd API key is correct when using the API fallback.
- Your Redactd account has access to the workspace you want to update.
- You have an active internet connection.

For help, visit [redactd.xyz](https://redactd.xyz).
