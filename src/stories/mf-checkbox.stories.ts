import type { Meta, StoryObj } from '@storybook/angular';

import { MfCheckboxComponent } from '../app/components/checkbox';

const meta: Meta<MfCheckboxComponent> = {
  title: 'Atoms/MfCheckbox',
  component: MfCheckboxComponent,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
**MfCheckbox** es el checkbox de la librería ng-comps.
Usa Angular Material \`mat-checkbox\` por debajo pero expone una API uniforme con look and feel de marca.

| Estado          | Descripción                                |
|-----------------|--------------------------------------------|
| \`checked\`       | Marcado                                    |
| \`indeterminate\` | Estado intermedio (selección parcial)      |
| \`disabled\`      | No interactivo                             |
        `,
      },
    },
  },
  argTypes: {
    label: { control: 'text', description: 'Texto del checkbox' },
    checked: { control: 'boolean' },
    indeterminate: { control: 'boolean' },
    disabled: { control: 'boolean' },
    mfChange: { action: 'mfChange' },
  },
};

export default meta;
type Story = StoryObj<MfCheckboxComponent>;

export const Default: Story = {
  args: {
    label: 'Acepto los términos y condiciones',
    checked: false,
  },
};

export const Checked: Story = {
  args: {
    label: 'Opción seleccionada',
    checked: true,
  },
};

export const Indeterminate: Story = {
  args: {
    label: 'Selección parcial',
    indeterminate: true,
  },
};

export const Disabled: Story = {
  args: {
    label: 'Opción deshabilitada',
    disabled: true,
  },
};

export const DisabledChecked: Story = {
  name: 'Deshabilitado y marcado',
  args: {
    label: 'Marcado y deshabilitado',
    checked: true,
    disabled: true,
  },
};

export const AllStates: Story = {
  name: 'Todos los estados',
  render: () => ({
    template: `
      <div style="display: flex; flex-direction: column; gap: 12px;">
        <mf-checkbox label="Sin marcar" />
        <mf-checkbox label="Marcado" [checked]="true" />
        <mf-checkbox label="Indeterminado" [indeterminate]="true" />
        <mf-checkbox label="Deshabilitado" [disabled]="true" />
        <mf-checkbox label="Marcado y deshabilitado" [checked]="true" [disabled]="true" />
      </div>
    `,
    moduleMetadata: { imports: [MfCheckboxComponent] },
  }),
};
