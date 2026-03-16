import type { Meta, StoryObj } from '@storybook/angular';

import { MfGridListComponent } from '../app/components/grid-list';

const SAMPLE_TILES = [
  { title: 'Fotografía', subtitle: '12 elementos', background: 'var(--mf-color-primary-100)' },
  { title: 'Diseño', subtitle: '8 elementos', background: 'var(--mf-color-secondary-100)' },
  { title: 'Desarrollo', subtitle: '25 elementos', background: 'var(--mf-color-accent-300)', colspan: 2 },
  { title: 'Marketing', subtitle: '6 elementos', background: 'var(--mf-color-neutral-100)' },
  { title: 'Datos', subtitle: '15 elementos', background: 'var(--mf-color-primary-200)' },
];

const meta: Meta<MfGridListComponent> = {
  title: 'Organisms/MfGridList',
  component: MfGridListComponent,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
**MfGridList** es la lista en cuadrícula de la librería mf-components.
Envuelve Angular Material \`mat-grid-list\` y expone una API uniforme con look and feel de marca.

Acepta tiles declarativas vía el input \`tiles\` (array de \`MfGridTile\`) o
content projection de \`mat-grid-tile\` para casos avanzados.
        `,
      },
    },
  },
  argTypes: {
    cols: {
      control: { type: 'range', min: 1, max: 6 },
      description: 'Número de columnas',
    },
    rowHeight: {
      control: 'text',
      description: 'Altura de cada fila (ej: "200px", "1:1", "fit")',
    },
    gutterSize: {
      control: 'text',
      description: 'Espacio entre tiles',
    },
  },
};

export default meta;
type Story = StoryObj<MfGridListComponent>;

export const Default: Story = {
  args: {
    cols: 3,
    rowHeight: '160px',
    gutterSize: '8px',
    tiles: SAMPLE_TILES,
  },
};

export const TwoColumns: Story = {
  name: 'Dos columnas',
  args: {
    cols: 2,
    rowHeight: '180px',
    tiles: SAMPLE_TILES,
  },
};

export const FourColumns: Story = {
  name: 'Cuatro columnas',
  args: {
    cols: 4,
    rowHeight: '120px',
    tiles: SAMPLE_TILES,
  },
};

export const SquareTiles: Story = {
  name: 'Tiles cuadradas',
  args: {
    cols: 3,
    rowHeight: '1:1',
    tiles: SAMPLE_TILES,
  },
};

export const AllVariants: Story = {
  name: 'Todas las variantes',
  render: () => ({
    template: `
      <div style="display: flex; flex-direction: column; gap: 32px;">
        <div>
          <p style="font-size: 0.875rem; color: #475569; margin-bottom: 8px;">3 columnas</p>
          <mf-grid-list [cols]="3" rowHeight="140px" [tiles]="tiles" />
        </div>
        <div>
          <p style="font-size: 0.875rem; color: #475569; margin-bottom: 8px;">4 columnas</p>
          <mf-grid-list [cols]="4" rowHeight="120px" [tiles]="tiles" />
        </div>
      </div>
    `,
    props: {
      tiles: SAMPLE_TILES,
    },
    moduleMetadata: { imports: [MfGridListComponent] },
  }),
};
