import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  output,
} from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';

export interface MfTab {
  label: string;
  icon?: string;
  disabled?: boolean;
}

export type MfTabsVariant = 'default' | 'stretched';

/**
 * Tabs de la librería ng-comps.
 * Envuelve Angular Material `mat-tab-group` y expone una API uniforme
 * con look and feel de marca.
 */
@Component({
  selector: 'mf-tabs',
  imports: [MatTabsModule, MatIconModule],
  template: `
    <mat-tab-group
      [selectedIndex]="selectedIndex()"
      [class]="hostClasses()"
      [mat-stretch-tabs]="variant() === 'stretched'"
      (selectedIndexChange)="mfSelectedIndexChange.emit($event)"
    >
      @for (tab of tabs(); track tab.label) {
        <mat-tab [disabled]="tab.disabled ?? false">
          <ng-template mat-tab-label>
            @if (tab.icon) {
              <mat-icon class="mf-tabs__icon" aria-hidden="true">{{ tab.icon }}</mat-icon>
            }
            {{ tab.label }}
          </ng-template>
        </mat-tab>
      }
    </mat-tab-group>
  `,
  styleUrl: './mf-tabs.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MfTabsComponent {
  /** Pestañas */
  readonly tabs = input.required<MfTab[]>();
  /** Índice seleccionado */
  readonly selectedIndex = input(0);
  /** Variante visual */
  readonly variant = input<MfTabsVariant>('default');

  readonly mfSelectedIndexChange = output<number>();

  readonly hostClasses = computed(() => {
    return ['mf-tabs', `mf-tabs--${this.variant()}`].join(' ');
  });
}
