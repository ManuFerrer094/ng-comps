import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MfSlideToggleComponent } from './mf-slide-toggle.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('MfSlideToggleComponent', () => {
  let fixture: ComponentFixture<MfSlideToggleComponent>;
  let component: MfSlideToggleComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MfSlideToggleComponent, NoopAnimationsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(MfSlideToggleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render mat-slide-toggle', () => {
    const toggle = fixture.nativeElement.querySelector('mat-slide-toggle');
    expect(toggle).toBeTruthy();
  });

  it('should apply base class', () => {
    expect(component.hostClasses()).toContain('mf-slide-toggle');
  });

  it('should apply disabled class when disabled', () => {
    fixture.componentRef.setInput('disabled', true);
    expect(component.hostClasses()).toContain('mf-slide-toggle--disabled');
  });

  it('should emit change event', () => {
    const spy = vi.fn();
    component.mfChange.subscribe(spy);
    component.onChange({ checked: true });
    expect(spy).toHaveBeenCalledWith(true);
  });
});
