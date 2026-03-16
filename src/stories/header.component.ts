import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';

import { ButtonComponent } from './button.component';
import type { User } from './user';

@Component({
  selector: 'storybook-header',
  imports: [MatToolbarModule, ButtonComponent],
  template: `
    <header class="mf-header">
      <mat-toolbar class="mf-toolbar" role="banner">
        <div class="mf-brand">
          <span class="mf-brand-mark" aria-hidden="true"></span>
          <h1>Acme Components</h1>
        </div>

        <div class="mf-actions">
          @if (user(); as currentUser) {
            <span class="welcome">Bienvenida, <b>{{ currentUser.name }}</b></span>
            <storybook-button size="small" label="Cerrar sesión" (onClick)="onLogout.emit($event)" />
          } @else {
            <storybook-button size="small" label="Iniciar sesión" (onClick)="onLogin.emit($event)" />
            <storybook-button
              size="small"
              [primary]="true"
              label="Crear cuenta"
              (onClick)="onCreateAccount.emit($event)"
            />
          }
        </div>
      </mat-toolbar>
    </header>
  `,
  styleUrl: './header.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  readonly user = input<User | null>(null);
  readonly onLogin = output<MouseEvent>();
  readonly onLogout = output<MouseEvent>();
  readonly onCreateAccount = output<MouseEvent>();
}
