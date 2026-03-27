import { TestBed } from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';
import { MfDialogService } from './mf-dialog.service';

describe('MfDialogService', () => {
  let service: MfDialogService;
  let dialogSpy: { open: ReturnType<typeof vi.fn> };

  beforeEach(() => {
    dialogSpy = {
      open: vi.fn().mockReturnValue({}),
    };

    TestBed.configureTestingModule({
      providers: [
        MfDialogService,
        { provide: MatDialog, useValue: dialogSpy },
      ],
    });

    service = TestBed.inject(MfDialogService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should apply safe defaults for focus, role and panel class', () => {
    class DialogContentComponent {}

    service.open(DialogContentComponent, {
      ariaLabel: 'Eliminar proyecto',
    });

    expect(dialogSpy.open).toHaveBeenCalledWith(
      DialogContentComponent,
      expect.objectContaining({
        role: 'dialog',
        autoFocus: 'first-tabbable',
        restoreFocus: true,
        ariaLabel: 'Eliminar proyecto',
        panelClass: ['mf-dialog-panel'],
      }),
    );
  });

  it('should merge custom panel classes with the base dialog class', () => {
    class DialogContentComponent {}

    service.open(DialogContentComponent, {
      panelClass: ['custom-panel', 'danger-panel'],
    });

    expect(dialogSpy.open).toHaveBeenCalledWith(
      DialogContentComponent,
      expect.objectContaining({
        panelClass: ['mf-dialog-panel', 'custom-panel', 'danger-panel'],
      }),
    );
  });
});
