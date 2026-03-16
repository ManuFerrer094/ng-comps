import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  output,
} from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule, Sort } from '@angular/material/sort';

export interface MfTableColumn {
  key: string;
  header: string;
  sortable?: boolean;
}

export type MfTableVariant = 'default' | 'striped' | 'bordered';

/**
 * Table de la librería mf-components.
 * Envuelve Angular Material `mat-table` y expone una API uniforme
 * con look and feel de marca. Ideal para dashboards y paneles de datos.
 */
@Component({
  selector: 'mf-table',
  imports: [MatTableModule, MatSortModule],
  template: `
    <div class="mf-table__wrapper" [class]="hostClasses()">
      <table
        mat-table
        [dataSource]="data()"
        matSort
        (matSortChange)="mfSortChange.emit($event)"
      >
        @for (col of columns(); track col.key) {
          <ng-container [matColumnDef]="col.key">
            @if (col.sortable) {
              <th mat-header-cell *matHeaderCellDef mat-sort-header>{{ col.header }}</th>
            } @else {
              <th mat-header-cell *matHeaderCellDef>{{ col.header }}</th>
            }
            <td mat-cell *matCellDef="let row">{{ row[col.key] }}</td>
          </ng-container>
        }

        <tr mat-header-row *matHeaderRowDef="displayedColumns()"></tr>
        <tr mat-row *matRowDef="let row; columns: displayedColumns()" (click)="mfRowClick.emit(row)"></tr>
      </table>
    </div>
  `,
  styleUrl: './mf-table.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MfTableComponent {
  /** Columnas de la tabla */
  readonly columns = input.required<MfTableColumn[]>();
  /** Datos de la tabla */
  readonly data = input.required<Record<string, unknown>[]>();
  /** Variante visual */
  readonly variant = input<MfTableVariant>('default');

  readonly mfSortChange = output<Sort>();
  readonly mfRowClick = output<Record<string, unknown>>();

  readonly displayedColumns = computed(() => this.columns().map(c => c.key));

  readonly hostClasses = computed(() => {
    return ['mf-table', `mf-table--${this.variant()}`].join(' ');
  });
}
