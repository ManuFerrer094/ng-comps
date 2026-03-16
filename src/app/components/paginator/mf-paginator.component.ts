import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  output,
} from '@angular/core';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';

/**
 * Paginator de la librería mf-components.
 * Envuelve Angular Material `mat-paginator` y expone una API uniforme
 * con look and feel de marca.
 */
@Component({
  selector: 'mf-paginator',
  imports: [MatPaginatorModule],
  template: `
    <mat-paginator
      [length]="length()"
      [pageSize]="pageSize()"
      [pageIndex]="pageIndex()"
      [pageSizeOptions]="pageSizeOptions()"
      [showFirstLastButtons]="showFirstLastButtons()"
      [hidePageSize]="hidePageSize()"
      [class]="hostClasses()"
      (page)="mfPageChange.emit($event)"
    />
  `,
  styleUrl: './mf-paginator.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MfPaginatorComponent {
  /** Total de elementos */
  readonly length = input.required<number>();
  /** Tamaño de página */
  readonly pageSize = input(10);
  /** Índice de página actual */
  readonly pageIndex = input(0);
  /** Opciones de tamaño de página */
  readonly pageSizeOptions = input<number[]>([5, 10, 25, 50]);
  /** Mostrar botones de primera/última página */
  readonly showFirstLastButtons = input(true);
  /** Ocultar selector de tamaño de página */
  readonly hidePageSize = input(false);

  readonly mfPageChange = output<PageEvent>();

  readonly hostClasses = computed(() => {
    return 'mf-paginator';
  });
}
