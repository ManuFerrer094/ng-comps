import type { Meta, StoryObj } from '@storybook/angular';

import { MfSelectComponent } from '../app/components/select';

const SAMPLE_OPTIONS = [
  { value: 'angular', label: 'Angular' },
  { value: 'react', label: 'React' },
  { value: 'vue', label: 'Vue' },
  { value: 'svelte', label: 'Svelte' },
  { value: 'solid', label: 'SolidJS', disabled: true },
];

const meta: Meta<MfSelectComponent> = {
  title: 'Atoms/MfSelect',
  component: MfSelectComponent,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
**MfSelect** es el selector desplegable de la librería mf-components.
Usa Angular Material \`mat-select\` por debajo pero expone una API uniforme con look and feel de marca.

El panel del dropdown se estiliza a través de la clase global \`mf-select-panel\`. Puedes inyectar clases adicionales con la propiedad \`panelClass\` para personalizar el dropdown a nivel de historia o componente.

| Propiedad      | Descripción                                         |
|----------------|-----------------------------------------------------|
| \`options\`      | Array de opciones \`{ value, label, disabled? }\`    |
| \`label\`        | Etiqueta flotante del campo                         |
| \`placeholder\`  | Texto de placeholder                                |
| \`hint\`         | Texto de ayuda debajo del campo                     |
| \`error\`        | Mensaje de error                                    |
| \`multiple\`     | Selección múltiple                                  |
| \`leadingIcon\`  | Icono Material al inicio                            |
| \`trailingIcon\` | Icono Material al final                             |
| \`panelClass\`   | Clases extra para el panel dropdown                 |
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
    multiple: { control: 'boolean', description: 'Selección múltiple' },
    disabled: { control: 'boolean' },
    hint: { control: 'text', description: 'Texto de ayuda' },
    error: { control: 'text', description: 'Mensaje de error' },
    leadingIcon: { control: 'text', description: 'Icono al inicio (nombre Material)' },
    trailingIcon: { control: 'text', description: 'Icono al final (nombre Material)' },
    fullWidth: { control: 'boolean', description: 'Ancho completo' },
    mfSelectionChange: { action: 'mfSelectionChange' },
  },
};

export default meta;
type Story = StoryObj<MfSelectComponent>;

export const Default: Story = {
  args: {
    options: SAMPLE_OPTIONS,
    label: 'Framework',
    placeholder: 'Selecciona un framework',
  },
};

export const WithHint: Story = {
  name: 'Con texto de ayuda',
  args: {
    options: SAMPLE_OPTIONS,
    label: 'Framework',
    hint: 'Elige el framework principal de tu proyecto',
  },
};

export const WithError: Story = {
  name: 'Con error',
  args: {
    options: SAMPLE_OPTIONS,
    label: 'Framework',
    error: 'Este campo es obligatorio',
  },
};

export const Multiple: Story = {
  name: 'Selección múltiple',
  args: {
    options: SAMPLE_OPTIONS,
    label: 'Frameworks',
    multiple: true,
    placeholder: 'Selecciona uno o más',
  },
};

export const WithLeadingIcon: Story = {
  name: 'Con icono al inicio',
  args: {
    options: SAMPLE_OPTIONS,
    label: 'Framework',
    leadingIcon: 'code',
  },
};

export const Disabled: Story = {
  args: {
    options: SAMPLE_OPTIONS,
    label: 'Framework (deshabilitado)',
    value: 'angular',
    disabled: true,
  },
};

export const Small: Story = {
  args: {
    options: SAMPLE_OPTIONS,
    label: 'Pequeño',
    size: 'sm',
  },
};

export const Large: Story = {
  args: {
    options: SAMPLE_OPTIONS,
    label: 'Grande',
    size: 'lg',
  },
};

export const FullWidth: Story = {
  name: 'Ancho completo',
  args: {
    options: SAMPLE_OPTIONS,
    label: 'Framework',
    fullWidth: true,
  },
  parameters: {
    layout: 'padded',
  },
};

export const CustomPanelClass: Story = {
  name: 'Panel con clase personalizada',
  args: {
    options: SAMPLE_OPTIONS,
    label: 'Framework',
    panelClass: 'mi-panel-personalizado',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Mediante `panelClass` puedes añadir clases CSS al panel del dropdown para aplicar estilos propios.',
      },
    },
  },
};

export const AllVariants: Story = {
  name: 'Todas las variantes',
  render: () => ({
    template: `
      <div style="display: flex; flex-direction: column; gap: 16px; max-width: 360px;">
        <mf-select [options]="opts" label="Normal" placeholder="Selecciona..." />
        <mf-select [options]="opts" label="Con ayuda" hint="Elige tu framework favorito" />
        <mf-select [options]="opts" label="Con error" error="Este campo es obligatorio" />
        <mf-select [options]="opts" label="Con icono" leadingIcon="code" />
        <mf-select [options]="opts" label="Deshabilitado" value="angular" [disabled]="true" />
        <mf-select [options]="opts" label="Múltiple" [multiple]="true" />
      </div>
    `,
    props: { opts: SAMPLE_OPTIONS },
    moduleMetadata: { imports: [MfSelectComponent] },
  }),
};
