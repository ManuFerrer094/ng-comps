import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

export type MfIconSize = 'sm' | 'md' | 'lg' | 'xl';
export type MfIconColor = 'default' | 'brand' | 'muted' | 'error' | 'inherit';

/**
 * Icono de la librería mf-components.
 * Envuelve Angular Material `mat-icon` y expone una API uniforme
 * con tamaños y colores de marca.
 */
@Component({
  selector: 'mf-icon',
  imports: [MatIconModule],
  template: `
    <mat-icon [class]="hostClasses()" [attr.aria-hidden]="ariaHidden()" [attr.aria-label]="label()">{{ name() }}</mat-icon>
  `,
  styleUrl: './mf-icon.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MfIconComponent {
  /** Nombre del icono de Material Symbols / Material Icons */
  readonly name = input.required<string>();
  /** Tamaño visual del icono */
  readonly size = input<MfIconSize>('md');
  /** Color semántico del icono */
  readonly color = input<MfIconColor>('default');
  /** Etiqueta accesible. Si se omite, el icono será decorativo (aria-hidden) */
  readonly label = input<string | undefined>(undefined);

  readonly ariaHidden = computed(() => (this.label() ? 'false' : 'true'));

  readonly hostClasses = computed(() => {
    return ['mf-icon', `mf-icon--${this.size()}`, `mf-icon--${this.color()}`].join(' ');
  });
}
