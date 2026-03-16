import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  output,
} from '@angular/core';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';

export type MfChipVariant = 'filled' | 'outlined';
export type MfChipColor = 'brand' | 'accent' | 'error' | 'neutral';

/**
 * Chip de la librería mf-components.
 * Envuelve Angular Material `mat-chip` y expone una API uniforme
 * con look and feel de marca. Ideal para tags, filtros y etiquetas.
 */
@Component({
  selector: 'mf-chip',
  imports: [MatChipsModule, MatIconModule],
  template: `
    @if (removable()) {
      <mat-chip
        [highlighted]="selected()"
        [disabled]="disabled()"
        [class]="hostClasses()"
        (removed)="mfRemoved.emit()"
      >
        @if (leadingIcon()) {
          <mat-icon matChipAvatar aria-hidden="true">{{ leadingIcon() }}</mat-icon>
        }
        {{ label() }}
        <button matChipRemove [attr.aria-label]="'Eliminar ' + label()">
          <mat-icon>cancel</mat-icon>
        </button>
      </mat-chip>
    } @else {
      <mat-chip
        [highlighted]="selected()"
        [disabled]="disabled()"
        [class]="hostClasses()"
      >
        @if (leadingIcon()) {
          <mat-icon matChipAvatar aria-hidden="true">{{ leadingIcon() }}</mat-icon>
        }
        {{ label() }}
      </mat-chip>
    }
  `,
  styleUrl: './mf-chip.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MfChipComponent {
  /** Texto del chip */
  readonly label = input.required<string>();
  /** Variante visual */
  readonly variant = input<MfChipVariant>('filled');
  /** Color semántico */
  readonly color = input<MfChipColor>('brand');
  /** Seleccionado */
  readonly selected = input(false);
  /** Puede ser removido */
  readonly removable = input(false);
  /** Deshabilitado */
  readonly disabled = input(false);
  /** Icono inicial */
  readonly leadingIcon = input<string | undefined>(undefined);

  readonly mfRemoved = output<void>();

  readonly hostClasses = computed(() => {
    const classes = ['mf-chip', `mf-chip--${this.variant()}`, `mf-chip--${this.color()}`];
    if (this.selected()) classes.push('mf-chip--selected');
    return classes.join(' ');
  });
}
