import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MfAccordionComponent } from './mf-accordion.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('MfAccordionComponent', () => {
  let fixture: ComponentFixture<MfAccordionComponent>;
  let component: MfAccordionComponent;

  const testPanels = [
    { title: 'Panel 1', content: 'Content 1' },
    { title: 'Panel 2', description: 'Description', content: 'Content 2' },
    { title: 'Panel 3', content: 'Content 3', disabled: true },
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MfAccordionComponent, NoopAnimationsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(MfAccordionComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('panels', testPanels);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render expansion panels', () => {
    const panels = fixture.nativeElement.querySelectorAll('mat-expansion-panel');
    expect(panels.length).toBe(3);
  });

  it('should apply host classes', () => {
    expect(component.hostClasses()).toBe('mf-accordion');
  });

  it('should not allow multi by default', () => {
    expect(component.multi()).toBe(false);
  });

  it('should render panel titles', () => {
    const titles = fixture.nativeElement.querySelectorAll('mat-panel-title');
    expect(titles.length).toBe(3);
    expect(titles[0].textContent).toContain('Panel 1');
  });
});
