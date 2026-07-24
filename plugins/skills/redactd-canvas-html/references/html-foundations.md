# HTML Foundations reference

Use this reference for Redactd's default plain HTML and class-based library.

## Component inventory

| Redactd type | HTML tag | Structure | Curated classes |
|---|---|---|---|
| `Div` | `div` | container | `html-vstack`, `html-hstack`, `html-grid`, `html-surface`, `html-card` |
| `Section` | `section` | container | `html-section`, `html-section-stack`, `html-section-surface`, `html-vstack`, `html-hstack`, `html-grid`, `html-card` |
| `Article` | `article` | container | `html-article`, `html-article-stack`, `html-article-prose`, `html-card` |
| `Aside` | `aside` | container | `html-aside`, `html-aside-note`, `html-aside-surface` |
| `Header` | `header` | container | `html-header`, `html-header-hstack`, `html-header-surface` |
| `Footer` | `footer` | container | `html-footer`, `html-footer-meta`, `html-footer-surface`, `html-vstack` |
| `Main` | `main` | container | `html-main`, `html-main-stack`, `html-main-prose` |
| `Nav` | `nav` | container | `html-nav`, `html-nav-inline`, `html-nav-hstack` |
| `Span` | `span` | text/container | `html-span`, `html-span-muted`, `html-span-eyebrow` |
| `Paragraph` | `p` | text/container | `html-paragraph`, `html-paragraph-muted`, `html-paragraph-lede`, `html-eyebrow`, `html-small-meta`, `html-footer-meta` |
| `Strong` | `strong` | text/container | `html-strong`, `html-strong-accent` |
| `Emphasis` | `em` | text/container | `html-emphasis`, `html-emphasis-subtle` |
| `Small` | `small` | text/container | `html-small`, `html-small-meta` |
| `Label` | `label` | text/container | `html-label`, `html-label-caption`, `html-label-required` |
| `Quote` | `blockquote` | text/container | `html-quote`, `html-quote-feature` |
| `CodeInline` | `code` | text/container | `html-code-inline`, `html-code-inline-muted` |
| `Preformatted` | `pre` | text leaf | `html-preformatted`, `html-preformatted-panel` |
| `Heading1`…`Heading6` | `h1`…`h6` | text/container | `html-heading-h1`…`html-heading-h6`, `html-heading-display`, `html-heading-section` |
| `UnorderedList` | `ul` | `ListItem` children | `html-unordered-list`, `html-unordered-list-plain`, `html-unordered-list-spaced` |
| `OrderedList` | `ol` | `ListItem` children | `html-ordered-list`, `html-ordered-list-plain`, `html-ordered-list-spaced` |
| `ListItem` | `li` | text/container | `html-list-item`, `html-list-item-card` |
| `DefinitionList` | `dl` | term/detail pairs | `html-definition-list`, `html-definition-list-stacked`, `html-definition-list-split` |
| `DefinitionTerm` | `dt` | text/container | `html-definition-term`, `html-definition-term-caps` |
| `DefinitionDetail` | `dd` | text/container | `html-definition-detail`, `html-definition-detail-muted` |
| `Link` | `a` | text/container | `html-link`, `html-link-muted`, `html-link-button`, `html-link-button-secondary`, `html-link-reset` |
| `Image` | `img` | leaf/void | `html-image`, `html-image-rounded`, `html-image-hero` |
| `Button` | `button` | text/container | `html-button`, `html-button-secondary`, `html-button-ghost` |
| `HorizontalRule` | `hr` | leaf/void | `html-horizontal-rule`, `html-horizontal-rule-muted` |
| `Input` | `input` | leaf/void | `html-input`, `html-input-quiet`, `html-input-invalid` |
| `Textarea` | `textarea` | text leaf | `html-textarea`, `html-textarea-quiet`, `html-textarea-invalid` |
| `Select` | `select` | `Option` children | `html-select`, `html-select-quiet`, `html-select-invalid` |
| `Option` | `option` | text leaf | `html-option` |
| `Fieldset` | `fieldset` | form children | `html-fieldset`, `html-fieldset-stack`, `html-field-group`, `html-vstack`, `html-vstack--tight` |
| `Legend` | `legend` | text/container | `html-legend`, `html-legend-section` |

## Common props

- All types may use `class`, `style`, `id`, and `slot` when configured.
- Authored text types use `text`.
- `Link`: `text`, `href`, `id`, `class`, `style`.
- `Image`: `src`, `alt`, `id`, `class`, `style`.
- `Button`: `text`, `type` (`button`, `submit`, `reset`), `id`, `class`, `style`.
- `Input`: `type`, `placeholder`, `value`, `name`, `id`, `class`, `style`.
- `Textarea`: `text`, `placeholder`, `name`, `rows`, `id`, `class`, `style`.
- `Select`: `name`, `id`, `class`, `style`; use `Option` children.
- `Option`: `text`, `value`, `selected`, `class`, `style`.
- `Label`: `text`, `for`, `id`, `class`, `style`.

## Valid composition patterns

- `Main` → semantic page regions.
- `Section` → heading plus related content.
- `Article` → eyebrow, heading, prose, image, quote, or metadata.
- `Header` → brand image, heading, summary, or `Nav`.
- `Nav` → descriptive `Link` children.
- `UnorderedList` / `OrderedList` → `ListItem` children.
- `DefinitionList` → alternating `DefinitionTerm` and `DefinitionDetail`.
- `Fieldset` → `Legend`, then label/control groups.
- `Select` → populated `Option` children.

## Accessibility contract

- Keep heading levels logical and do not choose them only for visual size.
- Match `Label.props.for` to the target control's `props.id`.
- Give inputs, textareas, and selects meaningful `id` and `name` values.
- Do not rely on placeholder text as the only label.
- Use descriptive button and link text.
- Give meaningful images and logos concise alt text. Use empty alt text only for decorative images.
- Preserve native list, form, navigation, and landmark relationships.

## Minimal examples

```json
{
  "id": "contact_section",
  "type": "Section",
  "props": { "class": "html-section-surface html-section-stack" },
  "children": [
    {
      "id": "contact_heading",
      "type": "Heading2",
      "props": { "text": "Contact us", "class": "html-heading-section" },
      "children": []
    },
    {
      "id": "contact_form",
      "type": "Fieldset",
      "props": { "class": "html-field-group html-vstack html-vstack--tight" },
      "children": [
        {
          "id": "contact_legend",
          "type": "Legend",
          "props": { "text": "Your details", "class": "html-legend" },
          "children": []
        },
        {
          "id": "email_label",
          "type": "Label",
          "props": { "text": "Email", "for": "email", "class": "html-label" },
          "children": []
        },
        {
          "id": "email_input",
          "type": "Input",
          "props": { "type": "email", "name": "email", "id": "email", "class": "html-input" },
          "children": []
        }
      ]
    }
  ]
}
```
