import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  output,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

export type MfButtonVariant = 'filled' | 'outlined' | 'text';
export type MfButtonSize = 'sm' | 'md' | 'lg';

/**
 * Botón de la librería ng-comps.
 * Envuelve Angular Material `mat-button` / `mat-flat-button` / `mat-stroked-button`
 * y expone una API uniforme con look and feel de marca.
 */
@Component({
  selector: 'mf-button',
  imports: [MatButtonModule, MatIconModule],
  template: `
    @if (variant() === 'filled') {
      <button
        mat-flat-button
        [type]="type()"
        [disabled]="disabled()"
        [class]="hostClasses()"
        (click)="mfClick.emit($event)"
      >
        @if (leadingIcon()) {
          <mat-icon aria-hidden="true">{{ leadingIcon() }}</mat-icon>
        }
        <span>{{ label() }}</span>
        @if (trailingIcon()) {
          <mat-icon aria-hidden="true">{{ trailingIcon() }}</mat-icon>
        }
      </button>
    } @else if (variant() === 'outlined') {
      <button
        mat-stroked-button
        [type]="type()"
        [disabled]="disabled()"
        [class]="hostClasses()"
        (click)="mfClick.emit($event)"
      >
        @if (leadingIcon()) {
          <mat-icon aria-hidden="true">{{ leadingIcon() }}</mat-icon>
        }
        <span>{{ label() }}</span>
        @if (trailingIcon()) {
          <mat-icon aria-hidden="true">{{ trailingIcon() }}</mat-icon>
        }
      </button>
    } @else {
      <button
        mat-button
        [type]="type()"
        [disabled]="disabled()"
        [class]="hostClasses()"
        (click)="mfClick.emit($event)"
      >
        @if (leadingIcon()) {
          <mat-icon aria-hidden="true">{{ leadingIcon() }}</mat-icon>
        }
        <span>{{ label() }}</span>
        @if (trailingIcon()) {
          <mat-icon aria-hidden="true">{{ trailingIcon() }}</mat-icon>
        }
      </button>
    }
  `,
  styleUrl: './mf-button.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MfButtonComponent {
  readonly label = input.required<string>();
  readonly variant = input<MfButtonVariant>('filled');
  readonly size = input<MfButtonSize>('md');
  readonly type = input<'button' | 'submit' | 'reset'>('button');
  readonly disabled = input(false);
  readonly leadingIcon = input<string | undefined>(undefined);
  readonly trailingIcon = input<string | undefined>(undefined);
  readonly fullWidth = input(false);

  readonly mfClick = output<MouseEvent>();

  readonly hostClasses = computed(() => {
    const classes = ['mf-btn', `mf-btn--${this.variant()}`, `mf-btn--${this.size()}`];
    if (this.fullWidth()) classes.push('mf-btn--full');
    return classes.join(' ');
  });
}
