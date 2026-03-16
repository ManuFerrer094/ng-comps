import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MfAvatarComponent } from './mf-avatar.component';

describe('MfAvatarComponent', () => {
  let fixture: ComponentFixture<MfAvatarComponent>;
  let component: MfAvatarComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MfAvatarComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MfAvatarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show initials when no src', () => {
    fixture.componentRef.setInput('name', 'John Doe');
    fixture.detectChanges();
    const span = fixture.nativeElement.querySelector('.mf-avatar');
    expect(span?.textContent?.trim()).toBe('JD');
  });

  it('should show ? when no name and no src', () => {
    fixture.detectChanges();
    const span = fixture.nativeElement.querySelector('.mf-avatar');
    expect(span?.textContent?.trim()).toBe('?');
  });

  it('should render img when src provided', () => {
    fixture.componentRef.setInput('src', 'https://example.com/photo.jpg');
    fixture.detectChanges();
    const img = fixture.nativeElement.querySelector('img');
    expect(img).toBeTruthy();
  });

  it('should apply circle variant by default', () => {
    expect(component.hostClasses()).toContain('mf-avatar--circle');
  });

  it('should apply md size by default', () => {
    expect(component.hostClasses()).toContain('mf-avatar--md');
  });
});
