import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  input,
} from '@angular/core';
import { hasAccessibleName, warnInDev } from '../../a11y';

export type MfAvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type MfAvatarVariant = 'circle' | 'rounded';

/**
 * Avatar de la librerÃ­a ng-comps.
 * Muestra una imagen de perfil, iniciales o un icono.
 * Componente puro sin dependencia de Angular Material.
 */
@Component({
  selector: 'mf-avatar',
  imports: [],
  template: `
    @if (src()) {
      <img
        [src]="src()"
        [alt]="imageAlt()"
        [class]="hostClasses()"
        [attr.aria-hidden]="decorative() ? 'true' : null"
      />
    } @else {
      <span
        [class]="hostClasses()"
        [attr.aria-label]="fallbackAriaLabel()"
        [attr.aria-hidden]="decorative() ? 'true' : null"
      >
        {{ initials() }}
      </span>
    }
  `,
  styleUrl: './mf-avatar.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MfAvatarComponent {
  /** URL de la imagen */
  readonly src = input<string | undefined>(undefined);
  /** Texto alternativo */
  readonly alt = input<string>('');
  /** Nombre completo para generar iniciales */
  readonly name = input<string>('');
  /** Si es decorativo, se oculta a tecnologÃ­as asistivas */
  readonly decorative = input(false);
  /** TamaÃ±o */
  readonly size = input<MfAvatarSize>('md');
  /** Forma */
  readonly variant = input<MfAvatarVariant>('circle');

  constructor() {
    effect(() => {
      if (!this.decorative() && !hasAccessibleName(this.alt(), this.name())) {
        warnInDev(
          'mf-avatar requiere `alt` o `name` cuando no es decorativo para exponer un nombre accesible.',
        );
      }
    });
  }

  readonly initials = computed(() => {
    const n = this.name();
    if (!n) return '?';
    const parts = n.trim().split(/\s+/);
    if (parts.length === 1) return parts[0].charAt(0).toUpperCase();
    return (
      parts[0].charAt(0) + parts[parts.length - 1].charAt(0)
    ).toUpperCase();
  });

  readonly imageAlt = computed(() => {
    if (this.decorative()) {
      return '';
    }

    return this.alt() || this.name();
  });

  readonly fallbackAriaLabel = computed(() => {
    if (this.decorative()) {
      return null;
    }

    return this.alt() || this.name() || null;
  });

  readonly hostClasses = computed(() => {
    return [
      'mf-avatar',
      `mf-avatar--${this.size()}`,
      `mf-avatar--${this.variant()}`,
    ].join(' ');
  });
}
