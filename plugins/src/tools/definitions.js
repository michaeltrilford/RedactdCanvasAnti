export const TOOL_DEFINITIONS = [
  {
    name: 'get_redactd_context',
    description:
      'Return whether the active Redactd library is Muibook or HTML Foundations. Custom libraries are reported as unsupported.',
    inputSchema: {
      type: 'object',
      properties: {
        apiKey: {
          type: 'string',
          description:
            'Optional Redactd API key. If omitted, the tool reads REDACTD_API_KEY from the plugin environment.'
        },
        endpoint: {
          type: 'string',
          description:
            'Optional endpoint override for local testing. Defaults to https://redactd.xyz/.netlify/functions/redactd-context.'
        }
      }
    }
  },
  {
    name: 'create_redactd_recipe',
    description:
      'Queue a valid Redactd component tree into the user active Redactd canvas. Requires a Redactd API key argument or REDACTD_API_KEY environment variable.',
    inputSchema: {
      type: 'object',
      properties: {
        tree: {
          type: 'object',
          description:
            'Root Redactd TreeNode. Use id, type, props, and children. Component types and props must come from the bundled Redactd component knowledge. Put slot placement inside props.slot.',
          required: ['type'],
          properties: {
            id: { type: 'string' },
            type: { type: 'string' },
            props: { type: 'object', additionalProperties: true },
            children: {
              type: 'array',
              items: { type: 'object', additionalProperties: true }
            }
          },
          additionalProperties: true
        },
        open_canvas: {
          type: 'boolean',
          description: 'Whether Redactd should return a one-time canvas replay URL.',
          default: true
        },
        library: {
          type: 'string',
          enum: ['muibook', 'html-foundations'],
          description:
            'Optional supported-library override. Omit to use the library selected in Redactd.'
        },
        apiKey: {
          type: 'string',
          description:
            'Optional Redactd API key. If omitted, the tool reads REDACTD_API_KEY from the plugin environment.'
        },
        endpoint: {
          type: 'string',
          description:
            'Optional endpoint override for local testing. Defaults to https://redactd.xyz/.netlify/functions/recipes-create.'
        }
      },
      required: ['tree']
    }
  },
  {
    name: 'get_redactd_component_knowledge',
    description:
      'Return the bundled Redactd component knowledge used to create valid component trees.',
    inputSchema: {
      type: 'object',
      properties: {
        format: {
          type: 'string',
          enum: ['summary', 'full'],
          description: 'summary returns component names and top-level keys; full returns the complete knowledge JSON.'
        }
      }
    }
  }
];
