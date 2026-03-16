import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MfRadioButtonComponent } from './mf-radio-button.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

const SAMPLE_OPTIONS = [
  { value: 'a', label: 'Opción A' },
  { value: 'b', label: 'Opción B' },
  { value: 'c', label: 'Opción C', disabled: true },
];

describe('MfRadioButtonComponent', () => {
  let fixture: ComponentFixture<MfRadioButtonComponent>;
  let component: MfRadioButtonComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MfRadioButtonComponent, NoopAnimationsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(MfRadioButtonComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('options', SAMPLE_OPTIONS);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render mat-radio-group', () => {
    const group = fixture.nativeElement.querySelector('mat-radio-group');
    expect(group).toBeTruthy();
  });

  it('should render all options', () => {
    const buttons = fixture.nativeElement.querySelectorAll('mat-radio-button');
    expect(buttons.length).toBe(SAMPLE_OPTIONS.length);
  });

  it('should apply vertical class by default', () => {
    expect(component.hostClasses()).toContain('mf-radio--vertical');
  });

  it('should apply horizontal class when direction is horizontal', () => {
    fixture.componentRef.setInput('direction', 'horizontal');
    expect(component.hostClasses()).toContain('mf-radio--horizontal');
  });

  it('should emit mfChange when selection changes', () => {
    const spy = vi.fn();
    component.mfChange.subscribe(spy);
    component.onChange({ value: 'b' });
    expect(spy).toHaveBeenCalledWith('b');
  });
});
