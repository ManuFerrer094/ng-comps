import type { Meta, StoryObj } from '@storybook/angular';

import { MfGridListComponent } from '../app/components/grid-list';

const SAMPLE_TILES = [
  { title: 'Photography', subtitle: '12 items', background: 'var(--mf-color-primary-100)' },
  { title: 'Design', subtitle: '8 items', background: 'var(--mf-color-secondary-100)' },
  { title: 'Development', subtitle: '25 items', background: 'var(--mf-color-accent-300)', colspan: 2 },
  { title: 'Marketing', subtitle: '6 items', background: 'var(--mf-color-neutral-100)' },
  { title: 'Data', subtitle: '15 items', background: 'var(--mf-color-primary-200)' },
];

const meta: Meta<MfGridListComponent> = {
  title: 'Organisms/MfGridList',
  component: MfGridListComponent,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
**MfGridList** is the grid list component from the ng-comps library.
It wraps Angular Material \`mat-grid-list\` and exposes a consistent branded API.

It supports declarative tiles through the \`tiles\` input (an array of \`MfGridTile\`) or \`mat-grid-tile\` content projection for advanced use cases.
        `,
      },
    },
  },
  argTypes: {
    cols: {
      control: { type: 'range', min: 1, max: 6 },
      description: 'Number of columns',
    },
    rowHeight: {
      control: 'text',
      description: 'Height of each row (for example "200px", "1:1", or "fit")',
    },
    gutterSize: {
      control: 'text',
      description: 'Space between tiles',
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
  name: 'Two columns',
  args: {
    cols: 2,
    rowHeight: '180px',
    tiles: SAMPLE_TILES,
  },
};

export const FourColumns: Story = {
  name: 'Four columns',
  args: {
    cols: 4,
    rowHeight: '120px',
    tiles: SAMPLE_TILES,
  },
};

export const SquareTiles: Story = {
  name: 'Square tiles',
  args: {
    cols: 3,
    rowHeight: '1:1',
    tiles: SAMPLE_TILES,
  },
};

export const AllVariants: Story = {
  name: 'All variants',
  render: () => ({
    template: `
      <div style="display: flex; flex-direction: column; gap: 32px;">
        <div>
          <p style="font-size: 0.875rem; color: #475569; margin-bottom: 8px;">3 columns</p>
          <mf-grid-list [cols]="3" rowHeight="140px" [tiles]="tiles" />
        </div>
        <div>
          <p style="font-size: 0.875rem; color: #475569; margin-bottom: 8px;">4 columns</p>
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
