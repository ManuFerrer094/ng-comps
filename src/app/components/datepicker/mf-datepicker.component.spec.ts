import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MfDatepickerComponent } from './mf-datepicker.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('MfDatepickerComponent', () => {
  let fixture: ComponentFixture<MfDatepickerComponent>;
  let component: MfDatepickerComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MfDatepickerComponent, NoopAnimationsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(MfDatepickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render mat-form-field', () => {
    const formField = fixture.nativeElement.querySelector('mat-form-field');
    expect(formField).toBeTruthy();
  });

  it('should apply mf-datepicker class by default', () => {
    expect(component.hostClasses()).toContain('mf-datepicker');
    expect(component.hostClasses()).toContain('mf-datepicker--md');
  });

  it('should apply size class', () => {
    fixture.componentRef.setInput('size', 'lg');
    expect(component.hostClasses()).toContain('mf-datepicker--lg');
  });

  it('should apply full-width class when fullWidth is true', () => {
    fixture.componentRef.setInput('fullWidth', true);
    expect(component.hostClasses()).toContain('mf-datepicker--full');
  });

  it('should apply error class when error is provided', () => {
    fixture.componentRef.setInput('error', 'Fecha requerida');
    expect(component.hostClasses()).toContain('mf-datepicker--error');
  });

  it('should render label when provided', () => {
    fixture.componentRef.setInput('label', 'Fecha de inicio');
    fixture.detectChanges();
    const label = fixture.nativeElement.querySelector('mat-label');
    expect(label?.textContent).toContain('Fecha de inicio');
  });

  it('should render hint when provided', () => {
    fixture.componentRef.setInput('hint', 'Selecciona una fecha');
    fixture.detectChanges();
    const hint = fixture.nativeElement.querySelector('mat-hint');
    expect(hint).toBeTruthy();
  });

  it('should emit mfChange on date change', () => {
    const spy = vi.fn();
    component.mfChange.subscribe(spy);
    const date = new Date(2025, 0, 15);
    component.onDateChange({ value: date });
    expect(spy).toHaveBeenCalledWith(date);
  });
});
