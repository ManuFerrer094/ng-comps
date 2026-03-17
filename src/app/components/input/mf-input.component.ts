import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  output,
} from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';

export type MfInputSize = 'sm' | 'md' | 'lg';

/**
 * Campo de texto de la librería ng-comps.
 * Envuelve Angular Material `mat-form-field` + `matInput`
 * y expone una API uniforme con look and feel de marca.
 */
@Component({
  selector: 'mf-input',
  imports: [MatFormFieldModule, MatInputModule, MatIconModule],
  template: `
    <mat-form-field [appearance]="'outline'" [class]="hostClasses()">
      @if (label()) {
        <mat-label>{{ label() }}</mat-label>
      }
      @if (leadingIcon()) {
        <mat-icon matPrefix aria-hidden="true">{{ leadingIcon() }}</mat-icon>
      }
      <input
        matInput
        [type]="type()"
        [placeholder]="placeholder()"
        [disabled]="disabled()"
        [readonly]="readonly()"
        [value]="value()"
        (input)="onInput($event)"
        (blur)="mfBlur.emit()"
      />
      @if (trailingIcon()) {
        <mat-icon matSuffix aria-hidden="true">{{ trailingIcon() }}</mat-icon>
      }
      @if (hint()) {
        <mat-hint>{{ hint() }}</mat-hint>
      }
      @if (error()) {
        <mat-error>{{ error() }}</mat-error>
      }
    </mat-form-field>
  `,
  styleUrl: './mf-input.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MfInputComponent {
  /** Etiqueta flotante del campo */
  readonly label = input<string | undefined>(undefined);
  /** Placeholder del input */
  readonly placeholder = input('');
  /** Tipo de input HTML */
  readonly type = input<
    'text' | 'email' | 'password' | 'number' | 'search' | 'tel' | 'url'
  >('text');
  /** Tamaño del campo */
  readonly size = input<MfInputSize>('md');
  /** Valor actual del campo */
  readonly value = input('');
  /** Deshabilitado */
  readonly disabled = input(false);
  /** Solo lectura */
  readonly readonly = input(false);
  /** Texto de ayuda debajo del campo */
  readonly hint = input<string | undefined>(undefined);
  /** Mensaje de error */
  readonly error = input<string | undefined>(undefined);
  /** Icono al inicio */
  readonly leadingIcon = input<string | undefined>(undefined);
  /** Icono al final */
  readonly trailingIcon = input<string | undefined>(undefined);
  /** Ancho completo */
  readonly fullWidth = input(false);

  readonly mfInput = output<string>();
  readonly mfBlur = output<void>();

  readonly hostClasses = computed(() => {
    const classes = ['mf-input', `mf-input--${this.size()}`];
    if (this.fullWidth()) classes.push('mf-input--full');
    if (this.error()) classes.push('mf-input--error');
    return classes.join(' ');
  });

  onInput(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.mfInput.emit(target.value);
  }
}
