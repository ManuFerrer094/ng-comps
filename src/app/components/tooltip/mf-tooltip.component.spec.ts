import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MfTooltipComponent } from './mf-tooltip.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('MfTooltipComponent', () => {
  let fixture: ComponentFixture<MfTooltipComponent>;
  let component: MfTooltipComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MfTooltipComponent, NoopAnimationsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(MfTooltipComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('text', 'Tooltip text');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should apply above position by default', () => {
    expect(component.hostClasses()).toContain('mf-tooltip--above');
  });

  it('should apply custom position', () => {
    fixture.componentRef.setInput('position', 'below');
    expect(component.hostClasses()).toContain('mf-tooltip--below');
  });

  it('should have correct default delays', () => {
    expect(component.showDelay()).toBe(200);
    expect(component.hideDelay()).toBe(0);
  });
});
