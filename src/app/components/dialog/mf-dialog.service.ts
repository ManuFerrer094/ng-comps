import { Injectable, TemplateRef, Type, inject } from '@angular/core';
import {
  DialogRole,
  MatDialog,
  MatDialogConfig,
  MatDialogRef,
} from '@angular/material/dialog';

export interface MfDialogOpenConfig<D = unknown>
  extends Omit<
    MatDialogConfig<D>,
    | 'ariaDescribedBy'
    | 'ariaLabel'
    | 'ariaLabelledBy'
    | 'autoFocus'
    | 'panelClass'
    | 'restoreFocus'
    | 'role'
  > {
  ariaLabel?: string;
  ariaLabelledby?: string;
  ariaDescribedby?: string;
  autoFocus?: MatDialogConfig<D>['autoFocus'];
  panelClass?: string | string[];
  restoreFocus?: boolean;
  role?: DialogRole;
}

@Injectable({ providedIn: 'root' })
export class MfDialogService {
  private readonly dialog = inject(MatDialog);

  open<T, D = unknown, R = unknown>(
    component: Type<T> | TemplateRef<T>,
    config: MfDialogOpenConfig<D> = {},
  ): MatDialogRef<T, R> {
    const panelClass = Array.isArray(config.panelClass)
      ? ['mf-dialog-panel', ...config.panelClass]
      : ['mf-dialog-panel', ...(config.panelClass ? [config.panelClass] : [])];

    return this.dialog.open(component, {
      ...config,
      role: config.role ?? 'dialog',
      autoFocus: config.autoFocus ?? 'first-tabbable',
      restoreFocus: config.restoreFocus ?? true,
      ariaLabel: config.ariaLabel,
      ariaLabelledBy: config.ariaLabelledby,
      ariaDescribedBy: config.ariaDescribedby,
      panelClass,
    });
  }
}
