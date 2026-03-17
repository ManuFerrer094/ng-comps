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

  it('should apply md size class by default', () => {
    expect(component.hostClasses()).toContain('mf-select--md');
  });

  it('should apply sm size class', () => {
    fixture.componentRef.setInput('size', 'sm');
    expect(component.hostClasses()).toContain('mf-select--sm');
  });

  it('should apply lg size class', () => {
    fixture.componentRef.setInput('size', 'lg');
    expect(component.hostClasses()).toContain('mf-select--lg');
  });

  it('should include mf-select--full when fullWidth is true', () => {
    fixture.componentRef.setInput('fullWidth', true);
    expect(component.hostClasses()).toContain('mf-select--full');
  });

  it('should include mf-select--error when error is provided', () => {
    fixture.componentRef.setInput('error', 'Required');
    expect(component.hostClasses()).toContain('mf-select--error');
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

  it('should render hint when provided', () => {
    fixture.componentRef.setInput('hint', 'Pick one');
    fixture.detectChanges();
    const hint = fixture.nativeElement.querySelector('mat-hint');
    expect(hint?.textContent).toContain('Pick one');
  });

  it('should render error when provided', () => {
    fixture.componentRef.setInput('error', 'This field is required');
    fixture.detectChanges();
    const error = fixture.nativeElement.querySelector('mat-error');
    expect(error?.textContent).toContain('This field is required');
  });

  it('should include mf-select-panel in panelClasses by default', () => {
    expect(component.panelClasses()).toContain('mf-select-panel');
  });

  it('should merge extra panelClass string into panelClasses', () => {
    fixture.componentRef.setInput('panelClass', 'custom-panel');
    expect(component.panelClasses()).toContain('mf-select-panel');
    expect(component.panelClasses()).toContain('custom-panel');
  });

  it('should merge extra panelClass array into panelClasses', () => {
    fixture.componentRef.setInput('panelClass', ['panel-a', 'panel-b']);
    expect(component.panelClasses()).toContain('panel-a');
    expect(component.panelClasses()).toContain('panel-b');
  });

  it('should render leading icon when provided', () => {
    fixture.componentRef.setInput('leadingIcon', 'search');
    fixture.detectChanges();
    const icon = fixture.nativeElement.querySelector('[matprefix]');
    expect(icon).toBeTruthy();
  });
});

  });
});
