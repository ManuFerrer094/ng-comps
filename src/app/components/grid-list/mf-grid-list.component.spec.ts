import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MfGridListComponent } from './mf-grid-list.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

const SAMPLE_TILES = [
  { title: 'Tile 1', subtitle: 'Sub 1', background: '#ccc' },
  { title: 'Tile 2', background: '#eee', colspan: 2 },
];

describe('MfGridListComponent', () => {
  let fixture: ComponentFixture<MfGridListComponent>;
  let component: MfGridListComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MfGridListComponent, NoopAnimationsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(MfGridListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render mat-grid-list', () => {
    const gridList = fixture.nativeElement.querySelector('mat-grid-list');
    expect(gridList).toBeTruthy();
  });

  it('should render tiles from input', () => {
    fixture.componentRef.setInput('tiles', SAMPLE_TILES);
    fixture.detectChanges();
    const tiles = fixture.nativeElement.querySelectorAll('mat-grid-tile');
    expect(tiles.length).toBe(SAMPLE_TILES.length);
  });

  it('should render tile title', () => {
    fixture.componentRef.setInput('tiles', SAMPLE_TILES);
    fixture.detectChanges();
    const titleEl = fixture.nativeElement.querySelector('.mf-grid-list__tile-title');
    expect(titleEl?.textContent).toContain('Tile 1');
  });

  it('should default cols to 2', () => {
    expect(component.cols()).toBe(2);
  });

  it('should render empty grid when tiles is empty', () => {
    fixture.componentRef.setInput('tiles', []);
    fixture.detectChanges();
    const tiles = fixture.nativeElement.querySelectorAll('mat-grid-tile');
    expect(tiles.length).toBe(0);
  });
});
