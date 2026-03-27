import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  input,
} from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { hasAccessibleName, warnInDev } from '../../a11y';

export type MfProgressSpinnerMode = 'determinate' | 'indeterminate';
export type MfProgressSpinnerColor = 'brand' | 'accent' | 'warn';

/**
 * Spinner de progreso de la librerÃ­a ng-comps.
 * Envuelve Angular Material `mat-progress-spinner` y expone una API uniforme
 * con look and feel de marca.
 */
@Component({
  selector: 'mf-progress-spinner',
  imports: [MatProgressSpinnerModule],
  template: `
    <div [class]="wrapperClasses()">
      <mat-progress-spinner
        [class]="hostClasses()"
        [mode]="mode()"
        [value]="value()"
        [diameter]="diameter()"
        [strokeWidth]="strokeWidth()"
        [attr.aria-label]="label() || null"
        [attr.aria-valuetext]="valueText() || null"
        [attr.aria-valuenow]="showsNumericValue() ? value() : null"
        aria-valuemin="0"
        aria-valuemax="100"
      />
      @if (label()) {
        <span class="mf-progress-spinner__label">{{ label() }}</span>
      }
    </div>
  `,
  styleUrl: './mf-progress-spinner.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MfProgressSpinnerComponent {
  /** Modo del spinner */
  readonly mode = input<MfProgressSpinnerMode>('indeterminate');
  /** Valor actual (0â€“100, solo en modo determinate) */
  readonly value = input(0);
  /** DiÃ¡metro en px */
  readonly diameter = input(40);
  /** Grosor del trazo en px */
  readonly strokeWidth = input(4);
  /** Color del spinner */
  readonly color = input<MfProgressSpinnerColor>('brand');
  /** Etiqueta accesible y visible */
  readonly label = input<string | undefined>(undefined);
  /** Texto accesible opcional para lectores de pantalla */
  readonly valueText = input<string | undefined>(undefined);

  constructor() {
    effect(() => {
      if (!hasAccessibleName(this.label())) {
        warnInDev(
          'mf-progress-spinner debería incluir `label` para anunciar el estado de carga de forma accesible.',
        );
      }
    });
  }

  readonly showsNumericValue = computed(() => this.mode() === 'determinate');

  readonly hostClasses = computed(() => {
    return `mf-progress-spinner mf-progress-spinner--${this.color()}`;
  });

  readonly wrapperClasses = computed(() => {
    const classes = ['mf-progress-spinner__wrapper'];
    if (this.label()) classes.push('mf-progress-spinner__wrapper--labeled');
    return classes.join(' ');
  });
}
