import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MfPaginatorComponent } from './mf-paginator.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('MfPaginatorComponent', () => {
  let fixture: ComponentFixture<MfPaginatorComponent>;
  let component: MfPaginatorComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MfPaginatorComponent, NoopAnimationsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(MfPaginatorComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('length', 100);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render mat-paginator', () => {
    const paginator = fixture.nativeElement.querySelector('mat-paginator');
    expect(paginator).toBeTruthy();
  });

  it('should have default page size of 10', () => {
    expect(component.pageSize()).toBe(10);
  });

  it('should have default page size options', () => {
    expect(component.pageSizeOptions()).toEqual([5, 10, 25, 50]);
  });

  it('should show first/last buttons by default', () => {
    expect(component.showFirstLastButtons()).toBe(true);
  });

  it('should apply host classes', () => {
    expect(component.hostClasses()).toBe('mf-paginator');
  });
});
