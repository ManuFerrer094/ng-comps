import type { Meta, StoryObj } from '@storybook/angular';
import { Component, signal } from '@angular/core';
import { MfSidenavComponent, MfSidenavNavItem } from '../app/components/sidenav';

const NAV_ITEMS: MfSidenavNavItem[] = [
  { id: 'home', icon: 'home', label: 'Home', active: true },
  { id: 'dashboard', icon: 'dashboard', label: 'Dashboard' },
  { id: 'analytics', icon: 'bar_chart', label: 'Analytics', badge: 3 },
  { id: 'users', icon: 'group', label: 'Users' },
  { id: 'messages', icon: 'mail', label: 'Messages', badge: 12 },
  { id: 'settings', icon: 'settings', label: 'Settings' },
  { id: 'archived', icon: 'archive', label: 'Archived', disabled: true },
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
**MfSidenav** is the side navigation component from the ng-comps library.
It wraps Angular Material \`mat-sidenav-container\` with custom styling, Material icons, active and disabled states, notification badges, and a customizable header.

**Two usage patterns:**

1. **Declarative nav items** - Provide \`navItems\`, \`headerTitle\`, and \`headerIcon\`.
2. **Content projection** - Project \`[mfSidenavContent]\` for full control over the panel content.

Main content is always projected through the default slot.

| Property       | Description                                                  |
|----------------|--------------------------------------------------------------|
| \`navItems\`     | Array of items \`{ id, icon, label, active?, disabled?, badge? }\` |
| \`headerTitle\`  | Sidenav header title                                         |
| \`headerIcon\`   | Header Material icon                                         |
| \`opened\`       | Whether the sidenav is open                                  |
| \`mode\`         | \`side\` · \`over\` · \`push\`                                 |
| \`position\`     | \`start\` (left) · \`end\` (right)                            |
| \`sidenavWidth\` | Panel width (CSS value)                                      |
        `,
      },
    },
  },
  argTypes: {
    opened: { control: 'boolean', description: 'Open or closed' },
    mode: {
      control: 'select',
      options: ['side', 'over', 'push'],
      description: 'Opening mode',
    },
    position: {
      control: 'select',
      options: ['start', 'end'],
      description: 'Panel position',
    },
    sidenavWidth: { control: 'text', description: 'Side panel width' },
    headerTitle: { control: 'text', description: 'Header title' },
    headerIcon: { control: 'text', description: 'Header Material icon' },
    mfOpenedChange: { action: 'mfOpenedChange' },
    mfNavItemClick: { action: 'mfNavItemClick' },
  },
};

export default meta;
type Story = StoryObj<MfSidenavComponent>;

const mainContent = `
  <div style="padding: 24px;">
    <h2 style="margin: 0 0 8px; font-size: 1.25rem; color: var(--mf-color-on-surface);">Main content</h2>
    <p style="color: var(--mf-color-neutral-600); font-size: 0.875rem; margin: 0;">
      The side panel is rendered on the left. You can interact with the menu items.
    </p>
  </div>
`;

export const Default: Story = {
  name: 'With navItems (side mode)',
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
  name: 'Over mode',
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
  name: 'Right position',
  args: {
    opened: true,
    mode: 'side',
    position: 'end',
    headerTitle: 'Details',
    headerIcon: 'info',
    navItems: [
      { id: 'notifications', icon: 'notifications', label: 'Notifications', badge: 5, active: true },
      { id: 'messages', icon: 'mail', label: 'Messages', badge: 2 },
      { id: 'activity', icon: 'history', label: 'Recent activity' },
      { id: 'bookmarks', icon: 'bookmark', label: 'Saved' },
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
  name: 'Closed',
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
              The sidenav is closed. In <code>over</code> mode it overlays the content when opened.
            </p>
          </div>
        </mf-sidenav>
      </div>
    `,
    moduleMetadata: { imports: [MfSidenavComponent] },
  }),
};

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
          {{ opened() ? 'Close panel' : 'Open panel' }}
        </button>
        <span style="font-size: 0.875rem; color: var(--mf-color-neutral-400);">Panel: {{ opened() ? 'open' : 'closed' }}</span>
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
              Click the menu items to change the active section.
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
    { id: 'home', icon: 'home', label: 'Home', active: true },
    { id: 'dashboard', icon: 'dashboard', label: 'Dashboard' },
    { id: 'analytics', icon: 'bar_chart', label: 'Analytics', badge: 3 },
    { id: 'users', icon: 'group', label: 'Users' },
    { id: 'messages', icon: 'mail', label: 'Messages', badge: 12 },
    { id: 'settings', icon: 'settings', label: 'Settings' },
  ]);

  readonly activeLabel = () =>
    this.items().find((i) => i.id === this.activeId())?.label ?? 'Home';

  toggle(): void {
    this.opened.set(!this.opened());
  }

  onNavItemClick(item: MfSidenavNavItem): void {
    this.activeId.set(item.id);
    this.items.set(
      this.items().map((i) => ({ ...i, active: i.id === item.id })),
    );
    this.opened.set(false);
  }
}

export const Interactive: Story = {
  name: 'Interactive (toggle + selection)',
  render: () => ({
    template: `<mf-sidenav-interactive-demo />`,
    moduleMetadata: { imports: [MfSidenavInteractiveDemoComponent] },
  }),
  parameters: {
    docs: {
      description: {
        story:
          'Panel in `over` mode with a toggle button and active item updates on click.',
      },
    },
  },
};

export const ContentProjection: Story = {
  name: 'Content projection (custom)',
  render: () => ({
    template: `
      <div style="height: 480px;">
        <mf-sidenav opened="true" mode="side" sidenavWidth="240px">
          <div mfSidenavContent style="display: flex; flex-direction: column; height: 100%;">
            <div style="padding: 20px 16px 16px; border-bottom: 1px solid var(--mf-color-border);">
              <span style="font-family: var(--mf-font-display); font-weight: 700; color: var(--mf-color-brand);">Workspace</span>
            </div>
            <nav style="flex: 1; padding: 12px; display: flex; flex-direction: column; gap: 4px;">
              <a href="#" style="display: flex; align-items: center; gap: 10px; padding: 8px 12px; border-radius: 10px; text-decoration: none; color: var(--mf-color-on-surface); font-size: 0.875rem; background: var(--mf-color-brand-light); color: var(--mf-color-brand); font-weight: 600;">
                <span class="material-icons" style="font-size: 20px;">star</span> Highlights
              </a>
              <a href="#" style="display: flex; align-items: center; gap: 10px; padding: 8px 12px; border-radius: 10px; text-decoration: none; color: var(--mf-color-neutral-600); font-size: 0.875rem;">
                <span class="material-icons" style="font-size: 20px;">folder</span> Projects
              </a>
              <a href="#" style="display: flex; align-items: center; gap: 10px; padding: 8px 12px; border-radius: 10px; text-decoration: none; color: var(--mf-color-neutral-600); font-size: 0.875rem;">
                <span class="material-icons" style="font-size: 20px;">people</span> Team
              </a>
            </nav>
          </div>
          <div style="padding: 24px;">
            <h2 style="margin: 0 0 8px; font-size: 1.25rem; color: var(--mf-color-on-surface);">Custom panel</h2>
            <p style="color: var(--mf-color-neutral-600); font-size: 0.875rem; margin: 0;">
              Using <code>[mfSidenavContent]</code> to project fully custom content.
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
          'When `navItems` is not provided, the `[mfSidenavContent]` slot is used to project custom HTML.',
      },
    },
  },
};
