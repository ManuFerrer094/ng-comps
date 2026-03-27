import type { Meta, StoryObj } from '@storybook/angular';

import { MfAutocompleteComponent } from '../app/components/autocomplete';

const COUNTRIES = [
  { value: 'es', label: 'Spain' },
  { value: 'mx', label: 'Mexico' },
  { value: 'ar', label: 'Argentina' },
  { value: 'co', label: 'Colombia' },
  { value: 'cl', label: 'Chile' },
  { value: 'pe', label: 'Peru' },
  { value: 'us', label: 'United States' },
  { value: 'uk', label: 'United Kingdom' },
  { value: 'de', label: 'Germany' },
  { value: 'fr', label: 'France' },
];

const meta: Meta<MfAutocompleteComponent> = {
  title: 'Atoms/MfAutocomplete',
  component: MfAutocompleteComponent,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
**MfAutocomplete** is the autocomplete field from the ng-comps library.
It uses Angular Material \`mat-autocomplete\` under the hood while exposing a consistent branded API.

Options are filtered automatically based on the text typed into the field, matching against the option \`label\` property. You can pass the full option list and let the component handle filtering.

The dropdown panel is styled through the global \`mf-autocomplete-panel\` class. You can inject additional classes with \`panelClass\`.

| Property           | Description                                     |
|--------------------|-------------------------------------------------|
| \`options\`          | Array of options \`{ value, label, disabled? }\` |
| \`label\`            | Floating field label                            |
| \`placeholder\`      | Placeholder text                                |
| \`hint\`             | Helper text shown below the field               |
| \`error\`            | Error message                                   |
| \`leadingIcon\`      | Material icon shown at the start                |
| \`trailingIcon\`     | Material icon shown at the end                  |
| \`panelWidth\`       | Panel width (\`'auto'\` by default)             |
| \`panelClass\`       | Extra classes for the dropdown panel            |
| \`mfInput\`          | Event emitted with the typed text               |
| \`mfOptionSelected\` | Event emitted with the selected option          |
        `,
      },
    },
  },
  argTypes: {
    label: { control: 'text', description: 'Floating label' },
    placeholder: { control: 'text', description: 'Placeholder' },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Field size',
    },
    disabled: { control: 'boolean' },
    hint: { control: 'text', description: 'Helper text' },
    error: { control: 'text', description: 'Error message' },
    leadingIcon: {
      control: 'text',
      description: 'Leading icon (Material icon name)',
    },
    trailingIcon: {
      control: 'text',
      description: 'Trailing icon (Material icon name)',
    },
    fullWidth: { control: 'boolean', description: 'Full width' },
    panelWidth: { control: 'text', description: 'Dropdown panel width' },
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
    label: 'Country',
    placeholder: 'Type to search...',
  },
};

export const WithHint: Story = {
  name: 'With helper text',
  args: {
    options: COUNTRIES,
    label: 'Country of origin',
    hint: 'Start typing to filter the results',
  },
};

export const WithError: Story = {
  name: 'With error',
  args: {
    options: COUNTRIES,
    label: 'Country',
    error: 'Select a valid country',
  },
};

export const WithLeadingIcon: Story = {
  name: 'With leading icon',
  args: {
    options: COUNTRIES,
    label: 'Country',
    placeholder: 'Search country...',
    leadingIcon: 'search',
  },
};

export const WithTrailingIcon: Story = {
  name: 'With trailing icon',
  args: {
    options: COUNTRIES,
    label: 'Country',
    trailingIcon: 'public',
  },
};

export const Disabled: Story = {
  args: {
    options: COUNTRIES,
    label: 'Country (disabled)',
    value: 'Spain',
    disabled: true,
  },
};

export const Small: Story = {
  args: {
    options: COUNTRIES,
    label: 'Small',
    size: 'sm',
  },
};

export const Large: Story = {
  args: {
    options: COUNTRIES,
    label: 'Large',
    size: 'lg',
  },
};

export const FullWidth: Story = {
  name: 'Full width',
  args: {
    options: COUNTRIES,
    label: 'Country',
    fullWidth: true,
  },
  parameters: {
    layout: 'padded',
  },
};

export const CustomPanelClass: Story = {
  name: 'Panel with custom class',
  args: {
    options: COUNTRIES,
    label: 'Country',
    panelClass: 'my-custom-autocomplete',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Use `panelClass` to add CSS classes to the autocomplete panel and apply custom styling.',
      },
    },
  },
};

export const AllVariants: Story = {
  name: 'All variants',
  render: () => ({
    template: `
      <div style="display: flex; flex-direction: column; gap: 16px; max-width: 360px;">
        <mf-autocomplete [options]="opts" label="Default" placeholder="Type to search..." />
        <mf-autocomplete [options]="opts" label="With help" hint="Filter by country name" />
        <mf-autocomplete [options]="opts" label="With error" error="Select a valid country" />
        <mf-autocomplete [options]="opts" label="With icon" leadingIcon="search" placeholder="Search..." />
        <mf-autocomplete [options]="opts" label="Disabled" value="Spain" [disabled]="true" />
      </div>
    `,
    props: { opts: COUNTRIES },
    moduleMetadata: { imports: [MfAutocompleteComponent] },
  }),
};
