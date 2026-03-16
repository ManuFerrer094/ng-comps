import { TestBed } from '@angular/core/testing';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MfSnackbarService } from './mf-snackbar.service';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('MfSnackbarService', () => {
  let service: MfSnackbarService;
  let snackBarSpy: { open: ReturnType<typeof vi.fn> };

  beforeEach(() => {
    snackBarSpy = { open: vi.fn().mockReturnValue({}) };

    TestBed.configureTestingModule({
      imports: [NoopAnimationsModule],
      providers: [
        MfSnackbarService,
        { provide: MatSnackBar, useValue: snackBarSpy },
      ],
    });

    service = TestBed.inject(MfSnackbarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call matSnackBar.open with info type', () => {
    service.info('Hello');
    expect(snackBarSpy.open).toHaveBeenCalledWith(
      'Hello',
      undefined,
      expect.objectContaining({
        panelClass: ['mf-snackbar', 'mf-snackbar--info'],
      }),
    );
  });

  it('should call matSnackBar.open with success type', () => {
    service.success('Done', 'OK');
    expect(snackBarSpy.open).toHaveBeenCalledWith(
      'Done',
      'OK',
      expect.objectContaining({
        panelClass: ['mf-snackbar', 'mf-snackbar--success'],
      }),
    );
  });

  it('should call matSnackBar.open with error type', () => {
    service.error('Oops');
    expect(snackBarSpy.open).toHaveBeenCalledWith(
      'Oops',
      undefined,
      expect.objectContaining({
        panelClass: ['mf-snackbar', 'mf-snackbar--error'],
      }),
    );
  });

  it('should use custom config', () => {
    service.open({
      message: 'Custom',
      action: 'Undo',
      type: 'warning',
      duration: 8000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
    expect(snackBarSpy.open).toHaveBeenCalledWith(
      'Custom',
      'Undo',
      expect.objectContaining({
        duration: 8000,
        horizontalPosition: 'center',
        verticalPosition: 'top',
        panelClass: ['mf-snackbar', 'mf-snackbar--warning'],
      }),
    );
  });
});
