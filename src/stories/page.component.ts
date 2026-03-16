import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { MatCardModule } from '@angular/material/card';

import { HeaderComponent } from './header.component';
import type { User } from './user';

@Component({
  selector: 'storybook-page',
  imports: [HeaderComponent, MatCardModule],
  template: `
    <article class="mf-shell">
      <storybook-header
        [user]="user()"
        (onLogout)="doLogout()"
        (onLogin)="doLogin()"
        (onCreateAccount)="doCreateAccount()"
      />

      <section class="mf-page" aria-label="Vista principal de componentes">
        <mat-card class="mf-hero">
          <mat-card-title>Design system sobre Angular Material</mat-card-title>
          <mat-card-content>
            <p>
              Esta página muestra cómo usar Angular Material como base y aplicar nuestro propio
              lenguaje visual para construir componentes consistentes.
            </p>
          </mat-card-content>
        </mat-card>

        <div class="mf-grid">
          @for (feature of features; track feature.title) {
            <mat-card class="mf-feature">
              <mat-card-title>{{ feature.title }}</mat-card-title>
              <mat-card-content>
                <p>{{ feature.description }}</p>
              </mat-card-content>
            </mat-card>
          }
        </div>
      </section>
    </article>
  `,
  styleUrl: './page.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PageComponent {
  readonly user = signal<User | null>(null);

  readonly features = [
    {
      title: 'API consistente',
      description:
        'Encapsulamos componentes Material para exponer una API uniforme para todos los equipos.',
    },
    {
      title: 'Look and feel propio',
      description:
        'Sobrescribimos tokens visuales, tipografía y elevaciones para mantener identidad de marca.',
    },
    {
      title: 'Accesibilidad por defecto',
      description:
        'Partimos de componentes accesibles de Material y validamos contraste, foco y navegación.',
    },
  ] as const;

  doLogout() {
    this.user.set(null);
  }

  doLogin() {
    this.user.set({ name: 'Jane Doe' });
  }

  doCreateAccount() {
    this.user.set({ name: 'Jane Doe' });
  }
}
