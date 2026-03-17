import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  output,
} from '@angular/core';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

/**
 * Slide Toggle de la librería ng-comps.
 * Envuelve Angular Material `mat-slide-toggle` y expone una API uniforme
 * con look and feel de marca.
 */
@Component({
  selector: 'mf-slide-toggle',
  imports: [MatSlideToggleModule],
  template: `
    <mat-slide-toggle
      [checked]="checked()"
      [disabled]="disabled()"
      [class]="hostClasses()"
      (change)="onChange($event)"
    >
      {{ label() }}
    </mat-slide-toggle>
  `,
  styleUrl: './mf-slide-toggle.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MfSlideToggleComponent {
  /** Texto descriptivo */
  readonly label = input<string>('');
  /** Estado activado */
  readonly checked = input(false);
  /** Deshabilitado */
  readonly disabled = input(false);

  readonly mfChange = output<boolean>();

  readonly hostClasses = computed(() => {
    const classes = ['mf-slide-toggle'];
    if (this.disabled()) classes.push('mf-slide-toggle--disabled');
    return classes.join(' ');
  });

  onChange(event: { checked: boolean }): void {
    this.mfChange.emit(event.checked);
  }
}
