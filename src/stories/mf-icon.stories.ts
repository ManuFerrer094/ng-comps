import type { Meta, StoryObj } from '@storybook/angular';

import { MfIconComponent } from '../app/components/icon';

const meta: Meta<MfIconComponent> = {
  title: 'Atoms/MfIcon',
  component: MfIconComponent,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
**MfIcon** is the icon component from the ng-comps library.
It uses Material Icons under the hood and exposes a consistent API with branded sizes and colors.

| Size   | Pixels | When to use it                  |
|--------|--------|---------------------------------|
| \`sm\`   | 16px   | Inside buttons, chips, or actions |
| \`md\`   | 20px   | General use, lists, forms       |
| \`lg\`   | 24px   | Headers and navigation          |
| \`xl\`   | 32px   | Illustrations and empty states  |
        `,
      },
    },
  },
  argTypes: {
    name: { control: 'text', description: 'Material icon name' },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl'],
      description: 'Icon size',
    },
    color: {
      control: 'select',
      options: ['default', 'brand', 'muted', 'error', 'inherit'],
      description: 'Semantic icon color',
    },
    label: {
      control: 'text',
      description: 'Accessible label (leave empty when decorative)',
    },
  },
};

export default meta;
type Story = StoryObj<MfIconComponent>;

export const Default: Story = {
  args: {
    name: 'home',
    size: 'md',
    color: 'default',
  },
};

export const Brand: Story = {
  args: {
    name: 'favorite',
    size: 'md',
    color: 'brand',
  },
};

export const Muted: Story = {
  args: {
    name: 'info',
    size: 'md',
    color: 'muted',
  },
};

export const ErrorColor: Story = {
  name: 'Error',
  args: {
    name: 'error',
    size: 'md',
    color: 'error',
  },
};

export const Small: Story = {
  args: {
    name: 'check_circle',
    size: 'sm',
    color: 'brand',
  },
};

export const Large: Story = {
  args: {
    name: 'star',
    size: 'lg',
    color: 'default',
  },
};

export const ExtraLarge: Story = {
  args: {
    name: 'rocket_launch',
    size: 'xl',
    color: 'brand',
  },
};

export const AllSizes: Story = {
  name: 'All sizes',
  render: () => ({
    template: `
      <div style="display: flex; gap: 16px; align-items: center;">
        <mf-icon name="settings" size="sm" />
        <mf-icon name="settings" size="md" />
        <mf-icon name="settings" size="lg" />
        <mf-icon name="settings" size="xl" />
      </div>
    `,
    moduleMetadata: { imports: [MfIconComponent] },
  }),
};

export const AllColors: Story = {
  name: 'All colors',
  render: () => ({
    template: `
      <div style="display: flex; gap: 16px; align-items: center;">
        <mf-icon name="circle" size="lg" color="default" />
        <mf-icon name="circle" size="lg" color="brand" />
        <mf-icon name="circle" size="lg" color="muted" />
        <mf-icon name="circle" size="lg" color="error" />
      </div>
    `,
    moduleMetadata: { imports: [MfIconComponent] },
  }),
};
