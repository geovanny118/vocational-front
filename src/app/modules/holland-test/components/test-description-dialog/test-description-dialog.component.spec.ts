import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestDescriptionDialogComponent } from './test-description-dialog.component';

describe('TestDescriptionDialogComponent', () => {
  let component: TestDescriptionDialogComponent;
  let fixture: ComponentFixture<TestDescriptionDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestDescriptionDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TestDescriptionDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
