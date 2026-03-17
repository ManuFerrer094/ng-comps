import type { Meta, StoryObj } from '@storybook/angular';
import { Component, inject } from '@angular/core';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';

import { MfDialogComponent } from '../app/components/dialog';
import { MfButtonComponent } from '../app/components/button';

// ── Contenido del diálogo que se abre programáticamente ────────────────────
@Component({
  selector: 'mf-dialog-content-demo',
  imports: [MfDialogComponent, MfButtonComponent],
  template: `
    <mf-dialog
      title="Confirmar acción"
      message="¿Estás seguro de que deseas continuar? Esta acción no se puede deshacer."
      [showClose]="true"
      [showActions]="true"
      (mfClose)="dialogRef.close()"
    >
      <div mfDialogActions>
        <mf-button label="Cancelar" variant="outlined" size="sm" (mfClick)="dialogRef.close()" />
        <mf-button label="Confirmar" variant="filled" size="sm" (mfClick)="dialogRef.close()" />
      </div>
    </mf-dialog>
  `,
})
class MfDialogContentDemoComponent {
  readonly dialogRef = inject(MatDialogRef<MfDialogContentDemoComponent>);
}

// ── Wrapper component para abrir el diálogo ────────────────────────────────
@Component({
  selector: 'mf-dialog-demo',
  imports: [MfButtonComponent, MatDialogModule],
  template: `
    <mf-button
      label="Abrir diálogo"
      variant="filled"
      (mfClick)="openDialog()"
    />
  `,
})
class MfDialogDemoComponent {
  private readonly dialog = inject(MatDialog);

  openDialog(): void {
    this.dialog.open(MfDialogContentDemoComponent, {
      panelClass: 'mf-dialog-panel',
      autoFocus: true,
    });
  }
}

// ── Meta ─────────────────────────────────────────────────────────────────────

const meta: Meta<MfDialogComponent> = {
  title: 'Organisms/MfDialog',
  component: MfDialogComponent,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
**MfDialog** es el componente de diálogo de la librería mf-components.
Usa Angular Material \`MatDialog\` por debajo pero con estilo propio: minimalista y elegante.

Puede usarse de dos formas:
1. **Inline** como parte de una plantilla (para contenido condicional)
2. **Programáticamente** con \`MatDialog.open()\`
        `,
      },
    },
  },
  argTypes: {
    title: { control: 'text', description: 'Título del diálogo' },
    message: { control: 'text', description: 'Mensaje descriptivo' },
    showClose: { control: 'boolean', description: 'Mostrar botón de cerrar' },
    showActions: {
      control: 'boolean',
      description: 'Mostrar área de acciones',
    },
    mfClose: { action: 'mfClose' },
  },
};

export default meta;
type Story = StoryObj<MfDialogComponent>;

// ── Inline preview (renderizado directo para docs) ──────────────────────────

export const Default: Story = {
  render: (args) => ({
    props: args,
    template: `
      <div style="border: 1px solid var(--mf-color-border); border-radius: var(--mf-radius-xl, 20px); box-shadow: var(--mf-shadow-lg); max-width: 480px;">
        <mf-dialog [title]="title" [message]="message" [showClose]="showClose" [showActions]="showActions">
          <div mfDialogActions>
            <mf-button label="Cancelar" variant="outlined" size="sm" />
            <mf-button label="Confirmar" variant="filled" size="sm" />
          </div>
        </mf-dialog>
      </div>
    `,
    moduleMetadata: { imports: [MfDialogComponent, MfButtonComponent] },
  }),
  args: {
    title: 'Confirmar acción',
    message:
      '¿Estás seguro de que deseas continuar? Esta acción no se puede deshacer.',
    showClose: true,
    showActions: true,
  },
};

export const WithoutMessage: Story = {
  name: 'Solo título',
  render: (args) => ({
    props: args,
    template: `
      <div style="border: 1px solid var(--mf-color-border); border-radius: var(--mf-radius-xl, 20px); box-shadow: var(--mf-shadow-lg); max-width: 480px;">
        <mf-dialog title="Configuración" [showClose]="true" [showActions]="true">
          <p style="margin: 0; color: var(--mf-color-neutral-600); font-size: var(--mf-text-sm);">
            Aquí puedes personalizar las opciones de tu cuenta.
          </p>
          <div mfDialogActions>
            <mf-button label="Cancelar" variant="text" size="sm" />
            <mf-button label="Guardar" variant="filled" size="sm" />
          </div>
        </mf-dialog>
      </div>
    `,
    moduleMetadata: { imports: [MfDialogComponent, MfButtonComponent] },
  }),
};

export const Danger: Story = {
  name: 'Destructivo',
  render: () => ({
    template: `
      <div style="border: 1px solid var(--mf-color-border); border-radius: var(--mf-radius-xl, 20px); box-shadow: var(--mf-shadow-lg); max-width: 480px;">
        <mf-dialog title="Eliminar proyecto" message="Se eliminará permanentemente el proyecto y todos sus datos. Esta acción no se puede deshacer." [showClose]="true" [showActions]="true">
          <div mfDialogActions>
            <mf-button label="Cancelar" variant="outlined" size="sm" />
            <mf-button label="Eliminar" variant="filled" size="sm" />
          </div>
        </mf-dialog>
      </div>
    `,
    moduleMetadata: { imports: [MfDialogComponent, MfButtonComponent] },
  }),
};

export const OpenDialog: Story = {
  name: 'Abrir con MatDialog',
  render: () => ({
    template: `<mf-dialog-demo />`,
    moduleMetadata: { imports: [MfDialogDemoComponent] },
  }),
  parameters: {
    docs: {
      description: {
        story:
          'Haz clic en el botón para abrir el diálogo usando `MatDialog.open()`.',
      },
    },
  },
};
