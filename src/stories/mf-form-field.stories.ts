import type { Meta, StoryObj } from '@storybook/angular';

import { MfFormFieldComponent } from '../app/components/form-field';
import { MfInputComponent } from '../app/components/input';
import { MfCheckboxComponent } from '../app/components/checkbox';

const meta: Meta<MfFormFieldComponent> = {
  title: 'Molecules/MfFormField',
  component: MfFormFieldComponent,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
**MfFormField** es el contenedor de campo de formulario de la librería ng-comps.
Proporciona layout consistente con label, contenido proyectado y mensajes opcionales.

Usar como wrapper de \`mf-input\`, \`mf-checkbox\` u otros controles para estructura uniforme.
        `,
      },
    },
  },
  argTypes: {
    label: { control: 'text', description: 'Etiqueta del campo' },
    fieldId: { control: 'text', description: 'ID para accesibilidad' },
    hint: { control: 'text', description: 'Texto de ayuda' },
    error: { control: 'text', description: 'Mensaje de error' },
    required: { control: 'boolean', description: 'Campo requerido' },
  },
};

export default meta;
type Story = StoryObj<MfFormFieldComponent>;

export const WithInput: Story = {
  name: 'Con input',
  render: (args) => ({
    props: args,
    template: `
      <mf-form-field [label]="label" [hint]="hint" [required]="required">
        <mf-input placeholder="Escribe tu nombre..." [fullWidth]="true" />
      </mf-form-field>
    `,
    moduleMetadata: { imports: [MfFormFieldComponent, MfInputComponent] },
  }),
  args: {
    label: 'Nombre completo',
    hint: 'Nombre y apellidos',
    required: true,
  },
};

export const WithError: Story = {
  name: 'Con error',
  render: (args) => ({
    props: args,
    template: `
      <mf-form-field [label]="label" [error]="error" [required]="required">
        <mf-input placeholder="nombre@ejemplo.com" [fullWidth]="true" />
      </mf-form-field>
    `,
    moduleMetadata: { imports: [MfFormFieldComponent, MfInputComponent] },
  }),
  args: {
    label: 'Correo electrónico',
    error: 'Este campo es obligatorio',
    required: true,
  },
};

export const WithCheckbox: Story = {
  name: 'Con checkbox',
  render: () => ({
    template: `
      <mf-form-field label="Preferencias de notificación" hint="Selecciona las que desees">
        <div style="display: flex; flex-direction: column; gap: 8px; padding-top: 4px;">
          <mf-checkbox label="Notificaciones por email" />
          <mf-checkbox label="Notificaciones push" />
          <mf-checkbox label="SMS" />
        </div>
      </mf-form-field>
    `,
    moduleMetadata: { imports: [MfFormFieldComponent, MfCheckboxComponent] },
  }),
};

export const FormExample: Story = {
  name: 'Ejemplo de formulario',
  render: () => ({
    template: `
      <div style="display: flex; flex-direction: column; gap: 20px; max-width: 400px;">
        <mf-form-field label="Nombre" [required]="true">
          <mf-input placeholder="Tu nombre..." [fullWidth]="true" />
        </mf-form-field>
        <mf-form-field label="Email" [required]="true" hint="Usaremos este email para contactarte">
          <mf-input placeholder="nombre@ejemplo.com" type="email" [fullWidth]="true" />
        </mf-form-field>
        <mf-form-field label="Contraseña" [required]="true" hint="Mínimo 8 caracteres">
          <mf-input type="password" [fullWidth]="true" />
        </mf-form-field>
        <mf-form-field>
          <mf-checkbox label="Acepto los términos y condiciones" />
        </mf-form-field>
      </div>
    `,
    moduleMetadata: { imports: [MfFormFieldComponent, MfInputComponent, MfCheckboxComponent] },
  }),
};
