import type { Meta, StoryObj } from '@storybook/angular';

import { MfInputComponent } from '../app/components/input';

const meta: Meta<MfInputComponent> = {
  title: 'Atoms/MfInput',
  component: MfInputComponent,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
**MfInput** is the text field component from the ng-comps library.
It uses Angular Material \`mat-form-field\` under the hood while exposing a consistent branded API.

| Property       | Description                   |
|----------------|-------------------------------|
| \`label\`        | Floating field label          |
| \`placeholder\`  | Placeholder text              |
| \`hint\`         | Helper text below the field   |
| \`error\`        | Error message                 |
| \`leadingIcon\`  | Icon shown at the start       |
| \`trailingIcon\` | Icon shown at the end         |
        `,
      },
    },
  },
  argTypes: {
    label: { control: 'text', description: 'Floating label' },
    placeholder: { control: 'text', description: 'Placeholder' },
    type: {
      control: 'select',
      options: ['text', 'email', 'password', 'number', 'search', 'tel', 'url'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Field size',
    },
    value: { control: 'text' },
    disabled: { control: 'boolean' },
    readonly: { control: 'boolean' },
    hint: { control: 'text', description: 'Helper text' },
    error: { control: 'text', description: 'Error message' },
    leadingIcon: { control: 'text' },
    trailingIcon: { control: 'text' },
    fullWidth: { control: 'boolean' },
    mfInput: { action: 'mfInput' },
    mfBlur: { action: 'mfBlur' },
  },
};

export default meta;
type Story = StoryObj<MfInputComponent>;

export const Default: Story = {
  args: {
    label: 'Email address',
    placeholder: 'name@example.com',
  },
};

export const WithHint: Story = {
  name: 'With helper text',
  args: {
    label: 'Password',
    type: 'password',
    hint: 'Minimum 8 characters',
  },
};

export const WithError: Story = {
  name: 'With error',
  args: {
    label: 'Email',
    value: 'invalid-email',
    error: 'Enter a valid email address',
  },
};

export const WithLeadingIcon: Story = {
  name: 'With leading icon',
  args: {
    label: 'Search',
    placeholder: 'Search...',
    leadingIcon: 'search',
  },
};

export const WithTrailingIcon: Story = {
  name: 'With trailing icon',
  args: {
    label: 'Email',
    placeholder: 'name@example.com',
    trailingIcon: 'mail',
  },
};

export const Disabled: Story = {
  args: {
    label: 'Disabled field',
    value: 'Not editable',
    disabled: true,
  },
};

export const Readonly: Story = {
  name: 'Read only',
  args: {
    label: 'Read only',
    value: 'Fixed value',
    readonly: true,
  },
};

export const Small: Story = {
  args: {
    label: 'Small',
    placeholder: 'Text...',
    size: 'sm',
  },
};

export const Large: Story = {
  args: {
    label: 'Large',
    placeholder: 'Text...',
    size: 'lg',
  },
};

export const FullWidth: Story = {
  name: 'Full width',
  args: {
    label: 'Full name',
    placeholder: 'Jane Doe',
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
        <mf-input label="Default" placeholder="Type here..." />
        <mf-input label="With help" hint="This is helper text" />
        <mf-input label="With error" value="bad" error="This field is required" />
        <mf-input label="Search" leadingIcon="search" placeholder="Search..." />
        <mf-input label="Disabled" value="Not editable" [disabled]="true" />
      </div>
    `,
    moduleMetadata: { imports: [MfInputComponent] },
  }),
};
