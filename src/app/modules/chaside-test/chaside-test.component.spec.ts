import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChasideTestComponent } from './chaside-test.component';

describe('ChasideTestComponent', () => {
  let component: ChasideTestComponent;
  let fixture: ComponentFixture<ChasideTestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChasideTestComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ChasideTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
