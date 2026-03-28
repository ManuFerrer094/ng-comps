import type { Meta, StoryObj } from '@storybook/angular';

import { MfTableColumn, MfTableComponent } from '../app/components/table';

const COLUMNS = [
  { key: 'name', header: 'Name', sortable: true },
  { key: 'role', header: 'Role' },
  { key: 'status', header: 'Status' },
];

const DATA = [
  { name: 'Ana Torres', role: 'Frontend', status: 'Active' },
  { name: 'Luis Vega', role: 'Design Ops', status: 'Pending' },
  { name: 'Marta Solis', role: 'QA', status: 'Active' },
];

const ENTERPRISE_COLUMNS: MfTableColumn[] = [
  { key: 'account', header: 'Account', sortable: true, truncate: true, width: '22%' },
  { key: 'owner', header: 'Owner', sortable: true, width: '18%' },
  {
    key: 'tier',
    header: 'Tier',
    type: 'badge',
    badgeTones: {
      Enterprise: 'brand',
      Scale: 'warning',
      Core: 'neutral',
    },
    width: '12%',
  },
  {
    key: 'health',
    header: 'Health',
    type: 'badge',
    sortable: true,
    badgeTones: {
      Healthy: 'success',
      'At risk': 'warning',
      Critical: 'error',
    },
    width: '12%',
  },
  {
    key: 'arr',
    header: 'ARR',
    type: 'number',
    sortable: true,
    align: 'end',
    formatter: (value: unknown) =>
      `EUR ${Number(value ?? 0).toLocaleString('es-ES')}`,
    width: '14%',
  },
  {
    key: 'renewal',
    header: 'Renewal',
    type: 'date',
    sortable: true,
    width: '12%',
  },
];

const ENTERPRISE_DATA = [
  {
    account: 'Northwind Holdings',
    owner: 'Irene Martin',
    tier: 'Enterprise',
    health: 'Healthy',
    arr: 480000,
    renewal: '2026-05-18',
  },
  {
    account: 'Aurea Logistics Group',
    owner: 'Carlos Leon',
    tier: 'Scale',
    health: 'At risk',
    arr: 195000,
    renewal: '2026-04-12',
  },
  {
    account: 'Vertex Retail Europe',
    owner: 'Lucia Perez',
    tier: 'Enterprise',
    health: 'Healthy',
    arr: 720000,
    renewal: '2026-07-03',
  },
  {
    account: 'DeltaCare Clinics',
    owner: 'Marta Solis',
    tier: 'Core',
    health: 'Critical',
    arr: 92000,
    renewal: '2026-04-05',
  },
  {
    account: 'BluePeak Energy',
    owner: 'Jaime Ortega',
    tier: 'Scale',
    health: 'Healthy',
    arr: 260000,
    renewal: '2026-08-21',
  },
  {
    account: 'Helix Finance Ops',
    owner: 'Noelia Castro',
    tier: 'Enterprise',
    health: 'At risk',
    arr: 540000,
    renewal: '2026-06-09',
  },
];

const meta: Meta<MfTableComponent> = {
  title: 'Organisms/MfTable',
  component: MfTableComponent,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
**MfTable** is now the flagship data-grid primitive in the library.

Use it for client-side search, pagination, badges, dense enterprise datasets and explicit row-level actions while preserving native table semantics.
        `,
      },
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'striped', 'bordered'],
    },
    density: {
      control: 'select',
      options: ['compact', 'comfortable', 'spacious'],
    },
    showSearch: { control: 'boolean' },
    showPaginator: { control: 'boolean' },
    rowActionLabel: {
      control: 'text',
      description: 'Visible label for the legacy row action button',
    },
    rowActionHeader: {
      control: 'text',
      description: 'Header text for the action column',
    },
    mfSortChange: { action: 'mfSortChange' },
    mfSearchChange: { action: 'mfSearchChange' },
    mfPageChange: { action: 'mfPageChange' },
    mfAction: { action: 'mfAction' },
    mfRowAction: { action: 'mfRowAction' },
  },
};

export default meta;
type Story = StoryObj<MfTableComponent>;

export const EnterpriseControlCenter: Story = {
  name: 'Enterprise Control Center',
  args: {
    title: 'Revenue accounts',
    description:
      'High-density account operations table with client-side search, sorting, pagination, badges and explicit actions. This is the opinionated flagship configuration for backoffice and enterprise dashboards.',
    columns: ENTERPRISE_COLUMNS,
    data: ENTERPRISE_DATA,
    variant: 'bordered',
    density: 'comfortable',
    showSearch: true,
    searchLabel: 'Search accounts',
    searchPlaceholder: 'Search by account, owner, tier or health',
    showPaginator: true,
    pageSize: 4,
    pageSizeOptions: [4, 6, 10],
    stickyHeader: true,
    rowActions: [
      {
        key: 'open',
        label: 'Open',
        icon: 'open_in_new',
        tone: 'primary',
        ariaLabel: (row) => `Open ${String(row['account'])}`,
      },
      {
        key: 'escalate',
        label: 'Escalate',
        icon: 'priority_high',
        tone: 'danger',
        disabled: (row) => row['health'] === 'Healthy',
        ariaLabel: (row) => `Escalate ${String(row['account'])}`,
      },
    ],
  },
};

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
    rowActionLabel: 'View details',
    rowActionHeader: 'Actions',
    rowActionAriaLabel: (row) => `View details for ${String(row['name'])}`,
  },
};

export const IncorrectUsage: Story = {
  name: 'Incorrect Usage',
  render: () => ({
    template: `
      <section style="max-width: 720px; border: 1px solid var(--mf-color-border); border-radius: 16px; padding: 20px; background: var(--mf-color-surface);">
        <h2 style="margin: 0 0 12px; font-size: 1rem;">Anti-patterns</h2>
        <ul style="margin: 0 0 16px; padding-left: 18px;">
          <li>Making the entire row clickable with \`(click)\` on \`tr\`.</li>
          <li>Using color as the only status indicator.</li>
          <li>Repeating the same accessible name for every row action.</li>
        </ul>
        <pre style="margin: 0; padding: 16px; border-radius: 12px; background: #111827; color: #f9fafb; overflow: auto;"><code>&lt;tr (click)="openDetail(row)"&gt;...&lt;/tr&gt;</code></pre>
      </section>
    `,
  }),
};
