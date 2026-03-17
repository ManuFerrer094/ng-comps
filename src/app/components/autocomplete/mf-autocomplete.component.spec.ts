import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MfAutocompleteComponent } from './mf-autocomplete.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('MfAutocompleteComponent', () => {
  let fixture: ComponentFixture<MfAutocompleteComponent>;
  let component: MfAutocompleteComponent;

  const testOptions = [
    { value: '1', label: 'Angular' },
    { value: '2', label: 'React' },
    { value: '3', label: 'Vue' },
    { value: '4', label: 'Svelte', disabled: true },
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MfAutocompleteComponent, NoopAnimationsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(MfAutocompleteComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('options', testOptions);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render input with mat-autocomplete', () => {
    const input = fixture.nativeElement.querySelector('input[matinput]');
    expect(input).toBeTruthy();
  });

  it('should apply md size class by default', () => {
    expect(component.hostClasses()).toContain('mf-autocomplete--md');
  });

  it('should apply sm size class', () => {
    fixture.componentRef.setInput('size', 'sm');
    expect(component.hostClasses()).toContain('mf-autocomplete--sm');
  });

  it('should apply lg size class', () => {
    fixture.componentRef.setInput('size', 'lg');
    expect(component.hostClasses()).toContain('mf-autocomplete--lg');
  });

  it('should include mf-autocomplete--full when fullWidth is true', () => {
    fixture.componentRef.setInput('fullWidth', true);
    expect(component.hostClasses()).toContain('mf-autocomplete--full');
  });

  it('should include mf-autocomplete--error when error is provided', () => {
    fixture.componentRef.setInput('error', 'Required');
    expect(component.hostClasses()).toContain('mf-autocomplete--error');
  });

  it('should include mf-autocomplete-panel in panelClasses by default', () => {
    expect(component.autocompletePanelClasses()).toContain('mf-autocomplete-panel');
  });

  it('should merge extra panelClass string', () => {
    fixture.componentRef.setInput('panelClass', 'custom-panel');
    expect(component.autocompletePanelClasses()).toContain('mf-autocomplete-panel');
    expect(component.autocompletePanelClasses()).toContain('custom-panel');
  });

  it('should filter options based on input text', () => {
    component.inputValue = 'ang';
    fixture.detectChanges();
    const filtered = component.filteredOptions();
    expect(filtered.length).toBe(1);
    expect(filtered[0].label).toBe('Angular');
  });

  it('should return all options when input is empty', () => {
    component.inputValue = '';
    expect(component.filteredOptions().length).toBe(testOptions.length);
  });

  it('should emit mfInput on input change', () => {
    const spy = vi.fn();
    component.mfInput.subscribe(spy);
    component.onInputChange('Ang');
    expect(spy).toHaveBeenCalledWith('Ang');
  });

  it('should emit mfOptionSelected when option is selected', () => {
    const spy = vi.fn();
    component.mfOptionSelected.subscribe(spy);
    component.onOptionSelected({ option: { value: 'Angular' } });
    expect(spy).toHaveBeenCalledWith(testOptions[0]);
  });

  it('should render label when provided', () => {
    fixture.componentRef.setInput('label', 'Framework');
    fixture.detectChanges();
    const label = fixture.nativeElement.querySelector('mat-label');
    expect(label?.textContent).toContain('Framework');
  });

  it('should render hint when provided', () => {
    fixture.componentRef.setInput('hint', 'Start typing...');
    fixture.detectChanges();
    const hint = fixture.nativeElement.querySelector('mat-hint');
    expect(hint?.textContent).toContain('Start typing...');
  });

  it('should render error when provided', () => {
    fixture.componentRef.setInput('error', 'Selection required');
    fixture.detectChanges();
    const error = fixture.nativeElement.querySelector('mat-error');
    expect(error?.textContent).toContain('Selection required');
  });
});
