import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  output,
} from '@angular/core';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

export interface MfMenuItem {
  label: string;
  icon?: string;
  disabled?: boolean;
  value: string;
}

/**
 * Menu de la librería ng-comps.
 * Envuelve Angular Material `mat-menu` y expone una API uniforme
 * con look and feel de marca.
 */
@Component({
  selector: 'mf-menu',
  imports: [MatMenuModule, MatButtonModule, MatIconModule],
  template: `
    <button
      mat-icon-button
      [matMenuTriggerFor]="menu"
      [class]="triggerClasses()"
      [attr.aria-label]="triggerLabel()"
    >
      <mat-icon>{{ triggerIcon() }}</mat-icon>
    </button>
    <mat-menu #menu="matMenu" [class]="hostClasses()">
      @for (item of items(); track item.value) {
        <button
          mat-menu-item
          [disabled]="item.disabled ?? false"
          (click)="mfItemClick.emit(item.value)"
        >
          @if (item.icon) {
            <mat-icon aria-hidden="true">{{ item.icon }}</mat-icon>
          }
          <span>{{ item.label }}</span>
        </button>
      }
    </mat-menu>
  `,
  styleUrl: './mf-menu.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MfMenuComponent {
  /** Items del menú */
  readonly items = input.required<MfMenuItem[]>();
  /** Icono del trigger */
  readonly triggerIcon = input<string>('more_vert');
  /** Label accesible del trigger */
  readonly triggerLabel = input<string>('Open menu');

  readonly mfItemClick = output<string>();

  readonly hostClasses = computed(() => 'mf-menu');
  readonly triggerClasses = computed(() => 'mf-menu__trigger');
}
