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
**MfProgressBar** is the progress bar component from the ng-comps library.
It uses Angular Material \`mat-progress-bar\` under the hood while exposing a consistent branded API.

| Mode             | Description                           |
|------------------|---------------------------------------|
| \`determinate\`    | Shows exact progress (0-100)          |
| \`indeterminate\`  | Continuous animation, no known value  |
| \`buffer\`         | Shows progress plus buffer            |
| \`query\`          | Reverse animation for query states    |
        `,
      },
    },
  },
  argTypes: {
    mode: {
      control: 'select',
      options: ['determinate', 'indeterminate', 'buffer', 'query'],
      description: 'Bar mode',
    },
    value: {
      control: { type: 'range', min: 0, max: 100 },
      description: 'Current value (0-100)',
    },
    bufferValue: {
      control: { type: 'range', min: 0, max: 100 },
      description: 'Buffer value (buffer mode only)',
    },
    color: {
      control: 'select',
      options: ['brand', 'accent', 'warn'],
      description: 'Bar color',
    },
    label: { control: 'text', description: 'Accessible label' },
    showValue: { control: 'boolean', description: 'Show percentage' },
  },
};

export default meta;
type Story = StoryObj<MfProgressBarComponent>;

export const Determinate: Story = {
  args: {
    mode: 'determinate',
    value: 65,
    label: 'Loading progress',
    showValue: true,
  },
};

export const Indeterminate: Story = {
  args: {
    mode: 'indeterminate',
    label: 'Loading...',
  },
};

export const Buffer: Story = {
  args: {
    mode: 'buffer',
    value: 40,
    bufferValue: 70,
    label: 'Downloading...',
  },
};

export const Query: Story = {
  args: {
    mode: 'query',
    label: 'Querying...',
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
  name: 'All variants',
  render: () => ({
    template: `
      <div style="display: flex; flex-direction: column; gap: 24px; max-width: 400px;">
        <mf-progress-bar mode="determinate" [value]="75" label="Completed" [showValue]="true" />
        <mf-progress-bar mode="indeterminate" label="Loading..." />
        <mf-progress-bar mode="determinate" [value]="50" color="accent" [showValue]="true" />
        <mf-progress-bar mode="determinate" [value]="90" color="warn" [showValue]="true" />
        <mf-progress-bar mode="buffer" [value]="40" [bufferValue]="70" label="Downloading..." />
      </div>
    `,
    moduleMetadata: { imports: [MfProgressBarComponent] },
  }),
};
