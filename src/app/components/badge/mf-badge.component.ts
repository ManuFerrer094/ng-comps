import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  input,
} from '@angular/core';
import { MatBadgeModule } from '@angular/material/badge';
import { warnInDev } from '../../a11y';

export type MfBadgeColor = 'brand' | 'accent' | 'error' | 'neutral';
export type MfBadgeSize = 'sm' | 'md' | 'lg';
export type MfBadgePosition =
  | 'above-after'
  | 'above-before'
  | 'below-after'
  | 'below-before';

/**
 * Badge de la librerÃ­a ng-comps.
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
      [matBadgeDescription]="badgeDescription()"
      [attr.aria-hidden]="decorative() ? 'true' : null"
      [class]="hostClasses()"
    >
      <ng-content />
    </span>
  `,
  styleUrl: './mf-badge.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MfBadgeComponent {
  /** Contenido del badge (texto o nÃºmero) */
  readonly content = input<string | number>('');
  /** DescripciÃ³n accesible del badge */
  readonly description = input<string | undefined>(undefined);
  /** Si es decorativo, se oculta a tecnologÃ­as asistivas */
  readonly decorative = input(false);
  /** Color semÃ¡ntico */
  readonly color = input<MfBadgeColor>('brand');
  /** TamaÃ±o del badge */
  readonly size = input<MfBadgeSize>('md');
  /** PosiciÃ³n del badge */
  readonly position = input<MfBadgePosition>('above-after');
  /** Ocultar el badge */
  readonly hidden = input(false);
  /** Deshabilitado */
  readonly disabled = input(false);
  /** Superponer sobre el contenido */
  readonly overlap = input(true);

  constructor() {
    effect(() => {
      if (!this.decorative() && this.content() !== '' && !this.description()) {
        warnInDev(
          'mf-badge debería incluir `description` cuando el badge transmite información relevante.',
        );
      }
    });
  }

  readonly badgeDescription = computed(() =>
    this.decorative() ? '' : this.description() ?? '',
  );

  readonly matPosition = computed(() => {
    const pos = this.position();
    const map: Record<
      MfBadgePosition,
      'above after' | 'above before' | 'below after' | 'below before'
    > = {
      'above-after': 'above after',
      'above-before': 'above before',
      'below-after': 'below after',
      'below-before': 'below before',
    };
    return map[pos];
  });

  readonly matSize = computed((): 'small' | 'medium' | 'large' => {
    const map: Record<MfBadgeSize, 'small' | 'medium' | 'large'> = {
      sm: 'small',
      md: 'medium',
      lg: 'large',
    };
    return map[this.size()];
  });

  readonly hostClasses = computed(() => {
    return ['mf-badge', `mf-badge--${this.color()}`].join(' ');
  });
}
