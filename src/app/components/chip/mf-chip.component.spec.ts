import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MfChipComponent } from './mf-chip.component';

describe('MfChipComponent', () => {
  let fixture: ComponentFixture<MfChipComponent>;
  let component: MfChipComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MfChipComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MfChipComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('label', 'Test');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render chip label', () => {
    const chip = fixture.nativeElement.querySelector('mat-chip');
    expect(chip?.textContent).toContain('Test');
  });

  it('should apply brand class by default', () => {
    expect(component.hostClasses()).toContain('mf-chip--brand');
  });

  it('should apply filled variant by default', () => {
    expect(component.hostClasses()).toContain('mf-chip--filled');
  });

  it('should apply selected class when selected', () => {
    fixture.componentRef.setInput('selected', true);
    expect(component.hostClasses()).toContain('mf-chip--selected');
  });

  it('should show remove button when removable', () => {
    fixture.componentRef.setInput('removable', true);
    fixture.detectChanges();
    const removeBtn = fixture.nativeElement.querySelector('[matChipRemove]');
    expect(removeBtn).toBeTruthy();
  });
});
