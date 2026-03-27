import type { Meta, StoryObj } from '@storybook/angular';

import { MfButtonComponent } from '../app/components/button';

const meta: Meta<MfButtonComponent> = {
  title: 'Components/MfButton',
  component: MfButtonComponent,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
**MfButton** is the button component from the ng-comps library.
It uses Angular Material under the hood while exposing a consistent branded API.

| Variant    | When to use it                                |
|------------|-----------------------------------------------|
| \`filled\`   | Primary action, usually one per section       |
| \`outlined\` | Secondary action or soft destructive action   |
| \`text\`     | Tertiary action, internal navigation, or link |
        `,
      },
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['filled', 'outlined', 'text'],
      description: 'Visual button variant',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Button size',
    },
    type: {
      control: 'select',
      options: ['button', 'submit', 'reset'],
    },
    disabled: { control: 'boolean' },
    fullWidth: { control: 'boolean' },
    leadingIcon: {
      control: 'text',
      description: 'Material icon name shown before the label',
    },
    trailingIcon: {
      control: 'text',
      description: 'Material icon name shown after the label',
    },
    mfClick: { action: 'mfClick' },
  },
};

export default meta;
type Story = StoryObj<MfButtonComponent>;

export const Filled: Story = {
  args: {
    label: 'Save changes',
    variant: 'filled',
  },
};

export const Outlined: Story = {
  args: {
    label: 'Cancel',
    variant: 'outlined',
  },
};

export const Text: Story = {
  args: {
    label: 'View details',
    variant: 'text',
  },
};

export const Small: Story = {
  args: {
    label: 'Small',
    variant: 'filled',
    size: 'sm',
  },
};

export const Medium: Story = {
  args: {
    label: 'Medium',
    variant: 'filled',
    size: 'md',
  },
};

export const Large: Story = {
  args: {
    label: 'Large',
    variant: 'filled',
    size: 'lg',
  },
};

export const WithLeadingIcon: Story = {
  name: 'With leading icon',
  args: {
    label: 'Create new',
    variant: 'filled',
    leadingIcon: 'add',
  },
};

export const WithTrailingIcon: Story = {
  name: 'With trailing icon',
  args: {
    label: 'Next',
    variant: 'filled',
    trailingIcon: 'arrow_forward',
  },
};

export const Disabled: Story = {
  args: {
    label: 'Disabled',
    variant: 'filled',
    disabled: true,
  },
};

export const FullWidth: Story = {
  name: 'Full width',
  args: {
    label: 'Sign in',
    variant: 'filled',
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
      <div style="display: flex; gap: 12px; flex-wrap: wrap; align-items: center;">
        <mf-button label="Filled" variant="filled" />
        <mf-button label="Outlined" variant="outlined" />
        <mf-button label="Text" variant="text" />
      </div>
    `,
    moduleMetadata: { imports: [MfButtonComponent] },
  }),
};
