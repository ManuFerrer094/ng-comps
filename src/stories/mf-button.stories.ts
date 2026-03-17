import type { Meta, StoryObj } from '@storybook/angular';

import { MfButtonComponent } from '../app/components/button';

const meta: Meta<MfButtonComponent> = {
  title: 'Components/MfButton',
  component: MfButtonComponent,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
**MfButton** es el botón de la librería ng-comps.
Usa Angular Material por debajo pero expone una API uniforme con el look and feel de marca.

| Variante   | Cuándo usarla                                       |
|------------|-----------------------------------------------------|
| \`filled\`   | Acción principal — una sola por sección              |
| \`outlined\` | Acción secundaria o destructiva suave                |
| \`text\`     | Acción terciaria, navegación interna o links         |
        `,
      },
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['filled', 'outlined', 'text'],
      description: 'Variante visual del botón',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Tamaño del botón',
    },
    type: {
      control: 'select',
      options: ['button', 'submit', 'reset'],
    },
    disabled: { control: 'boolean' },
    fullWidth: { control: 'boolean' },
    leadingIcon: { control: 'text', description: 'Nombre de icono Material antes del texto' },
    trailingIcon: { control: 'text', description: 'Nombre de icono Material después del texto' },
    mfClick: { action: 'mfClick' },
  },
};

export default meta;
type Story = StoryObj<MfButtonComponent>;

// ── Stories básicas ───────────────────────────────────────────────────────────

export const Filled: Story = {
  args: {
    label: 'Guardar cambios',
    variant: 'filled',
  },
};

export const Outlined: Story = {
  args: {
    label: 'Cancelar',
    variant: 'outlined',
  },
};

export const Text: Story = {
  args: {
    label: 'Ver más detalles',
    variant: 'text',
  },
};

// ── Tamaños ───────────────────────────────────────────────────────────────────

export const Small: Story = {
  args: {
    label: 'Pequeño',
    variant: 'filled',
    size: 'sm',
  },
};

export const Medium: Story = {
  args: {
    label: 'Mediano',
    variant: 'filled',
    size: 'md',
  },
};

export const Large: Story = {
  args: {
    label: 'Grande',
    variant: 'filled',
    size: 'lg',
  },
};

// ── Con iconos ────────────────────────────────────────────────────────────────

export const WithLeadingIcon: Story = {
  name: 'Con icono al inicio',
  args: {
    label: 'Crear nuevo',
    variant: 'filled',
    leadingIcon: 'add',
  },
};

export const WithTrailingIcon: Story = {
  name: 'Con icono al final',
  args: {
    label: 'Siguiente',
    variant: 'filled',
    trailingIcon: 'arrow_forward',
  },
};

// ── Estados ───────────────────────────────────────────────────────────────────

export const Disabled: Story = {
  args: {
    label: 'Deshabilitado',
    variant: 'filled',
    disabled: true,
  },
};

export const FullWidth: Story = {
  name: 'Ancho completo',
  args: {
    label: 'Iniciar sesión',
    variant: 'filled',
    fullWidth: true,
  },
  parameters: {
    layout: 'padded',
  },
};

// ── Comparativa de variantes ──────────────────────────────────────────────────

export const AllVariants: Story = {
  name: 'Todas las variantes',
  render: () => ({
    template: `
      <div style="display: flex; gap: 12px; flex-wrap: wrap; align-items: center;">
        <mf-button label="Filled" variant="filled" />
        <mf-button label="Outlined" variant="outlined" />
        <mf-button label="Text" variant="text" />
      </div>
    `,
    moduleMetadata: { imports: [MfButtonComponent] },
  }),
};
