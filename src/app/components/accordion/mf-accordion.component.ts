import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';

export interface MfAccordionPanel {
  title: string;
  description?: string;
  content: string;
  expanded?: boolean;
  disabled?: boolean;
}

/**
 * Accordion de la librería mf-components.
 * Envuelve Angular Material `mat-accordion` / `mat-expansion-panel` y expone
 * una API uniforme con look and feel de marca.
 */
@Component({
  selector: 'mf-accordion',
  imports: [MatExpansionModule],
  template: `
    <mat-accordion [multi]="multi()" [class]="hostClasses()">
      @for (panel of panels(); track panel.title) {
        <mat-expansion-panel
          [expanded]="panel.expanded ?? false"
          [disabled]="panel.disabled ?? false"
        >
          <mat-expansion-panel-header>
            <mat-panel-title>{{ panel.title }}</mat-panel-title>
            @if (panel.description) {
              <mat-panel-description>{{ panel.description }}</mat-panel-description>
            }
          </mat-expansion-panel-header>
          <p>{{ panel.content }}</p>
        </mat-expansion-panel>
      }
    </mat-accordion>
  `,
  styleUrl: './mf-accordion.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MfAccordionComponent {
  /** Paneles del accordion */
  readonly panels = input.required<MfAccordionPanel[]>();
  /** Permite múltiples paneles abiertos */
  readonly multi = input(false);

  readonly hostClasses = computed(() => 'mf-accordion');
}
