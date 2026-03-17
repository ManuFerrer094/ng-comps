import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';

export type MfToolbarVariant = 'surface' | 'brand' | 'transparent';

/**
 * Toolbar de la librería ng-comps.
 * Envuelve Angular Material `mat-toolbar` y expone una API uniforme
 * con look and feel de marca. Usa content projection para acciones.
 */
@Component({
  selector: 'mf-toolbar',
  imports: [MatToolbarModule],
  template: `
    <mat-toolbar [class]="hostClasses()">
      <div class="mf-toolbar__start">
        @if (title()) {
          <span class="mf-toolbar__title">{{ title() }}</span>
        }
        <ng-content select="[mfToolbarStart]" />
      </div>
      <div class="mf-toolbar__spacer"></div>
      <div class="mf-toolbar__end">
        <ng-content select="[mfToolbarEnd]" />
        <ng-content />
      </div>
    </mat-toolbar>
  `,
  styleUrl: './mf-toolbar.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MfToolbarComponent {
  /** Título que se muestra en la toolbar */
  readonly title = input<string | undefined>(undefined);
  /** Variante visual */
  readonly variant = input<MfToolbarVariant>('surface');
  /** Muestra borde inferior */
  readonly bordered = input(true);
  /** Toolbar fija en la parte superior */
  readonly sticky = input(false);
  /** Elevación sutil */
  readonly elevated = input(false);

  readonly hostClasses = computed(() => {
    const classes = ['mf-toolbar', `mf-toolbar--${this.variant()}`];
    if (this.bordered()) classes.push('mf-toolbar--bordered');
    if (this.sticky()) classes.push('mf-toolbar--sticky');
    if (this.elevated()) classes.push('mf-toolbar--elevated');
    return classes.join(' ');
  });
}
