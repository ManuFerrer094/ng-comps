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
import { MatRadioModule } from '@angular/material/radio';
import {
  createUniqueId,
  hasAccessibleName,
  mergeAriaIds,
  warnInDev,
} from '../../a11y';

export interface MfRadioOption {
  /** Valor de la opciÃ³n */
  value: string;
  /** Texto visible */
  label: string;
  /** Deshabilitada individualmente */
  disabled?: boolean;
}

export type MfRadioDirection = 'horizontal' | 'vertical';

/**
 * Grupo de radio buttons de la librerÃ­a ng-comps.
 * Envuelve Angular Material `mat-radio-group` + `mat-radio-button`
 * y expone una API uniforme con look and feel de marca.
 */
@Component({
  selector: 'mf-radio-button',
  imports: [MatRadioModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => MfRadioButtonComponent),
      multi: true,
    },
  ],
  template: `
    <fieldset class="mf-radio__fieldset">
      @if (label()) {
        <legend class="mf-radio__legend" [id]="legendId()">
          {{ label() }}
          @if (required()) {
            <span aria-hidden="true"> *</span>
          }
        </legend>
      }

      <mat-radio-group
        [class]="hostClasses()"
        [disabled]="isDisabled()"
        [name]="groupName()"
        [required]="required()"
        [value]="internalValue()"
        [attr.aria-label]="resolvedAriaLabel()"
        [attr.aria-labelledby]="computedLabelledby()"
        [attr.aria-describedby]="describedBy()"
        [attr.aria-invalid]="isInvalid() ? 'true' : null"
        [attr.aria-required]="required() ? 'true' : null"
        (change)="onChange($event)"
      >
        @for (option of options(); track option.value) {
          <mat-radio-button
            class="mf-radio__option"
            [value]="option.value"
            [disabled]="option.disabled ?? false"
          >
            {{ option.label }}
          </mat-radio-button>
        }
      </mat-radio-group>

      @if (hint()) {
        <p class="mf-radio__hint" [attr.id]="hintId()">{{ hint() }}</p>
      }

      @if (error()) {
        <p class="mf-radio__error" [attr.id]="errorId()" role="alert">
          {{ error() }}
        </p>
      }
    </fieldset>
  `,
  styleUrl: './mf-radio-button.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MfRadioButtonComponent implements ControlValueAccessor {
  private readonly cdr = inject(ChangeDetectorRef);
  private readonly injector = inject(Injector);
  private get ngControl(): NgControl | null {
    return this.injector.get(NgControl, null, { self: true, optional: true });
  }
  private readonly generatedId = createUniqueId('mf-radio');
  private readonly disabledFromForm = signal(false);
  protected readonly internalValue = signal<string | undefined>(undefined);
  private onControlChange: (value: string) => void = () => undefined;
  private onControlTouched: () => void = () => undefined;

  /** Opciones del grupo */
  readonly options = input.required<MfRadioOption[]>();
  /** ID del control */
  readonly id = input<string | undefined>(undefined);
  /** Etiqueta visible del grupo */
  readonly label = input<string | undefined>(undefined);
  /** Valor seleccionado */
  readonly value = input<string | undefined>(undefined);
  /** Deshabilitado */
  readonly disabled = input(false);
  /** Requerido */
  readonly required = input(false);
  /** DirecciÃ³n del grupo */
  readonly direction = input<MfRadioDirection>('vertical');
  /** Nombre accesible alternativo del grupo */
  readonly ariaLabel = input<string | undefined>(undefined);
  /** Etiqueta accesible para el grupo */
  readonly ariaLabelledby = input<string | undefined>(undefined);
  /** Referencia externa a elementos descriptivos adicionales */
  readonly ariaDescribedby = input<string | undefined>(undefined);
  /** Texto de ayuda */
  readonly hint = input<string | undefined>(undefined);
  /** Mensaje de error */
  readonly error = input<string | undefined>(undefined);
  /** Name del grupo */
  readonly name = input<string | undefined>(undefined);

  readonly mfChange = output<string>();

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
          'mf-radio-button requiere `label`, `ariaLabel` o `ariaLabelledby` para exponer un nombre accesible.',
        );
      }
    });
  }

  readonly controlId = computed(() => this.id() ?? this.generatedId);
  readonly legendId = computed(() => `${this.controlId()}-legend`);
  readonly hintId = computed(() =>
    this.hint() ? `${this.controlId()}-hint` : null,
  );
  readonly errorId = computed(() =>
    this.error() ? `${this.controlId()}-error` : null,
  );
  readonly computedLabelledby = computed(() =>
    mergeAriaIds(
      this.ariaLabelledby(),
      this.label() ? this.legendId() : null,
    ),
  );
  readonly describedBy = computed(() =>
    mergeAriaIds(this.ariaDescribedby(), this.hintId(), this.errorId()),
  );
  readonly groupName = computed(() => this.name() ?? this.controlId());
  readonly resolvedAriaLabel = computed(() =>
    this.label() ? null : this.ariaLabel() ?? null,
  );
  readonly isDisabled = computed(
    () => this.disabled() || this.disabledFromForm(),
  );

  readonly hostClasses = computed(() => {
    return `mf-radio mf-radio--${this.direction()}`;
  });

  writeValue(value: string | null): void {
    this.internalValue.set(value ?? undefined);
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

  onChange(event: { value: string }): void {
    this.internalValue.set(event.value);
    this.onControlChange(event.value);
    this.onControlTouched();
    this.mfChange.emit(event.value);
  }
}
