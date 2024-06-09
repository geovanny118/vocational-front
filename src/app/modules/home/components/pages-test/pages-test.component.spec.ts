import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PagesTestComponent } from './pages-test.component';

describe('PagesTestComponent', () => {
  let component: PagesTestComponent;
  let fixture: ComponentFixture<PagesTestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PagesTestComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PagesTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
