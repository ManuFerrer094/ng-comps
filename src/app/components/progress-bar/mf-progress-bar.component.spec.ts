import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MfProgressBarComponent } from './mf-progress-bar.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('MfProgressBarComponent', () => {
  let fixture: ComponentFixture<MfProgressBarComponent>;
  let component: MfProgressBarComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MfProgressBarComponent, NoopAnimationsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(MfProgressBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render mat-progress-bar', () => {
    const bar = fixture.nativeElement.querySelector('mat-progress-bar');
    expect(bar).toBeTruthy();
  });

  it('should apply brand class by default', () => {
    expect(component.hostClasses()).toContain('mf-progress-bar--brand');
  });

  it('should apply accent class when color is accent', () => {
    fixture.componentRef.setInput('color', 'accent');
    expect(component.hostClasses()).toContain('mf-progress-bar--accent');
  });

  it('should apply warn class when color is warn', () => {
    fixture.componentRef.setInput('color', 'warn');
    expect(component.hostClasses()).toContain('mf-progress-bar--warn');
  });

  it('should render label when provided', () => {
    fixture.componentRef.setInput('label', 'Loading...');
    fixture.detectChanges();
    const label = fixture.nativeElement.querySelector('.mf-progress-bar__label');
    expect(label?.textContent).toContain('Loading...');
  });

  it('should show percentage when showValue is true and mode is determinate', () => {
    fixture.componentRef.setInput('mode', 'determinate');
    fixture.componentRef.setInput('value', 75);
    fixture.componentRef.setInput('showValue', true);
    fixture.detectChanges();
    const valueEl = fixture.nativeElement.querySelector('.mf-progress-bar__value');
    expect(valueEl?.textContent).toContain('75%');
  });

  it('should not show percentage in indeterminate mode', () => {
    fixture.componentRef.setInput('mode', 'indeterminate');
    fixture.componentRef.setInput('showValue', true);
    fixture.detectChanges();
    const valueEl = fixture.nativeElement.querySelector('.mf-progress-bar__value');
    expect(valueEl).toBeFalsy();
  });
});
