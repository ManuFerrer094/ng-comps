import type { Meta, StoryObj } from '@storybook/angular';

import { MfCardComponent } from '../app/components/card';

const meta: Meta<MfCardComponent> = {
  title: 'Molecules/MfCard',
  component: MfCardComponent,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
**MfCard** es el componente de card de la librería mf-components.
Usa Angular Material \`mat-card\` por debajo pero con un estilo propio: minimalista, elegante y moderno.

| Variante    | Cuándo usarla                                   |
|-------------|--------------------------------------------------|
| \`elevated\`  | Contenido principal, destacado con sombra        |
| \`outlined\`  | Contenido secundario, con borde sutil            |
| \`flat\`      | Contenido de fondo, sin elevación ni borde       |
        `,
      },
    },
  },
  argTypes: {
    title: { control: 'text', description: 'Título de la card' },
    subtitle: { control: 'text', description: 'Subtítulo de la card' },
    variant: {
      control: 'select',
      options: ['elevated', 'outlined', 'flat'],
      description: 'Variante visual',
    },
    padding: {
      control: 'select',
      options: ['none', 'sm', 'md', 'lg'],
      description: 'Padding interno',
    },
    interactive: { control: 'boolean', description: 'Efecto hover interactivo' },
  },
};

export default meta;
type Story = StoryObj<MfCardComponent>;

export const Elevated: Story = {
  render: (args) => ({
    props: args,
    template: `
      <mf-card [title]="title" [subtitle]="subtitle" [variant]="variant" [padding]="padding" [interactive]="interactive">
        <p style="margin: 0; color: var(--mf-color-neutral-600);">
          Este es el contenido de la card. Puede incluir texto, formularios, listas u otros componentes.
        </p>
      </mf-card>
    `,
    moduleMetadata: { imports: [MfCardComponent] },
  }),
  args: {
    title: 'Título de la card',
    subtitle: 'Subtítulo descriptivo',
    variant: 'elevated',
    padding: 'md',
    interactive: false,
  },
};

export const Outlined: Story = {
  render: (args) => ({
    props: args,
    template: `
      <mf-card [title]="title" [subtitle]="subtitle" variant="outlined">
        <p style="margin: 0; color: var(--mf-color-neutral-600);">
          Card con borde sutil, ideal para contenido secundario.
        </p>
      </mf-card>
    `,
    moduleMetadata: { imports: [MfCardComponent] },
  }),
  args: {
    title: 'Card con borde',
    subtitle: 'Variante outlined',
  },
};

export const Flat: Story = {
  render: (args) => ({
    props: args,
    template: `
      <mf-card [title]="title" variant="flat">
        <p style="margin: 0; color: var(--mf-color-neutral-600);">
          Card plana con fondo sutil, sin elevación ni borde.
        </p>
      </mf-card>
    `,
    moduleMetadata: { imports: [MfCardComponent] },
  }),
  args: {
    title: 'Card plana',
  },
};

export const Interactive: Story = {
  render: (args) => ({
    props: args,
    template: `
      <mf-card title="Card interactiva" subtitle="Haz hover para ver el efecto" variant="elevated" [interactive]="true">
        <p style="margin: 0; color: var(--mf-color-neutral-600);">
          Esta card responde al hover con elevación y movimiento sutil.
        </p>
      </mf-card>
    `,
    moduleMetadata: { imports: [MfCardComponent] },
  }),
  args: {},
};

export const NoHeader: Story = {
  name: 'Sin header',
  render: () => ({
    template: `
      <mf-card variant="outlined" padding="lg">
        <p style="margin: 0; color: var(--mf-color-neutral-600); font-size: var(--mf-text-lg);">
          Card sin header, solo contenido proyectado.
        </p>
      </mf-card>
    `,
    moduleMetadata: { imports: [MfCardComponent] },
  }),
};

export const AllVariants: Story = {
  name: 'Todas las variantes',
  render: () => ({
    template: `
      <div style="display: flex; gap: 20px; flex-wrap: wrap;">
        <mf-card title="Elevated" subtitle="Con sombra" variant="elevated" style="width: 280px;">
          <p style="margin: 0; color: var(--mf-color-neutral-600);">Contenido de ejemplo.</p>
        </mf-card>
        <mf-card title="Outlined" subtitle="Con borde" variant="outlined" style="width: 280px;">
          <p style="margin: 0; color: var(--mf-color-neutral-600);">Contenido de ejemplo.</p>
        </mf-card>
        <mf-card title="Flat" subtitle="Sin elevación" variant="flat" style="width: 280px;">
          <p style="margin: 0; color: var(--mf-color-neutral-600);">Contenido de ejemplo.</p>
        </mf-card>
      </div>
    `,
    moduleMetadata: { imports: [MfCardComponent] },
  }),
};
