import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  computed,
  effect,
  forwardRef,
  inject,
  Injector,
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
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import {
  createUniqueId,
  hasAccessibleName,
  mergeAriaIds,
  warnInDev,
} from '../../a11y';

export interface MfSelectOption {
  value: string | number;
  label: string;
  disabled?: boolean;
}

export type MfSelectSize = 'sm' | 'md' | 'lg';

/**
 * Select de la librerÃ­a ng-comps.
 * Envuelve Angular Material `mat-select` y expone una API uniforme
 * con look and feel de marca.
 *
 * El dropdown se estiliza mediante la clase global `mf-select-panel` que se
 * inserta en el overlay. Puedes aÃ±adir clases adicionales con `panelClass`.
 */
@Component({
  selector: 'mf-select',
  imports: [MatSelectModule, MatFormFieldModule, MatIconModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => MfSelectComponent),
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
      <mat-select
        [id]="controlId()"
        [value]="internalValue()"
        [disabled]="isDisabled()"
        [multiple]="multiple()"
        [placeholder]="placeholder()"
        [required]="required()"
        [errorStateMatcher]="errorStateMatcher"
        [panelClass]="panelClasses()"
        [attr.aria-label]="resolvedAriaLabel()"
        [attr.aria-labelledby]="ariaLabelledby() || null"
        [attr.aria-describedby]="describedBy()"
        [attr.aria-invalid]="isInvalid() ? 'true' : null"
        [attr.aria-required]="required() ? 'true' : null"
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
        <mat-hint [attr.id]="hintId()">{{ hint() }}</mat-hint>
      }
    </mat-form-field>
    @if (error()) {
      <p class="mf-select__error" [attr.id]="errorId()" role="alert">{{ error() }}</p>
    }
  `,
  styleUrl: './mf-select.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MfSelectComponent implements ControlValueAccessor {
  private readonly cdr = inject(ChangeDetectorRef);
  private readonly injector = inject(Injector);
  private get ngControl(): NgControl | null {
    return this.injector.get(NgControl, null, { self: true, optional: true });
  }
  private readonly generatedId = createUniqueId('mf-select');
  private readonly disabledFromForm = signal(false);
  protected readonly internalValue = signal<
    string | number | (string | number)[] | undefined
  >(undefined);
  private onControlChange: (
    value: string | number | (string | number)[] | undefined,
  ) => void = () => undefined;
  private onControlTouched: () => void = () => undefined;
  readonly errorStateMatcher: ErrorStateMatcher = {
    isErrorState: (control) =>
      Boolean(
        this.error() || (control?.invalid && (control.touched || control.dirty)),
      ),
  };

  /** Opciones del select */
  readonly options = input.required<MfSelectOption[]>();
  /** ID del control */
  readonly id = input<string | undefined>(undefined);
  /** Etiqueta flotante */
  readonly label = input<string | undefined>(undefined);
  /** Etiqueta accesible alternativa cuando no existe label visible */
  readonly ariaLabel = input<string | undefined>(undefined);
  /** Referencia externa a elementos que etiquetan el control */
  readonly ariaLabelledby = input<string | undefined>(undefined);
  /** Referencia externa a elementos descriptivos adicionales */
  readonly ariaDescribedby = input<string | undefined>(undefined);
  /** Placeholder */
  readonly placeholder = input<string>('');
  /** Valor actual */
  readonly value = input<string | number | (string | number)[] | undefined>(
    undefined,
  );
  /** SelecciÃ³n mÃºltiple */
  readonly multiple = input(false);
  /** Deshabilitado */
  readonly disabled = input(false);
  /** Requerido */
  readonly required = input(false);
  /** Texto de ayuda */
  readonly hint = input<string | undefined>(undefined);
  /** Mensaje de error */
  readonly error = input<string | undefined>(undefined);
  /** TamaÃ±o del campo */
  readonly size = input<MfSelectSize>('md');
  /** Ancho completo */
  readonly fullWidth = input(false);
  /** Icono al inicio del campo */
  readonly leadingIcon = input<string | undefined>(undefined);
  /** Icono al final del campo */
  readonly trailingIcon = input<string | undefined>(undefined);
  /**
   * Clases extra que se aÃ±aden al panel del dropdown (overlay).
   * La clase `mf-select-panel` siempre estÃ¡ presente para los estilos base.
   */
  readonly panelClass = input<string | string[]>('');

  readonly mfSelectionChange = output<string | number | (string | number)[]>();

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
          'mf-select requiere `label`, `ariaLabel` o `ariaLabelledby` para exponer un nombre accesible.',
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

  writeValue(value: string | number | (string | number)[] | null): void {
    this.internalValue.set(value ?? undefined);
    this.cdr.markForCheck();
  }

  registerOnChange(
    fn: (value: string | number | (string | number)[] | undefined) => void,
  ): void {
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

  onSelectionChange(event: { value: string | number | (string | number)[] }): void {
    this.internalValue.set(event.value);
    this.onControlChange(event.value);
    this.onControlTouched();
    this.mfSelectionChange.emit(event.value);
  }
}
