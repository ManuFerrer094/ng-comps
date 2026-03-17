import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  output,
} from '@angular/core';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';

export interface MfSelectOption {
  value: string | number;
  label: string;
  disabled?: boolean;
}

export type MfSelectSize = 'sm' | 'md' | 'lg';

/**
 * Select de la librería ng-comps.
 * Envuelve Angular Material `mat-select` y expone una API uniforme
 * con look and feel de marca.
 *
 * El dropdown se estiliza mediante la clase global `mf-select-panel` que se
 * inserta en el overlay. Puedes añadir clases adicionales con `panelClass`.
 */
@Component({
  selector: 'mf-select',
  imports: [MatSelectModule, MatFormFieldModule, MatIconModule],
  template: `
    <mat-form-field [appearance]="'outline'" [class]="hostClasses()">
      @if (label()) {
        <mat-label>{{ label() }}</mat-label>
      }
      @if (leadingIcon()) {
        <mat-icon matPrefix aria-hidden="true">{{ leadingIcon() }}</mat-icon>
      }
      <mat-select
        [value]="value()"
        [disabled]="disabled()"
        [multiple]="multiple()"
        [placeholder]="placeholder()"
        [panelClass]="panelClasses()"
        (selectionChange)="onSelectionChange($event)"
      >
        @for (option of options(); track option.value) {
          <mat-option [value]="option.value" [disabled]="option.disabled ?? false">
            {{ option.label }}
          </mat-option>
        }
      </mat-select>
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
  styleUrl: './mf-select.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MfSelectComponent {
  /** Opciones del select */
  readonly options = input.required<MfSelectOption[]>();
  /** Etiqueta flotante */
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
  /** Mensaje de error */
  readonly error = input<string | undefined>(undefined);
  /** Tamaño del campo */
  readonly size = input<MfSelectSize>('md');
  /** Ancho completo */
  readonly fullWidth = input(false);
  /** Icono al inicio del campo */
  readonly leadingIcon = input<string | undefined>(undefined);
  /** Icono al final del campo */
  readonly trailingIcon = input<string | undefined>(undefined);
  /**
   * Clases extra que se añaden al panel del dropdown (overlay).
   * La clase `mf-select-panel` siempre está presente para los estilos base.
   */
  readonly panelClass = input<string | string[]>('');

  readonly mfSelectionChange = output<string | number | (string | number)[]>();

  readonly hostClasses = computed(() => {
    const classes = ['mf-select', `mf-select--${this.size()}`];
    if (this.fullWidth()) classes.push('mf-select--full');
    if (this.error()) classes.push('mf-select--error');
    return classes.join(' ');
  });

  readonly panelClasses = computed(() => {
    const base = ['mf-select-panel'];
    const extra = this.panelClass();
    if (Array.isArray(extra)) {
      base.push(...extra.filter(Boolean));
    } else if (extra) {
      base.push(extra);
    }
    return base;
  });

  onSelectionChange(event: { value: string | number | (string | number)[] }): void {
    this.mfSelectionChange.emit(event.value);
  }
}
