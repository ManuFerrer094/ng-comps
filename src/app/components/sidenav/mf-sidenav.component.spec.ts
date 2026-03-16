import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MfSidenavComponent } from './mf-sidenav.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('MfSidenavComponent', () => {
  let fixture: ComponentFixture<MfSidenavComponent>;
  let component: MfSidenavComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MfSidenavComponent, NoopAnimationsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(MfSidenavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render mat-sidenav-container', () => {
    const container = fixture.nativeElement.querySelector('mat-sidenav-container');
    expect(container).toBeTruthy();
  });

  it('should render mat-sidenav', () => {
    const sidenav = fixture.nativeElement.querySelector('mat-sidenav');
    expect(sidenav).toBeTruthy();
  });

  it('should apply side class by default', () => {
    expect(component.sidenavClasses()).toContain('mf-sidenav--side');
  });

  it('should apply over class when mode is over', () => {
    fixture.componentRef.setInput('mode', 'over');
    expect(component.sidenavClasses()).toContain('mf-sidenav--over');
  });

  it('should apply push class when mode is push', () => {
    fixture.componentRef.setInput('mode', 'push');
    expect(component.sidenavClasses()).toContain('mf-sidenav--push');
  });

  it('should emit mfOpenedChange when sidenav state changes', () => {
    const spy = vi.fn();
    component.mfOpenedChange.subscribe(spy);
    fixture.componentRef.setInput('opened', true);
    fixture.detectChanges();
  });

  it('should apply container class', () => {
    expect(component.containerClasses()).toBe('mf-sidenav-container');
  });
});
