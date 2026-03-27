import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  computed,
  effect,
  forwardRef,
  inject,
  input,
  output,
  signal,
} from '@angular/core';
import {
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
  NgControl,
} from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import {
  createUniqueId,
  hasAccessibleName,
  mergeAriaIds,
  warnInDev,
} from '../../a11y';

export interface MfAutocompleteOption {
  value: string | number;
  label: string;
  disabled?: boolean;
}

export type MfAutocompleteSize = 'sm' | 'md' | 'lg';

/**
 * Autocompletar de la librerÃ­a ng-comps.
 * Envuelve Angular Material `mat-autocomplete` y expone una API uniforme
 * con look and feel de marca.
 *
 * El panel desplegable se estiliza con la clase global `mf-autocomplete-panel`.
 * Puedes aÃ±adir clases adicionales con `panelClass`.
 */
@Component({
  selector: 'mf-autocomplete',
  imports: [
    MatAutocompleteModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
  ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => MfAutocompleteComponent),
      multi: true,
    },
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
        [id]="controlId()"
        [placeholder]="placeholder()"
        [disabled]="isDisabled()"
        [required]="required()"
        [matAutocomplete]="auto"
        [value]="internalValue()"
        [errorStateMatcher]="errorStateMatcher"
        [attr.aria-label]="resolvedAriaLabel()"
        [attr.aria-labelledby]="ariaLabelledby() || null"
        [attr.aria-describedby]="describedBy()"
        [attr.aria-invalid]="isInvalid() ? 'true' : null"
        [attr.aria-required]="required() ? 'true' : null"
        (input)="onInputChange($event)"
        (blur)="onBlur()"
      />
      @if (trailingIcon()) {
        <mat-icon matSuffix aria-hidden="true">{{ trailingIcon() }}</mat-icon>
      }
      @if (hint()) {
        <mat-hint [attr.id]="hintId()">{{ hint() }}</mat-hint>
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
    @if (error()) {
      <p class="mf-autocomplete__error" [attr.id]="errorId()" role="alert">
        {{ error() }}
      </p>
    }
  `,
  styleUrl: './mf-autocomplete.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MfAutocompleteComponent implements ControlValueAccessor {
  private readonly cdr = inject(ChangeDetectorRef);
  private readonly ngControl = inject(NgControl, { self: true, optional: true });
  private readonly generatedId = createUniqueId('mf-autocomplete');
  private readonly disabledFromForm = signal(false);
  protected readonly internalValue = signal('');
  private onControlChange: (value: string) => void = () => undefined;
  private onControlTouched: () => void = () => undefined;
  readonly errorStateMatcher: ErrorStateMatcher = {
    isErrorState: (control) =>
      Boolean(
        this.error() || (control?.invalid && (control.touched || control.dirty)),
      ),
  };

  /** Lista completa de opciones */
  readonly options = input.required<MfAutocompleteOption[]>();
  /** ID del control */
  readonly id = input<string | undefined>(undefined);
  /** Etiqueta flotante del campo */
  readonly label = input<string | undefined>(undefined);
  /** Etiqueta accesible alternativa cuando no existe label visible */
  readonly ariaLabel = input<string | undefined>(undefined);
  /** Referencia externa a elementos que etiquetan el control */
  readonly ariaLabelledby = input<string | undefined>(undefined);
  /** Referencia externa a elementos descriptivos adicionales */
  readonly ariaDescribedby = input<string | undefined>(undefined);
  /** Placeholder del input */
  readonly placeholder = input('');
  /** Valor actual (texto en el campo) */
  readonly value = input('');
  /** Deshabilitado */
  readonly disabled = input(false);
  /** Requerido */
  readonly required = input(false);
  /** TamaÃ±o del campo */
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
   * Acepta cualquier valor CSS vÃ¡lido ('300px', '80vw', etc.) para sobreescribirlo.
   */
  readonly panelWidth = input<string | number>('');
  /**
   * Clases extra que se aÃ±aden al panel del autocomplete (overlay).
   * La clase `mf-autocomplete-panel` siempre estÃ¡ presente.
   */
  readonly panelClass = input<string | string[]>('');

  /** Emite el texto escrito en el campo */
  readonly mfInput = output<string>();
  /** Emite el valor de la opciÃ³n seleccionada */
  readonly mfOptionSelected = output<MfAutocompleteOption>();
  readonly mfBlur = output<void>();

  constructor() {
    effect(() => {
      this.internalValue.set(this.value());
    });

    effect(() => {
      if (
        !hasAccessibleName(
          this.label(),
          this.ariaLabel(),
          this.ariaLabelledby(),
        )
      ) {
        warnInDev(
          'mf-autocomplete requiere `label`, `ariaLabel` o `ariaLabelledby` para exponer un nombre accesible.',
        );
      }
    });
  }

  readonly controlId = computed(() => this.id() ?? this.generatedId);
  readonly hintId = computed(() =>
    this.hint() ? `${this.controlId()}-hint` : null,
  );
  readonly errorId = computed(() =>
    this.error() ? `${this.controlId()}-error` : null,
  );
  readonly describedBy = computed(() =>
    mergeAriaIds(this.ariaDescribedby(), this.hintId(), this.errorId()),
  );
  readonly resolvedAriaLabel = computed(() =>
    this.label() ? null : this.ariaLabel() ?? null,
  );
  readonly isDisabled = computed(
    () => this.disabled() || this.disabledFromForm(),
  );

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
    const query = this.internalValue().toLowerCase().trim();
    if (!query) {
      return this.options();
    }

    return this.options().filter((option) =>
      option.label.toLowerCase().includes(query),
    );
  });

  get inputValue(): string {
    return this.internalValue();
  }

  set inputValue(value: string) {
    this.internalValue.set(value);
  }

  writeValue(value: string | null): void {
    this.internalValue.set(value ?? '');
    this.cdr.markForCheck();
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onControlChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onControlTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabledFromForm.set(isDisabled);
    this.cdr.markForCheck();
  }

  isInvalid(): boolean {
    const control = this.ngControl?.control;
    return Boolean(
      this.error() || (control?.invalid && (control.touched || control.dirty)),
    );
  }

  onInputChange(event: Event | string): void {
    const value =
      typeof event === 'string'
        ? event
        : (event.target as HTMLInputElement).value;

    this.internalValue.set(value);
    this.onControlChange(value);
    this.mfInput.emit(value);
  }

  onOptionSelected(event: { option: { value: string } }): void {
    const label = event.option.value;
    const match = this.options().find((option) => option.label === label);

    if (match) {
      this.internalValue.set(match.label);
      this.onControlChange(match.label);
      this.onControlTouched();
      this.mfOptionSelected.emit(match);
    }
  }

  onBlur(): void {
    this.onControlTouched();
    this.mfBlur.emit();
  }
}
