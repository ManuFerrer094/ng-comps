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
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {
  createUniqueId,
  hasAccessibleName,
  mergeAriaIds,
  warnInDev,
} from '../../a11y';

export type MfTextareaSize = 'sm' | 'md' | 'lg';
export type MfTextareaResize = 'none' | 'vertical' | 'horizontal' | 'both';

/**
 * Textarea de la librerÃ­a ng-comps.
 * Envuelve Angular Material `matInput` con textarea y expone una API uniforme
 * con look and feel de marca.
 */
@Component({
  selector: 'mf-textarea',
  imports: [MatInputModule, MatFormFieldModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => MfTextareaComponent),
      multi: true,
    },
  ],
  template: `
    <mat-form-field [appearance]="'outline'" [class]="hostClasses()">
      @if (label()) {
        <mat-label>{{ label() }}</mat-label>
      }
      <textarea
        matInput
        [id]="controlId()"
        [placeholder]="placeholder()"
        [disabled]="isDisabled()"
        [readonly]="readonly()"
        [required]="required()"
        [rows]="rows()"
        [attr.maxlength]="maxLength() ?? null"
        [value]="internalValue()"
        [errorStateMatcher]="errorStateMatcher"
        [attr.aria-label]="resolvedAriaLabel()"
        [attr.aria-labelledby]="ariaLabelledby() || null"
        [attr.aria-describedby]="describedBy()"
        [attr.aria-invalid]="isInvalid() ? 'true' : null"
        [attr.aria-required]="required() ? 'true' : null"
        (input)="onInput($event)"
        (blur)="onBlur()"
      ></textarea>
      @if (hint()) {
        <mat-hint [attr.id]="hintId()">{{ hint() }}</mat-hint>
      }
      @if (maxLength()) {
        <mat-hint [attr.id]="counterId()" align="end">
          {{ currentLength() }} / {{ maxLength() }}
        </mat-hint>
      }
    </mat-form-field>
    @if (error()) {
      <p class="mf-textarea__error" [attr.id]="errorId()" role="alert">{{ error() }}</p>
    }
  `,
  styleUrl: './mf-textarea.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MfTextareaComponent implements ControlValueAccessor {
  private readonly cdr = inject(ChangeDetectorRef);
  private readonly ngControl = inject(NgControl, { self: true, optional: true });
  private readonly generatedId = createUniqueId('mf-textarea');
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
  /** Etiqueta */
  readonly label = input<string | undefined>(undefined);
  /** Etiqueta accesible alternativa cuando no existe label visible */
  readonly ariaLabel = input<string | undefined>(undefined);
  /** Referencia externa a elementos que etiquetan el control */
  readonly ariaLabelledby = input<string | undefined>(undefined);
  /** Referencia externa a elementos descriptivos adicionales */
  readonly ariaDescribedby = input<string | undefined>(undefined);
  /** Placeholder */
  readonly placeholder = input<string>('');
  /** Valor */
  readonly value = input<string>('');
  /** Filas visibles */
  readonly rows = input(4);
  /** TamaÃ±o */
  readonly size = input<MfTextareaSize>('md');
  /** MÃ¡ximo de caracteres */
  readonly maxLength = input<number | undefined>(undefined);
  /** Deshabilitado */
  readonly disabled = input(false);
  /** Solo lectura */
  readonly readonly = input(false);
  /** Requerido */
  readonly required = input(false);
  /** Texto de ayuda */
  readonly hint = input<string | undefined>(undefined);
  /** Mensaje de error */
  readonly error = input<string | undefined>(undefined);
  /** Resize */
  readonly resize = input<MfTextareaResize>('vertical');

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
          'mf-textarea requiere `label`, `ariaLabel` o `ariaLabelledby` para exponer un nombre accesible.',
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
  readonly counterId = computed(() =>
    this.maxLength() ? `${this.controlId()}-count` : null,
  );
  readonly describedBy = computed(() =>
    mergeAriaIds(
      this.ariaDescribedby(),
      this.hintId(),
      this.errorId(),
      this.counterId(),
    ),
  );
  readonly resolvedAriaLabel = computed(() =>
    this.label() ? null : this.ariaLabel() ?? null,
  );
  readonly isDisabled = computed(
    () => this.disabled() || this.disabledFromForm(),
  );
  readonly currentLength = computed(() => this.internalValue().length);

  readonly hostClasses = computed(() => {
    return [
      'mf-textarea',
      `mf-textarea--${this.size()}`,
      `mf-textarea--resize-${this.resize()}`,
    ].join(' ');
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
    const value = (event.target as HTMLTextAreaElement).value;
    this.internalValue.set(value);
    this.onControlChange(value);
    this.mfInput.emit(value);
  }

  onBlur(): void {
    this.onControlTouched();
    this.mfBlur.emit();
  }
}
