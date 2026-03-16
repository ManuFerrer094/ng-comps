import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MfProgressSpinnerComponent } from './mf-progress-spinner.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('MfProgressSpinnerComponent', () => {
  let fixture: ComponentFixture<MfProgressSpinnerComponent>;
  let component: MfProgressSpinnerComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MfProgressSpinnerComponent, NoopAnimationsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(MfProgressSpinnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render mat-progress-spinner', () => {
    const spinner = fixture.nativeElement.querySelector('mat-progress-spinner');
    expect(spinner).toBeTruthy();
  });

  it('should apply brand class by default', () => {
    expect(component.hostClasses()).toContain('mf-progress-spinner--brand');
  });

  it('should apply accent class when color is accent', () => {
    fixture.componentRef.setInput('color', 'accent');
    expect(component.hostClasses()).toContain('mf-progress-spinner--accent');
  });

  it('should apply warn class when color is warn', () => {
    fixture.componentRef.setInput('color', 'warn');
    expect(component.hostClasses()).toContain('mf-progress-spinner--warn');
  });

  it('should render label when provided', () => {
    fixture.componentRef.setInput('label', 'Procesando...');
    fixture.detectChanges();
    const label = fixture.nativeElement.querySelector('.mf-progress-spinner__label');
    expect(label?.textContent).toContain('Procesando...');
  });

  it('should not render label when not provided', () => {
    fixture.detectChanges();
    const label = fixture.nativeElement.querySelector('.mf-progress-spinner__label');
    expect(label).toBeFalsy();
  });

  it('should add labeled class when label is provided', () => {
    fixture.componentRef.setInput('label', 'Cargando');
    expect(component.wrapperClasses()).toContain('mf-progress-spinner__wrapper--labeled');
  });
});
