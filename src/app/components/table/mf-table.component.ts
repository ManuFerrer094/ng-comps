import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  output,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSortModule, Sort } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';

export interface MfTableColumn {
  key: string;
  header: string;
  sortable?: boolean;
}

export type MfTableVariant = 'default' | 'striped' | 'bordered';

/**
 * Table de la librerÃ­a ng-comps.
 * Envuelve Angular Material `mat-table` y expone una API uniforme
 * con look and feel de marca. Ideal para dashboards y paneles de datos.
 */
@Component({
  selector: 'mf-table',
  imports: [MatTableModule, MatSortModule, MatButtonModule, MatIconModule],
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

        @if (rowActionLabel()) {
          <ng-container [matColumnDef]="actionColumnKey">
            <th mat-header-cell *matHeaderCellDef class="mf-table__actions-header">
              {{ rowActionHeader() }}
            </th>
            <td mat-cell *matCellDef="let row" class="mf-table__actions-cell">
              <button
                mat-button
                type="button"
                class="mf-table__action"
                [attr.aria-label]="getRowActionAriaLabel(row)"
                (click)="emitRowAction(row)"
              >
                {{ rowActionLabel() }}
              </button>
            </td>
          </ng-container>
        }

        <tr mat-header-row *matHeaderRowDef="displayedColumns()"></tr>
        <tr mat-row *matRowDef="let row; columns: displayedColumns()"></tr>
      </table>
    </div>
  `,
  styleUrl: './mf-table.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MfTableComponent {
  protected readonly actionColumnKey = 'mf-row-action';

  /** Columnas de la tabla */
  readonly columns = input.required<MfTableColumn[]>();
  /** Datos de la tabla */
  readonly data = input.required<Record<string, unknown>[]>();
  /** Variante visual */
  readonly variant = input<MfTableVariant>('default');
  /** Texto visible del botÃ³n de acciÃ³n por fila */
  readonly rowActionLabel = input<string | undefined>(undefined);
  /** Cabecera visible de la columna de acciÃ³n */
  readonly rowActionHeader = input('Acciones');
  readonly rowActionAriaLabel = input<
    ((row: Record<string, unknown>) => string) | undefined
  >(undefined);

  readonly mfSortChange = output<Sort>();
  readonly mfRowAction = output<Record<string, unknown>>();
  /** @deprecated usa `mfRowAction` para interacciones explÃ­citas por fila */
  readonly mfRowClick = output<Record<string, unknown>>();

  readonly displayedColumns = computed(() => {
    const columns = this.columns().map((column) => column.key);
    if (this.rowActionLabel()) {
      columns.push(this.actionColumnKey);
    }
    return columns;
  });

  readonly hostClasses = computed(() => {
    return ['mf-table', `mf-table--${this.variant()}`].join(' ');
  });

  emitRowAction(row: Record<string, unknown>): void {
    this.mfRowAction.emit(row);
    this.mfRowClick.emit(row);
  }

  getRowActionAriaLabel(row: Record<string, unknown>): string | null {
    return this.rowActionAriaLabel()?.(row) ?? this.rowActionLabel() ?? null;
  }
}
