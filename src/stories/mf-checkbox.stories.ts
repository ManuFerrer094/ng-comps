import type { Meta, StoryObj } from '@storybook/angular';

import { MfCheckboxComponent } from '../app/components/checkbox';

const meta: Meta<MfCheckboxComponent> = {
  title: 'Atoms/MfCheckbox',
  component: MfCheckboxComponent,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
**MfCheckbox** is the checkbox component from the ng-comps library.
It uses Angular Material \`mat-checkbox\` under the hood while exposing a consistent branded API.

| State           | Description             |
|-----------------|-------------------------|
| \`checked\`       | Selected                |
| \`indeterminate\` | Partial selection state |
| \`disabled\`      | Not interactive         |
        `,
      },
    },
  },
  argTypes: {
    label: { control: 'text', description: 'Checkbox label text' },
    checked: { control: 'boolean' },
    indeterminate: { control: 'boolean' },
    disabled: { control: 'boolean' },
    mfChange: { action: 'mfChange' },
  },
};

export default meta;
type Story = StoryObj<MfCheckboxComponent>;

export const Default: Story = {
  args: {
    label: 'I accept the terms and conditions',
    checked: false,
  },
};

export const Checked: Story = {
  args: {
    label: 'Selected option',
    checked: true,
  },
};

export const Indeterminate: Story = {
  args: {
    label: 'Partial selection',
    indeterminate: true,
  },
};

export const Disabled: Story = {
  args: {
    label: 'Disabled option',
    disabled: true,
  },
};

export const DisabledChecked: Story = {
  name: 'Disabled and checked',
  args: {
    label: 'Checked and disabled',
    checked: true,
    disabled: true,
  },
};

export const AllStates: Story = {
  name: 'All states',
  render: () => ({
    template: `
      <div style="display: flex; flex-direction: column; gap: 12px;">
        <mf-checkbox label="Unchecked" />
        <mf-checkbox label="Checked" [checked]="true" />
        <mf-checkbox label="Indeterminate" [indeterminate]="true" />
        <mf-checkbox label="Disabled" [disabled]="true" />
        <mf-checkbox label="Checked and disabled" [checked]="true" [disabled]="true" />
      </div>
    `,
    moduleMetadata: { imports: [MfCheckboxComponent] },
  }),
};
