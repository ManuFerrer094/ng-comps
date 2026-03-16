import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MfMenuComponent } from './mf-menu.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('MfMenuComponent', () => {
  let fixture: ComponentFixture<MfMenuComponent>;
  let component: MfMenuComponent;

  const testItems = [
    { label: 'Edit', icon: 'edit', value: 'edit' },
    { label: 'Delete', icon: 'delete', value: 'delete' },
    { label: 'Disabled', value: 'disabled', disabled: true },
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MfMenuComponent, NoopAnimationsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(MfMenuComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('items', testItems);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render trigger button', () => {
    const button = fixture.nativeElement.querySelector('button');
    expect(button).toBeTruthy();
  });

  it('should use more_vert icon by default', () => {
    expect(component.triggerIcon()).toBe('more_vert');
  });

  it('should have accessible trigger label', () => {
    expect(component.triggerLabel()).toBe('Abrir menú');
  });

  it('should emit item click', () => {
    const spy = vi.fn();
    component.mfItemClick.subscribe(spy);
    component.mfItemClick.emit('edit');
    expect(spy).toHaveBeenCalledWith('edit');
  });
});
