import type { Meta, StoryObj } from '@storybook/angular';

import { MfCardComponent } from '../app/components/card';

const meta: Meta<MfCardComponent> = {
  title: 'Molecules/MfCard',
  component: MfCardComponent,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
**MfCard** is the card component from the ng-comps library.
It uses Angular Material \`mat-card\` under the hood with a custom visual style that feels clean, elegant, and modern.

| Variant     | When to use it                              |
|-------------|---------------------------------------------|
| \`elevated\`  | Primary content highlighted with a shadow   |
| \`outlined\`  | Secondary content with a subtle border      |
| \`flat\`      | Background content with no border or shadow |
        `,
      },
    },
  },
  argTypes: {
    title: { control: 'text', description: 'Card title' },
    subtitle: { control: 'text', description: 'Card subtitle' },
    variant: {
      control: 'select',
      options: ['elevated', 'outlined', 'flat'],
      description: 'Visual variant',
    },
    padding: {
      control: 'select',
      options: ['none', 'sm', 'md', 'lg'],
      description: 'Internal padding',
    },
    interactive: { control: 'boolean', description: 'Interactive hover effect' },
  },
};

export default meta;
type Story = StoryObj<MfCardComponent>;

export const Elevated: Story = {
  render: (args) => ({
    props: args,
    template: `
      <mf-card [title]="title" [subtitle]="subtitle" [variant]="variant" [padding]="padding" [interactive]="interactive">
        <p style="margin: 0; color: var(--mf-color-neutral-600);">
          This is the card content. It can include text, forms, lists, or other components.
        </p>
      </mf-card>
    `,
    moduleMetadata: { imports: [MfCardComponent] },
  }),
  args: {
    title: 'Card title',
    subtitle: 'Descriptive subtitle',
    variant: 'elevated',
    padding: 'md',
    interactive: false,
  },
};

export const Outlined: Story = {
  render: (args) => ({
    props: args,
    template: `
      <mf-card [title]="title" [subtitle]="subtitle" variant="outlined">
        <p style="margin: 0; color: var(--mf-color-neutral-600);">
          A subtle bordered card, ideal for secondary content.
        </p>
      </mf-card>
    `,
    moduleMetadata: { imports: [MfCardComponent] },
  }),
  args: {
    title: 'Outlined card',
    subtitle: 'Outlined variant',
  },
};

export const Flat: Story = {
  render: (args) => ({
    props: args,
    template: `
      <mf-card [title]="title" variant="flat">
        <p style="margin: 0; color: var(--mf-color-neutral-600);">
          A flat card with a subtle background and no border or shadow.
        </p>
      </mf-card>
    `,
    moduleMetadata: { imports: [MfCardComponent] },
  }),
  args: {
    title: 'Flat card',
  },
};

export const Interactive: Story = {
  render: () => ({
    template: `
      <mf-card title="Interactive card" subtitle="Hover to see the effect" variant="elevated" [interactive]="true">
        <p style="margin: 0; color: var(--mf-color-neutral-600);">
          This card responds to hover with subtle elevation and motion.
        </p>
      </mf-card>
    `,
    moduleMetadata: { imports: [MfCardComponent] },
  }),
  args: {},
};

export const NoHeader: Story = {
  name: 'No header',
  render: () => ({
    template: `
      <mf-card variant="outlined" padding="lg">
        <p style="margin: 0; color: var(--mf-color-neutral-600); font-size: var(--mf-text-lg);">
          Card without a header, using only projected content.
        </p>
      </mf-card>
    `,
    moduleMetadata: { imports: [MfCardComponent] },
  }),
};

export const AllVariants: Story = {
  name: 'All variants',
  render: () => ({
    template: `
      <div style="display: flex; gap: 20px; flex-wrap: wrap;">
        <mf-card title="Elevated" subtitle="With shadow" variant="elevated" style="width: 280px;">
          <p style="margin: 0; color: var(--mf-color-neutral-600);">Sample content.</p>
        </mf-card>
        <mf-card title="Outlined" subtitle="With border" variant="outlined" style="width: 280px;">
          <p style="margin: 0; color: var(--mf-color-neutral-600);">Sample content.</p>
        </mf-card>
        <mf-card title="Flat" subtitle="No elevation" variant="flat" style="width: 280px;">
          <p style="margin: 0; color: var(--mf-color-neutral-600);">Sample content.</p>
        </mf-card>
      </div>
    `,
    moduleMetadata: { imports: [MfCardComponent] },
  }),
};
