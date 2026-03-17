import type { Meta, StoryObj } from '@storybook/angular';

import { MfAutocompleteComponent } from '../app/components/autocomplete';

const COUNTRIES = [
  { value: 'es', label: 'España' },
  { value: 'mx', label: 'México' },
  { value: 'ar', label: 'Argentina' },
  { value: 'co', label: 'Colombia' },
  { value: 'cl', label: 'Chile' },
  { value: 'pe', label: 'Perú' },
  { value: 'us', label: 'Estados Unidos' },
  { value: 'uk', label: 'Reino Unido' },
  { value: 'de', label: 'Alemania' },
  { value: 'fr', label: 'Francia' },
];

const meta: Meta<MfAutocompleteComponent> = {
  title: 'Atoms/MfAutocomplete',
  component: MfAutocompleteComponent,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
**MfAutocomplete** es el campo de autocompletar de la librería ng-comps.
Usa Angular Material \`mat-autocomplete\` por debajo pero expone una API uniforme con look and feel de marca.

El filtrado de opciones se realiza automáticamente por el texto escrito en el campo, buscando en la propiedad \`label\` de las opciones. Puedes proporcionar la lista completa de opciones y el componente se encarga del filtrado.

El panel desplegable se estiliza a través de la clase global \`mf-autocomplete-panel\`. Puedes inyectar clases adicionales con \`panelClass\`.

| Propiedad          | Descripción                                              |
|--------------------|----------------------------------------------------------|
| \`options\`          | Array de opciones \`{ value, label, disabled? }\`         |
| \`label\`            | Etiqueta flotante del campo                              |
| \`placeholder\`      | Texto de placeholder                                     |
| \`hint\`             | Texto de ayuda debajo del campo                          |
| \`error\`            | Mensaje de error                                         |
| \`leadingIcon\`      | Icono Material al inicio                                 |
| \`trailingIcon\`     | Icono Material al final                                  |
| \`panelWidth\`       | Ancho del panel (\`'auto'\` por defecto)                  |
| \`panelClass\`       | Clases extra para el panel dropdown                      |
| \`mfInput\`          | Evento: texto escrito en el campo                        |
| \`mfOptionSelected\` | Evento: opción seleccionada (\`MfAutocompleteOption\`)    |
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
    leadingIcon: { control: 'text', description: 'Icono al inicio (nombre Material)' },
    trailingIcon: { control: 'text', description: 'Icono al final (nombre Material)' },
    fullWidth: { control: 'boolean', description: 'Ancho completo' },
    panelWidth: { control: 'text', description: 'Ancho del panel dropdown' },
    mfInput: { action: 'mfInput' },
    mfOptionSelected: { action: 'mfOptionSelected' },
    mfBlur: { action: 'mfBlur' },
  },
};

export default meta;
type Story = StoryObj<MfAutocompleteComponent>;

export const Default: Story = {
  args: {
    options: COUNTRIES,
    label: 'País',
    placeholder: 'Escribe para buscar...',
  },
};

export const WithHint: Story = {
  name: 'Con texto de ayuda',
  args: {
    options: COUNTRIES,
    label: 'País de origen',
    hint: 'Empieza a escribir para filtrar los resultados',
  },
};

export const WithError: Story = {
  name: 'Con error',
  args: {
    options: COUNTRIES,
    label: 'País',
    error: 'Selecciona un país válido',
  },
};

export const WithLeadingIcon: Story = {
  name: 'Con icono al inicio',
  args: {
    options: COUNTRIES,
    label: 'País',
    placeholder: 'Buscar país...',
    leadingIcon: 'search',
  },
};

export const WithTrailingIcon: Story = {
  name: 'Con icono al final',
  args: {
    options: COUNTRIES,
    label: 'País',
    trailingIcon: 'public',
  },
};

export const Disabled: Story = {
  args: {
    options: COUNTRIES,
    label: 'País (deshabilitado)',
    value: 'España',
    disabled: true,
  },
};

export const Small: Story = {
  args: {
    options: COUNTRIES,
    label: 'Pequeño',
    size: 'sm',
  },
};

export const Large: Story = {
  args: {
    options: COUNTRIES,
    label: 'Grande',
    size: 'lg',
  },
};

export const FullWidth: Story = {
  name: 'Ancho completo',
  args: {
    options: COUNTRIES,
    label: 'País',
    fullWidth: true,
  },
  parameters: {
    layout: 'padded',
  },
};

export const CustomPanelClass: Story = {
  name: 'Panel con clase personalizada',
  args: {
    options: COUNTRIES,
    label: 'País',
    panelClass: 'mi-autocomplete-personalizado',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Mediante `panelClass` puedes añadir clases CSS al panel del autocomplete para aplicar estilos propios.',
      },
    },
  },
};

export const AllVariants: Story = {
  name: 'Todas las variantes',
  render: () => ({
    template: `
      <div style="display: flex; flex-direction: column; gap: 16px; max-width: 360px;">
        <mf-autocomplete [options]="opts" label="Normal" placeholder="Escribe para buscar..." />
        <mf-autocomplete [options]="opts" label="Con ayuda" hint="Filtra por nombre de país" />
        <mf-autocomplete [options]="opts" label="Con error" error="Selecciona un país válido" />
        <mf-autocomplete [options]="opts" label="Con icono" leadingIcon="search" placeholder="Buscar..." />
        <mf-autocomplete [options]="opts" label="Deshabilitado" value="España" [disabled]="true" />
      </div>
    `,
    props: { opts: COUNTRIES },
    moduleMetadata: { imports: [MfAutocompleteComponent] },
  }),
};
