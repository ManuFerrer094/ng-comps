import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  input,
  output,
  signal,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { PageEvent } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatSortModule, Sort } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MfInputComponent } from '../input';
import { MfPaginatorComponent } from '../paginator';

export type MfTableCellType = 'text' | 'number' | 'date' | 'badge';
export type MfTableAlign = 'start' | 'center' | 'end';
export type MfTableVariant = 'default' | 'striped' | 'bordered';
export type MfTableDensity = 'compact' | 'comfortable' | 'spacious';
export type MfTableBadgeTone =
  | 'brand'
  | 'success'
  | 'warning'
  | 'error'
  | 'neutral';
export type MfTableActionTone = 'primary' | 'neutral' | 'danger';

export interface MfTableColumn {
  key: string;
  header: string;
  sortable?: boolean;
  type?: MfTableCellType;
  align?: MfTableAlign;
  width?: string;
  hidden?: boolean;
  truncate?: boolean;
  searchable?: boolean;
  emptyValue?: string;
  formatter?: (value: unknown, row: Record<string, unknown>) => string;
  sortAccessor?: (row: Record<string, unknown>) => unknown;
  searchAccessor?: (row: Record<string, unknown>) => string;
  badgeTone?:
    | MfTableBadgeTone
    | ((value: unknown, row: Record<string, unknown>) => MfTableBadgeTone);
  badgeTones?: Record<string, MfTableBadgeTone>;
}

export interface MfTableRowAction {
  key: string;
  label: string;
  icon?: string;
  tone?: MfTableActionTone;
  disabled?: boolean | ((row: Record<string, unknown>) => boolean);
  ariaLabel?: (row: Record<string, unknown>) => string;
}

interface MfResolvedTableAction extends MfTableRowAction {
  legacy?: boolean;
}

/**
 * Enterprise-oriented table component with optional search, pagination,
 * badges, explicit row actions and client-side sorting.
 */
@Component({
  selector: 'mf-table',
  imports: [
    MatTableModule,
    MatSortModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MfInputComponent,
    MfPaginatorComponent,
  ],
  template: `
    <section [class]="hostClasses()">
      @if (showsToolbar()) {
        <header class="mf-table__toolbar">
          <div class="mf-table__intro">
            @if (title()) {
              <h2 class="mf-table__title">{{ title() }}</h2>
            }
            @if (description()) {
              <p class="mf-table__description">{{ description() }}</p>
            }
            <div class="mf-table__meta">
              <span class="mf-table__metric">{{ resultSummary() }}</span>
              @if (searchTerm()) {
                <span class="mf-table__metric mf-table__metric--accent">
                  Filter active
                </span>
              }
              @if (sortState().direction) {
                <span class="mf-table__metric">
                  Sorted by {{ sortState().active }}
                </span>
              }
            </div>
          </div>

          @if (showSearch()) {
            <div class="mf-table__search">
              <mf-input
                [label]="searchLabel()"
                [ariaLabel]="searchLabel()"
                [placeholder]="searchPlaceholder()"
                [value]="localSearchTerm()"
                [type]="'search'"
                [leadingIcon]="'search'"
                [fullWidth]="true"
                (mfInput)="onSearchChange($event)"
              />
            </div>
          }
        </header>
      }

      @if (filteredRows().length > 0) {
        <div class="mf-table__surface">
          <div class="mf-table__wrapper">
            <table
              mat-table
              [dataSource]="paginatedRows()"
              matSort
              [matSortActive]="sortState().active"
              [matSortDirection]="sortState().direction"
              class="mf-table__table"
              (matSortChange)="onSortChange($event)"
            >
              @for (column of visibleColumns(); track column.key) {
                <ng-container [matColumnDef]="column.key">
                  @if (column.sortable) {
                    <th
                      mat-header-cell
                      *matHeaderCellDef
                      mat-sort-header
                      [style.width]="column.width || null"
                      [class]="headerCellClasses(column)"
                    >
                      {{ column.header }}
                    </th>
                  } @else {
                    <th
                      mat-header-cell
                      *matHeaderCellDef
                      [style.width]="column.width || null"
                      [class]="headerCellClasses(column)"
                    >
                      {{ column.header }}
                    </th>
                  }

                  <td
                    mat-cell
                    *matCellDef="let row"
                    [style.width]="column.width || null"
                    [class]="cellClasses(column)"
                  >
                    @if (column.type === 'badge') {
                      <span [class]="badgeClasses(column, row)">
                        {{ renderCell(column, row) }}
                      </span>
                    } @else {
                      <span class="mf-table__cell-text">
                        {{ renderCell(column, row) }}
                      </span>
                    }
                  </td>
                </ng-container>
              }

              @if (hasActions()) {
                <ng-container [matColumnDef]="actionColumnKey">
                  <th
                    mat-header-cell
                    *matHeaderCellDef
                    class="mf-table__actions-header"
                  >
                    {{ resolvedActionHeader() }}
                  </th>
                  <td
                    mat-cell
                    *matCellDef="let row"
                    class="mf-table__actions-cell"
                  >
                    @if (usesActionMenu()) {
                      <button
                        mat-icon-button
                        type="button"
                        class="mf-table__action-menu-trigger"
                        [matMenuTriggerFor]="actionMenu"
                        [attr.aria-label]="getRowMenuAriaLabel(row)"
                      >
                        <mat-icon aria-hidden="true">more_horiz</mat-icon>
                      </button>
                      <mat-menu
                        #actionMenu="matMenu"
                        xPosition="before"
                        class="mf-table__action-menu"
                      >
                        @for (action of resolvedActions(); track action.key) {
                          <button
                            mat-menu-item
                            [disabled]="isActionDisabled(action, row)"
                            [attr.aria-label]="getActionAriaLabel(action, row)"
                            (click)="onActionClick(action, row)"
                          >
                            @if (action.icon) {
                              <mat-icon aria-hidden="true">{{ action.icon }}</mat-icon>
                            }
                            <span>{{ action.label }}</span>
                          </button>
                        }
                      </mat-menu>
                    } @else {
                      <div class="mf-table__action-group">
                        @for (action of resolvedActions(); track action.key) {
                          <button
                            mat-stroked-button
                            type="button"
                            [class]="actionClasses(action)"
                            [disabled]="isActionDisabled(action, row)"
                            [attr.aria-label]="getActionAriaLabel(action, row)"
                            (click)="onActionClick(action, row)"
                          >
                            @if (action.icon) {
                              <mat-icon aria-hidden="true">{{ action.icon }}</mat-icon>
                            }
                            <span>{{ action.label }}</span>
                          </button>
                        }
                      </div>
                    }
                  </td>
                </ng-container>
              }

              <tr
                mat-header-row
                *matHeaderRowDef="displayedColumns(); sticky: stickyHeader()"
              ></tr>
              <tr
                mat-row
                *matRowDef="let row; columns: displayedColumns()"
                class="mf-table__row"
              ></tr>
            </table>
          </div>

          @if (showPaginator()) {
            <footer class="mf-table__footer">
              <mf-paginator
                [length]="filteredRows().length"
                [pageSize]="localPageSize()"
                [pageIndex]="localPageIndex()"
                [pageSizeOptions]="pageSizeOptions()"
                [showFirstLastButtons]="showFirstLastButtons()"
                [hidePageSize]="hidePageSize()"
                (mfPageChange)="onPageChange($event)"
              />
            </footer>
          }
        </div>
      } @else {
        <div class="mf-table__empty">
          <div class="mf-table__empty-icon">
            <mat-icon aria-hidden="true">table_rows</mat-icon>
          </div>
          <h3 class="mf-table__empty-title">{{ emptyTitle() }}</h3>
          <p class="mf-table__empty-description">{{ emptyDescriptionText() }}</p>
        </div>
      }
    </section>
  `,
  styleUrl: './mf-table.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MfTableComponent {
  protected readonly localSearchTerm = signal('');
  protected readonly localPageIndex = signal(0);
  protected readonly localPageSize = signal(10);
  protected readonly sortState = signal<Sort>({ active: '', direction: '' });
  protected readonly actionColumnKey = 'mf-row-action';

  readonly columns = input<MfTableColumn[]>([]);
  readonly data = input<Record<string, unknown>[]>([]);
  readonly variant = input<MfTableVariant>('default');
  readonly density = input<MfTableDensity>('comfortable');
  readonly title = input<string | undefined>(undefined);
  readonly description = input<string | undefined>(undefined);
  readonly showSearch = input(false);
  readonly searchLabel = input('Search');
  readonly searchPlaceholder = input('Search records');
  readonly searchValue = input('');
  readonly showPaginator = input(false);
  readonly pageSize = input(10);
  readonly pageIndex = input(0);
  readonly pageSizeOptions = input<number[]>([10, 25, 50, 100]);
  readonly showFirstLastButtons = input(true);
  readonly hidePageSize = input(false);
  readonly stickyHeader = input(false);
  readonly emptyTitle = input('No records found');
  readonly emptyDescription = input(
    'This dataset has no rows yet. Connect data or add records to populate the table.',
  );

  readonly rowActionLabel = input<string | undefined>(undefined);
  readonly rowActionHeader = input('Actions');
  readonly rowActionAriaLabel = input<
    ((row: Record<string, unknown>) => string) | undefined
  >(undefined);
  readonly rowActions = input<MfTableRowAction[]>([]);

  readonly mfSortChange = output<Sort>();
  readonly mfSearchChange = output<string>();
  readonly mfPageChange = output<PageEvent>();
  readonly mfAction = output<{
    action: MfTableRowAction;
    row: Record<string, unknown>;
  }>();
  readonly mfRowAction = output<Record<string, unknown>>();
  readonly mfRowClick = output<Record<string, unknown>>();

  constructor() {
    effect(() => {
      this.localSearchTerm.set(this.searchValue());
    });

    effect(() => {
      this.localPageIndex.set(this.pageIndex());
    });

    effect(() => {
      this.localPageSize.set(this.pageSize());
    });

    effect(() => {
      const totalRows = this.filteredRows().length;
      const pageSize = Math.max(this.localPageSize(), 1);
      const maxPageIndex = Math.max(Math.ceil(totalRows / pageSize) - 1, 0);

      if (this.localPageIndex() > maxPageIndex) {
        this.localPageIndex.set(maxPageIndex);
      }
    });
  }

  protected readonly visibleColumns = computed(() =>
    this.columns().filter((column) => !column.hidden),
  );

  protected readonly searchTerm = computed(() => this.localSearchTerm().trim());
  protected readonly showsToolbar = computed(
    () => Boolean(this.title() || this.description() || this.showSearch()),
  );
  protected readonly resolvedActionHeader = computed(() => this.rowActionHeader());

  protected readonly resolvedActions = computed<MfResolvedTableAction[]>(() => {
    const actions: MfResolvedTableAction[] = [...this.rowActions()];

    if (this.rowActionLabel()) {
      actions.unshift({
        key: 'legacy-action',
        label: this.rowActionLabel() as string,
        tone: 'neutral',
        ariaLabel: this.rowActionAriaLabel(),
        legacy: true,
      });
    }

    return actions;
  });

  protected readonly hasActions = computed(() => this.resolvedActions().length > 0);
  protected readonly usesActionMenu = computed(
    () => this.resolvedActions().length > 1,
  );

  readonly displayedColumns = computed(() => {
    const columns = this.visibleColumns().map((column) => column.key);

    if (this.hasActions()) {
      columns.push(this.actionColumnKey);
    }

    return columns;
  });

  protected readonly filteredRows = computed(() => {
    const query = this.searchTerm().toLowerCase();
    const rows = this.data();

    if (!query) {
      return rows;
    }

    const searchableColumns = this.visibleColumns().filter(
      (column) => column.searchable !== false,
    );

    return rows.filter((row) =>
      searchableColumns.some((column) =>
        this.getSearchValue(column, row).toLowerCase().includes(query),
      ),
    );
  });

  protected readonly sortedRows = computed(() => {
    const rows = [...this.filteredRows()];
    const { active, direction } = this.sortState();

    if (!active || !direction) {
      return rows;
    }

    const column = this.visibleColumns().find((item) => item.key === active);
    if (!column) {
      return rows;
    }

    return rows.sort((left, right) => {
      const leftValue = this.normalizeSortValue(column, left);
      const rightValue = this.normalizeSortValue(column, right);

      if (leftValue < rightValue) {
        return direction === 'asc' ? -1 : 1;
      }

      if (leftValue > rightValue) {
        return direction === 'asc' ? 1 : -1;
      }

      return 0;
    });
  });

  protected readonly paginatedRows = computed(() => {
    if (!this.showPaginator()) {
      return this.sortedRows();
    }

    const size = Math.max(this.localPageSize(), 1);
    const start = this.localPageIndex() * size;
    return this.sortedRows().slice(start, start + size);
  });

  protected readonly resultSummary = computed(() => {
    const filtered = this.filteredRows().length;
    const total = this.data().length;

    if (filtered === total) {
      return `${total} records`;
    }

    return `${filtered} of ${total} records`;
  });

  onSearchChange(value: string): void {
    this.localSearchTerm.set(value);
    this.localPageIndex.set(0);
    this.mfSearchChange.emit(value);
  }

  onSortChange(sort: Sort): void {
    this.sortState.set(sort);
    this.localPageIndex.set(0);
    this.mfSortChange.emit(sort);
  }

  onPageChange(event: PageEvent): void {
    this.localPageIndex.set(event.pageIndex);
    this.localPageSize.set(event.pageSize);
    this.mfPageChange.emit(event);
  }

  onActionClick(action: MfResolvedTableAction, row: Record<string, unknown>): void {
    if (action.legacy) {
      this.mfRowAction.emit(row);
      this.mfRowClick.emit(row);
    }

    this.mfAction.emit({ action, row });
  }

  renderCell(column: MfTableColumn, row: Record<string, unknown>): string {
    const value = this.getRawValue(column, row);

    if (column.formatter) {
      return column.formatter(value, row);
    }

    if (value === null || value === undefined || value === '') {
      return column.emptyValue ?? '-';
    }

    if (column.type === 'number' && typeof value === 'number') {
      return new Intl.NumberFormat('es-ES').format(value);
    }

    if (column.type === 'date') {
      const date = value instanceof Date ? value : new Date(String(value));
      if (!Number.isNaN(date.getTime())) {
        return new Intl.DateTimeFormat('es-ES').format(date);
      }
    }

    return String(value);
  }

  headerCellClasses(column: MfTableColumn): string {
    return [
      'mf-table__header-cell',
      `mf-table__cell--align-${column.align ?? 'start'}`,
    ].join(' ');
  }

  cellClasses(column: MfTableColumn): string {
    const classes = [
      'mf-table__cell',
      `mf-table__cell--align-${column.align ?? 'start'}`,
    ];

    if (column.truncate) {
      classes.push('mf-table__cell--truncate');
    }

    return classes.join(' ');
  }

  badgeClasses(column: MfTableColumn, row: Record<string, unknown>): string {
    return [
      'mf-table__badge',
      `mf-table__badge--${this.resolveBadgeTone(column, row)}`,
    ].join(' ');
  }

  actionClasses(action: MfResolvedTableAction): string {
    return [
      'mf-table__action',
      `mf-table__action--${action.tone ?? 'neutral'}`,
    ].join(' ');
  }

  isActionDisabled(
    action: MfResolvedTableAction,
    row: Record<string, unknown>,
  ): boolean {
    return typeof action.disabled === 'function'
      ? action.disabled(row)
      : Boolean(action.disabled);
  }

  getActionAriaLabel(
    action: MfResolvedTableAction,
    row: Record<string, unknown>,
  ): string | null {
    return action.ariaLabel?.(row) ?? action.label ?? null;
  }

  getRowMenuAriaLabel(row: Record<string, unknown>): string {
    const primaryColumn = this.visibleColumns()[0];
    const primaryLabel = primaryColumn
      ? this.renderCell(primaryColumn, row)
      : 'this row';

    return `Open actions for ${primaryLabel}`;
  }

  emptyDescriptionText(): string {
    if (this.searchTerm()) {
      return 'No rows match the current search. Try a broader query or clear the filter.';
    }

    return this.emptyDescription();
  }

  readonly hostClasses = computed(() =>
    ['mf-table', `mf-table--${this.variant()}`, `mf-table--${this.density()}`].join(
      ' ',
    ),
  );

  private getCellValue(
    column: MfTableColumn,
    row: Record<string, unknown>,
  ): unknown {
    return column.sortAccessor ? column.sortAccessor(row) : this.getRawValue(column, row);
  }

  private getRawValue(
    column: MfTableColumn,
    row: Record<string, unknown>,
  ): unknown {
    return row[column.key];
  }

  private getSearchValue(
    column: MfTableColumn,
    row: Record<string, unknown>,
  ): string {
    if (column.searchAccessor) {
      return column.searchAccessor(row);
    }

    return this.renderCell(column, row);
  }

  private normalizeSortValue(
    column: MfTableColumn,
    row: Record<string, unknown>,
  ): number | string {
    const value = this.getCellValue(column, row);

    if (value === null || value === undefined || value === '') {
      return '';
    }

    if (column.type === 'number') {
      return typeof value === 'number' ? value : Number(value);
    }

    if (column.type === 'date') {
      const date = value instanceof Date ? value : new Date(String(value));
      return Number.isNaN(date.getTime()) ? '' : date.getTime();
    }

    if (typeof value === 'number') {
      return value;
    }

    return String(value).toLocaleLowerCase();
  }

  private resolveBadgeTone(
    column: MfTableColumn,
    row: Record<string, unknown>,
  ): MfTableBadgeTone {
    const value = row[column.key];

    if (typeof column.badgeTone === 'function') {
      return column.badgeTone(value, row);
    }

    if (column.badgeTone) {
      return column.badgeTone;
    }

    return column.badgeTones?.[String(value)] ?? 'neutral';
  }
}
