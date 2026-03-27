import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  inject,
  input,
  output,
} from '@angular/core';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import {
  createUniqueId,
  hasAccessibleName,
  mergeAriaIds,
  warnInDev,
} from '../../a11y';

/**
 * Contenido de diÃ¡logo de la librerÃ­a ng-comps.
 * Envuelve las directivas de Angular Material `mat-dialog-*` y expone
 * una API uniforme con look and feel de marca.
 *
 * Uso:
 * ```
 * dialog.open(MfDialogComponent, {
 *   data: { title: 'Confirmar', message: 'Â¿Deseas continuar?' }
 * });
 * ```
 */
@Component({
  selector: 'mf-dialog',
  imports: [MatDialogModule, MatIconModule],
  template: `
    <div
      [class]="hostClasses()"
      [attr.role]="role()"
      aria-modal="true"
      [attr.aria-label]="resolvedAriaLabel()"
      [attr.aria-labelledby]="computedLabelledby()"
      [attr.aria-describedby]="computedDescribedby()"
    >
      @if (title()) {
        <h2 mat-dialog-title class="mf-dialog__header" [id]="titleId()">
          <span class="mf-dialog__title">{{ title() }}</span>
          @if (showClose()) {
            <button
              mat-icon-button
              class="mf-dialog__close"
              (click)="onClose()"
              [attr.aria-label]="closeButtonLabel()"
              type="button"
            >
              <mat-icon aria-hidden="true">close</mat-icon>
            </button>
          }
        </h2>
      } @else if (showClose()) {
        <div class="mf-dialog__header mf-dialog__header--compact">
          <span></span>
          <button
            mat-icon-button
            class="mf-dialog__close"
            (click)="onClose()"
            [attr.aria-label]="closeButtonLabel()"
            type="button"
          >
            <mat-icon aria-hidden="true">close</mat-icon>
          </button>
        </div>
      }

      <div mat-dialog-content class="mf-dialog__content">
        @if (message()) {
          <p class="mf-dialog__message" [id]="descriptionId()">{{ message() }}</p>
        }

        <ng-content />
      </div>

      @if (showActions()) {
        <div mat-dialog-actions class="mf-dialog__actions">
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
  private readonly generatedId = createUniqueId('mf-dialog');

  /** ID base del diÃ¡logo */
  readonly id = input<string | undefined>(undefined);
  /** TÃ­tulo del diÃ¡logo */
  readonly title = input<string | undefined>(undefined);
  /** Etiqueta accesible alternativa cuando no existe tÃ­tulo visible */
  readonly ariaLabel = input<string | undefined>(undefined);
  /** Referencia externa a elementos que etiquetan el diÃ¡logo */
  readonly ariaLabelledby = input<string | undefined>(undefined);
  /** Referencia externa a elementos descriptivos adicionales */
  readonly ariaDescribedby = input<string | undefined>(undefined);
  /** Mensaje descriptivo */
  readonly message = input<string | undefined>(undefined);
  /** Mostrar botÃ³n de cerrar */
  readonly showClose = input(true);
  /** Mostrar Ã¡rea de acciones (footer) */
  readonly showActions = input(true);
  /** Rol del diÃ¡logo */
  readonly role = input<'dialog' | 'alertdialog'>('dialog');
  /** Etiqueta accesible del botÃ³n de cierre */
  readonly closeButtonLabel = input('Cerrar diÃ¡logo');

  readonly mfClose = output<void>();

  constructor() {
    effect(() => {
      if (
        !hasAccessibleName(
          this.title(),
          this.ariaLabel(),
          this.ariaLabelledby(),
        )
      ) {
        warnInDev(
          'mf-dialog requiere `title`, `ariaLabel` o `ariaLabelledby` para exponer un nombre accesible.',
        );
      }
    });
  }

  readonly dialogId = computed(() => this.id() ?? this.generatedId);
  readonly titleId = computed(() => `${this.dialogId()}-title`);
  readonly descriptionId = computed(() => `${this.dialogId()}-description`);
  readonly computedLabelledby = computed(() =>
    mergeAriaIds(
      this.ariaLabelledby(),
      this.title() ? this.titleId() : null,
    ),
  );
  readonly computedDescribedby = computed(() =>
    mergeAriaIds(
      this.ariaDescribedby(),
      this.message() ? this.descriptionId() : null,
    ),
  );
  readonly resolvedAriaLabel = computed(() =>
    this.title() ? null : this.ariaLabel() ?? null,
  );
  readonly hostClasses = computed(() => 'mf-dialog');

  onClose(): void {
    this.mfClose.emit();
    this.dialogRef?.close();
  }
}
