import type { Meta, StoryObj } from '@storybook/angular';

import { MfMenuComponent } from '../app/components/menu';

const MENU_ITEMS = [
  { value: 'edit', label: 'Edit', icon: 'edit' },
  { value: 'duplicate', label: 'Duplicate', icon: 'content_copy' },
  { value: 'archive', label: 'Archive', icon: 'archive' },
  { value: 'delete', label: 'Delete', icon: 'delete' },
];

const meta: Meta<MfMenuComponent> = {
  title: 'Atoms/MfMenu',
  component: MfMenuComponent,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
**MfMenu** exposes an accessible menu trigger over Angular Material \`mat-menu\`.

Use this component when:

- the trigger has an explicit accessible label
- menu items are actions, not layout containers
- keyboard users must be able to open with Enter or Space and close with Escape
        `,
      },
    },
  },
  argTypes: {
    triggerIcon: { control: 'text', description: 'Material icon used in the trigger' },
    triggerLabel: { control: 'text', description: 'Accessible name of the trigger button' },
    mfItemClick: { action: 'mfItemClick' },
  },
};

export default meta;
type Story = StoryObj<MfMenuComponent>;

export const Default: Story = {
  args: {
    items: MENU_ITEMS,
    triggerLabel: 'Open record actions',
  },
};

export const CorrectUsage: Story = {
  name: 'Correct Usage',
  args: {
    items: MENU_ITEMS,
    triggerLabel: 'Open project actions',
  },
};

export const IncorrectUsage: Story = {
  name: 'Incorrect Usage',
  render: () => ({
    template: `
      <section style="max-width: 720px; border: 1px solid var(--mf-color-border); border-radius: 16px; padding: 20px; background: var(--mf-color-surface);">
        <h2 style="margin: 0 0 12px; font-size: 1rem;">Anti-patterns</h2>
        <ul style="margin: 0 0 16px; padding-left: 18px;">
          <li>Icon-only trigger with no accessible name.</li>
          <li>Using menu items as visual navigation with no real action.</li>
          <li>Blocking Escape or preventing focus from returning to the trigger.</li>
        </ul>
        <pre style="margin: 0; padding: 16px; border-radius: 12px; background: #111827; color: #f9fafb; overflow: auto;"><code>&lt;mf-menu [items]="items" triggerLabel="" /&gt;</code></pre>
      </section>
    `,
  }),
};
