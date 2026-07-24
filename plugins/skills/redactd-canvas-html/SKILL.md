---
name: redactd-canvas-html
description: Create or modify semantic HTML Foundations UI on an active Redactd canvas using Redactd's native HTML element registry and html-* class system. Use when Antigravity or Codex needs to build plain HTML/CSS pages, sections, articles, navigation, lists, media, or forms in Redactd instead of using Muibook Web Components.
---

# Redactd Canvas: HTML

Build Redactd canvas trees from the default **HTML Foundations** library. Use native semantic
elements and the provided `html-*` classes; do not substitute Muibook components.

Read [references/html-foundations.md](references/html-foundations.md) before authoring a tree. It is
the source of truth for available Redactd types, props, class presets, valid structures, and
accessibility rules.

## Tree contract

Build one root JSON object. Every node must contain all four fields:

```json
{
  "id": "unique_descriptive_id",
  "type": "Section",
  "props": { "class": "html-section-stack" },
  "children": []
}
```

- Give every node a unique, descriptive `id`.
- Use only the PascalCase Redactd HTML types in the reference.
- Put authored text in `props.text`.
- Put styling hooks in `props.class`; use `props.style` only for a necessary one-off adjustment.
- Always include `children`. Keep it empty for leaves and native void elements.
- Put slot placement in `props.slot` when a parent contract requires it.
- Send the root tree itself to **Paste JSON**, without an API wrapper.

## Authoring workflow

1. Read the HTML Foundations reference.
2. Interpret the request or wireframe as semantic structure, content hierarchy, and layout intent.
3. Choose the most meaningful native element before considering `Div`.
4. Choose existing `html-*` classes that match the visual intent.
5. Build a shallow, readable tree and validate every type, prop, class, relationship, and ID.
6. Select browser or API transport and send the validated tree.

## Semantic rules

- Use one `Main` for the document's primary content.
- Use `Section` for a thematic region, `Article` for self-contained content, `Aside` for supporting
  content, `Nav` for navigation, and `Header`/`Footer` for introductory or closing content.
- Use `Heading1` through `Heading6` in a logical hierarchy and `Paragraph` for prose.
- Use `UnorderedList` or `OrderedList` with `ListItem` children.
- Use `DefinitionList` with ordered `DefinitionTerm` and `DefinitionDetail` pairs.
- Use `Select` with `Option` children.
- Use `Fieldset` with `Legend` for related controls.
- Pair each visible `Label.props.for` with its control's `props.id`.
- Give form controls meaningful `id` and `name` values.
- Give `Image` meaningful `alt` text, or `alt: ""` only when intentionally decorative.
- Keep `Image`, `Input`, and `HorizontalRule` children empty.
- Never invent framework components, class names, props, or CSS tokens.

## Class system

- Treat classes as reusable presentation and layout hooks, not semantic replacements.
- Prefer a supplied class or supported class composition from the reference.
- Combine only documented compatible classes, such as
  `html-field-group html-vstack html-vstack--tight`.
- Prefer `html-vstack`, `html-hstack`, and `html-grid` for layout.
- Prefer `html-surface` or `html-card` for surfaced regions.
- Prefer `html-eyebrow`, `html-heading-display`, and `html-paragraph-lede` for editorial hierarchy.
- Use invalid form classes only when the requested state is invalid or erroneous.

## Wireframes

Treat a wireframe as intent rather than pixel-perfect output. Infer semantic regions, heading
hierarchy, repeated patterns, layout direction, and content relationships. Treat unlabelled boxes
as layout regions by default, not automatic cards. Use `Div` only when no semantic element fits.
Produce a reasonable first pass without blocking on minor ambiguity.

## Transport routing

1. Prefer Codex Browser when an active Redactd canvas is already open.
2. Otherwise use `create_redactd_recipe` when available.
3. If neither is available, ask the user to open Redactd in Codex Browser or install the full
   Redactd Canvas plugin.

Do not ask for an API key when browser transport is available.

## Browser workflow

1. Use the Browser skill and claim the already-open Redactd canvas tab. Do not open a duplicate.
2. Serialize the root tree with `JSON.stringify(tree)` and write it to the tab clipboard.
3. Select the wider canvas background so the selected item is `Canvas`.
4. Open the canvas ellipsis menu and choose **Paste JSON**.
5. Verify the pasted structure and the `✓ Pasted` confirmation.
6. Preserve existing canvas content unless the user explicitly asks to replace it.

Never use **Cut**, **Delete**, or **Copy for AI** as a substitute for **Paste JSON**.

## API workflow

1. Call `get_redactd_context` and confirm `library` is `html-foundations`.
2. If the active library is `muibook`, use `redactd-canvas-muibook` instead. If it is unsupported,
   report that custom libraries are unavailable through this plugin.
3. Wrap the validated root as
   `{ "tree": tree, "open_canvas": true, "library": "html-foundations" }` only for the API call.
4. Call `create_redactd_recipe` with that wrapper.
5. Report the exact returned `canvas_url`; do not rewrite it.

Ask for a Redactd API key only after selecting API transport. Do not include `workspace_id`.

## Response

- Browser: summarize what was pasted and confirm it is open on the canvas.
- API success: summarize what was added and include `canvas_url`.
- API failure: report the returned `error` and `request_id`.
