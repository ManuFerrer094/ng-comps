import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from '@angular/core';
import { MatBadgeModule } from '@angular/material/badge';

export type MfBadgeColor = 'brand' | 'accent' | 'error' | 'neutral';
export type MfBadgeSize = 'sm' | 'md' | 'lg';
export type MfBadgePosition = 'above-after' | 'above-before' | 'below-after' | 'below-before';

/**
 * Badge de la librería mf-components.
 * Envuelve Angular Material `matBadge` y expone una API uniforme
 * con look and feel de marca.
 */
@Component({
  selector: 'mf-badge',
  imports: [MatBadgeModule],
  template: `
    <span
      [matBadge]="content()"
      [matBadgeHidden]="hidden()"
      [matBadgeDisabled]="disabled()"
      [matBadgeOverlap]="overlap()"
      [matBadgePosition]="matPosition()"
      [matBadgeSize]="matSize()"
      [class]="hostClasses()"
    >
      <ng-content />
    </span>
  `,
  styleUrl: './mf-badge.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MfBadgeComponent {
  /** Contenido del badge (texto o número) */
  readonly content = input<string | number>('');
  /** Color semántico */
  readonly color = input<MfBadgeColor>('brand');
  /** Tamaño del badge */
  readonly size = input<MfBadgeSize>('md');
  /** Posición del badge */
  readonly position = input<MfBadgePosition>('above-after');
  /** Ocultar el badge */
  readonly hidden = input(false);
  /** Deshabilitado */
  readonly disabled = input(false);
  /** Superponer sobre el contenido */
  readonly overlap = input(true);

  readonly matPosition = computed(() => {
    const pos = this.position();
    const map: Record<MfBadgePosition, 'above after' | 'above before' | 'below after' | 'below before'> = {
      'above-after': 'above after',
      'above-before': 'above before',
      'below-after': 'below after',
      'below-before': 'below before',
    };
    return map[pos];
  });

  readonly matSize = computed((): 'small' | 'medium' | 'large' => {
    const map: Record<MfBadgeSize, 'small' | 'medium' | 'large'> = { sm: 'small', md: 'medium', lg: 'large' };
    return map[this.size()];
  });

  readonly hostClasses = computed(() => {
    return ['mf-badge', `mf-badge--${this.color()}`].join(' ');
  });
}
