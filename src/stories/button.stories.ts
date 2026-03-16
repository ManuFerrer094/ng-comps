import type { Meta, StoryObj } from '@storybook/angular';

import { ButtonComponent } from './button.component';

const meta: Meta<ButtonComponent> = {
  title: 'Components/Button',
  component: ButtonComponent,
  tags: ['autodocs'],
  argTypes: {
    backgroundColor: {
      control: 'color',
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
    },
    onClick: {
      action: 'clicked',
    },
  },
};

export default meta;
type Story = StoryObj<ButtonComponent>;

export const Primary: Story = {
  args: {
    primary: true,
    label: 'Guardar cambios',
  },
};

export const Secondary: Story = {
  args: {
    label: 'Cancelar',
  },
};

export const Large: Story = {
  args: {
    size: 'large',
    label: 'Crear componente',
    primary: true,
  },
};

export const Small: Story = {
  args: {
    size: 'small',
    label: 'Ver más',
  },
};
