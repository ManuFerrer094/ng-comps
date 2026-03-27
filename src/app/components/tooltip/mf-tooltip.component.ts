import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from '@angular/core';
import { MfTooltipDirective, MfTooltipPosition } from './mf-tooltip.directive';

/**
 * Tooltip de la librería ng-comps.
 * Envuelve Angular Material `matTooltip` y expone una API uniforme
 * con look and feel de marca.
 */
@Component({
  selector: 'mf-tooltip',
  imports: [MfTooltipDirective],
  template: `
    <span
      [mfTooltip]="text()"
      [mfTooltipPosition]="position()"
      [mfTooltipDisabled]="disabled()"
      [mfTooltipShowDelay]="showDelay()"
      [mfTooltipHideDelay]="hideDelay()"
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
