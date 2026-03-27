import { inject, Injectable } from '@angular/core';
import {
  MatSnackBar,
  MatSnackBarConfig,
  MatSnackBarRef,
  TextOnlySnackBar,
} from '@angular/material/snack-bar';

export type MfSnackbarType = 'info' | 'success' | 'warning' | 'error';
export type MfSnackbarPoliteness = 'off' | 'assertive' | 'polite';

export interface MfSnackbarConfig {
  message: string;
  action?: string;
  type?: MfSnackbarType;
  duration?: number;
  horizontalPosition?: 'start' | 'center' | 'end';
  verticalPosition?: 'top' | 'bottom';
  politeness?: MfSnackbarPoliteness;
  announcementMessage?: string;
}

/**
 * Servicio de Snackbar de la librerÃ­a ng-comps.
 * Envuelve Angular Material `MatSnackBar` y expone una API uniforme
 * con estilos de marca y tipos semÃ¡nticos.
 */
@Injectable({ providedIn: 'root' })
export class MfSnackbarService {
  private readonly matSnackBar = inject(MatSnackBar);

  open(config: MfSnackbarConfig): MatSnackBarRef<TextOnlySnackBar> {
    const type = config.type ?? 'info';
    const matConfig: MatSnackBarConfig = {
      duration: config.duration ?? this.defaultDuration(type),
      horizontalPosition: config.horizontalPosition ?? 'end',
      verticalPosition: config.verticalPosition ?? 'bottom',
      politeness: config.politeness ?? this.defaultPoliteness(type),
      announcementMessage: config.announcementMessage ?? config.message,
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

  private defaultDuration(type: MfSnackbarType): number {
    if (type === 'error' || type === 'warning') {
      return 6000;
    }

    return 4000;
  }

  private defaultPoliteness(type: MfSnackbarType): MfSnackbarPoliteness {
    if (type === 'error' || type === 'warning') {
      return 'assertive';
    }

    return 'polite';
  }
}
