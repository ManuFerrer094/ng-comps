import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  input,
  output,
  signal,
} from '@angular/core';
import { MatRadioModule } from '@angular/material/radio';
import { FormsModule } from '@angular/forms';

export interface MfRadioOption {
  /** Valor de la opción */
  value: string;
  /** Texto visible */
  label: string;
  /** Deshabilitada individualmente */
  disabled?: boolean;
}

export type MfRadioDirection = 'horizontal' | 'vertical';

/**
 * Grupo de radio buttons de la librería ng-comps.
 * Envuelve Angular Material `mat-radio-group` + `mat-radio-button`
 * y expone una API uniforme con look and feel de marca.
 */
@Component({
  selector: 'mf-radio-button',
  imports: [MatRadioModule, FormsModule],
  template: `
    <mat-radio-group
      [class]="hostClasses()"
      [disabled]="disabled()"
      [ngModel]="currentValue()"
      (change)="onChange($event)"
      [attr.aria-label]="ariaLabel() || null"
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
  `,
  styleUrl: './mf-radio-button.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MfRadioButtonComponent {
  /** Opciones del grupo */
  readonly options = input.required<MfRadioOption[]>();
  /** Valor seleccionado */
  readonly value = input<string | undefined>(undefined);
  /** Deshabilitado */
  readonly disabled = input(false);
  /** Dirección del grupo */
  readonly direction = input<MfRadioDirection>('vertical');
  /** Etiqueta accesible para el grupo */
  readonly ariaLabel = input<string | undefined>(undefined);

  readonly mfChange = output<string>();

  protected readonly currentValue = signal<string | undefined>(undefined);

  constructor() {
    effect(() => {
      this.currentValue.set(this.value());
    });
  }

  readonly hostClasses = computed(() => {
    return `mf-radio mf-radio--${this.direction()}`;
  });

  onChange(event: { value: string }): void {
    this.currentValue.set(event.value);
    this.mfChange.emit(event.value);
  }
}
