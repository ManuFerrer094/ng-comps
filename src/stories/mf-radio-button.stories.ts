import type { Meta, StoryObj } from '@storybook/angular';

import { MfRadioButtonComponent } from '../app/components/radio-button';

const SAMPLE_OPTIONS = [
  { value: 'angular', label: 'Angular' },
  { value: 'react', label: 'React' },
  { value: 'vue', label: 'Vue' },
  { value: 'svelte', label: 'Svelte', disabled: true },
];

const meta: Meta<MfRadioButtonComponent> = {
  title: 'Atoms/MfRadioButton',
  component: MfRadioButtonComponent,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
**MfRadioButton** es el grupo de radio buttons de la librería ng-comps.
Envuelve Angular Material \`mat-radio-group\` + \`mat-radio-button\` y expone una API uniforme con look and feel de marca.

Recibe un array de \`MfRadioOption\` y gestiona la selección internamente.
        `,
      },
    },
  },
  argTypes: {
    direction: {
      control: 'select',
      options: ['vertical', 'horizontal'],
      description: 'Dirección del grupo',
    },
    disabled: { control: 'boolean' },
    ariaLabel: { control: 'text', description: 'Etiqueta accesible del grupo' },
    mfChange: { action: 'mfChange' },
  },
};

export default meta;
type Story = StoryObj<MfRadioButtonComponent>;

export const Vertical: Story = {
  args: {
    options: SAMPLE_OPTIONS,
    direction: 'vertical',
    ariaLabel: 'Framework preferido',
  },
};

export const Horizontal: Story = {
  args: {
    options: SAMPLE_OPTIONS,
    direction: 'horizontal',
    ariaLabel: 'Framework preferido',
  },
};

export const WithDefault: Story = {
  name: 'Con valor por defecto',
  args: {
    options: SAMPLE_OPTIONS,
    value: 'angular',
    ariaLabel: 'Framework preferido',
  },
};

export const Disabled: Story = {
  args: {
    options: SAMPLE_OPTIONS,
    disabled: true,
    ariaLabel: 'Framework preferido (deshabilitado)',
  },
};

export const AllVariants: Story = {
  name: 'Todas las variantes',
  render: () => ({
    template: `
      <div style="display: flex; flex-direction: column; gap: 32px;">
        <div>
          <p style="font-size: 0.875rem; color: #475569; margin-bottom: 8px;">Vertical</p>
          <mf-radio-button
            [options]="options"
            ariaLabel="Opciones vertical"
          />
        </div>
        <div>
          <p style="font-size: 0.875rem; color: #475569; margin-bottom: 8px;">Horizontal</p>
          <mf-radio-button
            [options]="options"
            direction="horizontal"
            ariaLabel="Opciones horizontal"
          />
        </div>
        <div>
          <p style="font-size: 0.875rem; color: #475569; margin-bottom: 8px;">Deshabilitado</p>
          <mf-radio-button
            [options]="options"
            [disabled]="true"
            ariaLabel="Opciones deshabilitadas"
          />
        </div>
      </div>
    `,
    props: {
      options: SAMPLE_OPTIONS,
    },
    moduleMetadata: { imports: [MfRadioButtonComponent] },
  }),
};
