import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';

export type MfDividerVariant = 'full' | 'inset' | 'middle';

/**
 * Divider de la librería mf-components.
 * Envuelve Angular Material `mat-divider` y expone una API uniforme
 * con look and feel de marca.
 */
@Component({
  selector: 'mf-divider',
  imports: [MatDividerModule],
  template: `
    <mat-divider
      [vertical]="vertical()"
      [inset]="insetValue()"
      [class]="hostClasses()"
    />
  `,
  styleUrl: './mf-divider.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MfDividerComponent {
  /** Orientación vertical */
  readonly vertical = input(false);
  /** Variante visual */
  readonly variant = input<MfDividerVariant>('full');
  /** Espaciado extra arriba y abajo */
  readonly spacing = input<'none' | 'sm' | 'md' | 'lg'>('none');

  readonly insetValue = computed(() => this.variant() === 'inset');

  readonly hostClasses = computed(() => {
    const classes = ['mf-divider', `mf-divider--${this.variant()}`, `mf-divider--spacing-${this.spacing()}`];
    if (this.vertical()) classes.push('mf-divider--vertical');
    return classes.join(' ');
  });
}
