import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MfSelectComponent } from './mf-select.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('MfSelectComponent', () => {
  let fixture: ComponentFixture<MfSelectComponent>;
  let component: MfSelectComponent;

  const testOptions = [
    { value: '1', label: 'Option 1' },
    { value: '2', label: 'Option 2' },
    { value: '3', label: 'Option 3', disabled: true },
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MfSelectComponent, NoopAnimationsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(MfSelectComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('options', testOptions);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render mat-select', () => {
    const select = fixture.nativeElement.querySelector('mat-select');
    expect(select).toBeTruthy();
  });

  it('should apply md size by default', () => {
    expect(component.hostClasses()).toContain('mf-select--md');
  });

  it('should emit selection change', () => {
    const spy = vi.fn();
    component.mfSelectionChange.subscribe(spy);
    component.onSelectionChange({ value: '2' });
    expect(spy).toHaveBeenCalledWith('2');
  });

  it('should render label when provided', () => {
    fixture.componentRef.setInput('label', 'Choose');
    fixture.detectChanges();
    const label = fixture.nativeElement.querySelector('mat-label');
    expect(label?.textContent).toContain('Choose');
  });
});
