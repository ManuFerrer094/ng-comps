import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  input,
  output,
  signal,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

export interface MfAutocompleteOption {
  value: string | number;
  label: string;
  disabled?: boolean;
}

export type MfAutocompleteSize = 'sm' | 'md' | 'lg';

/**
 * Autocompletar de la librería ng-comps.
 * Envuelve Angular Material `mat-autocomplete` y expone una API uniforme
 * con look and feel de marca.
 *
 * El panel desplegable se estiliza con la clase global `mf-autocomplete-panel`.
 * Puedes añadir clases adicionales con `panelClass`.
 */
@Component({
  selector: 'mf-autocomplete',
  imports: [
    FormsModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
  ],
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
        [placeholder]="placeholder()"
        [disabled]="disabled()"
        [matAutocomplete]="auto"
        [(ngModel)]="inputValue"
        (ngModelChange)="onInputChange($event)"
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
      <mat-autocomplete
        #auto
        [panelWidth]="panelWidth()"
        [class]="autocompletePanelClasses()"
        (optionSelected)="onOptionSelected($event)"
      >
        @for (option of filteredOptions(); track option.value) {
          <mat-option [value]="option.label" [disabled]="option.disabled ?? false">
            {{ option.label }}
          </mat-option>
        }
      </mat-autocomplete>
    </mat-form-field>
  `,
  styleUrl: './mf-autocomplete.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MfAutocompleteComponent {
  /** Lista completa de opciones */
  readonly options = input.required<MfAutocompleteOption[]>();
  /** Etiqueta flotante del campo */
  readonly label = input<string | undefined>(undefined);
  /** Placeholder del input */
  readonly placeholder = input('');
  /** Valor actual (texto en el campo) */
  readonly value = input('');
  /** Deshabilitado */
  readonly disabled = input(false);
  /** Tamaño del campo */
  readonly size = input<MfAutocompleteSize>('md');
  /** Ancho completo */
  readonly fullWidth = input(false);
  /** Texto de ayuda debajo del campo */
  readonly hint = input<string | undefined>(undefined);
  /** Mensaje de error */
  readonly error = input<string | undefined>(undefined);
  /** Icono al inicio del campo */
  readonly leadingIcon = input<string | undefined>(undefined);
  /** Icono al final del campo */
  readonly trailingIcon = input<string | undefined>(undefined);
  /**
   * Ancho del panel del autocomplete.
   * Por defecto `''`: el panel toma el mismo ancho que el campo.
   * Acepta cualquier valor CSS válido ('300px', '80vw', etc.) para sobreescribirlo.
   */
  readonly panelWidth = input<string | number>('');
  /**
   * Clases extra que se añaden al panel del autocomplete (overlay).
   * La clase `mf-autocomplete-panel` siempre está presente.
   */
  readonly panelClass = input<string | string[]>('');

  /** Emite el texto escrito en el campo */
  readonly mfInput = output<string>();
  /** Emite el valor de la opción seleccionada */
  readonly mfOptionSelected = output<MfAutocompleteOption>();
  readonly mfBlur = output<void>();

  inputValue = '';

  readonly hostClasses = computed(() => {
    const classes = ['mf-autocomplete', `mf-autocomplete--${this.size()}`];
    if (this.fullWidth()) classes.push('mf-autocomplete--full');
    if (this.error()) classes.push('mf-autocomplete--error');
    return classes.join(' ');
  });

  readonly autocompletePanelClasses = computed(() => {
    const base = ['mf-autocomplete-panel'];
    const extra = this.panelClass();
    if (Array.isArray(extra)) {
      base.push(...extra.filter(Boolean));
    } else if (extra) {
      base.push(extra);
    }
    return base.join(' ');
  });

  readonly filteredOptions = computed(() => {
    const query = this.inputValue.toLowerCase().trim();
    if (!query) return this.options();
    return this.options().filter((o) =>
      o.label.toLowerCase().includes(query)
    );
  });

  constructor() {
    effect(() => {
      this.inputValue = this.value();
    });
  }

  onInputChange(value: string): void {
    this.mfInput.emit(value);
  }

  onOptionSelected(event: { option: { value: string } }): void {
    const label = event.option.value;
    const match = this.options().find((o) => o.label === label);
    if (match) {
      this.mfOptionSelected.emit(match);
    }
  }
}
