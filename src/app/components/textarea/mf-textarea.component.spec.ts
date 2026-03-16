import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MfTextareaComponent } from './mf-textarea.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('MfTextareaComponent', () => {
  let fixture: ComponentFixture<MfTextareaComponent>;
  let component: MfTextareaComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MfTextareaComponent, NoopAnimationsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(MfTextareaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render textarea', () => {
    const textarea = fixture.nativeElement.querySelector('textarea');
    expect(textarea).toBeTruthy();
  });

  it('should apply md size by default', () => {
    expect(component.hostClasses()).toContain('mf-textarea--md');
  });

  it('should have default 4 rows', () => {
    expect(component.rows()).toBe(4);
  });

  it('should apply vertical resize by default', () => {
    expect(component.hostClasses()).toContain('mf-textarea--resize-vertical');
  });

  it('should render label when provided', () => {
    fixture.componentRef.setInput('label', 'Description');
    fixture.detectChanges();
    const label = fixture.nativeElement.querySelector('mat-label');
    expect(label?.textContent).toContain('Description');
  });

  it('should emit input event', () => {
    const spy = vi.fn();
    component.mfInput.subscribe(spy);
    const textarea = fixture.nativeElement.querySelector('textarea');
    textarea.value = 'Hello';
    textarea.dispatchEvent(new Event('input'));
    expect(spy).toHaveBeenCalledWith('Hello');
  });
});
