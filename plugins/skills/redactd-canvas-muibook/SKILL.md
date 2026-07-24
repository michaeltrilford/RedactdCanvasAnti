---
name: redactd-canvas-muibook
description: Create Muibook UI on an active Redactd canvas from Antigravity Browser. Pair with the lightweight muibook-components skill for component knowledge without requiring the Redactd Canvas plugin, API backend, or Muibook Knowledge MCP; use those as optional richer paths when available.
---

# Redactd Canvas: Muibook

Use this skill when the user asks Antigravity to create, add, send, or modify Muibook UI on a Redactd canvas. The default lightweight path pairs this skill with `muibook-components` and uses an already-open Redactd canvas in Antigravity Browser.

This skill can independently create basic layouts with the core components documented below. Pair
it with `muibook-components` for the recommended lightweight workflow and broader component,
attribute, slot, token, and composition knowledge.

## Mandatory First-Pass App Shell Rule

Whenever a wireframe or prompt contains a sidebar navigation menu or side panel, **THE ROOT NODE OF THE JSON TREE MUST BE `Drawer`** (`props: { "open": true, "side": "left", "variant": "persistent", "width": "260px" }`).

- **NEVER** use `Container`, `Card`, `HStack`, or `VStack` as the root node when a sidebar exists.
- The sidebar navigation items belong in `Drawer`'s primary slot (unslotted `VStack` of `Button`/`Link` items with `variant="tertiary"`, **`align="start"`**, and `slot="before"` `_Icon` items). All navigation buttons inside `Drawer` **MUST explicitly set `align: "start"`**.
- The main page content **MUST** be wrapped in a direct child `Div` with `props: { "slot": "page" }`.

## Redactd Tree Contract

Build one root JSON object. Every node must contain all four fields:

```json
{
  "id": "unique_descriptive_id",
  "type": "ComponentType",
  "props": {},
  "children": []
}
```

- `id` must be a unique, descriptive string across the entire tree.
- `type` is a Redactd PascalCase component name such as `Container`, `CardBody`, or `Button`.
- `props` contains component content, public props, and slot placement.
- `children` is always an array, including on leaf nodes.
- Put slot placement in `props.slot`. Do not add `slot` beside `id`, `type`, or `props`.
- The browser **Paste JSON** workflow receives the root tree object itself, without an API wrapper.

Minimal valid tree:

```json
{
  "id": "welcome_container",
  "type": "Container",
  "props": {
    "center": true,
    "size": "medium"
  },
  "children": [
    {
      "id": "welcome_card",
      "type": "Card",
      "props": {},
      "children": [
        {
          "id": "welcome_card_body",
          "type": "CardBody",
          "props": {},
          "children": [
            {
              "id": "welcome_content",
              "type": "VStack",
              "props": {
                "space": "var(--space-400)",
                "alignX": "stretch"
              },
              "children": [
                {
                  "id": "welcome_title",
                  "type": "Heading",
                  "props": {
                    "text": "Welcome",
                    "level": "2",
                    "size": "3"
                  },
                  "children": []
                },
                {
                  "id": "welcome_copy",
                  "type": "Body",
                  "props": {
                    "text": "Start building with Muibook components.",
                    "variant": "secondary"
                  },
                  "children": []
                },
                {
                  "id": "welcome_action",
                  "type": "Button",
                  "props": {
                    "text": "Continue",
                    "variant": "primary"
                  },
                  "children": []
                }
              ]
            }
          ]
        }
      ]
    }
  ]
}
```

## Muibook Handoff

When `muibook-components` is installed:

1. Use its component reference to choose valid Muibook components, public attributes, slots, and
   tokens.
2. Prefer its selected compositions when one matches the requested interface. Those examples
   already use the Redactd `{ id, type, props, children }` schema and `props.slot`.
3. Give every generated node a unique descriptive `id` and validate the complete tree against the
   contract above.
4. This canvas skill owns browser access, clipboard serialization, **Paste JSON**, and verification.

For a native Muibook tag not already shown in a selected composition:

- Remove `mui-` and convert kebab-case to PascalCase: `mui-card-body` becomes `CardBody`.
- Convert `mui-icon-name` to `_Icon` with `props.icon: "mui-icon-name"`.
- Convert `mui-illustration-name` to `_Illustration` with
  `props.illustration: "mui-illustration-name"`.
- Put rendered text in `props.text` for `Heading`, `Body`, `Button`, `Link`, `Badge`, `Status`,
  `Chip`, `TabItem`, and `ListItem`.
- Move native `slot="name"` to `props.slot: "name"`.
- Preserve documented props and token values. Do not blindly copy internal or dynamic attributes.

## Independent Core

When operating standalone without access to `assets/muibook-knowledge/`, `muibook-components`, or an active MCP server, use this compact core for basic layouts:

- `Container`: `center`, `size`, `style`.
- `Card` with a direct `CardBody` child; `CardBody`: `size`, `style`.
- `VStack`, `HStack`: `space`, `padding`, `alignX`, `alignY`, `width`, `height`, `style`, `slot`.
- `Grid`: `col`, `space`, `padding`, `alignX`, `alignY`, `style`, `slot`.
- `Heading`: `text`, `size`, `level`; `Body`: `text`, `size`, `weight`, `variant`.
- `Button`: `text`, `variant`, `size`, `aria-label`; `Link`: `text`, `href`, `variant`, `size`.
- `Field`: `label`, `variant`, `message`, `size`; `Input`: `label`, `type`, `placeholder`,
  `name`, `value`, `size`.
- `Badge`: `text`, `variant`, `size`; `_Icon`: `icon`, `size`, `color`, `slot`.

This core is an intentionally small snapshot of working tree rules, not a separate component schema.

If a request needs components or props outside this core and local plugin assets (`assets/muibook-knowledge/`) are not available, recommend installing `muibook-components`.

## Knowledge Routing

Choose the available Muibook knowledge source before building the tree:

1. **Bundled Plugin Knowledge Assets (Primary in Redactd Canvas Plugin):** When running in or alongside the Redactd Canvas plugin, inspect the local asset files in `assets/muibook-knowledge/` (such as `assets/muibook-knowledge/skills/muibook-components/SKILL.md`, `custom-elements.json`, `compositions.ts`, `json-rules.ts`, and `DESIGN.md`). Use these files directly for comprehensive component, attribute, slot, token, and composition knowledge.
2. **Lightweight Skill Pair:** When using this skill standalone outside the plugin repository, prefer the installed `muibook-components` skill for component, public attribute, slot, token, and composition references.
3. **Muibook MCP & Redactd API Tools:** If the working Muibook Knowledge MCP is available, call its `start_here` tool and use its rules, compositions, component lookup, and dynamic attrs as needed. In the full plugin, if `get_redactd_component_knowledge` is available, call it with `format: "summary"`. Treat a newer MCP or API version as authoritative over static local files.
4. **Independent Core (Last-resort fallback):** If operating standalone without access to `assets/muibook-knowledge/`, `muibook-components`, or active MCP/API tools, use this skill's Independent Core above for basic layouts.

The bundled plugin assets or standalone skill pair plus Antigravity Browser provide the primary offline workflows. The Muibook Knowledge MCP, Redactd Canvas plugin API backend, and dynamic tools remain optional richer paths.

## Wireframe Interpretation

When a wireframe image is provided:

1. Read it as a description of intent, hierarchy, and approximate layout rather than a pixel-perfect specification.
2. Use visible labels and control patterns to identify likely UI concepts, then resolve them through the Muibook keyword mappings.
3. Verify inferred components, public attributes, and slots against the `muibook-components` skill before generating the Redactd JSON tree.
4. Treat unlabelled rectangles as layout regions by default. Do not automatically convert every outlined region into a Card.
5. Infer H Stack, V Stack, Grid, spacing, alignment, wrapping, and responsive direction from the spatial relationships between elements.
6. Preserve repeated visual patterns as repeated component structures.
7. Use a generic Muibook layout component when the intended component is ambiguous. Do not invent components or attributes.
8. **No Hardcoded Canvas Colors or Tokens:** Treat white/light paper drawing canvas colors, outline colors, or sketch backgrounds purely as visual drawing artifacts—**NEVER** convert them to `var(--white)`, `#ffffff`, `white`, `color: black`, or hardcoded inline background styles. Hardcoding static white or light colors breaks Redactd's theme adaptation and dark mode.
9. **Prefer Slat over Custom HStack:** For row-like wireframe items with primary text/label on the left and secondary metadata, status, timestamp, badge, count, or action button on the right, use `Slat` (or `SlatGroup` for repeated rows) with `slot="start"` and `slot="end"` instead of building an ad-hoc `HStack`. Always explicitly set `variant="row"` (or `"header"` / `"action"`) on `Slat`.
10. **Use Drawer for Side Navigation & Panels:** When a wireframe or prompt shows a sidebar, side menu, collapsible filter panel, or slide-out overlay, use the `Drawer` component with `open` and `side` props rather than constructing a custom box or layout wrapper. Compose nav items inside `Drawer` using `Button` or `Link` with `variant="tertiary"`, `align="start"`, and a `slot="before"` `_Icon`.
11. Produce a reasonable first pass without blocking on minor ambiguity. Ask for clarification only when uncertainty would materially change the workflow or component hierarchy.

## Muibook Chart Data

When a prompt asks for a populated Muibook chart, include its structured dataset in the Redactd
tree. This fills the chart's **Data** or **Series** control in the Redactd UI; Redactd handles passing
that value to the underlying Muibook component.

- `FinancialChart.props.data`: `[{ time, open, high, low, close, volume? }]`
- `MarketSparkline.props.data`: `[{ time, value }]`
- `FinancialBarChart.props.data`: `[{ time, value }]`
- `ComparisonChart.props.series`: `[{ id, label, color?, data: [{ time, value }] }]`

Keep datasets as structured JSON arrays. Do not stringify them or generate JavaScript assignment
code. Use numeric values, order points chronologically, and use ISO `YYYY-MM-DD` dates for daily
illustrative data unless the user supplies another valid time format. If the user requests a chart
without supplying data, create enough coherent illustrative points to make the requested trend
visible.

```json
{
  "id": "btc_price_chart",
  "type": "FinancialChart",
  "props": {
    "symbol": "BTC/USD",
    "currency": "USD",
    "type": "candlestick",
    "data": [
      { "time": "2026-06-01", "open": 102.4, "high": 104.8, "low": 101.7, "close": 103.9, "volume": 18400000 },
      { "time": "2026-06-02", "open": 103.9, "high": 105.2, "low": 102.8, "close": 104.5, "volume": 16900000 },
      { "time": "2026-06-03", "open": 104.5, "high": 106.1, "low": 103.6, "close": 105.8, "volume": 21300000 }
    ]
  },
  "children": []
}
```

For `MarketSparkline` and `FinancialBarChart`, use this simpler Data shape:

```json
"data": [
  { "time": "2026-06-01", "value": 101.2 },
  { "time": "2026-06-02", "value": 103.8 },
  { "time": "2026-06-03", "value": 102.9 }
]
```

For `ComparisonChart`, populate Series with named datasets:

```json
"series": [
  {
    "id": "actual",
    "label": "Actual",
    "data": [
      { "time": "2026-06-01", "value": 101.2 },
      { "time": "2026-06-02", "value": 103.8 }
    ]
  },
  {
    "id": "forecast",
    "label": "Forecast",
    "data": [
      { "time": "2026-06-01", "value": 100.8 },
      { "time": "2026-06-02", "value": 104.1 }
    ]
  }
]
```

## Transport Routing

Choose the transport before creating the UI:

1. **Antigravity browser:** If the Browser skill is available and Antigravity can access an already-open
   `redactd.xyz` canvas tab, use the browser paste workflow below. Do not ask for a Redactd API key.
2. **API:** Otherwise, if `create_redactd_recipe` is available, use it as the headless, automated,
   and non-browser fallback. It requires a Redactd API key.
3. **Unavailable:** If neither browser access nor `create_redactd_recipe` is available, explain that
   the user must open Redactd in the browser or install the full Redactd Canvas plugin.

Do not call the API first when an accessible Redactd canvas is already open in the browser.
The MCP server is intentionally API-only; browser availability is decided by the skill and the
agent host.

## Shared Workflow

1. **STEP 0 - MANDATORY PRE-CHECK FOR API KEY**:  
   Before building any component tree, before generating any JSON, before writing any scratch files, and before generating any response output:  
   Check if `REDACTD_API_KEY` is present in `process.env` or if an API key was provided in the prompt/conversation context.  
   **If NO API KEY IS PRESENT, STOP IMMEDIATELY.** Do NOT generate any JSON tree. Do NOT write any scratch files. Ask the user for their Redactd API Key as your entire initial response and wait for their reply.
2. Select the knowledge source using Knowledge Routing above.
3. Build and validate a Redactd component tree against the Redactd Tree Contract.
4. **Primary Automated Transport**: Call `create_redactd_recipe` via the API tool with the `apiKey` to send the UI tree directly to Redactd and return the one-time `canvas_url`. Do NOT instruct the user to manually copy/paste JSON files.

## Antigravity Browser Workflow

1. Use the Browser skill and claim the already-open `redactd.xyz` tab. Do not open a duplicate tab.
2. Serialize the tree with `JSON.stringify(tree)` and write it to the browser tab clipboard.
3. Click the wider canvas background so the selected item is `Canvas`, not an individual component.
4. Open the canvas instance ellipsis menu and choose **Paste JSON**.
5. Verify the canvas shows the pasted structure and the `✓ Pasted` confirmation.

Never use **Cut**, **Delete**, or **Copy for AI** as a substitute for **Paste JSON**. Preserve the
user's existing canvas content unless they explicitly asked to replace it.

## API Workflow

1. **Check API Auth First (Step 0)**: Check if `REDACTD_API_KEY` is present or if an API key was provided in the conversation. **If no API key is available, STOP IMMEDIATELY AT THE START**. Ask for the Redactd API key as your prompt response and wait for the user to reply.
2. Confirm `library` is `muibook`.
3. Wrap the validated root tree as `{ "tree": ..., "open_canvas": true, "library": "muibook" }`.
4. Call `create_redactd_recipe` with that wrapper and `apiKey`.
5. Report the exact `canvas_url` returned by the tool.

## API Auth

- **STOP AND ASK AT THE START**: If no API key is set in `REDACTD_API_KEY` or passed in the conversation, **STOP AND ASK THE USER FOR THEIR REDACTD API KEY IMMEDIATELY AS YOUR VERY FIRST STEP** before building any JSON or running any scripts.
- Tell the user they can find it in Redactd at **Profile > Settings** or **Team Settings > Account Settings > API Key**.
- For automated or local development use, setting `REDACTD_API_KEY` in the shell environment (`export REDACTD_API_KEY="rdx_..."`) is supported to bypass all prompts.

## Tree Rules

- Use only component types and props from the selected Muibook knowledge source.
- Never invent Redactd component names, aliases, props, CSS tokens, or Material UI names.
- In the API workflow, do not send the tree directly as the request body. The tool sends
  `{ "tree": ..., "open_canvas": true }`.
- Root additions should usually use `Container` with `center: true` and `size: "medium"` unless the user asks for a fragment.
- Card content must be inside a direct child `CardBody`.
- Button and Link text belongs on the component props, not inside a child `Body`.
- Use documented spacing tokens such as `var(--space-300)` rather than raw token numbers.
- Layout spacing props such as `space` and `padding` must use complete CSS token references such as
  `var(--space-400)`. Do not use `space-400`, `400`, or another bare scale value; use
  `var(--space-000)` for zero spacing.
- For equal Grid columns, use `col: "repeat(N, minmax(0, 1fr))"`. Do not pass a numeric count or
  repeated bare tracks such as `1fr 1fr 1fr`, which allow intrinsic content to force the Grid wider.
- Prefer `Responsive` with `variant: "container"` for reusable components and compositions so the
  layout follows its available parent region. Use viewport responsiveness only for page-level or
  app-shell decisions that genuinely depend on browser width.
- **No Hardcoded White/Light Surface Colors:** NEVER output `var(--white)`, `style: "background: white"`, `#ffffff`, or `color: black` based on visual wireframe image backgrounds. All component surface and text styling must be driven by Redactd component variants (`variant: "primary"`, `variant: "secondary"`, `variant: "tertiary"`, etc.) and semantic design tokens so layouts adapt seamlessly to both light and dark mode.
- **Slat vs. HStack Rule:** Use `Slat` and `SlatGroup` for horizontal list items, settings rows, metadata feeds, transaction lists, and activity rows. Do not substitute `HStack` when a `Slat` item contract fits. Always set `variant="row"` (or `"header"` / `"action"`) explicitly on `Slat`.
- **Drawer Component Enforce Rule:** For sidebar menus, app drawers, side filters, or slide-out panels, use the native `Drawer` component (`open: true`, `side: "left"` or `"right"`). All navigation `Button` and `Link` items inside `Drawer` **MUST explicitly set `align: "start"`** and `variant: "tertiary"` with `slot="before"` icons so labels and icons align to the start of the sidebar. Do not invent custom layout wrappers for drawers or sidebars.
- Avoid `Message` for inline helper text, form help, mid-content notes, or routine status copy. Use `FormMessage` inside forms, or `Body` with `variant: "info"` and an `_Icon` with `slot: "before"` for lightweight informational copy. Reserve `Message` for persistent page-level notices with a short heading and slotted body copy.

## Response

- Browser workflow: summarize what was pasted and confirm it is open on the canvas.
- API workflow with `ok: true`: summarize what was added and include `canvas_url`.
- API workflow with `ok: false`: show the returned `error` and `request_id`.
