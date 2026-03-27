import type { Meta, StoryObj } from '@storybook/angular';

import { MfTableComponent } from '../app/components/table';

const COLUMNS = [
  { key: 'name', header: 'Nombre', sortable: true },
  { key: 'role', header: 'Rol' },
  { key: 'status', header: 'Estado' },
];

const DATA = [
  { name: 'Ana Torres', role: 'Frontend', status: 'Activa' },
  { name: 'Luis Vega', role: 'Design Ops', status: 'Pendiente' },
  { name: 'Marta Solis', role: 'QA', status: 'Activa' },
];

const meta: Meta<MfTableComponent> = {
  title: 'Organisms/MfTable',
  component: MfTableComponent,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
**MfTable** renders data with native table semantics and explicit row actions.

The v1 contract avoids clickable rows as the default interaction pattern. If a row needs actions, render focusable controls inside cells and give them contextual accessible names.
        `,
      },
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'striped', 'bordered'],
    },
    rowActionLabel: { control: 'text', description: 'Visible label for the row action button' },
    rowActionHeader: { control: 'text', description: 'Header text for the action column' },
    mfSortChange: { action: 'mfSortChange' },
    mfRowAction: { action: 'mfRowAction' },
  },
};

export default meta;
type Story = StoryObj<MfTableComponent>;

export const Default: Story = {
  args: {
    columns: COLUMNS,
    data: DATA,
  },
};

export const WithExplicitActions: Story = {
  name: 'With Explicit Actions',
  args: {
    columns: COLUMNS,
    data: DATA,
    rowActionLabel: 'Ver detalle',
    rowActionHeader: 'Acciones',
    rowActionAriaLabel: (row) => `Ver detalle de ${String(row['name'])}`,
  },
};

export const IncorrectUsage: Story = {
  name: 'Incorrect Usage',
  render: () => ({
    template: `
      <section style="max-width: 720px; border: 1px solid var(--mf-color-border); border-radius: 16px; padding: 20px; background: var(--mf-color-surface);">
        <h2 style="margin: 0 0 12px; font-size: 1rem;">Anti-patrones</h2>
        <ul style="margin: 0 0 16px; padding-left: 18px;">
          <li>Hacer clickable toda la fila con \`(click)\` en \`tr\`.</li>
          <li>Usar color como unica senal de estado.</li>
          <li>Repetir el mismo nombre accesible en todas las acciones de fila.</li>
        </ul>
        <pre style="margin: 0; padding: 16px; border-radius: 12px; background: #111827; color: #f9fafb; overflow: auto;"><code>&lt;tr (click)="openDetail(row)"&gt;...&lt;/tr&gt;</code></pre>
      </section>
    `,
  }),
};
