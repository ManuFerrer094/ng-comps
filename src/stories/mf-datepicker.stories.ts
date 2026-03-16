import type { Meta, StoryObj } from '@storybook/angular';

import { MfDatepickerComponent } from '../app/components/datepicker';

const meta: Meta<MfDatepickerComponent> = {
  title: 'Atoms/MfDatepicker',
  component: MfDatepickerComponent,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
**MfDatepicker** es el selector de fecha de la librería mf-components.
Usa Angular Material \`mat-datepicker\` por debajo pero expone una API uniforme con look and feel de marca.

| Propiedad   | Descripción                              |
|-------------|------------------------------------------|
| \`label\`     | Etiqueta flotante del campo              |
| \`placeholder\` | Texto de placeholder                   |
| \`hint\`      | Texto de ayuda debajo del campo          |
| \`error\`     | Mensaje de error                         |
| \`min\`       | Fecha mínima seleccionable               |
| \`max\`       | Fecha máxima seleccionable               |
| \`disabled\`  | Deshabilita el campo                     |
| \`fullWidth\` | Ocupa el ancho del contenedor            |
        `,
      },
    },
  },
  argTypes: {
    label: { control: 'text', description: 'Etiqueta flotante' },
    placeholder: { control: 'text', description: 'Placeholder' },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Tamaño del campo',
    },
    disabled: { control: 'boolean' },
    hint: { control: 'text', description: 'Texto de ayuda' },
    error: { control: 'text', description: 'Mensaje de error' },
    fullWidth: { control: 'boolean' },
    mfChange: { action: 'mfChange' },
    mfBlur: { action: 'mfBlur' },
  },
};

export default meta;
type Story = StoryObj<MfDatepickerComponent>;

export const Default: Story = {
  args: {
    label: 'Fecha de nacimiento',
    placeholder: 'DD/MM/YYYY',
  },
};

export const WithHint: Story = {
  name: 'Con texto de ayuda',
  args: {
    label: 'Fecha de inicio',
    hint: 'Selecciona una fecha posterior a hoy',
  },
};

export const WithError: Story = {
  name: 'Con error',
  args: {
    label: 'Fecha de vencimiento',
    error: 'La fecha es obligatoria',
  },
};

export const Disabled: Story = {
  args: {
    label: 'Fecha (deshabilitada)',
    disabled: true,
  },
};

export const Small: Story = {
  args: {
    label: 'Pequeño',
    size: 'sm',
  },
};

export const Large: Story = {
  args: {
    label: 'Grande',
    size: 'lg',
  },
};

export const FullWidth: Story = {
  name: 'Ancho completo',
  args: {
    label: 'Fecha de entrega',
    fullWidth: true,
  },
  parameters: {
    layout: 'padded',
  },
};

export const AllVariants: Story = {
  name: 'Todas las variantes',
  render: () => ({
    template: `
      <div style="display: flex; flex-direction: column; gap: 16px; max-width: 360px;">
        <mf-datepicker label="Normal" />
        <mf-datepicker label="Con ayuda" hint="Selecciona una fecha" />
        <mf-datepicker label="Con error" error="Fecha requerida" />
        <mf-datepicker label="Deshabilitado" [disabled]="true" />
      </div>
    `,
    moduleMetadata: { imports: [MfDatepickerComponent] },
  }),
};
