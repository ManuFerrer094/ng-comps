import type { Meta, StoryObj } from '@storybook/angular';

import { MfDatepickerComponent } from '../app/components/datepicker';

const meta: Meta<MfDatepickerComponent> = {
  title: 'Atoms/MfDatepicker',
  component: MfDatepickerComponent,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
**MfDatepicker** is the date picker component from the ng-comps library.
It uses Angular Material \`mat-datepicker\` under the hood while exposing a consistent branded API.

| Property      | Description                        |
|---------------|------------------------------------|
| \`label\`       | Floating field label               |
| \`placeholder\` | Placeholder text                   |
| \`hint\`        | Helper text below the field        |
| \`error\`       | Error message                      |
| \`min\`         | Minimum selectable date            |
| \`max\`         | Maximum selectable date            |
| \`disabled\`    | Disables the field                 |
| \`fullWidth\`   | Makes the field fill its container |
        `,
      },
    },
  },
  argTypes: {
    label: { control: 'text', description: 'Floating label' },
    placeholder: { control: 'text', description: 'Placeholder' },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Field size',
    },
    disabled: { control: 'boolean' },
    hint: { control: 'text', description: 'Helper text' },
    error: { control: 'text', description: 'Error message' },
    fullWidth: { control: 'boolean' },
    mfChange: { action: 'mfChange' },
    mfBlur: { action: 'mfBlur' },
  },
};

export default meta;
type Story = StoryObj<MfDatepickerComponent>;

export const Default: Story = {
  args: {
    label: 'Birth date',
    placeholder: 'DD/MM/YYYY',
  },
};

export const WithHint: Story = {
  name: 'With helper text',
  args: {
    label: 'Start date',
    hint: 'Select a date after today',
  },
};

export const WithError: Story = {
  name: 'With error',
  args: {
    label: 'Due date',
    error: 'Date is required',
  },
};

export const Disabled: Story = {
  args: {
    label: 'Date (disabled)',
    disabled: true,
  },
};

export const Small: Story = {
  args: {
    label: 'Small',
    size: 'sm',
  },
};

export const Large: Story = {
  args: {
    label: 'Large',
    size: 'lg',
  },
};

export const FullWidth: Story = {
  name: 'Full width',
  args: {
    label: 'Delivery date',
    fullWidth: true,
  },
  parameters: {
    layout: 'padded',
  },
};

export const AllVariants: Story = {
  name: 'All variants',
  render: () => ({
    template: `
      <div style="display: flex; flex-direction: column; gap: 16px; max-width: 360px;">
        <mf-datepicker label="Default" />
        <mf-datepicker label="With help" hint="Select a date" />
        <mf-datepicker label="With error" error="Date required" />
        <mf-datepicker label="Disabled" [disabled]="true" />
      </div>
    `,
    moduleMetadata: { imports: [MfDatepickerComponent] },
  }),
};
