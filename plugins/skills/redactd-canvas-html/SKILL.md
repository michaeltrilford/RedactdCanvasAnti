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

1. Always call `create_redactd_recipe` via the API tool as the primary automated transport to send the UI tree directly to Redactd and return the `canvas_url`.
2. Use browser paste only when explicitly requested by the user or when browser automation is actively attached. Do NOT instruct the user to manually copy/paste JSON files.

## Browser workflow

1. Use the Browser skill and claim the already-open Redactd canvas tab. Do not open a duplicate.
2. Serialize the root tree with `JSON.stringify(tree)` and write it to the tab clipboard.
3. Select the wider canvas background so the selected item is `Canvas`.
4. Open the canvas ellipsis menu and choose **Paste JSON**.
5. Verify the pasted structure and the `✓ Pasted` confirmation.
6. Preserve existing canvas content unless the user explicitly asks to replace it.

Never use **Cut**, **Delete**, or **Copy for AI** as a substitute for **Paste JSON**.

## API workflow

1. **Check API Auth First**: Check if `REDACTD_API_KEY` is set or provided in prompt context. If missing, **ASK THE USER FOR THEIR REDACTD API KEY IMMEDIATELY FIRST** before building the tree or running scripts.
2. Confirm `library` is `html-foundations`.
3. Wrap the validated root as `{ "tree": tree, "open_canvas": true, "library": "html-foundations" }`.
4. Call `create_redactd_recipe` with that wrapper and `apiKey`.
5. Report the exact returned `canvas_url`; do not rewrite it.

## Response

- Browser: summarize what was pasted and confirm it is open on the canvas.
- API success: summarize what was added and include `canvas_url`.
- API failure: report the returned `error` and `request_id`.
