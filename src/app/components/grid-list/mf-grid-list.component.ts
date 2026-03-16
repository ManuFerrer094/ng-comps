import {
  ChangeDetectionStrategy,
  Component,
  input,
} from '@angular/core';
import { MatGridListModule } from '@angular/material/grid-list';

export interface MfGridTile {
  /** Título de la tile */
  title?: string;
  /** Subtítulo de la tile */
  subtitle?: string;
  /** Número de columnas que ocupa */
  colspan?: number;
  /** Número de filas que ocupa */
  rowspan?: number;
  /** Color de fondo */
  background?: string;
}

/**
 * Lista en cuadrícula de la librería mf-components.
 * Envuelve Angular Material `mat-grid-list` y expone una API uniforme
 * con look and feel de marca. Soporta tiles estáticas y content projection.
 */
@Component({
  selector: 'mf-grid-list',
  imports: [MatGridListModule],
  template: `
    <mat-grid-list
      class="mf-grid-list"
      [cols]="cols()"
      [rowHeight]="rowHeight()"
      [gutterSize]="gutterSize()"
    >
      @for (tile of tiles(); track $index) {
        <mat-grid-tile
          class="mf-grid-list__tile"
          [colspan]="tile.colspan ?? 1"
          [rowspan]="tile.rowspan ?? 1"
          [style.background]="tile.background || null"
        >
          <mat-grid-tile-header>
            @if (tile.title) {
              <span class="mf-grid-list__tile-title">{{ tile.title }}</span>
            }
            @if (tile.subtitle) {
              <span class="mf-grid-list__tile-subtitle">{{ tile.subtitle }}</span>
            }
          </mat-grid-tile-header>
        </mat-grid-tile>
      }
      <ng-content />
    </mat-grid-list>
  `,
  styleUrl: './mf-grid-list.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MfGridListComponent {
  /** Número de columnas */
  readonly cols = input(2);
  /** Altura de cada fila */
  readonly rowHeight = input<string | number>('1:1');
  /** Espacio entre tiles */
  readonly gutterSize = input('8px');
  /** Tiles a renderizar */
  readonly tiles = input<MfGridTile[]>([]);
}
