import { Component, inject, signal } from '@angular/core';
import type { Meta, StoryObj } from '@storybook/angular';
import { expect, userEvent, waitFor, within } from 'storybook/test';
import { MatDialogRef } from '@angular/material/dialog';

import { MfAutocompleteComponent } from '../app/components/autocomplete';
import { MfButtonComponent } from '../app/components/button';
import { MfDatepickerComponent } from '../app/components/datepicker';
import { MfDialogComponent, MfDialogService } from '../app/components/dialog';
import { MfInputComponent } from '../app/components/input';
import { MfMenuComponent, MfMenuItem } from '../app/components/menu';
import { MfSelectComponent } from '../app/components/select';
import { MfSidenavComponent, MfSidenavNavItem } from '../app/components/sidenav';
import { MfTableComponent } from '../app/components/table';

const FRAMEWORK_OPTIONS = [
  { value: 'angular', label: 'Angular' },
  { value: 'react', label: 'React' },
  { value: 'vue', label: 'Vue' },
];

const COUNTRY_OPTIONS = [
  { value: 'es', label: 'Espana' },
  { value: 'mx', label: 'Mexico' },
  { value: 'ar', label: 'Argentina' },
  { value: 'co', label: 'Colombia' },
];

const MENU_ITEMS: MfMenuItem[] = [
  { value: 'edit', label: 'Editar', icon: 'edit' },
  { value: 'duplicate', label: 'Duplicar', icon: 'content_copy' },
  { value: 'archive', label: 'Archivar', icon: 'archive' },
];

const TABLE_COLUMNS = [
  { key: 'name', header: 'Nombre' },
  { key: 'team', header: 'Equipo' },
];

const TABLE_DATA = [
  { name: 'Ana', team: 'Platform' },
  { name: 'Luis', team: 'Design Ops' },
];

@Component({
  selector: 'a11y-dialog-content-story',
  imports: [MfDialogComponent, MfButtonComponent],
  template: `
    <mf-dialog
      title="Eliminar proyecto"
      message="Esta accion elimina el proyecto de forma permanente."
      role="alertdialog"
      [showClose]="false"
      [showActions]="true"
    >
      <div mfDialogActions>
        <mf-button label="Cancelar" variant="outlined" size="sm" (mfClick)="close()" />
        <mf-button label="Eliminar" variant="filled" size="sm" (mfClick)="close()" />
      </div>
    </mf-dialog>
  `,
})
class A11yDialogContentStoryComponent {
  private readonly dialogRef = inject(
    MatDialogRef<A11yDialogContentStoryComponent>,
  );

  close(): void {
    this.dialogRef.close();
  }
}

@Component({
  selector: 'a11y-dialog-launcher-story',
  imports: [MfButtonComponent],
  template: `
    <mf-button
      label="Abrir dialogo de borrado"
      variant="filled"
      (mfClick)="open()"
    />
  `,
})
class A11yDialogLauncherStoryComponent {
  private readonly dialog = inject(MfDialogService);

  open(): void {
    this.dialog.open(A11yDialogContentStoryComponent, {
      role: 'alertdialog',
      autoFocus: 'first-tabbable',
      restoreFocus: true,
    });
  }
}

@Component({
  selector: 'a11y-sidenav-contract-story',
  imports: [MfSidenavComponent],
  template: `
    <div style="height: 360px;">
      <mf-sidenav
        [opened]="true"
        mode="side"
        headerTitle="Areas"
        headerIcon="apps"
        [navItems]="items()"
        (mfNavItemClick)="onNavItemClick($event)"
      >
        <div style="padding: 24px;">
          <p style="margin: 0; font: inherit;">Seccion activa: {{ activeLabel() }}</p>
        </div>
      </mf-sidenav>
    </div>
  `,
})
class A11ySidenavContractStoryComponent {
  readonly activeId = signal('home');

  readonly items = signal<MfSidenavNavItem[]>([
    { id: 'home', label: 'Inicio', icon: 'home', active: true },
    { id: 'dashboard', label: 'Dashboard', icon: 'dashboard' },
    { id: 'analytics', label: 'Analiticas', icon: 'bar_chart' },
    { id: 'users', label: 'Usuarios', icon: 'group' },
  ]);

  readonly activeLabel = () =>
    this.items().find((item) => item.id === this.activeId())?.label ?? 'Inicio';

  onNavItemClick(item: MfSidenavNavItem): void {
    this.activeId.set(item.id);
    this.items.set(
      this.items().map((entry) => ({
        ...entry,
        active: entry.id === item.id,
      })),
    );
  }
}

const meta: Meta = {
  title: 'Accessibility/Contracts',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
Accessibility contracts for ng-comps v1.

These stories document the patterns that are expected to stay stable for keyboard navigation, focus management, explicit actions, and accessible naming.
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj;

export const ButtonCorrectUsage: Story = {
  name: 'Button Correct Usage',
  render: () => ({
    template: `
      <div style="display: flex; gap: 12px; align-items: center; flex-wrap: wrap;">
        <mf-button label="Guardar cambios" variant="filled" />
        <mf-button
          [iconOnly]="true"
          ariaLabel="Abrir filtros"
          leadingIcon="filter_list"
          variant="outlined"
        />
      </div>
    `,
    moduleMetadata: { imports: [MfButtonComponent] },
  }),
};

export const ButtonIncorrectUsage: Story = {
  name: 'Button Incorrect Usage',
  render: () => ({
    template: `
      <section style="max-width: 720px; border: 1px solid var(--mf-color-border); border-radius: 16px; padding: 20px; background: var(--mf-color-surface);">
        <h2 style="margin: 0 0 12px; font-size: 1rem;">Anti-patrones</h2>
        <ul style="margin: 0 0 16px; padding-left: 18px;">
          <li>Icon-only button sin \`ariaLabel\`.</li>
          <li>Usar un \`div\` clickable como boton.</li>
          <li>Eliminar el focus outline sin reemplazo visible.</li>
        </ul>
        <pre style="margin: 0; padding: 16px; border-radius: 12px; background: #111827; color: #f9fafb; overflow: auto;"><code>&lt;mf-button [iconOnly]="true" leadingIcon="filter_list" /&gt;
&lt;div (click)="save()"&gt;Guardar&lt;/div&gt;</code></pre>
      </section>
    `,
  }),
};

export const InputCorrectUsage: Story = {
  name: 'Input Correct Usage',
  render: () => ({
    template: `
      <div style="max-width: 360px;">
        <mf-input
          label="Correo de contacto"
          hint="Usaremos este email para avisos importantes"
          placeholder="nombre@empresa.com"
          [required]="true"
        />
      </div>
    `,
    moduleMetadata: { imports: [MfInputComponent] },
  }),
};

export const InputIncorrectUsage: Story = {
  name: 'Input Incorrect Usage',
  render: () => ({
    template: `
      <section style="max-width: 720px; border: 1px solid var(--mf-color-border); border-radius: 16px; padding: 20px; background: var(--mf-color-surface);">
        <h2 style="margin: 0 0 12px; font-size: 1rem;">Anti-patrones</h2>
        <ul style="margin: 0 0 16px; padding-left: 18px;">
          <li>Usar solo placeholder como nombre accesible.</li>
          <li>No asociar errores o ayudas con el control.</li>
        </ul>
        <pre style="margin: 0; padding: 16px; border-radius: 12px; background: #111827; color: #f9fafb; overflow: auto;"><code>&lt;mf-input placeholder="Email" /&gt;</code></pre>
      </section>
    `,
  }),
};

export const DialogFocusContract: Story = {
  name: 'Dialog Focus Contract',
  render: () => ({
    template: `<a11y-dialog-launcher-story />`,
    moduleMetadata: {
      imports: [
        A11yDialogLauncherStoryComponent,
        A11yDialogContentStoryComponent,
      ],
    },
  }),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const doc = canvasElement.ownerDocument;
    const body = within(doc.body);

    await userEvent.tab();
    const opener = canvas.getByRole('button', {
      name: 'Abrir dialogo de borrado',
    });
    await waitFor(() => expect(opener).toHaveFocus());

    await userEvent.keyboard('{Enter}');

    await waitFor(() =>
      expect(
        body.getByRole('alertdialog', { name: 'Eliminar proyecto' }),
      ).toBeTruthy(),
    );

    const cancelButton = body.getByRole('button', { name: 'Cancelar' });
    await waitFor(() => expect(cancelButton).toHaveFocus());

    await userEvent.keyboard('{Enter}');

    await waitFor(() =>
      expect(doc.body.querySelector('[role="alertdialog"]')).toBeNull(),
    );
    await waitFor(() => expect(opener).toHaveFocus());
  },
};

export const MenuKeyboardContract: Story = {
  name: 'Menu Keyboard Contract',
  render: () => ({
    props: {
      items: MENU_ITEMS,
    },
    template: `<mf-menu [items]="items" triggerLabel="Abrir acciones" />`,
    moduleMetadata: { imports: [MfMenuComponent] },
  }),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const doc = canvasElement.ownerDocument;
    const body = within(doc.body);

    await userEvent.tab();
    const trigger = canvas.getByRole('button', { name: 'Abrir acciones' });
    await waitFor(() => expect(trigger).toHaveFocus());

    await userEvent.keyboard('{Enter}');

    await waitFor(() => expect(body.getByRole('menu')).toBeTruthy());
    expect(body.getByRole('menuitem', { name: 'Editar' })).toBeTruthy();

    await userEvent.keyboard('{Escape}');

    await waitFor(() =>
      expect(doc.body.querySelector('[role="menu"]')).toBeNull(),
    );
    await waitFor(() => expect(trigger).toHaveFocus());
  },
};

export const SelectKeyboardContract: Story = {
  name: 'Select Keyboard Contract',
  render: () => ({
    props: {
      options: FRAMEWORK_OPTIONS,
    },
    template: `
      <div style="max-width: 360px;">
        <mf-select [options]="options" label="Framework" />
      </div>
    `,
    moduleMetadata: { imports: [MfSelectComponent] },
  }),
  play: async ({ canvasElement }) => {
    const doc = canvasElement.ownerDocument;
    const trigger = canvasElement.querySelector('[role="combobox"]') as
      | HTMLElement
      | null;

    expect(trigger).toBeTruthy();

    await userEvent.tab();
    await waitFor(() => expect(trigger).toHaveFocus());

    await userEvent.keyboard('{Enter}');

    await waitFor(() =>
      expect(doc.body.querySelector('[role="listbox"]')).toBeTruthy(),
    );

    await userEvent.keyboard('{Escape}');

    await waitFor(() =>
      expect(doc.body.querySelector('[role="listbox"]')).toBeNull(),
    );
    await waitFor(() => expect(trigger).toHaveFocus());
  },
};

export const AutocompleteKeyboardContract: Story = {
  name: 'Autocomplete Keyboard Contract',
  render: () => ({
    props: {
      options: COUNTRY_OPTIONS,
    },
    template: `
      <div style="max-width: 360px;">
        <mf-autocomplete
          [options]="options"
          label="Pais"
          placeholder="Escribe un pais"
        />
      </div>
    `,
    moduleMetadata: { imports: [MfAutocompleteComponent] },
  }),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const doc = canvasElement.ownerDocument;
    const body = within(doc.body);

    await userEvent.tab();
    const input = canvas.getByRole('textbox', { name: 'Pais' });
    await waitFor(() => expect(input).toHaveFocus());

    await userEvent.keyboard('es');

    await waitFor(() => expect(body.getByRole('listbox')).toBeTruthy());
    expect(body.getByText('Espana')).toBeTruthy();

    await userEvent.keyboard('{Escape}');
    await waitFor(() =>
      expect(doc.body.querySelector('[role="listbox"]')).toBeNull(),
    );
  },
};

export const DatepickerKeyboardContract: Story = {
  name: 'Datepicker Keyboard Contract',
  render: () => ({
    template: `
      <div style="max-width: 360px;">
        <mf-datepicker label="Fecha de entrega" />
      </div>
    `,
    moduleMetadata: { imports: [MfDatepickerComponent] },
  }),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const doc = canvasElement.ownerDocument;

    await userEvent.tab();
    canvas.getByRole('textbox', { name: 'Fecha de entrega' });

    await userEvent.tab();
    const toggleButton = canvas.getByRole('button', {
      name: 'Abrir calendario',
    });
    await waitFor(() => expect(toggleButton).toHaveFocus());

    await userEvent.keyboard('{Enter}');

    await waitFor(() =>
      expect(doc.body.querySelector('.mat-datepicker-content')).toBeTruthy(),
    );

    await userEvent.keyboard('{Escape}');

    await waitFor(() =>
      expect(doc.body.querySelector('.mat-datepicker-content')).toBeNull(),
    );
  },
};

export const TableExplicitActionContract: Story = {
  name: 'Table Explicit Action Contract',
  render: () => ({
    props: {
      columns: TABLE_COLUMNS,
      data: TABLE_DATA,
      rowActionAriaLabel: (row: Record<string, unknown>) =>
        `Ver detalle de ${row['name']}`,
    },
    template: `
      <mf-table
        [columns]="columns"
        [data]="data"
        rowActionLabel="Ver detalle"
        [rowActionAriaLabel]="rowActionAriaLabel"
      />
    `,
    moduleMetadata: { imports: [MfTableComponent] },
  }),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const detailButtons = canvas.getAllByRole('button', {
      name: /Ver detalle de/,
    });

    expect(detailButtons).toHaveLength(2);

    await userEvent.tab();
    await waitFor(() => expect(detailButtons[0]).toHaveFocus());
  },
};

export const SidenavKeyboardContract: Story = {
  name: 'Sidenav Keyboard Contract',
  render: () => ({
    template: `<a11y-sidenav-contract-story />`,
    moduleMetadata: { imports: [A11ySidenavContractStoryComponent] },
  }),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await userEvent.tab();
    const home = canvas.getByRole('button', { name: 'Inicio' });
    await waitFor(() => expect(home).toHaveFocus());

    await userEvent.tab();
    await userEvent.tab();
    const analytics = canvas.getByRole('button', { name: 'Analiticas' });
    await waitFor(() => expect(analytics).toHaveFocus());

    await userEvent.keyboard('{Enter}');

    await waitFor(() =>
      expect(canvas.getByText('Seccion activa: Analiticas')).toBeTruthy(),
    );
  },
};
