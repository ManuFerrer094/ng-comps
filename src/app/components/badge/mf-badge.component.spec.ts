import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MfBadgeComponent } from './mf-badge.component';

describe('MfBadgeComponent', () => {
  let fixture: ComponentFixture<MfBadgeComponent>;
  let component: MfBadgeComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MfBadgeComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MfBadgeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should apply brand class by default', () => {
    expect(component.hostClasses()).toContain('mf-badge--brand');
  });

  it('should apply error class when color is error', () => {
    fixture.componentRef.setInput('color', 'error');
    expect(component.hostClasses()).toContain('mf-badge--error');
  });

  it('should map size correctly', () => {
    fixture.componentRef.setInput('size', 'sm');
    expect(component.matSize()).toBe('small');
  });

  it('should map position correctly', () => {
    fixture.componentRef.setInput('position', 'below-before');
    expect(component.matPosition()).toBe('below before');
  });
});
