import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from '@angular/core';

export type MfAvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type MfAvatarVariant = 'circle' | 'rounded';

/**
 * Avatar de la librería ng-comps.
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
        [alt]="alt()"
        [class]="hostClasses()"
      />
    } @else {
      <span [class]="hostClasses()" [attr.aria-label]="alt()">
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
  /** Tamaño */
  readonly size = input<MfAvatarSize>('md');
  /** Forma */
  readonly variant = input<MfAvatarVariant>('circle');

  readonly initials = computed(() => {
    const n = this.name();
    if (!n) return '?';
    const parts = n.trim().split(/\s+/);
    if (parts.length === 1) return parts[0].charAt(0).toUpperCase();
    return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
  });

  readonly hostClasses = computed(() => {
    return ['mf-avatar', `mf-avatar--${this.size()}`, `mf-avatar--${this.variant()}`].join(' ');
  });
}
