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
**MfToolbar** es la barra de herramientas de la librería ng-comps.
Usa Angular Material \`mat-toolbar\` por debajo pero con estilo propio: minimalista y elegante.

| Variante       | Cuándo usarla                                  |
|----------------|------------------------------------------------|
| \`surface\`      | Toolbar por defecto, fondo blanco              |
| \`brand\`        | Toolbar con color de marca                     |
| \`transparent\`  | Sobre fondos con imagen o gradiente            |
        `,
      },
    },
  },
  argTypes: {
    title: { control: 'text', description: 'Título de la toolbar' },
    variant: {
      control: 'select',
      options: ['surface', 'brand', 'transparent'],
      description: 'Variante visual',
    },
    bordered: { control: 'boolean', description: 'Borde inferior' },
    sticky: { control: 'boolean', description: 'Posición fija' },
    elevated: { control: 'boolean', description: 'Sombra sutil' },
  },
};

export default meta;
type Story = StoryObj<MfToolbarComponent>;

export const Surface: Story = {
  render: (args) => ({
    props: args,
    template: `
      <mf-toolbar [title]="title" [variant]="variant" [bordered]="bordered">
        <mf-button mfToolbarEnd label="Iniciar sesión" variant="outlined" size="sm" />
        <mf-button mfToolbarEnd label="Registrarse" variant="filled" size="sm" />
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
        <mf-button mfToolbarEnd label="Configuración" variant="text" size="sm" />
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
  name: 'Con iconos',
  render: () => ({
    template: `
      <mf-toolbar title="Mi Aplicación" variant="surface" [bordered]="true" [elevated]="true">
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
      <mf-toolbar title="Con elevación" [elevated]="true" [bordered]="false">
        <mf-button mfToolbarEnd label="Acción" variant="filled" size="sm" />
      </mf-toolbar>
    `,
    moduleMetadata: { imports: [MfToolbarComponent, MfButtonComponent] },
  }),
};

export const Transparent: Story = {
  render: () => ({
    template: `
      <div style="background: linear-gradient(135deg, var(--mf-color-primary-700), var(--mf-color-primary-900)); padding: 0; border-radius: var(--mf-radius-lg);">
        <mf-toolbar title="Sobre gradiente" variant="transparent" [bordered]="false" />
      </div>
    `,
    moduleMetadata: { imports: [MfToolbarComponent] },
  }),
};
