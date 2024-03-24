import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IcfesScoreViewerComponent } from './icfes-score-viewer.component';

describe('IcfesScoreViewerComponent', () => {
  let component: IcfesScoreViewerComponent;
  let fixture: ComponentFixture<IcfesScoreViewerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IcfesScoreViewerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(IcfesScoreViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
