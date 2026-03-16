import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MfTabsComponent } from './mf-tabs.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('MfTabsComponent', () => {
  let fixture: ComponentFixture<MfTabsComponent>;
  let component: MfTabsComponent;

  const testTabs = [
    { label: 'Tab 1' },
    { label: 'Tab 2' },
    { label: 'Tab 3', disabled: true },
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MfTabsComponent, NoopAnimationsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(MfTabsComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('tabs', testTabs);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render tabs', () => {
    const tabLabels = fixture.nativeElement.querySelectorAll('.mat-mdc-tab');
    expect(tabLabels.length).toBe(3);
  });

  it('should apply default variant', () => {
    expect(component.hostClasses()).toContain('mf-tabs--default');
  });

  it('should apply stretched variant', () => {
    fixture.componentRef.setInput('variant', 'stretched');
    expect(component.hostClasses()).toContain('mf-tabs--stretched');
  });

  it('should emit index change', () => {
    const spy = vi.fn();
    component.mfSelectedIndexChange.subscribe(spy);
    component.mfSelectedIndexChange.emit(1);
    expect(spy).toHaveBeenCalledWith(1);
  });
});
