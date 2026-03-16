import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from '@angular/core';
import { MatTooltipModule } from '@angular/material/tooltip';

export type MfTooltipPosition = 'above' | 'below' | 'left' | 'right';

/**
 * Tooltip de la librería mf-components.
 * Envuelve Angular Material `matTooltip` y expone una API uniforme
 * con look and feel de marca.
 */
@Component({
  selector: 'mf-tooltip',
  imports: [MatTooltipModule],
  template: `
    <span
      [matTooltip]="text()"
      [matTooltipPosition]="position()"
      [matTooltipDisabled]="disabled()"
      [matTooltipShowDelay]="showDelay()"
      [matTooltipHideDelay]="hideDelay()"
      [class]="hostClasses()"
    >
      <ng-content />
    </span>
  `,
  styleUrl: './mf-tooltip.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MfTooltipComponent {
  /** Texto del tooltip */
  readonly text = input.required<string>();
  /** Posición del tooltip */
  readonly position = input<MfTooltipPosition>('above');
  /** Deshabilitado */
  readonly disabled = input(false);
  /** Delay para mostrar (ms) */
  readonly showDelay = input(200);
  /** Delay para ocultar (ms) */
  readonly hideDelay = input(0);

  readonly hostClasses = computed(() => {
    return ['mf-tooltip', `mf-tooltip--${this.position()}`].join(' ');
  });
}
