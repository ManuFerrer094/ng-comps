import type { Meta, StoryObj } from '@storybook/angular';

import { MfSidenavComponent } from '../app/components/sidenav';

const meta: Meta<MfSidenavComponent> = {
  title: 'Organisms/MfSidenav',
  component: MfSidenavComponent,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
**MfSidenav** es el panel lateral de la librería mf-components.
Envuelve Angular Material \`mat-sidenav-container\` y expone una API uniforme con look and feel de marca.

Usa content projection:
- \`[mfSidenavContent]\` → contenido del panel lateral
- Contenido sin atributo → contenido principal

| Modo    | Descripción                                                   |
|---------|---------------------------------------------------------------|
| \`side\`  | El sidenav se muestra junto al contenido (empuja el layout)   |
| \`over\`  | El sidenav se superpone sobre el contenido                    |
| \`push\`  | El sidenav empuja el contenido al abrirse                     |
        `,
      },
    },
  },
  argTypes: {
    opened: { control: 'boolean', description: 'Abierto o cerrado' },
    mode: {
      control: 'select',
      options: ['side', 'over', 'push'],
      description: 'Modo de apertura',
    },
    position: {
      control: 'select',
      options: ['start', 'end'],
      description: 'Posición del panel',
    },
    sidenavWidth: { control: 'text', description: 'Ancho del panel lateral' },
    mfOpenedChange: { action: 'mfOpenedChange' },
  },
};

export default meta;
type Story = StoryObj<MfSidenavComponent>;

export const Side: Story = {
  name: 'Modo Side',
  args: {
    opened: true,
    mode: 'side',
  },
  render: (args) => ({
    props: args,
    template: `
      <div style="height: 400px;">
        <mf-sidenav [opened]="opened" [mode]="mode" [position]="position" sidenavWidth="240px">
          <nav mfSidenavContent style="padding: 24px; display: flex; flex-direction: column; gap: 12px;">
            <span style="font-weight: 700; font-size: 1rem; color: #0f766e;">MF App</span>
            <a href="#" style="color: #1e293b; text-decoration: none; font-size: 0.875rem;">🏠 Inicio</a>
            <a href="#" style="color: #1e293b; text-decoration: none; font-size: 0.875rem;">📊 Dashboard</a>
            <a href="#" style="color: #1e293b; text-decoration: none; font-size: 0.875rem;">👤 Perfil</a>
            <a href="#" style="color: #1e293b; text-decoration: none; font-size: 0.875rem;">⚙️ Ajustes</a>
          </nav>
          <div>
            <h2 style="margin: 0 0 8px 0; font-size: 1.25rem;">Contenido principal</h2>
            <p style="color: #475569;">El sidenav en modo <strong>side</strong> empuja el contenido hacia la derecha.</p>
          </div>
        </mf-sidenav>
      </div>
    `,
    moduleMetadata: { imports: [MfSidenavComponent] },
  }),
};

export const Over: Story = {
  name: 'Modo Over',
  args: {
    opened: true,
    mode: 'over',
  },
  render: (args) => ({
    props: args,
    template: `
      <div style="height: 400px;">
        <mf-sidenav [opened]="opened" [mode]="mode" sidenavWidth="240px">
          <nav mfSidenavContent style="padding: 24px; display: flex; flex-direction: column; gap: 12px;">
            <span style="font-weight: 700; font-size: 1rem; color: #0f766e;">MF App</span>
            <a href="#" style="color: #1e293b; text-decoration: none; font-size: 0.875rem;">🏠 Inicio</a>
            <a href="#" style="color: #1e293b; text-decoration: none; font-size: 0.875rem;">📊 Dashboard</a>
            <a href="#" style="color: #1e293b; text-decoration: none; font-size: 0.875rem;">👤 Perfil</a>
          </nav>
          <div>
            <h2 style="margin: 0 0 8px 0; font-size: 1.25rem;">Contenido principal</h2>
            <p style="color: #475569;">El sidenav en modo <strong>over</strong> se superpone al contenido.</p>
          </div>
        </mf-sidenav>
      </div>
    `,
    moduleMetadata: { imports: [MfSidenavComponent] },
  }),
};

export const Closed: Story = {
  name: 'Cerrado',
  args: {
    opened: false,
    mode: 'over',
  },
  render: (args) => ({
    props: args,
    template: `
      <div style="height: 400px;">
        <mf-sidenav [opened]="opened" [mode]="mode" sidenavWidth="240px">
          <nav mfSidenavContent style="padding: 24px;">
            <span style="font-weight: 700; color: #0f766e;">MF App</span>
          </nav>
          <div>
            <h2 style="margin: 0 0 8px 0; font-size: 1.25rem;">Panel cerrado</h2>
            <p style="color: #475569;">El sidenav está cerrado.</p>
          </div>
        </mf-sidenav>
      </div>
    `,
    moduleMetadata: { imports: [MfSidenavComponent] },
  }),
};

export const EndPosition: Story = {
  name: 'Posición derecha',
  args: {
    opened: true,
    mode: 'side',
    position: 'end',
  },
  render: (args) => ({
    props: args,
    template: `
      <div style="height: 400px;">
        <mf-sidenav [opened]="opened" [mode]="mode" [position]="position" sidenavWidth="240px">
          <nav mfSidenavContent style="padding: 24px; display: flex; flex-direction: column; gap: 12px;">
            <span style="font-weight: 700; color: #0f766e;">Panel derecho</span>
            <a href="#" style="color: #1e293b; text-decoration: none; font-size: 0.875rem;">🔔 Notificaciones</a>
            <a href="#" style="color: #1e293b; text-decoration: none; font-size: 0.875rem;">💬 Mensajes</a>
          </nav>
          <div>
            <h2 style="margin: 0 0 8px 0; font-size: 1.25rem;">Contenido principal</h2>
            <p style="color: #475569;">El sidenav puede estar en posición <strong>end</strong>.</p>
          </div>
        </mf-sidenav>
      </div>
    `,
    moduleMetadata: { imports: [MfSidenavComponent] },
  }),
};
