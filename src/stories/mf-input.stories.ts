import type { Meta, StoryObj } from '@storybook/angular';

import { MfInputComponent } from '../app/components/input';

const meta: Meta<MfInputComponent> = {
  title: 'Atoms/MfInput',
  component: MfInputComponent,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
**MfInput** es el campo de texto de la librería ng-comps.
Usa Angular Material \`mat-form-field\` por debajo pero expone una API uniforme con look and feel de marca.

| Propiedad     | Descripción                              |
|---------------|------------------------------------------|
| \`label\`       | Etiqueta flotante del campo              |
| \`placeholder\` | Texto de placeholder                     |
| \`hint\`        | Texto de ayuda debajo del campo          |
| \`error\`       | Mensaje de error                         |
| \`leadingIcon\` | Icono al inicio del campo                |
| \`trailingIcon\`| Icono al final del campo                 |
        `,
      },
    },
  },
  argTypes: {
    label: { control: 'text', description: 'Etiqueta flotante' },
    placeholder: { control: 'text', description: 'Placeholder' },
    type: {
      control: 'select',
      options: ['text', 'email', 'password', 'number', 'search', 'tel', 'url'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Tamaño del campo',
    },
    value: { control: 'text' },
    disabled: { control: 'boolean' },
    readonly: { control: 'boolean' },
    hint: { control: 'text', description: 'Texto de ayuda' },
    error: { control: 'text', description: 'Mensaje de error' },
    leadingIcon: { control: 'text' },
    trailingIcon: { control: 'text' },
    fullWidth: { control: 'boolean' },
    mfInput: { action: 'mfInput' },
    mfBlur: { action: 'mfBlur' },
  },
};

export default meta;
type Story = StoryObj<MfInputComponent>;

export const Default: Story = {
  args: {
    label: 'Correo electrónico',
    placeholder: 'nombre@ejemplo.com',
  },
};

export const WithHint: Story = {
  name: 'Con texto de ayuda',
  args: {
    label: 'Contraseña',
    type: 'password',
    hint: 'Mínimo 8 caracteres',
  },
};

export const WithError: Story = {
  name: 'Con error',
  args: {
    label: 'Email',
    value: 'correo-invalido',
    error: 'Introduce un email válido',
  },
};

export const WithLeadingIcon: Story = {
  name: 'Con icono al inicio',
  args: {
    label: 'Buscar',
    placeholder: 'Buscar...',
    leadingIcon: 'search',
  },
};

export const WithTrailingIcon: Story = {
  name: 'Con icono al final',
  args: {
    label: 'Correo',
    placeholder: 'nombre@ejemplo.com',
    trailingIcon: 'mail',
  },
};

export const Disabled: Story = {
  args: {
    label: 'Campo deshabilitado',
    value: 'No editable',
    disabled: true,
  },
};

export const Readonly: Story = {
  name: 'Solo lectura',
  args: {
    label: 'Solo lectura',
    value: 'Valor fijo',
    readonly: true,
  },
};

export const Small: Story = {
  args: {
    label: 'Pequeño',
    placeholder: 'Texto...',
    size: 'sm',
  },
};

export const Large: Story = {
  args: {
    label: 'Grande',
    placeholder: 'Texto...',
    size: 'lg',
  },
};

export const FullWidth: Story = {
  name: 'Ancho completo',
  args: {
    label: 'Nombre completo',
    placeholder: 'Juan Pérez',
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
        <mf-input label="Normal" placeholder="Escribe aquí..." />
        <mf-input label="Con ayuda" hint="Este es un texto de ayuda" />
        <mf-input label="Con error" value="mal" error="Este campo es obligatorio" />
        <mf-input label="Búsqueda" leadingIcon="search" placeholder="Buscar..." />
        <mf-input label="Deshabilitado" value="No editable" [disabled]="true" />
      </div>
    `,
    moduleMetadata: { imports: [MfInputComponent] },
  }),
};
