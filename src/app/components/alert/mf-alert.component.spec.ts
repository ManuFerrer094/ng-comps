import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MfAlertComponent } from './mf-alert.component';

describe('MfAlertComponent', () => {
  let fixture: ComponentFixture<MfAlertComponent>;
  let component: MfAlertComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MfAlertComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MfAlertComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('message', 'Test alert');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render message', () => {
    const msg = fixture.nativeElement.querySelector('.mf-alert__message');
    expect(msg?.textContent).toContain('Test alert');
  });

  it('should apply info severity by default', () => {
    expect(component.hostClasses()).toContain('mf-alert--info');
  });

  it('should show info icon by default', () => {
    expect(component.iconName()).toBe('info');
  });

  it('should show check_circle icon for success', () => {
    fixture.componentRef.setInput('severity', 'success');
    expect(component.iconName()).toBe('check_circle');
  });

  it('should show title when provided', () => {
    fixture.componentRef.setInput('title', 'Atención');
    fixture.detectChanges();
    const title = fixture.nativeElement.querySelector('.mf-alert__title');
    expect(title?.textContent).toContain('Atención');
  });

  it('should show close button when dismissible', () => {
    fixture.componentRef.setInput('dismissible', true);
    fixture.detectChanges();
    const close = fixture.nativeElement.querySelector('.mf-alert__close');
    expect(close).toBeTruthy();
  });

  it('should have role alert', () => {
    const alert = fixture.nativeElement.querySelector('[role="alert"]');
    expect(alert).toBeTruthy();
  });
});
