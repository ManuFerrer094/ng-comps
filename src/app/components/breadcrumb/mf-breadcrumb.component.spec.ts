import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MfBreadcrumbComponent } from './mf-breadcrumb.component';

describe('MfBreadcrumbComponent', () => {
  let fixture: ComponentFixture<MfBreadcrumbComponent>;
  let component: MfBreadcrumbComponent;

  const testItems = [
    { label: 'Home', href: '/', icon: 'home' },
    { label: 'Products', href: '/products' },
    { label: 'Detail' },
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MfBreadcrumbComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MfBreadcrumbComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('items', testItems);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render breadcrumb items', () => {
    const items = fixture.nativeElement.querySelectorAll('.mf-breadcrumb__item');
    expect(items.length).toBe(3);
  });

  it('should render links for non-last items with href', () => {
    const links = fixture.nativeElement.querySelectorAll('.mf-breadcrumb__link');
    expect(links.length).toBe(2);
  });

  it('should render last item as current', () => {
    const current = fixture.nativeElement.querySelectorAll('.mf-breadcrumb__current');
    expect(current.length).toBeGreaterThanOrEqual(1);
  });

  it('should have aria-label', () => {
    const nav = fixture.nativeElement.querySelector('nav');
    expect(nav?.getAttribute('aria-label')).toBe('Breadcrumb');
  });

  it('should render separators', () => {
    const separators = fixture.nativeElement.querySelectorAll('.mf-breadcrumb__separator');
    expect(separators.length).toBe(2);
  });

  it('should emit item click', () => {
    const spy = vi.fn();
    component.mfItemClick.subscribe(spy);
    const link = fixture.nativeElement.querySelector('.mf-breadcrumb__link');
    link?.click();
    expect(spy).toHaveBeenCalled();
  });
});
