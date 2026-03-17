import type { Meta, StoryObj } from '@storybook/angular';

import { MfIconComponent } from '../app/components/icon';

const meta: Meta<MfIconComponent> = {
  title: 'Atoms/MfIcon',
  component: MfIconComponent,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
**MfIcon** es el componente de iconos de la librería ng-comps.
Usa Material Icons por debajo y expone una API consistente con tamaños y colores de marca.

| Tamaño | Pixeles | Cuándo usarlo                           |
|--------|---------|------------------------------------------|
| \`sm\`   | 16px    | Dentro de botones, chips o acciones      |
| \`md\`   | 20px    | Uso general, listas, formularios         |
| \`lg\`   | 24px    | Headers, navegación                      |
| \`xl\`   | 32px    | Ilustraciones, estados vacíos            |
        `,
      },
    },
  },
  argTypes: {
    name: { control: 'text', description: 'Nombre del icono Material' },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl'],
      description: 'Tamaño del icono',
    },
    color: {
      control: 'select',
      options: ['default', 'brand', 'muted', 'error', 'inherit'],
      description: 'Color semántico del icono',
    },
    label: { control: 'text', description: 'Etiqueta accesible (si es decorativo, dejar vacío)' },
  },
};

export default meta;
type Story = StoryObj<MfIconComponent>;

export const Default: Story = {
  args: {
    name: 'home',
    size: 'md',
    color: 'default',
  },
};

export const Brand: Story = {
  args: {
    name: 'favorite',
    size: 'md',
    color: 'brand',
  },
};

export const Muted: Story = {
  args: {
    name: 'info',
    size: 'md',
    color: 'muted',
  },
};

export const ErrorColor: Story = {
  name: 'Error',
  args: {
    name: 'error',
    size: 'md',
    color: 'error',
  },
};

export const Small: Story = {
  args: {
    name: 'check_circle',
    size: 'sm',
    color: 'brand',
  },
};

export const Large: Story = {
  args: {
    name: 'star',
    size: 'lg',
    color: 'default',
  },
};

export const ExtraLarge: Story = {
  args: {
    name: 'rocket_launch',
    size: 'xl',
    color: 'brand',
  },
};

export const AllSizes: Story = {
  name: 'Todos los tamaños',
  render: () => ({
    template: `
      <div style="display: flex; gap: 16px; align-items: center;">
        <mf-icon name="settings" size="sm" />
        <mf-icon name="settings" size="md" />
        <mf-icon name="settings" size="lg" />
        <mf-icon name="settings" size="xl" />
      </div>
    `,
    moduleMetadata: { imports: [MfIconComponent] },
  }),
};

export const AllColors: Story = {
  name: 'Todos los colores',
  render: () => ({
    template: `
      <div style="display: flex; gap: 16px; align-items: center;">
        <mf-icon name="circle" size="lg" color="default" />
        <mf-icon name="circle" size="lg" color="brand" />
        <mf-icon name="circle" size="lg" color="muted" />
        <mf-icon name="circle" size="lg" color="error" />
      </div>
    `,
    moduleMetadata: { imports: [MfIconComponent] },
  }),
};
