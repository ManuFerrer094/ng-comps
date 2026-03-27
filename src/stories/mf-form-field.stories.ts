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
**MfFormField** is the form field wrapper from the ng-comps library.
It provides a consistent layout with label, projected content, and optional helper or error messages.

Use it as a wrapper for \`mf-input\`, \`mf-checkbox\`, or other controls when you want a uniform structure.
        `,
      },
    },
  },
  argTypes: {
    label: { control: 'text', description: 'Field label' },
    fieldId: { control: 'text', description: 'Accessibility id' },
    hint: { control: 'text', description: 'Helper text' },
    error: { control: 'text', description: 'Error message' },
    required: { control: 'boolean', description: 'Required field' },
  },
};

export default meta;
type Story = StoryObj<MfFormFieldComponent>;

export const WithInput: Story = {
  name: 'With input',
  render: (args) => ({
    props: args,
    template: `
      <mf-form-field [label]="label" [hint]="hint" [required]="required">
        <mf-input placeholder="Type your name..." [fullWidth]="true" />
      </mf-form-field>
    `,
    moduleMetadata: { imports: [MfFormFieldComponent, MfInputComponent] },
  }),
  args: {
    label: 'Full name',
    hint: 'First and last name',
    required: true,
  },
};

export const WithError: Story = {
  name: 'With error',
  render: (args) => ({
    props: args,
    template: `
      <mf-form-field [label]="label" [error]="error" [required]="required">
        <mf-input placeholder="name@example.com" [fullWidth]="true" />
      </mf-form-field>
    `,
    moduleMetadata: { imports: [MfFormFieldComponent, MfInputComponent] },
  }),
  args: {
    label: 'Email address',
    error: 'This field is required',
    required: true,
  },
};

export const WithCheckbox: Story = {
  name: 'With checkbox',
  render: () => ({
    template: `
      <mf-form-field label="Notification preferences" hint="Choose the ones you want">
        <div style="display: flex; flex-direction: column; gap: 8px; padding-top: 4px;">
          <mf-checkbox label="Email notifications" />
          <mf-checkbox label="Push notifications" />
          <mf-checkbox label="SMS" />
        </div>
      </mf-form-field>
    `,
    moduleMetadata: { imports: [MfFormFieldComponent, MfCheckboxComponent] },
  }),
};

export const FormExample: Story = {
  name: 'Form example',
  render: () => ({
    template: `
      <div style="display: flex; flex-direction: column; gap: 20px; max-width: 400px;">
        <mf-form-field label="Name" [required]="true">
          <mf-input placeholder="Your name..." [fullWidth]="true" />
        </mf-form-field>
        <mf-form-field label="Email" [required]="true" hint="We will use this email to contact you">
          <mf-input placeholder="name@example.com" type="email" [fullWidth]="true" />
        </mf-form-field>
        <mf-form-field label="Password" [required]="true" hint="Minimum 8 characters">
          <mf-input type="password" [fullWidth]="true" />
        </mf-form-field>
        <mf-form-field>
          <mf-checkbox label="I accept the terms and conditions" />
        </mf-form-field>
      </div>
    `,
    moduleMetadata: { imports: [MfFormFieldComponent, MfInputComponent, MfCheckboxComponent] },
  }),
};
