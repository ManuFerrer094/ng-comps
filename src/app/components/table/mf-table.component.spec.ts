import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MfTableComponent } from './mf-table.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

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

  it('should render table', () => {
    const table = fixture.nativeElement.querySelector('table');
    expect(table).toBeTruthy();
  });

  it('should render header cells', () => {
    const headers = fixture.nativeElement.querySelectorAll('th');
    expect(headers.length).toBe(2);
  });

  it('should render data rows', () => {
    const rows = fixture.nativeElement.querySelectorAll('tr.mat-mdc-row');
    expect(rows.length).toBe(2);
  });

  it('should apply default variant', () => {
    expect(component.hostClasses()).toContain('mf-table--default');
  });
});
