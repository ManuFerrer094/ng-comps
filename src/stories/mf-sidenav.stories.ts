import type { Meta, StoryObj } from '@storybook/angular';
import { Component, signal } from '@angular/core';
import { MfSidenavComponent, MfSidenavNavItem } from '../app/components/sidenav';

const NAV_ITEMS: MfSidenavNavItem[] = [
  { id: 'home',       icon: 'home',          label: 'Inicio',         active: true },
  { id: 'dashboard',  icon: 'dashboard',     label: 'Dashboard' },
  { id: 'analytics',  icon: 'bar_chart',     label: 'Analíticas',     badge: 3 },
  { id: 'users',      icon: 'group',         label: 'Usuarios' },
  { id: 'messages',   icon: 'mail',          label: 'Mensajes',       badge: 12 },
  { id: 'settings',   icon: 'settings',      label: 'Configuración' },
  { id: 'archived',   icon: 'archive',       label: 'Archivados',     disabled: true },
];

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
Envuelve Angular Material \`mat-sidenav-container\` con estilo propio: iconos Material,
estados activo/deshabilitado, badges de notificación y cabecera personalizable.

**Dos formas de uso:**

1. **Navitems declarativos** — Proporciona \`navItems\`, \`headerTitle\` y \`headerIcon\`.
2. **Content projection** — Proyecta \`[mfSidenavContent]\` para control total del contenido del panel.

El contenido principal siempre se proyecta sin atributo (slot por defecto).

| Propiedad      | Descripción                                             |
|----------------|---------------------------------------------------------|
| \`navItems\`     | Array de ítems \`{ id, icon, label, active?, disabled?, badge? }\` |
| \`headerTitle\`  | Título de la cabecera del sidenav                       |
| \`headerIcon\`   | Icono Material de la cabecera                           |
| \`opened\`       | Abierto o cerrado                                       |
| \`mode\`         | \`side\` · \`over\` · \`push\`                               |
| \`position\`     | \`start\` (izquierda) · \`end\` (derecha)                  |
| \`sidenavWidth\` | Ancho del panel (valor CSS)                             |
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
    headerTitle: { control: 'text', description: 'Título de la cabecera' },
    headerIcon: { control: 'text', description: 'Icono Material de la cabecera' },
    mfOpenedChange: { action: 'mfOpenedChange' },
    mfNavItemClick: { action: 'mfNavItemClick' },
  },
};

export default meta;
type Story = StoryObj<MfSidenavComponent>;

// ── Story helpers ─────────────────────────────────────────────────────────
const mainContent = `
  <div style="padding: 24px;">
    <h2 style="margin: 0 0 8px; font-size: 1.25rem; color: var(--mf-color-on-surface);">Contenido principal</h2>
    <p style="color: var(--mf-color-neutral-600); font-size: 0.875rem; margin: 0;">
      El panel lateral se renderiza a la izquierda. Puedes interactuar con los ítems del menú.
    </p>
  </div>
`;

export const Default: Story = {
  name: 'Con navItems (modo side)',
  args: {
    opened: true,
    mode: 'side',
    headerTitle: 'MF App',
    headerIcon: 'apps',
    navItems: NAV_ITEMS,
  },
  render: (args) => ({
    props: args,
    template: `
      <div style="height: 480px;">
        <mf-sidenav
          [opened]="opened"
          [mode]="mode"
          [position]="position"
          [navItems]="navItems"
          [headerTitle]="headerTitle"
          [headerIcon]="headerIcon"
          [sidenavWidth]="sidenavWidth || '260px'"
          (mfNavItemClick)="mfNavItemClick($event)"
          (mfOpenedChange)="mfOpenedChange($event)"
        >
          ${mainContent}
        </mf-sidenav>
      </div>
    `,
    moduleMetadata: { imports: [MfSidenavComponent] },
  }),
};

export const Over: Story = {
  name: 'Modo over',
  args: {
    opened: true,
    mode: 'over',
    headerTitle: 'MF App',
    headerIcon: 'apps',
    navItems: NAV_ITEMS,
  },
  render: (args) => ({
    props: args,
    template: `
      <div style="height: 480px;">
        <mf-sidenav
          [opened]="opened"
          [mode]="mode"
          [navItems]="navItems"
          [headerTitle]="headerTitle"
          [headerIcon]="headerIcon"
          (mfNavItemClick)="mfNavItemClick($event)"
        >
          ${mainContent}
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
    headerTitle: 'Detalles',
    headerIcon: 'info',
    navItems: [
      { id: 'notifications', icon: 'notifications', label: 'Notificaciones', badge: 5, active: true },
      { id: 'messages',      icon: 'mail',           label: 'Mensajes',       badge: 2 },
      { id: 'activity',      icon: 'history',        label: 'Actividad reciente' },
      { id: 'bookmarks',     icon: 'bookmark',       label: 'Guardados' },
    ],
  },
  render: (args) => ({
    props: args,
    template: `
      <div style="height: 480px;">
        <mf-sidenav
          [opened]="opened"
          [mode]="mode"
          [position]="position"
          [navItems]="navItems"
          [headerTitle]="headerTitle"
          [headerIcon]="headerIcon"
          (mfNavItemClick)="mfNavItemClick($event)"
        >
          ${mainContent}
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
    headerTitle: 'MF App',
    headerIcon: 'apps',
    navItems: NAV_ITEMS,
  },
  render: (args) => ({
    props: args,
    template: `
      <div style="height: 480px;">
        <mf-sidenav
          [opened]="opened"
          [mode]="mode"
          [navItems]="navItems"
          [headerTitle]="headerTitle"
          [headerIcon]="headerIcon"
        >
          <div style="padding: 24px;">
            <p style="color: var(--mf-color-neutral-600); font-size: 0.875rem;">
              El sidenav está cerrado. En modo <code>over</code> se superpone al abrirse.
            </p>
          </div>
        </mf-sidenav>
      </div>
    `,
    moduleMetadata: { imports: [MfSidenavComponent] },
  }),
};

// ── Interactive story con toggle ──────────────────────────────────────────
@Component({
  selector: 'mf-sidenav-interactive-demo',
  imports: [MfSidenavComponent],
  template: `
    <div style="height: 520px; display: flex; flex-direction: column;">
      <div style="display: flex; align-items: center; gap: 12px; padding: 12px 16px; border-bottom: 1px solid var(--mf-color-border); background: var(--mf-color-surface); flex-shrink: 0;">
        <button
          type="button"
          (click)="toggle()"
          style="display: inline-flex; align-items: center; gap: 8px; padding: 6px 14px; border: 1px solid var(--mf-color-border); border-radius: 9999px; background: var(--mf-color-surface); font-family: var(--mf-font-base); font-size: 0.875rem; font-weight: 500; cursor: pointer; color: var(--mf-color-on-surface);"
        >
          <span style="font-family: 'Material Icons'; font-size: 18px; line-height: 1;">menu</span>
          {{ opened() ? 'Cerrar panel' : 'Abrir panel' }}
        </button>
        <span style="font-size: 0.875rem; color: var(--mf-color-neutral-400);">Panel: {{ opened() ? 'abierto' : 'cerrado' }}</span>
      </div>
      <div style="flex: 1; min-height: 0;">
        <mf-sidenav
          [opened]="opened()"
          mode="over"
          headerTitle="MF App"
          headerIcon="apps"
          [navItems]="items()"
          (mfOpenedChange)="opened.set($event)"
          (mfNavItemClick)="onNavItemClick($event)"
        >
          <div style="padding: 24px;">
            <h2 style="margin: 0 0 8px; font-size: 1.25rem; color: var(--mf-color-on-surface);">{{ activeLabel() }}</h2>
            <p style="color: var(--mf-color-neutral-600); font-size: 0.875rem; margin: 0;">
              Haz clic en los ítems del menú para cambiar la sección activa.
            </p>
          </div>
        </mf-sidenav>
      </div>
    </div>
  `,
})
class MfSidenavInteractiveDemoComponent {
  readonly opened = signal(false);
  readonly activeId = signal('home');

  readonly items = signal<MfSidenavNavItem[]>([
    { id: 'home',      icon: 'home',      label: 'Inicio',       active: true },
    { id: 'dashboard', icon: 'dashboard', label: 'Dashboard' },
    { id: 'analytics', icon: 'bar_chart', label: 'Analíticas',   badge: 3 },
    { id: 'users',     icon: 'group',     label: 'Usuarios' },
    { id: 'messages',  icon: 'mail',      label: 'Mensajes',     badge: 12 },
    { id: 'settings',  icon: 'settings',  label: 'Configuración' },
  ]);

  readonly activeLabel = () =>
    this.items().find((i) => i.id === this.activeId())?.label ?? 'Inicio';

  toggle(): void {
    this.opened.set(!this.opened());
  }

  onNavItemClick(item: MfSidenavNavItem): void {
    this.activeId.set(item.id);
    this.items.set(
      this.items().map((i) => ({ ...i, active: i.id === item.id }))
    );
    this.opened.set(false);
  }
}

export const Interactive: Story = {
  name: 'Interactivo (toggle + selección)',
  render: () => ({
    template: `<mf-sidenav-interactive-demo />`,
    moduleMetadata: { imports: [MfSidenavInteractiveDemoComponent] },
  }),
  parameters: {
    docs: {
      description: {
        story:
          'Panel en modo `over` con botón de toggle y actualización del ítem activo al hacer clic.',
      },
    },
  },
};

export const ContentProjection: Story = {
  name: 'Content projection (personalizado)',
  render: () => ({
    template: `
      <div style="height: 480px;">
        <mf-sidenav opened="true" mode="side" sidenavWidth="240px">
          <div mfSidenavContent style="display: flex; flex-direction: column; height: 100%;">
            <div style="padding: 20px 16px 16px; border-bottom: 1px solid var(--mf-color-border);">
              <span style="font-family: var(--mf-font-display); font-weight: 700; color: var(--mf-color-brand);">Área de trabajo</span>
            </div>
            <nav style="flex: 1; padding: 12px; display: flex; flex-direction: column; gap: 4px;">
              <a href="#" style="display: flex; align-items: center; gap: 10px; padding: 8px 12px; border-radius: 10px; text-decoration: none; color: var(--mf-color-on-surface); font-size: 0.875rem; background: var(--mf-color-brand-light); color: var(--mf-color-brand); font-weight: 600;">
                <span class="material-icons" style="font-size: 20px;">star</span> Destacados
              </a>
              <a href="#" style="display: flex; align-items: center; gap: 10px; padding: 8px 12px; border-radius: 10px; text-decoration: none; color: var(--mf-color-neutral-600); font-size: 0.875rem;">
                <span class="material-icons" style="font-size: 20px;">folder</span> Proyectos
              </a>
              <a href="#" style="display: flex; align-items: center; gap: 10px; padding: 8px 12px; border-radius: 10px; text-decoration: none; color: var(--mf-color-neutral-600); font-size: 0.875rem;">
                <span class="material-icons" style="font-size: 20px;">people</span> Equipo
              </a>
            </nav>
          </div>
          <div style="padding: 24px;">
            <h2 style="margin: 0 0 8px; font-size: 1.25rem; color: var(--mf-color-on-surface);">Panel personalizado</h2>
            <p style="color: var(--mf-color-neutral-600); font-size: 0.875rem; margin: 0;">
              Usando <code>[mfSidenavContent]</code> para proyectar contenido completamente personalizado.
            </p>
          </div>
        </mf-sidenav>
      </div>
    `,
    moduleMetadata: { imports: [MfSidenavComponent] },
  }),
  parameters: {
    docs: {
      description: {
        story:
          'Cuando no se proporciona `navItems`, se activa el slot `[mfSidenavContent]` para proyectar HTML personalizado.',
      },
    },
  },
};