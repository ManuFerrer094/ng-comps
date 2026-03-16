import type { Meta, StoryObj } from '@storybook/angular';

import { HeaderComponent } from './header.component';

const meta: Meta<HeaderComponent> = {
  title: 'Components/Header',
  component: HeaderComponent,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    onLogin: { action: 'login clicked' },
    onLogout: { action: 'logout clicked' },
    onCreateAccount: { action: 'create account clicked' },
  },
};

export default meta;
type Story = StoryObj<HeaderComponent>;

export const LoggedIn: Story = {
  args: {
    user: {
      name: 'Jane Doe',
    },
  },
};

export const LoggedOut: Story = {};
