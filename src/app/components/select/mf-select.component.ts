import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  output,
} from '@angular/core';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';

export interface MfSelectOption {
  value: string | number;
  label: string;
  disabled?: boolean;
}

export type MfSelectSize = 'sm' | 'md' | 'lg';

/**
 * Select de la librería mf-components.
 * Envuelve Angular Material `mat-select` y expone una API uniforme
 * con look and feel de marca.
 */
@Component({
  selector: 'mf-select',
  imports: [MatSelectModule, MatFormFieldModule],
  template: `
    <mat-form-field [appearance]="'outline'" [class]="hostClasses()">
      @if (label()) {
        <mat-label>{{ label() }}</mat-label>
      }
      <mat-select
        [value]="value()"
        [disabled]="disabled()"
        [multiple]="multiple()"
        [placeholder]="placeholder()"
        (selectionChange)="onSelectionChange($event)"
      >
        @for (option of options(); track option.value) {
          <mat-option [value]="option.value" [disabled]="option.disabled ?? false">
            {{ option.label }}
          </mat-option>
        }
      </mat-select>
      @if (hint()) {
        <mat-hint>{{ hint() }}</mat-hint>
      }
    </mat-form-field>
  `,
  styleUrl: './mf-select.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MfSelectComponent {
  /** Opciones del select */
  readonly options = input.required<MfSelectOption[]>();
  /** Etiqueta */
  readonly label = input<string | undefined>(undefined);
  /** Placeholder */
  readonly placeholder = input<string>('');
  /** Valor actual */
  readonly value = input<string | number | (string | number)[] | undefined>(undefined);
  /** Selección múltiple */
  readonly multiple = input(false);
  /** Deshabilitado */
  readonly disabled = input(false);
  /** Texto de ayuda */
  readonly hint = input<string | undefined>(undefined);
  /** Tamaño */
  readonly size = input<MfSelectSize>('md');

  readonly mfSelectionChange = output<string | number | (string | number)[]>();

  readonly hostClasses = computed(() => {
    return ['mf-select', `mf-select--${this.size()}`].join(' ');
  });

  onSelectionChange(event: { value: string | number | (string | number)[] }): void {
    this.mfSelectionChange.emit(event.value);
  }
}
