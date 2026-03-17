import { inject, Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig, MatSnackBarRef, TextOnlySnackBar } from '@angular/material/snack-bar';

export type MfSnackbarType = 'info' | 'success' | 'warning' | 'error';

export interface MfSnackbarConfig {
  message: string;
  action?: string;
  type?: MfSnackbarType;
  duration?: number;
  horizontalPosition?: 'start' | 'center' | 'end';
  verticalPosition?: 'top' | 'bottom';
}

/**
 * Servicio de Snackbar de la librería ng-comps.
 * Envuelve Angular Material `MatSnackBar` y expone una API uniforme
 * con estilos de marca y tipos semánticos.
 */
@Injectable({ providedIn: 'root' })
export class MfSnackbarService {
  private readonly matSnackBar = inject(MatSnackBar);

  open(config: MfSnackbarConfig): MatSnackBarRef<TextOnlySnackBar> {
    const type = config.type ?? 'info';
    const matConfig: MatSnackBarConfig = {
      duration: config.duration ?? 4000,
      horizontalPosition: config.horizontalPosition ?? 'end',
      verticalPosition: config.verticalPosition ?? 'bottom',
      panelClass: ['mf-snackbar', `mf-snackbar--${type}`],
    };

    return this.matSnackBar.open(config.message, config.action, matConfig);
  }

  info(message: string, action?: string): MatSnackBarRef<TextOnlySnackBar> {
    return this.open({ message, action, type: 'info' });
  }

  success(message: string, action?: string): MatSnackBarRef<TextOnlySnackBar> {
    return this.open({ message, action, type: 'success' });
  }

  warning(message: string, action?: string): MatSnackBarRef<TextOnlySnackBar> {
    return this.open({ message, action, type: 'warning' });
  }

  error(message: string, action?: string): MatSnackBarRef<TextOnlySnackBar> {
    return this.open({ message, action, type: 'error' });
  }
}
