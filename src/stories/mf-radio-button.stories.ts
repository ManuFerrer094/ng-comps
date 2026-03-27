import type { Meta, StoryObj } from '@storybook/angular';

import { MfRadioButtonComponent } from '../app/components/radio-button';

const SAMPLE_OPTIONS = [
  { value: 'angular', label: 'Angular' },
  { value: 'react', label: 'React' },
  { value: 'vue', label: 'Vue' },
  { value: 'svelte', label: 'Svelte', disabled: true },
];

const meta: Meta<MfRadioButtonComponent> = {
  title: 'Atoms/MfRadioButton',
  component: MfRadioButtonComponent,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
**MfRadioButton** is the radio button group from the ng-comps library.
It wraps Angular Material \`mat-radio-group\` and \`mat-radio-button\` while exposing a consistent branded API.

It receives an array of \`MfRadioOption\` objects and manages the selection internally.
        `,
      },
    },
  },
  argTypes: {
    direction: {
      control: 'select',
      options: ['vertical', 'horizontal'],
      description: 'Group direction',
    },
    disabled: { control: 'boolean' },
    ariaLabel: { control: 'text', description: 'Accessible group label' },
    mfChange: { action: 'mfChange' },
  },
};

export default meta;
type Story = StoryObj<MfRadioButtonComponent>;

export const Vertical: Story = {
  args: {
    options: SAMPLE_OPTIONS,
    direction: 'vertical',
    ariaLabel: 'Preferred framework',
  },
};

export const Horizontal: Story = {
  args: {
    options: SAMPLE_OPTIONS,
    direction: 'horizontal',
    ariaLabel: 'Preferred framework',
  },
};

export const WithDefault: Story = {
  name: 'With default value',
  args: {
    options: SAMPLE_OPTIONS,
    value: 'angular',
    ariaLabel: 'Preferred framework',
  },
};

export const Disabled: Story = {
  args: {
    options: SAMPLE_OPTIONS,
    disabled: true,
    ariaLabel: 'Preferred framework (disabled)',
  },
};

export const AllVariants: Story = {
  name: 'All variants',
  render: () => ({
    template: `
      <div style="display: flex; flex-direction: column; gap: 32px;">
        <div>
          <p style="font-size: 0.875rem; color: #475569; margin-bottom: 8px;">Vertical</p>
          <mf-radio-button
            [options]="options"
            ariaLabel="Vertical options"
          />
        </div>
        <div>
          <p style="font-size: 0.875rem; color: #475569; margin-bottom: 8px;">Horizontal</p>
          <mf-radio-button
            [options]="options"
            direction="horizontal"
            ariaLabel="Horizontal options"
          />
        </div>
        <div>
          <p style="font-size: 0.875rem; color: #475569; margin-bottom: 8px;">Disabled</p>
          <mf-radio-button
            [options]="options"
            [disabled]="true"
            ariaLabel="Disabled options"
          />
        </div>
      </div>
    `,
    props: {
      options: SAMPLE_OPTIONS,
    },
    moduleMetadata: { imports: [MfRadioButtonComponent] },
  }),
};
