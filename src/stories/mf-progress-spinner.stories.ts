import type { Meta, StoryObj } from '@storybook/angular';

import { MfProgressSpinnerComponent } from '../app/components/progress-spinner';

const meta: Meta<MfProgressSpinnerComponent> = {
  title: 'Atoms/MfProgressSpinner',
  component: MfProgressSpinnerComponent,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
**MfProgressSpinner** es el spinner de progreso de la librería ng-comps.
Usa Angular Material \`mat-progress-spinner\` por debajo y expone una API uniforme con look and feel de marca.

| Modo              | Descripción                                |
|-------------------|--------------------------------------------|
| \`indeterminate\`   | Animación continua sin valor conocido      |
| \`determinate\`     | Muestra el progreso exacto (0–100)         |
        `,
      },
    },
  },
  argTypes: {
    mode: {
      control: 'select',
      options: ['indeterminate', 'determinate'],
      description: 'Modo del spinner',
    },
    value: {
      control: { type: 'range', min: 0, max: 100 },
      description: 'Valor actual (0–100, solo en determinate)',
    },
    diameter: {
      control: { type: 'range', min: 16, max: 120 },
      description: 'Diámetro en px',
    },
    strokeWidth: {
      control: { type: 'range', min: 1, max: 12 },
      description: 'Grosor del trazo',
    },
    color: {
      control: 'select',
      options: ['brand', 'accent', 'warn'],
      description: 'Color del spinner',
    },
    label: { control: 'text', description: 'Etiqueta visible junto al spinner' },
  },
};

export default meta;
type Story = StoryObj<MfProgressSpinnerComponent>;

export const Indeterminate: Story = {
  args: {
    mode: 'indeterminate',
    diameter: 40,
  },
};

export const Determinate: Story = {
  args: {
    mode: 'determinate',
    value: 70,
    diameter: 60,
  },
};

export const WithLabel: Story = {
  name: 'Con etiqueta',
  args: {
    mode: 'indeterminate',
    label: 'Cargando datos...',
    diameter: 32,
  },
};

export const ColorAccent: Story = {
  name: 'Color accent',
  args: {
    mode: 'indeterminate',
    color: 'accent',
    diameter: 40,
  },
};

export const ColorWarn: Story = {
  name: 'Color warn',
  args: {
    mode: 'indeterminate',
    color: 'warn',
    diameter: 40,
  },
};

export const Sizes: Story = {
  name: 'Tamaños',
  render: () => ({
    template: `
      <div style="display: flex; gap: 24px; align-items: center;">
        <mf-progress-spinner mode="indeterminate" [diameter]="24" />
        <mf-progress-spinner mode="indeterminate" [diameter]="40" />
        <mf-progress-spinner mode="indeterminate" [diameter]="64" />
        <mf-progress-spinner mode="indeterminate" [diameter]="80" />
      </div>
    `,
    moduleMetadata: { imports: [MfProgressSpinnerComponent] },
  }),
};

export const AllVariants: Story = {
  name: 'Todas las variantes',
  render: () => ({
    template: `
      <div style="display: flex; gap: 32px; align-items: center; flex-wrap: wrap;">
        <mf-progress-spinner mode="indeterminate" label="Cargando..." />
        <mf-progress-spinner mode="determinate" [value]="60" label="60%" />
        <mf-progress-spinner mode="indeterminate" color="accent" label="Accent" />
        <mf-progress-spinner mode="indeterminate" color="warn" label="Warn" />
      </div>
    `,
    moduleMetadata: { imports: [MfProgressSpinnerComponent] },
  }),
};
