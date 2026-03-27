import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  input,
  output,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { hasAccessibleName, warnInDev } from '../../a11y';

export type MfButtonVariant = 'filled' | 'outlined' | 'text';
export type MfButtonSize = 'sm' | 'md' | 'lg';

/**
 * BotÃ³n de la librerÃ­a ng-comps.
 * Envuelve Angular Material `mat-button` / `mat-flat-button` / `mat-stroked-button`
 * y expone una API uniforme con look and feel de marca.
 */
@Component({
  selector: 'mf-button',
  imports: [MatButtonModule, MatIconModule],
  template: `
    @if (rendersAsIconButton()) {
      <button
        mat-icon-button
        [id]="id() || null"
        [type]="type()"
        [disabled]="disabled()"
        [class]="hostClasses()"
        [attr.aria-label]="iconButtonAriaLabel()"
        [attr.aria-labelledby]="ariaLabelledby() || null"
        [attr.aria-describedby]="ariaDescribedby() || null"
        (click)="mfClick.emit($event)"
      >
        <mat-icon aria-hidden="true">{{ iconName() }}</mat-icon>
      </button>
    } @else if (variant() === 'filled') {
      <button
        mat-flat-button
        [id]="id() || null"
        [type]="type()"
        [disabled]="disabled()"
        [class]="hostClasses()"
        [attr.aria-label]="resolvedAriaLabel()"
        [attr.aria-labelledby]="ariaLabelledby() || null"
        [attr.aria-describedby]="ariaDescribedby() || null"
        (click)="mfClick.emit($event)"
      >
        @if (leadingIcon()) {
          <mat-icon aria-hidden="true">{{ leadingIcon() }}</mat-icon>
        }
        @if (label()) {
          <span>{{ label() }}</span>
        }
        @if (trailingIcon()) {
          <mat-icon aria-hidden="true">{{ trailingIcon() }}</mat-icon>
        }
      </button>
    } @else if (variant() === 'outlined') {
      <button
        mat-stroked-button
        [id]="id() || null"
        [type]="type()"
        [disabled]="disabled()"
        [class]="hostClasses()"
        [attr.aria-label]="resolvedAriaLabel()"
        [attr.aria-labelledby]="ariaLabelledby() || null"
        [attr.aria-describedby]="ariaDescribedby() || null"
        (click)="mfClick.emit($event)"
      >
        @if (leadingIcon()) {
          <mat-icon aria-hidden="true">{{ leadingIcon() }}</mat-icon>
        }
        @if (label()) {
          <span>{{ label() }}</span>
        }
        @if (trailingIcon()) {
          <mat-icon aria-hidden="true">{{ trailingIcon() }}</mat-icon>
        }
      </button>
    } @else {
      <button
        mat-button
        [id]="id() || null"
        [type]="type()"
        [disabled]="disabled()"
        [class]="hostClasses()"
        [attr.aria-label]="resolvedAriaLabel()"
        [attr.aria-labelledby]="ariaLabelledby() || null"
        [attr.aria-describedby]="ariaDescribedby() || null"
        (click)="mfClick.emit($event)"
      >
        @if (leadingIcon()) {
          <mat-icon aria-hidden="true">{{ leadingIcon() }}</mat-icon>
        }
        @if (label()) {
          <span>{{ label() }}</span>
        }
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
  readonly id = input<string | undefined>(undefined);
  readonly label = input<string | undefined>(undefined);
  readonly ariaLabel = input<string | undefined>(undefined);
  readonly ariaLabelledby = input<string | undefined>(undefined);
  readonly ariaDescribedby = input<string | undefined>(undefined);
  readonly variant = input<MfButtonVariant>('filled');
  readonly size = input<MfButtonSize>('md');
  readonly type = input<'button' | 'submit' | 'reset'>('button');
  readonly disabled = input(false);
  readonly leadingIcon = input<string | undefined>(undefined);
  readonly trailingIcon = input<string | undefined>(undefined);
  readonly fullWidth = input(false);
  readonly iconOnly = input(false);

  readonly mfClick = output<MouseEvent>();

  constructor() {
    effect(() => {
      if (
        !hasAccessibleName(
          this.label(),
          this.ariaLabel(),
          this.ariaLabelledby(),
        )
      ) {
        warnInDev(
          'mf-button requiere texto visible, `ariaLabel` o `ariaLabelledby` para exponer un nombre accesible.',
        );
      }

      if (this.rendersAsIconButton() && !this.iconName()) {
        warnInDev(
          'mf-button en modo `iconOnly` requiere `leadingIcon` o `trailingIcon`.',
        );
      }
    });
  }

  readonly rendersAsIconButton = computed(
    () => this.iconOnly() || (!this.label()?.trim() && Boolean(this.iconName())),
  );
  readonly iconName = computed(
    () => this.leadingIcon() ?? this.trailingIcon() ?? 'help',
  );
  readonly resolvedAriaLabel = computed(() =>
    this.label() ? null : this.ariaLabel() ?? null,
  );
  readonly iconButtonAriaLabel = computed(
    () => this.ariaLabel() ?? this.label() ?? null,
  );

  readonly hostClasses = computed(() => {
    const classes = [
      'mf-btn',
      `mf-btn--${this.variant()}`,
      `mf-btn--${this.size()}`,
    ];

    if (this.fullWidth()) classes.push('mf-btn--full');
    if (this.rendersAsIconButton()) classes.push('mf-btn--icon');

    return classes.join(' ');
  });
}
