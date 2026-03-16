import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  output,
} from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';

export type MfSidenavMode = 'over' | 'push' | 'side';
export type MfSidenavPosition = 'start' | 'end';

/**
 * Panel lateral de la librería mf-components.
 * Envuelve Angular Material `mat-sidenav-container` y expone una API uniforme
 * con look and feel de marca. Usa content projection para el contenido del
 * sidenav y el contenido principal.
 */
@Component({
  selector: 'mf-sidenav',
  imports: [MatSidenavModule],
  template: `
    <mat-sidenav-container [class]="containerClasses()" [hasBackdrop]="hasBackdrop()">
      <mat-sidenav
        [class]="sidenavClasses()"
        [mode]="mode()"
        [position]="position()"
        [opened]="opened()"
        (openedChange)="mfOpenedChange.emit($event)"
      >
        <ng-content select="[mfSidenavContent]" />
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

  readonly mfOpenedChange = output<boolean>();

  readonly containerClasses = computed(() => 'mf-sidenav-container');

  readonly sidenavClasses = computed(() => {
    return `mf-sidenav mf-sidenav--${this.mode()}`;
  });
}
