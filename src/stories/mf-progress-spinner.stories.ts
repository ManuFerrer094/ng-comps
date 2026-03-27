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
**MfProgressSpinner** is the progress spinner component from the ng-comps library.
It uses Angular Material \`mat-progress-spinner\` under the hood while exposing a consistent branded API.

| Mode              | Description                          |
|-------------------|--------------------------------------|
| \`indeterminate\`   | Continuous animation, no known value |
| \`determinate\`     | Shows exact progress (0-100)         |
        `,
      },
    },
  },
  argTypes: {
    mode: {
      control: 'select',
      options: ['indeterminate', 'determinate'],
      description: 'Spinner mode',
    },
    value: {
      control: { type: 'range', min: 0, max: 100 },
      description: 'Current value (0-100, determinate only)',
    },
    diameter: {
      control: { type: 'range', min: 16, max: 120 },
      description: 'Diameter in px',
    },
    strokeWidth: {
      control: { type: 'range', min: 1, max: 12 },
      description: 'Stroke width',
    },
    color: {
      control: 'select',
      options: ['brand', 'accent', 'warn'],
      description: 'Spinner color',
    },
    label: { control: 'text', description: 'Visible label next to the spinner' },
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
  name: 'With label',
  args: {
    mode: 'indeterminate',
    label: 'Loading data...',
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
  name: 'Sizes',
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
  name: 'All variants',
  render: () => ({
    template: `
      <div style="display: flex; gap: 32px; align-items: center; flex-wrap: wrap;">
        <mf-progress-spinner mode="indeterminate" label="Loading..." />
        <mf-progress-spinner mode="determinate" [value]="60" label="60%" />
        <mf-progress-spinner mode="indeterminate" color="accent" label="Accent" />
        <mf-progress-spinner mode="indeterminate" color="warn" label="Warn" />
      </div>
    `,
    moduleMetadata: { imports: [MfProgressSpinnerComponent] },
  }),
};
