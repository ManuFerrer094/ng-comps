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
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import {
  createUniqueId,
  hasAccessibleName,
  mergeAriaIds,
  warnInDev,
} from '../../a11y';

export type MfDatepickerSize = 'sm' | 'md' | 'lg';

/**
 * Selector de fecha de la librerÃ­a ng-comps.
 * Envuelve Angular Material `mat-datepicker` y expone una API uniforme
 * con look and feel de marca.
 */
@Component({
  selector: 'mf-datepicker',
  imports: [
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    MatNativeDateModule,
    MatIconModule,
  ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => MfDatepickerComponent),
      multi: true,
    },
  ],
  template: `
    <mat-form-field [appearance]="'outline'" [class]="hostClasses()">
      @if (label()) {
        <mat-label>{{ label() }}</mat-label>
      }
      <input
        matInput
        [id]="controlId()"
        [matDatepicker]="picker"
        [placeholder]="placeholder()"
        [disabled]="isDisabled()"
        [required]="required()"
        [min]="min()"
        [max]="max()"
        [value]="internalValue()"
        [errorStateMatcher]="errorStateMatcher"
        [attr.aria-label]="resolvedAriaLabel()"
        [attr.aria-labelledby]="ariaLabelledby() || null"
        [attr.aria-describedby]="describedBy()"
        [attr.aria-invalid]="isInvalid() ? 'true' : null"
        [attr.aria-required]="required() ? 'true' : null"
        (dateChange)="onDateChange($event)"
        (blur)="onBlur()"
      />
      <mat-datepicker-toggle
        matIconSuffix
        [for]="picker"
        [disabled]="isDisabled()"
        [attr.aria-label]="toggleAriaLabel()"
      >
        <mat-icon matDatepickerToggleIcon aria-hidden="true">
          calendar_month
        </mat-icon>
      </mat-datepicker-toggle>
      <mat-datepicker #picker />
      @if (hint()) {
        <mat-hint [attr.id]="hintId()">{{ hint() }}</mat-hint>
      }
    </mat-form-field>
    @if (error()) {
      <p class="mf-datepicker__error" [attr.id]="errorId()" role="alert">
        {{ error() }}
      </p>
    }
  `,
  styleUrl: './mf-datepicker.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MfDatepickerComponent implements ControlValueAccessor {
  private readonly cdr = inject(ChangeDetectorRef);
  private readonly injector = inject(Injector);
  private get ngControl(): NgControl | null {
    return this.injector.get(NgControl, null, { self: true, optional: true });
  }
  private readonly generatedId = createUniqueId('mf-datepicker');
  private readonly disabledFromForm = signal(false);
  protected readonly internalValue = signal<Date | null>(null);
  private onControlChange: (value: Date | null) => void = () => undefined;
  private onControlTouched: () => void = () => undefined;
  readonly errorStateMatcher: ErrorStateMatcher = {
    isErrorState: (control) =>
      Boolean(
        this.error() || (control?.invalid && (control.touched || control.dirty)),
      ),
  };

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
  readonly placeholder = input('DD/MM/YYYY');
  /** TamaÃ±o del campo */
  readonly size = input<MfDatepickerSize>('md');
  /** Deshabilitado */
  readonly disabled = input(false);
  /** Requerido */
  readonly required = input(false);
  /** Valor inicial del datepicker */
  readonly value = input<Date | null>(null);
  /** Texto de ayuda debajo del campo */
  readonly hint = input<string | undefined>(undefined);
  /** Mensaje de error */
  readonly error = input<string | undefined>(undefined);
  /** Fecha mÃ­nima seleccionable */
  readonly min = input<Date | null>(null);
  /** Fecha mÃ¡xima seleccionable */
  readonly max = input<Date | null>(null);
  /** Ancho completo */
  readonly fullWidth = input(false);
  /** Etiqueta accesible del botÃ³n para abrir el calendario */
  readonly toggleAriaLabel = input('Open calendar');

  readonly mfChange = output<Date | null>();
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
          'mf-datepicker requiere `label`, `ariaLabel` o `ariaLabelledby` para exponer un nombre accesible.',
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
    const classes = ['mf-datepicker', `mf-datepicker--${this.size()}`];
    if (this.fullWidth()) classes.push('mf-datepicker--full');
    if (this.error()) classes.push('mf-datepicker--error');
    return classes.join(' ');
  });

  writeValue(value: Date | null): void {
    this.internalValue.set(value);
    this.cdr.markForCheck();
  }

  registerOnChange(fn: (value: Date | null) => void): void {
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

  onDateChange(event: { value: Date | null }): void {
    this.internalValue.set(event.value);
    this.onControlChange(event.value);
    this.onControlTouched();
    this.mfChange.emit(event.value);
  }

  onBlur(): void {
    this.onControlTouched();
    this.mfBlur.emit();
  }
}
