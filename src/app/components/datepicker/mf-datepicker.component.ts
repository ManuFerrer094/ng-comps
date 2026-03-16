import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  output,
} from '@angular/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';

export type MfDatepickerSize = 'sm' | 'md' | 'lg';

/**
 * Selector de fecha de la librería mf-components.
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
    FormsModule,
  ],
  template: `
    <mat-form-field [appearance]="'outline'" [class]="hostClasses()">
      @if (label()) {
        <mat-label>{{ label() }}</mat-label>
      }
      <input
        matInput
        [matDatepicker]="picker"
        [placeholder]="placeholder()"
        [disabled]="disabled()"
        [min]="min()"
        [max]="max()"
        [(ngModel)]="currentValue"
        (dateChange)="onDateChange($event)"
        (blur)="mfBlur.emit()"
      />
      <mat-datepicker-toggle matIconSuffix [for]="picker" [disabled]="disabled()">
        <mat-icon matDatepickerToggleIcon aria-hidden="true">calendar_month</mat-icon>
      </mat-datepicker-toggle>
      <mat-datepicker #picker />
      @if (hint()) {
        <mat-hint>{{ hint() }}</mat-hint>
      }
      @if (error()) {
        <mat-error>{{ error() }}</mat-error>
      }
    </mat-form-field>
  `,
  styleUrl: './mf-datepicker.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MfDatepickerComponent {
  /** Etiqueta flotante del campo */
  readonly label = input<string | undefined>(undefined);
  /** Placeholder del input */
  readonly placeholder = input('DD/MM/YYYY');
  /** Tamaño del campo */
  readonly size = input<MfDatepickerSize>('md');
  /** Deshabilitado */
  readonly disabled = input(false);
  /** Texto de ayuda debajo del campo */
  readonly hint = input<string | undefined>(undefined);
  /** Mensaje de error */
  readonly error = input<string | undefined>(undefined);
  /** Fecha mínima seleccionable */
  readonly min = input<Date | null>(null);
  /** Fecha máxima seleccionable */
  readonly max = input<Date | null>(null);
  /** Ancho completo */
  readonly fullWidth = input(false);

  readonly mfChange = output<Date | null>();
  readonly mfBlur = output<void>();

  protected currentValue: Date | null = null;

  readonly hostClasses = computed(() => {
    const classes = ['mf-datepicker', `mf-datepicker--${this.size()}`];
    if (this.fullWidth()) classes.push('mf-datepicker--full');
    if (this.error()) classes.push('mf-datepicker--error');
    return classes.join(' ');
  });

  onDateChange(event: { value: Date | null }): void {
    this.currentValue = event.value;
    this.mfChange.emit(event.value);
  }
}
