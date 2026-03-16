import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  output,
} from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

export type MfAlertSeverity = 'info' | 'success' | 'warning' | 'error';

/**
 * Alerta de la librería mf-components.
 * Componente de banner para mensajes de sistema, alertas y notificaciones.
 * Ideal para dashboards y paneles administrativos.
 */
@Component({
  selector: 'mf-alert',
  imports: [MatIconModule],
  template: `
    <div [class]="hostClasses()" role="alert">
      <mat-icon class="mf-alert__icon" aria-hidden="true">{{ iconName() }}</mat-icon>
      <div class="mf-alert__content">
        @if (title()) {
          <strong class="mf-alert__title">{{ title() }}</strong>
        }
        <span class="mf-alert__message">{{ message() }}</span>
      </div>
      @if (dismissible()) {
        <button
          class="mf-alert__close"
          (click)="mfDismiss.emit()"
          [attr.aria-label]="'Cerrar alerta'"
        >
          <mat-icon aria-hidden="true">close</mat-icon>
        </button>
      }
    </div>
  `,
  styleUrl: './mf-alert.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MfAlertComponent {
  /** Mensaje principal */
  readonly message = input.required<string>();
  /** Título opcional */
  readonly title = input<string | undefined>(undefined);
  /** Severidad de la alerta */
  readonly severity = input<MfAlertSeverity>('info');
  /** Se puede cerrar */
  readonly dismissible = input(false);

  readonly mfDismiss = output<void>();

  readonly iconName = computed(() => {
    const map: Record<MfAlertSeverity, string> = {
      info: 'info',
      success: 'check_circle',
      warning: 'warning',
      error: 'error',
    };
    return map[this.severity()];
  });

  readonly hostClasses = computed(() => {
    return ['mf-alert', `mf-alert--${this.severity()}`].join(' ');
  });
}
