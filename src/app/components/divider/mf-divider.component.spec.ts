import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MfDividerComponent } from './mf-divider.component';

describe('MfDividerComponent', () => {
  let fixture: ComponentFixture<MfDividerComponent>;
  let component: MfDividerComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MfDividerComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MfDividerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render mat-divider', () => {
    const divider = fixture.nativeElement.querySelector('mat-divider');
    expect(divider).toBeTruthy();
  });

  it('should apply full variant by default', () => {
    expect(component.hostClasses()).toContain('mf-divider--full');
  });

  it('should compute inset value for inset variant', () => {
    fixture.componentRef.setInput('variant', 'inset');
    expect(component.insetValue()).toBe(true);
  });

  it('should apply vertical class when vertical', () => {
    fixture.componentRef.setInput('vertical', true);
    expect(component.hostClasses()).toContain('mf-divider--vertical');
  });
});
