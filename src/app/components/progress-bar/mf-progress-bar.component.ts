import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  input,
} from '@angular/core';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { hasAccessibleName, warnInDev } from '../../a11y';

export type MfProgressBarMode = 'determinate' | 'indeterminate' | 'buffer' | 'query';
export type MfProgressBarColor = 'brand' | 'accent' | 'warn';

/**
 * Barra de progreso de la librerÃ­a ng-comps.
 * Envuelve Angular Material `mat-progress-bar` y expone una API uniforme
 * con look and feel de marca.
 */
@Component({
  selector: 'mf-progress-bar',
  imports: [MatProgressBarModule],
  template: `
    <div class="mf-progress-bar__wrapper">
      @if (label()) {
        <span class="mf-progress-bar__label">{{ label() }}</span>
      }
      <mat-progress-bar
        [class]="hostClasses()"
        [mode]="mode()"
        [value]="value()"
        [bufferValue]="bufferValue()"
        [attr.aria-label]="label() || null"
        [attr.aria-valuetext]="valueText() || null"
        [attr.aria-valuenow]="showsNumericValue() ? value() : null"
        aria-valuemin="0"
        aria-valuemax="100"
      />
      @if (showValue() && mode() === 'determinate') {
        <span class="mf-progress-bar__value" aria-hidden="true">{{ value() }}%</span>
      }
    </div>
  `,
  styleUrl: './mf-progress-bar.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MfProgressBarComponent {
  /** Modo de la barra de progreso */
  readonly mode = input<MfProgressBarMode>('determinate');
  /** Valor actual (0â€“100) */
  readonly value = input(0);
  /** Valor del buffer (0â€“100, solo en modo buffer) */
  readonly bufferValue = input(0);
  /** Color de la barra */
  readonly color = input<MfProgressBarColor>('brand');
  /** Etiqueta accesible */
  readonly label = input<string | undefined>(undefined);
  /** Texto accesible opcional para lectores de pantalla */
  readonly valueText = input<string | undefined>(undefined);
  /** Muestra el porcentaje junto a la barra */
  readonly showValue = input(false);
  /** Altura de la barra en px */
  readonly height = input(4);

  constructor() {
    effect(() => {
      if (!hasAccessibleName(this.label())) {
        warnInDev(
          'mf-progress-bar debería incluir `label` para anunciar el progreso de forma accesible.',
        );
      }
    });
  }

  readonly showsNumericValue = computed(() => this.mode() === 'determinate');

  readonly hostClasses = computed(() => {
    return `mf-progress-bar mf-progress-bar--${this.color()}`;
  });
}
