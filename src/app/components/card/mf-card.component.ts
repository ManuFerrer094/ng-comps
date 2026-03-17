import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from '@angular/core';
import { MatCardModule } from '@angular/material/card';

export type MfCardVariant = 'elevated' | 'outlined' | 'flat';

/**
 * Card de la librería ng-comps.
 * Envuelve Angular Material `mat-card` y expone una API uniforme
 * con look and feel de marca. Admite contenido proyectado mediante slots.
 */
@Component({
  selector: 'mf-card',
  imports: [MatCardModule],
  template: `
    <mat-card [class]="hostClasses()">
      @if (hasHeader()) {
        <mat-card-header>
          @if (title()) {
            <mat-card-title class="mf-card__title">{{ title() }}</mat-card-title>
          }
          @if (subtitle()) {
            <mat-card-subtitle class="mf-card__subtitle">{{ subtitle() }}</mat-card-subtitle>
          }
        </mat-card-header>
      }
      <mat-card-content>
        <ng-content />
      </mat-card-content>
      <ng-content select="[mfCardFooter]" />
    </mat-card>
  `,
  styleUrl: './mf-card.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MfCardComponent {
  /** Título de la card */
  readonly title = input<string | undefined>(undefined);
  /** Subtítulo de la card */
  readonly subtitle = input<string | undefined>(undefined);
  /** Variante visual */
  readonly variant = input<MfCardVariant>('elevated');
  /** Padding interno */
  readonly padding = input<'none' | 'sm' | 'md' | 'lg'>('md');
  /** Interactiva (hover effect) */
  readonly interactive = input(false);

  readonly hasHeader = computed(() => !!this.title() || !!this.subtitle());

  readonly hostClasses = computed(() => {
    const classes = ['mf-card', `mf-card--${this.variant()}`, `mf-card--pad-${this.padding()}`];
    if (this.interactive()) classes.push('mf-card--interactive');
    return classes.join(' ');
  });
}
