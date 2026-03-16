import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  output,
} from '@angular/core';
import { MatCheckboxModule } from '@angular/material/checkbox';

/**
 * Checkbox de la librería mf-components.
 * Envuelve Angular Material `mat-checkbox` y expone una API uniforme
 * con look and feel de marca.
 */
@Component({
  selector: 'mf-checkbox',
  imports: [MatCheckboxModule],
  template: `
    <mat-checkbox
      [checked]="checked()"
      [disabled]="disabled()"
      [indeterminate]="indeterminate()"
      [class]="hostClasses()"
      (change)="onChange($event)"
    >
      {{ label() }}
    </mat-checkbox>
  `,
  styleUrl: './mf-checkbox.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MfCheckboxComponent {
  /** Texto del checkbox */
  readonly label = input.required<string>();
  /** Estado marcado */
  readonly checked = input(false);
  /** Estado indeterminado */
  readonly indeterminate = input(false);
  /** Deshabilitado */
  readonly disabled = input(false);

  readonly mfChange = output<boolean>();

  readonly hostClasses = computed(() => {
    const classes = ['mf-checkbox'];
    if (this.disabled()) classes.push('mf-checkbox--disabled');
    return classes.join(' ');
  });

  onChange(event: { checked: boolean }): void {
    this.mfChange.emit(event.checked);
  }
}
