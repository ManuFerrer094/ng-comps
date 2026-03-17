import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  output,
} from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

export interface MfBreadcrumbItem {
  label: string;
  href?: string;
  icon?: string;
}

/**
 * Breadcrumb de la librería ng-comps.
 * Componente de navegación jerárquica para indicar la ubicación
 * del usuario en la aplicación.
 */
@Component({
  selector: 'mf-breadcrumb',
  imports: [MatIconModule],
  template: `
    <nav [attr.aria-label]="ariaLabel()" [class]="hostClasses()">
      <ol class="mf-breadcrumb__list">
        @for (item of items(); track item.label; let last = $last) {
          <li class="mf-breadcrumb__item">
            @if (!last && item.href) {
              <a
                class="mf-breadcrumb__link"
                [href]="item.href"
                (click)="onItemClick($event, item)"
              >
                @if (item.icon) {
                  <mat-icon class="mf-breadcrumb__icon" aria-hidden="true">{{ item.icon }}</mat-icon>
                }
                {{ item.label }}
              </a>
            } @else {
              <span class="mf-breadcrumb__current" [attr.aria-current]="last ? 'page' : null">
                @if (item.icon) {
                  <mat-icon class="mf-breadcrumb__icon" aria-hidden="true">{{ item.icon }}</mat-icon>
                }
                {{ item.label }}
              </span>
            }
            @if (!last) {
              <mat-icon class="mf-breadcrumb__separator" aria-hidden="true">{{ separator() }}</mat-icon>
            }
          </li>
        }
      </ol>
    </nav>
  `,
  styleUrl: './mf-breadcrumb.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MfBreadcrumbComponent {
  /** Items del breadcrumb */
  readonly items = input.required<MfBreadcrumbItem[]>();
  /** Icono separador */
  readonly separator = input<string>('chevron_right');
  /** Label de accesibilidad */
  readonly ariaLabel = input<string>('Breadcrumb');

  readonly mfItemClick = output<MfBreadcrumbItem>();

  readonly hostClasses = computed(() => 'mf-breadcrumb');

  onItemClick(event: Event, item: MfBreadcrumbItem): void {
    event.preventDefault();
    this.mfItemClick.emit(item);
  }
}
