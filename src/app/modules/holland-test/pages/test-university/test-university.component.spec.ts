import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestUniversityComponent } from './test-university.component';

describe('TestUniversityComponent', () => {
  let component: TestUniversityComponent;
  let fixture: ComponentFixture<TestUniversityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestUniversityComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TestUniversityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
