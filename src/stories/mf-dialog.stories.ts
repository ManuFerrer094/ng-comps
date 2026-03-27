import type { Meta, StoryObj } from '@storybook/angular';
import { Component, inject } from '@angular/core';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';

import { MfDialogComponent } from '../app/components/dialog';
import { MfButtonComponent } from '../app/components/button';

@Component({
  selector: 'mf-dialog-content-demo',
  imports: [MfDialogComponent, MfButtonComponent],
  template: `
    <mf-dialog
      title="Confirm action"
      message="Are you sure you want to continue? This action cannot be undone."
      [showClose]="true"
      [showActions]="true"
      (mfClose)="dialogRef.close()"
    >
      <div mfDialogActions>
        <mf-button label="Cancel" variant="outlined" size="sm" (mfClick)="dialogRef.close()" />
        <mf-button label="Confirm" variant="filled" size="sm" (mfClick)="dialogRef.close()" />
      </div>
    </mf-dialog>
  `,
})
class MfDialogContentDemoComponent {
  readonly dialogRef = inject(MatDialogRef<MfDialogContentDemoComponent>);
}

@Component({
  selector: 'mf-dialog-demo',
  imports: [MfButtonComponent, MatDialogModule],
  template: `
    <mf-button
      label="Open dialog"
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

const meta: Meta<MfDialogComponent> = {
  title: 'Organisms/MfDialog',
  component: MfDialogComponent,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
**MfDialog** is the dialog component from the ng-comps library.
It uses Angular Material \`MatDialog\` under the hood with a clean, minimal presentation.

It can be used in two ways:
1. **Inline** as part of a template for conditional content
2. **Programmatically** with \`MatDialog.open()\`
        `,
      },
    },
  },
  argTypes: {
    title: { control: 'text', description: 'Dialog title' },
    message: { control: 'text', description: 'Descriptive message' },
    showClose: { control: 'boolean', description: 'Show close button' },
    showActions: {
      control: 'boolean',
      description: 'Show actions area',
    },
    mfClose: { action: 'mfClose' },
  },
};

export default meta;
type Story = StoryObj<MfDialogComponent>;

export const Default: Story = {
  render: (args) => ({
    props: args,
    template: `
      <div style="border: 1px solid var(--mf-color-border); border-radius: var(--mf-radius-xl, 20px); box-shadow: var(--mf-shadow-lg); max-width: 480px;">
        <mf-dialog [title]="title" [message]="message" [showClose]="showClose" [showActions]="showActions">
          <div mfDialogActions>
            <mf-button label="Cancel" variant="outlined" size="sm" />
            <mf-button label="Confirm" variant="filled" size="sm" />
          </div>
        </mf-dialog>
      </div>
    `,
    moduleMetadata: { imports: [MfDialogComponent, MfButtonComponent] },
  }),
  args: {
    title: 'Confirm action',
    message: 'Are you sure you want to continue? This action cannot be undone.',
    showClose: true,
    showActions: true,
  },
};

export const WithoutMessage: Story = {
  name: 'Title only',
  render: () => ({
    template: `
      <div style="border: 1px solid var(--mf-color-border); border-radius: var(--mf-radius-xl, 20px); box-shadow: var(--mf-shadow-lg); max-width: 480px;">
        <mf-dialog title="Settings" [showClose]="true" [showActions]="true">
          <p style="margin: 0; color: var(--mf-color-neutral-600); font-size: var(--mf-text-sm);">
            Here you can customize your account settings.
          </p>
          <div mfDialogActions>
            <mf-button label="Cancel" variant="text" size="sm" />
            <mf-button label="Save" variant="filled" size="sm" />
          </div>
        </mf-dialog>
      </div>
    `,
    moduleMetadata: { imports: [MfDialogComponent, MfButtonComponent] },
  }),
};

export const Danger: Story = {
  name: 'Destructive',
  render: () => ({
    template: `
      <div style="border: 1px solid var(--mf-color-border); border-radius: var(--mf-radius-xl, 20px); box-shadow: var(--mf-shadow-lg); max-width: 480px;">
        <mf-dialog title="Delete project" message="The project and all its data will be permanently deleted. This action cannot be undone." [showClose]="true" [showActions]="true">
          <div mfDialogActions>
            <mf-button label="Cancel" variant="outlined" size="sm" />
            <mf-button label="Delete" variant="filled" size="sm" />
          </div>
        </mf-dialog>
      </div>
    `,
    moduleMetadata: { imports: [MfDialogComponent, MfButtonComponent] },
  }),
};

export const OpenDialog: Story = {
  name: 'Open with MatDialog',
  render: () => ({
    template: `<mf-dialog-demo />`,
    moduleMetadata: { imports: [MfDialogDemoComponent] },
  }),
  parameters: {
    docs: {
      description: {
        story:
          'Click the button to open the dialog using `MatDialog.open()`.',
      },
    },
  },
};
