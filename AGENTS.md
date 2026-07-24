# AGENTS.md - RedactdCanvas

If the user says something is wrong, give a short sense check before editing.

## Plugin Update Rule

This repo is a Codex plugin installed from the local marketplace at `.agents/plugins/marketplace.json`.
Codex runs from an installed cache copy, not directly from `plugins/`.

When changing anything under `plugins/` that affects plugin behavior, skills, bundled assets, MCP
tools, component knowledge, or plugin metadata:

1. Bump the plugin cachebuster.
2. Keep `plugins/package.json` version aligned with `plugins/.codex-plugin/plugin.json`.
3. Reinstall with `codex plugin add redactd-canvas@redactd-canvas`.
4. Verify `plugins/` matches the installed cache with `diff -rq`.
5. Tell the user to start a fresh Codex thread. If MCP/tool paths still look stale, tell them to
   restart Codex Desktop.

Prefer running this from `plugins/`:

```bash
npm run refresh:plugin
```

Do not assume editing source files means Codex is using them. Always check the installed cache when
the user asks whether the plugin is stale or current.
