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
import { ControlValueAccessor, NG_VALUE_ACCESSOR, NgControl } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import {
  createUniqueId,
  hasAccessibleName,
  mergeAriaIds,
  warnInDev,
} from '../../a11y';

export type MfInputSize = 'sm' | 'md' | 'lg';

/**
 * Campo de texto de la librería ng-comps.
 * Envuelve Angular Material `mat-form-field` + `matInput`
 * y expone una API uniforme con look and feel de marca.
 */
@Component({
  selector: 'mf-input',
  imports: [MatFormFieldModule, MatInputModule, MatIconModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => MfInputComponent),
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
        [type]="type()"
        [placeholder]="placeholder()"
        [disabled]="isDisabled()"
        [readonly]="readonly()"
        [required]="required()"
        [value]="internalValue()"
        [errorStateMatcher]="errorStateMatcher"
        [attr.aria-label]="resolvedAriaLabel()"
        [attr.aria-labelledby]="ariaLabelledby() || null"
        [attr.aria-describedby]="describedBy()"
        [attr.aria-invalid]="isInvalid() ? 'true' : null"
        [attr.aria-required]="required() ? 'true' : null"
        (input)="onInput($event)"
        (blur)="onBlur()"
      />
      @if (trailingIcon()) {
        <mat-icon matSuffix aria-hidden="true">{{ trailingIcon() }}</mat-icon>
      }
      @if (hint()) {
        <mat-hint [attr.id]="hintId()">{{ hint() }}</mat-hint>
      }
    </mat-form-field>
    @if (error()) {
      <p class="mf-input__error" [attr.id]="errorId()" role="alert">{{ error() }}</p>
    }
  `,
  styleUrl: './mf-input.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MfInputComponent implements ControlValueAccessor {
  private readonly cdr = inject(ChangeDetectorRef);
  private readonly ngControl = inject(NgControl, { self: true, optional: true });
  private readonly generatedId = createUniqueId('mf-input');
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
  /** Requerido */
  readonly required = input(false);
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
          'mf-input requiere `label`, `ariaLabel` o `ariaLabelledby` para exponer un nombre accesible.',
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
    const classes = ['mf-input', `mf-input--${this.size()}`];
    if (this.fullWidth()) classes.push('mf-input--full');
    if (this.error()) classes.push('mf-input--error');
    return classes.join(' ');
  });

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

  onInput(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.internalValue.set(target.value);
    this.onControlChange(target.value);
    this.mfInput.emit(target.value);
  }

  onBlur(): void {
    this.onControlTouched();
    this.mfBlur.emit();
  }
}
