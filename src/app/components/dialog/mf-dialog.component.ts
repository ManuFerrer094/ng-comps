import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
  output,
} from '@angular/core';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';

/**
 * Contenido de diálogo de la librería mf-components.
 * Envuelve las directivas de Angular Material `mat-dialog-*` y expone
 * una API uniforme con look and feel de marca.
 *
 * Uso:
 * ```
 * dialog.open(MfDialogComponent, {
 *   data: { title: 'Confirmar', message: '¿Deseas continuar?' }
 * });
 * ```
 */
@Component({
  selector: 'mf-dialog',
  imports: [MatDialogModule, MatIconModule],
  template: `
    <div [class]="hostClasses()">
      <div class="mf-dialog__header">
        <h2 class="mf-dialog__title">{{ title() }}</h2>
        @if (showClose()) {
          <button
            class="mf-dialog__close"
            (click)="onClose()"
            aria-label="Cerrar diálogo"
            type="button"
          >
            <mat-icon>close</mat-icon>
          </button>
        }
      </div>

      @if (message()) {
        <div class="mf-dialog__body">
          <p class="mf-dialog__message">{{ message() }}</p>
        </div>
      }

      <div class="mf-dialog__content">
        <ng-content />
      </div>

      @if (showActions()) {
        <div class="mf-dialog__actions">
          <ng-content select="[mfDialogActions]" />
        </div>
      }
    </div>
  `,
  styleUrl: './mf-dialog.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MfDialogComponent {
  private readonly dialogRef = inject(MatDialogRef<MfDialogComponent>, {
    optional: true,
  });

  /** Título del diálogo */
  readonly title = input.required<string>();
  /** Mensaje descriptivo */
  readonly message = input<string | undefined>(undefined);
  /** Mostrar botón de cerrar */
  readonly showClose = input(true);
  /** Mostrar área de acciones (footer) */
  readonly showActions = input(true);

  readonly mfClose = output<void>();

  readonly hostClasses = computed(() => {
    return 'mf-dialog';
  });

  onClose(): void {
    this.mfClose.emit();
    this.dialogRef?.close();
  }
}
