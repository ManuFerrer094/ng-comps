import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  output,
} from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';

export type MfSidenavMode = 'over' | 'push' | 'side';
export type MfSidenavPosition = 'start' | 'end';

export interface MfSidenavNavItem {
  /** Nombre del icono Material (e.g. 'home', 'dashboard') */
  icon: string;
  /** Texto de la etiqueta */
  label: string;
  /** Identificador único del ítem */
  id: string;
  /** Ítem activo/seleccionado */
  active?: boolean;
  /** Deshabilitar el ítem */
  disabled?: boolean;
  /** Número de badge (0 oculta el badge) */
  badge?: number;
}

/**
 * Panel lateral de la librería ng-comps.
 * Envuelve Angular Material `mat-sidenav-container` y expone una API uniforme
 * con look and feel de marca.
 *
 * Dos formas de uso:
 * 1. **Navitems declarativos** — Proporciona `navItems`, `headerTitle` e icono.
 * 2. **Content projection** — Proyecta `[mfSidenavContent]` para control total.
 *
 * El contenido principal se proyecta sin atributo.
 */
@Component({
  selector: 'mf-sidenav',
  imports: [MatSidenavModule, MatIconModule],
  template: `
    <mat-sidenav-container [class]="containerClasses()" [hasBackdrop]="hasBackdrop()">
      <mat-sidenav
        [class]="sidenavClasses()"
        [mode]="mode()"
        [position]="position()"
        [opened]="opened()"
        [style.width]="sidenavWidth()"
        (openedChange)="mfOpenedChange.emit($event)"
      >
        @if (navItems().length > 0) {
          <div class="mf-sidenav__nav">
            @if (headerTitle()) {
              <div class="mf-sidenav__header">
                @if (headerIcon()) {
                  <mat-icon class="mf-sidenav__header-icon" aria-hidden="true">{{ headerIcon() }}</mat-icon>
                }
                <span class="mf-sidenav__header-title">{{ headerTitle() }}</span>
              </div>
            }
            <nav class="mf-sidenav__menu" [attr.aria-label]="navAriaLabel()">
              @for (item of navItems(); track item.id) {
                <button
                  type="button"
                  class="mf-sidenav__item"
                  [class.mf-sidenav__item--active]="item.active"
                  [class.mf-sidenav__item--disabled]="item.disabled"
                  [disabled]="item.disabled ?? false"
                  [attr.aria-current]="item.active ? 'page' : null"
                  (click)="!item.disabled && mfNavItemClick.emit(item)"
                >
                  <mat-icon class="mf-sidenav__item-icon" aria-hidden="true">{{ item.icon }}</mat-icon>
                  <span class="mf-sidenav__item-label">{{ item.label }}</span>
                  @if (item.badge && item.badge > 0) {
                    <span class="mf-sidenav__item-badge" aria-label="{{ item.badge }} notificaciones">
                      {{ item.badge > 99 ? '99+' : item.badge }}
                    </span>
                  }
                </button>
              }
            </nav>
          </div>
        } @else {
          <ng-content select="[mfSidenavContent]" />
        }
      </mat-sidenav>
      <mat-sidenav-content class="mf-sidenav__main">
        <ng-content />
      </mat-sidenav-content>
    </mat-sidenav-container>
  `,
  styleUrl: './mf-sidenav.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MfSidenavComponent {
  /** Abierto o cerrado */
  readonly opened = input(false);
  /** Modo de apertura */
  readonly mode = input<MfSidenavMode>('side');
  /** Posición del panel */
  readonly position = input<MfSidenavPosition>('start');
  /** Muestra backdrop al abrir */
  readonly hasBackdrop = input<boolean | null>(null);
  /** Ancho del panel lateral */
  readonly sidenavWidth = input('260px');
  /** Ítems de navegación declarativos */
  readonly navItems = input<MfSidenavNavItem[]>([]);
  /** Título de la cabecera del sidenav */
  readonly headerTitle = input<string | undefined>(undefined);
  /** Icono Material de la cabecera */
  readonly headerIcon = input<string | undefined>(undefined);
  /** Aria-label del elemento nav */
  readonly navAriaLabel = input('Navegación principal');

  readonly mfOpenedChange = output<boolean>();
  /** Emite el ítem de navegación pulsado */
  readonly mfNavItemClick = output<MfSidenavNavItem>();

  readonly containerClasses = computed(() => 'mf-sidenav-container');

  readonly sidenavClasses = computed(() => {
    return `mf-sidenav mf-sidenav--${this.mode()}`;
  });
}
