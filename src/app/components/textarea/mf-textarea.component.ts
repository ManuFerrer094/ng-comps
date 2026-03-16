import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  output,
} from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

export type MfTextareaSize = 'sm' | 'md' | 'lg';
export type MfTextareaResize = 'none' | 'vertical' | 'horizontal' | 'both';

/**
 * Textarea de la librería mf-components.
 * Envuelve Angular Material `matInput` con textarea y expone una API uniforme
 * con look and feel de marca.
 */
@Component({
  selector: 'mf-textarea',
  imports: [MatInputModule, MatFormFieldModule],
  template: `
    <mat-form-field [appearance]="'outline'" [class]="hostClasses()">
      @if (label()) {
        <mat-label>{{ label() }}</mat-label>
      }
      <textarea
        matInput
        [placeholder]="placeholder()"
        [disabled]="disabled()"
        [readonly]="readonly()"
        [rows]="rows()"
        [attr.maxlength]="maxLength() ?? null"
        [value]="value()"
        (input)="onInput($event)"
        (blur)="mfBlur.emit()"
      ></textarea>
      @if (hint()) {
        <mat-hint>{{ hint() }}</mat-hint>
      }
      @if (maxLength()) {
        <mat-hint align="end">{{ currentLength() }} / {{ maxLength() }}</mat-hint>
      }
    </mat-form-field>
  `,
  styleUrl: './mf-textarea.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MfTextareaComponent {
  /** Etiqueta */
  readonly label = input<string | undefined>(undefined);
  /** Placeholder */
  readonly placeholder = input<string>('');
  /** Valor */
  readonly value = input<string>('');
  /** Filas visibles */
  readonly rows = input(4);
  /** Tamaño */
  readonly size = input<MfTextareaSize>('md');
  /** Máximo de caracteres */
  readonly maxLength = input<number | undefined>(undefined);
  /** Deshabilitado */
  readonly disabled = input(false);
  /** Solo lectura */
  readonly readonly = input(false);
  /** Texto de ayuda */
  readonly hint = input<string | undefined>(undefined);
  /** Resize */
  readonly resize = input<MfTextareaResize>('vertical');

  readonly mfInput = output<string>();
  readonly mfBlur = output<void>();

  readonly currentLength = computed(() => this.value().length);

  readonly hostClasses = computed(() => {
    return ['mf-textarea', `mf-textarea--${this.size()}`, `mf-textarea--resize-${this.resize()}`].join(' ');
  });

  onInput(event: Event): void {
    const value = (event.target as HTMLTextAreaElement).value;
    this.mfInput.emit(value);
  }
}
