import type { Meta, StoryObj } from '@storybook/angular';

import { MfProgressBarComponent } from '../app/components/progress-bar';

const meta: Meta<MfProgressBarComponent> = {
  title: 'Atoms/MfProgressBar',
  component: MfProgressBarComponent,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
**MfProgressBar** es la barra de progreso de la librería mf-components.
Usa Angular Material \`mat-progress-bar\` por debajo pero expone una API uniforme con look and feel de marca.

| Modo             | Descripción                                        |
|------------------|----------------------------------------------------|
| \`determinate\`    | Muestra el progreso exacto (0–100)                 |
| \`indeterminate\`  | Animación continua sin valor conocido              |
| \`buffer\`         | Muestra progreso + buffer                          |
| \`query\`          | Animación inversa para operaciones de consulta     |
        `,
      },
    },
  },
  argTypes: {
    mode: {
      control: 'select',
      options: ['determinate', 'indeterminate', 'buffer', 'query'],
      description: 'Modo de la barra',
    },
    value: {
      control: { type: 'range', min: 0, max: 100 },
      description: 'Valor actual (0–100)',
    },
    bufferValue: {
      control: { type: 'range', min: 0, max: 100 },
      description: 'Valor del buffer (solo en modo buffer)',
    },
    color: {
      control: 'select',
      options: ['brand', 'accent', 'warn'],
      description: 'Color de la barra',
    },
    label: { control: 'text', description: 'Etiqueta accesible' },
    showValue: { control: 'boolean', description: 'Muestra el porcentaje' },
  },
};

export default meta;
type Story = StoryObj<MfProgressBarComponent>;

export const Determinate: Story = {
  args: {
    mode: 'determinate',
    value: 65,
    label: 'Progreso de carga',
    showValue: true,
  },
};

export const Indeterminate: Story = {
  args: {
    mode: 'indeterminate',
    label: 'Cargando...',
  },
};

export const Buffer: Story = {
  args: {
    mode: 'buffer',
    value: 40,
    bufferValue: 70,
    label: 'Descargando...',
  },
};

export const Query: Story = {
  args: {
    mode: 'query',
    label: 'Consultando...',
  },
};

export const ColorAccent: Story = {
  name: 'Color accent',
  args: {
    mode: 'determinate',
    value: 50,
    color: 'accent',
    showValue: true,
  },
};

export const ColorWarn: Story = {
  name: 'Color warn',
  args: {
    mode: 'determinate',
    value: 80,
    color: 'warn',
    showValue: true,
  },
};

export const AllVariants: Story = {
  name: 'Todas las variantes',
  render: () => ({
    template: `
      <div style="display: flex; flex-direction: column; gap: 24px; max-width: 400px;">
        <mf-progress-bar mode="determinate" [value]="75" label="Completado" [showValue]="true" />
        <mf-progress-bar mode="indeterminate" label="Cargando..." />
        <mf-progress-bar mode="determinate" [value]="50" color="accent" [showValue]="true" />
        <mf-progress-bar mode="determinate" [value]="90" color="warn" [showValue]="true" />
        <mf-progress-bar mode="buffer" [value]="40" [bufferValue]="70" label="Descargando..." />
      </div>
    `,
    moduleMetadata: { imports: [MfProgressBarComponent] },
  }),
};
