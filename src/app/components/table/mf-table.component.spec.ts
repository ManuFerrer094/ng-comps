import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MfTableComponent } from './mf-table.component';

describe('MfTableComponent', () => {
  let fixture: ComponentFixture<MfTableComponent>;
  let component: MfTableComponent;

  const testColumns = [
    { key: 'name', header: 'Name' },
    { key: 'email', header: 'Email' },
  ];

  const testData = [
    { name: 'John', email: 'john@test.com' },
    { name: 'Jane', email: 'jane@test.com' },
    { name: 'Marta', email: 'marta@test.com' },
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MfTableComponent, NoopAnimationsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(MfTableComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('columns', testColumns);
    fixture.componentRef.setInput('data', testData);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should compute displayed columns', () => {
    expect(component.displayedColumns()).toEqual(['name', 'email']);
  });

  it('should render the table', () => {
    const table = fixture.nativeElement.querySelector('table');
    expect(table).toBeTruthy();
  });

  it('should render header cells', () => {
    const headers = fixture.nativeElement.querySelectorAll('th');
    expect(headers.length).toBe(2);
  });

  it('should render data rows', () => {
    const rows = fixture.nativeElement.querySelectorAll('tr.mat-mdc-row');
    expect(rows.length).toBe(3);
  });

  it('should apply the default variant', () => {
    expect(component.hostClasses()).toContain('mf-table--default');
  });

  it('should expose per-row aria labels for legacy actions', () => {
    fixture.componentRef.setInput('rowActionLabel', 'Ver detalle');
    fixture.componentRef.setInput(
      'rowActionAriaLabel',
      (row: Record<string, unknown>) => `Ver detalle de ${row['name']}`,
    );
    fixture.detectChanges();

    const actionButtons =
      fixture.nativeElement.querySelectorAll('.mf-table__action');

    expect(actionButtons[0].getAttribute('aria-label')).toBe(
      'Ver detalle de John',
    );
    expect(actionButtons[1].getAttribute('aria-label')).toBe(
      'Ver detalle de Jane',
    );
  });

  it('should filter rows using the search model', () => {
    fixture.componentRef.setInput('showSearch', true);
    fixture.detectChanges();

    component.onSearchChange('Jane');
    fixture.detectChanges();

    const rows = fixture.nativeElement.querySelectorAll('tr.mat-mdc-row');
    expect(rows.length).toBe(1);
    expect(rows[0].textContent).toContain('Jane');
  });

  it('should render the search input as full width inside the toolbar', () => {
    fixture.componentRef.setInput('showSearch', true);
    fixture.detectChanges();

    const searchInputHost = fixture.nativeElement.querySelector(
      '.mf-table__search mf-input',
    ) as HTMLElement;

    expect(searchInputHost).toBeTruthy();
    expect(getComputedStyle(searchInputHost).display).toBe('block');
  });

  it('should paginate data client-side', () => {
    fixture.componentRef.setInput('showPaginator', true);
    fixture.componentRef.setInput('pageSize', 1);
    fixture.detectChanges();

    let rows = fixture.nativeElement.querySelectorAll('tr.mat-mdc-row');
    expect(rows.length).toBe(1);
    expect(rows[0].textContent).toContain('John');

    component.onPageChange({
      pageIndex: 1,
      previousPageIndex: 0,
      pageSize: 1,
      length: testData.length,
    });
    fixture.detectChanges();

    rows = fixture.nativeElement.querySelectorAll('tr.mat-mdc-row');
    expect(rows.length).toBe(1);
    expect(rows[0].textContent).toContain('Jane');
  });

  it('should render a dedicated mobile table view with row details', () => {
    fixture.componentRef.setInput('columns', [
      { key: 'name', header: 'Name' },
      { key: 'email', header: 'Email' },
      { key: 'status', header: 'Status', type: 'badge', badgeTones: { Active: 'success' } },
    ]);
    fixture.componentRef.setInput('data', [
      { name: 'John', email: 'john@test.com', status: 'Active' },
    ]);
    fixture.detectChanges();

    const mobileCard = fixture.nativeElement.querySelector(
      '.mf-table__mobile-card',
    ) as HTMLElement;
    const detailLabels = Array.from<HTMLElement, string | undefined>(
      fixture.nativeElement.querySelectorAll('.mf-table__mobile-item-label'),
      (item) => item.textContent?.trim(),
    );

    expect(mobileCard).toBeTruthy();
    expect(mobileCard.textContent).toContain('John');
    expect(detailLabels).toEqual(['Email', 'Status']);
  });

  it('should render badge cells with mapped tones', () => {
    fixture.componentRef.setInput('columns', [
      { key: 'name', header: 'Name' },
      {
        key: 'status',
        header: 'Status',
        type: 'badge',
        badgeTones: { Active: 'success', Pending: 'warning' },
      },
    ]);
    fixture.componentRef.setInput('data', [
      { name: 'John', status: 'Active' },
      { name: 'Jane', status: 'Pending' },
    ]);
    fixture.detectChanges();

    const badges = fixture.nativeElement.querySelectorAll('.mf-table__badge');
    expect(badges[0].className).toContain('mf-table__badge--success');
    expect(badges[1].className).toContain('mf-table__badge--warning');
  });

  it('should emit structured row actions', () => {
    fixture.componentRef.setInput('columns', [
      { key: 'name', header: 'Name' },
      { key: 'status', header: 'Status' },
    ]);
    fixture.componentRef.setInput('data', [{ name: 'John', status: 'Active' }]);
    fixture.componentRef.setInput('rowActions', [
      { key: 'edit', label: 'Edit', icon: 'edit', tone: 'primary' },
    ]);

    const emitted: Array<{
      action: { key: string; label: string; icon?: string; tone?: string };
      row: Record<string, unknown>;
    }> = [];
    component.mfAction.subscribe((event) => emitted.push(event));
    fixture.detectChanges();

    const actionButton = fixture.debugElement.query(
      By.css('.mf-table__action'),
    ).nativeElement as HTMLButtonElement;

    actionButton.click();
    fixture.detectChanges();

    expect(emitted).toEqual([
      {
        action: { key: 'edit', label: 'Edit', icon: 'edit', tone: 'primary' },
        row: { name: 'John', status: 'Active' },
      },
    ]);
  });

  it('should render an overflow menu when there is more than one action', () => {
    fixture.componentRef.setInput('columns', [
      { key: 'name', header: 'Name' },
      { key: 'status', header: 'Status' },
    ]);
    fixture.componentRef.setInput('data', [{ name: 'John', status: 'Active' }]);
    fixture.componentRef.setInput('rowActions', [
      { key: 'open', label: 'Open', icon: 'open_in_new', tone: 'primary' },
      { key: 'escalate', label: 'Escalate', icon: 'priority_high', tone: 'danger' },
    ]);
    fixture.detectChanges();

    const trigger = fixture.debugElement.query(
      By.css('.mf-table__action-menu-trigger'),
    );
    const inlineAction = fixture.debugElement.query(By.css('.mf-table__action'));

    expect(trigger).toBeTruthy();
    expect(inlineAction).toBeNull();
  });

  it('should use the vertical overflow icon for row action menus', () => {
    fixture.componentRef.setInput('columns', [
      { key: 'name', header: 'Name' },
      { key: 'status', header: 'Status' },
    ]);
    fixture.componentRef.setInput('data', [{ name: 'John', status: 'Active' }]);
    fixture.componentRef.setInput('rowActions', [
      { key: 'open', label: 'Open', icon: 'open_in_new', tone: 'primary' },
      { key: 'escalate', label: 'Escalate', icon: 'priority_high', tone: 'danger' },
    ]);
    fixture.detectChanges();

    const triggerIcon = fixture.debugElement.query(
      By.css('.mf-table__action-menu-trigger mat-icon'),
    ).nativeElement as HTMLElement;

    expect(triggerIcon.textContent?.trim()).toBe('more_vert');
  });
});
