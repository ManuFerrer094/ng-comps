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
**MfSelect** is the dropdown select component from the ng-comps library.
It uses Angular Material \`mat-select\` under the hood while exposing a consistent branded API.

The dropdown panel is styled through the global \`mf-select-panel\` class. You can inject additional classes with the \`panelClass\` property to customize the panel at the story or component level.

| Property        | Description                                     |
|-----------------|-------------------------------------------------|
| \`options\`       | Array of options \`{ value, label, disabled? }\` |
| \`label\`         | Floating field label                            |
| \`placeholder\`   | Placeholder text                                |
| \`hint\`          | Helper text shown below the field               |
| \`error\`         | Error message                                   |
| \`multiple\`      | Multiple selection                              |
| \`leadingIcon\`   | Material icon shown at the start                |
| \`trailingIcon\`  | Material icon shown at the end                  |
| \`panelClass\`    | Extra classes for the dropdown panel            |
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
    multiple: { control: 'boolean', description: 'Multiple selection' },
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
    mfSelectionChange: { action: 'mfSelectionChange' },
  },
};

export default meta;
type Story = StoryObj<MfSelectComponent>;

export const Default: Story = {
  args: {
    options: SAMPLE_OPTIONS,
    label: 'Framework',
    placeholder: 'Select a framework',
  },
};

export const WithHint: Story = {
  name: 'With helper text',
  args: {
    options: SAMPLE_OPTIONS,
    label: 'Framework',
    hint: 'Choose the main framework for your project',
  },
};

export const WithError: Story = {
  name: 'With error',
  args: {
    options: SAMPLE_OPTIONS,
    label: 'Framework',
    error: 'This field is required',
  },
};

export const Multiple: Story = {
  name: 'Multiple selection',
  args: {
    options: SAMPLE_OPTIONS,
    label: 'Frameworks',
    multiple: true,
    placeholder: 'Select one or more',
  },
};

export const WithLeadingIcon: Story = {
  name: 'With leading icon',
  args: {
    options: SAMPLE_OPTIONS,
    label: 'Framework',
    leadingIcon: 'code',
  },
};

export const Disabled: Story = {
  args: {
    options: SAMPLE_OPTIONS,
    label: 'Framework (disabled)',
    value: 'angular',
    disabled: true,
  },
};

export const Small: Story = {
  args: {
    options: SAMPLE_OPTIONS,
    label: 'Small',
    size: 'sm',
  },
};

export const Large: Story = {
  args: {
    options: SAMPLE_OPTIONS,
    label: 'Large',
    size: 'lg',
  },
};

export const FullWidth: Story = {
  name: 'Full width',
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
  name: 'Panel with custom class',
  args: {
    options: SAMPLE_OPTIONS,
    label: 'Framework',
    panelClass: 'my-custom-panel',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Use `panelClass` to add CSS classes to the dropdown panel and apply custom styling.',
      },
    },
  },
};

export const AllVariants: Story = {
  name: 'All variants',
  render: () => ({
    template: `
      <div style="display: flex; flex-direction: column; gap: 16px; max-width: 360px;">
        <mf-select [options]="opts" label="Default" placeholder="Select..." />
        <mf-select [options]="opts" label="With help" hint="Choose your favorite framework" />
        <mf-select [options]="opts" label="With error" error="This field is required" />
        <mf-select [options]="opts" label="With icon" leadingIcon="code" />
        <mf-select [options]="opts" label="Disabled" value="angular" [disabled]="true" />
        <mf-select [options]="opts" label="Multiple" [multiple]="true" />
      </div>
    `,
    props: { opts: SAMPLE_OPTIONS },
    moduleMetadata: { imports: [MfSelectComponent] },
  }),
};
