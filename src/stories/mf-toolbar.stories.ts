import type { Meta, StoryObj } from '@storybook/angular';

import { MfToolbarComponent } from '../app/components/toolbar';
import { MfButtonComponent } from '../app/components/button';
import { MfIconComponent } from '../app/components/icon';

const meta: Meta<MfToolbarComponent> = {
  title: 'Organisms/MfToolbar',
  component: MfToolbarComponent,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
**MfToolbar** is the toolbar component from the ng-comps library.
It uses Angular Material \`mat-toolbar\` under the hood with a clean, minimal presentation.

| Variant        | When to use it                     |
|----------------|------------------------------------|
| \`surface\`      | Default toolbar on a light surface |
| \`brand\`        | Toolbar using brand color          |
| \`transparent\`  | Over images or gradient backgrounds |
        `,
      },
    },
  },
  argTypes: {
    title: { control: 'text', description: 'Toolbar title' },
    variant: {
      control: 'select',
      options: ['surface', 'brand', 'transparent'],
      description: 'Visual variant',
    },
    bordered: { control: 'boolean', description: 'Bottom border' },
    sticky: { control: 'boolean', description: 'Sticky position' },
    elevated: { control: 'boolean', description: 'Subtle shadow' },
  },
};

export default meta;
type Story = StoryObj<MfToolbarComponent>;

export const Surface: Story = {
  render: (args) => ({
    props: args,
    template: `
      <mf-toolbar [title]="title" [variant]="variant" [bordered]="bordered">
        <mf-button mfToolbarEnd label="Sign in" variant="outlined" size="sm" />
        <mf-button mfToolbarEnd label="Register" variant="filled" size="sm" />
      </mf-toolbar>
    `,
    moduleMetadata: { imports: [MfToolbarComponent, MfButtonComponent] },
  }),
  args: {
    title: 'MF Components',
    variant: 'surface',
    bordered: true,
  },
};

export const Brand: Story = {
  render: (args) => ({
    props: args,
    template: `
      <mf-toolbar [title]="title" variant="brand" [bordered]="bordered">
        <mf-button mfToolbarEnd label="Dashboard" variant="text" size="sm" />
        <mf-button mfToolbarEnd label="Settings" variant="text" size="sm" />
      </mf-toolbar>
    `,
    moduleMetadata: { imports: [MfToolbarComponent, MfButtonComponent] },
  }),
  args: {
    title: 'Dashboard',
    bordered: true,
  },
};

export const WithIcons: Story = {
  name: 'With icons',
  render: () => ({
    template: `
      <mf-toolbar title="My App" variant="surface" [bordered]="true" [elevated]="true">
        <mf-icon mfToolbarEnd name="notifications" color="muted" />
        <mf-icon mfToolbarEnd name="settings" color="muted" />
        <mf-icon mfToolbarEnd name="account_circle" size="lg" color="brand" />
      </mf-toolbar>
    `,
    moduleMetadata: { imports: [MfToolbarComponent, MfIconComponent] },
  }),
};

export const Elevated: Story = {
  render: () => ({
    template: `
      <mf-toolbar title="Elevated" [elevated]="true" [bordered]="false">
        <mf-button mfToolbarEnd label="Action" variant="filled" size="sm" />
      </mf-toolbar>
    `,
    moduleMetadata: { imports: [MfToolbarComponent, MfButtonComponent] },
  }),
};

export const Transparent: Story = {
  render: () => ({
    template: `
      <div style="background: linear-gradient(135deg, var(--mf-color-primary-700), var(--mf-color-primary-900)); padding: 0; border-radius: var(--mf-radius-lg);">
        <mf-toolbar title="On gradient" variant="transparent" [bordered]="false" />
      </div>
    `,
    moduleMetadata: { imports: [MfToolbarComponent] },
  }),
};
