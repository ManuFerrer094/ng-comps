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
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import {
  createUniqueId,
  hasAccessibleName,
  mergeAriaIds,
  warnInDev,
} from '../../a11y';

/**
 * Slide Toggle de la librerÃ­a ng-comps.
 * Envuelve Angular Material `mat-slide-toggle` y expone una API uniforme
 * con look and feel de marca.
 */
@Component({
  selector: 'mf-slide-toggle',
  imports: [MatSlideToggleModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => MfSlideToggleComponent),
      multi: true,
    },
  ],
  template: `
    <div [class]="hostClasses()">
      <mat-slide-toggle
        [id]="controlId()"
        [checked]="internalValue()"
        [disabled]="isDisabled()"
        [required]="required()"
        [attr.aria-label]="resolvedAriaLabel()"
        [attr.aria-labelledby]="ariaLabelledby() || null"
        [attr.aria-describedby]="describedBy()"
        [attr.aria-invalid]="isInvalid() ? 'true' : null"
        [attr.aria-required]="required() ? 'true' : null"
        (change)="onToggleChange($event)"
        (blur)="onBlur()"
      >
        {{ label() }}
      </mat-slide-toggle>

      @if (hint()) {
        <p class="mf-slide-toggle__hint" [attr.id]="hintId()">{{ hint() }}</p>
      }

      @if (error()) {
        <p class="mf-slide-toggle__error" [attr.id]="errorId()" role="alert">
          {{ error() }}
        </p>
      }
    </div>
  `,
  styleUrl: './mf-slide-toggle.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MfSlideToggleComponent implements ControlValueAccessor {
  private readonly cdr = inject(ChangeDetectorRef);
  private readonly injector = inject(Injector);
  private get ngControl(): NgControl | null {
    return this.injector.get(NgControl, null, { self: true, optional: true });
  }
  private readonly generatedId = createUniqueId('mf-slide-toggle');
  private readonly disabledFromForm = signal(false);
  protected readonly internalValue = signal(false);
  private onControlChange: (value: boolean) => void = () => undefined;
  private onControlTouched: () => void = () => undefined;

  /** ID del control */
  readonly id = input<string | undefined>(undefined);
  /** Texto descriptivo */
  readonly label = input<string>('');
  /** Etiqueta accesible alternativa cuando no existe label visible */
  readonly ariaLabel = input<string | undefined>(undefined);
  /** Referencia externa a elementos que etiquetan el control */
  readonly ariaLabelledby = input<string | undefined>(undefined);
  /** Referencia externa a elementos descriptivos adicionales */
  readonly ariaDescribedby = input<string | undefined>(undefined);
  /** Estado activado */
  readonly checked = input(false);
  /** Deshabilitado */
  readonly disabled = input(false);
  /** Requerido */
  readonly required = input(false);
  /** Texto de ayuda */
  readonly hint = input<string | undefined>(undefined);
  /** Mensaje de error */
  readonly error = input<string | undefined>(undefined);

  readonly mfChange = output<boolean>();

  constructor() {
    effect(() => {
      this.internalValue.set(this.checked());
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
          'mf-slide-toggle requiere texto visible, `ariaLabel` o `ariaLabelledby` para exponer un nombre accesible.',
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
    const classes = ['mf-slide-toggle'];
    if (this.isDisabled()) classes.push('mf-slide-toggle--disabled');
    if (this.error()) classes.push('mf-slide-toggle--error');
    return classes.join(' ');
  });

  writeValue(value: boolean | null): void {
    this.internalValue.set(Boolean(value));
    this.cdr.markForCheck();
  }

  registerOnChange(fn: (value: boolean) => void): void {
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

  onToggleChange(event: { checked: boolean }): void {
    this.internalValue.set(event.checked);
    this.onControlChange(event.checked);
    this.onControlTouched();
    this.mfChange.emit(event.checked);
  }

  onChange(event: { checked: boolean }): void {
    this.onToggleChange(event);
  }

  onBlur(): void {
    this.onControlTouched();
  }
}
