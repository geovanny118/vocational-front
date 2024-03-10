import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogTestDescriptionComponent } from './dialog-test-description.component';

describe('DialogTestDescriptionComponent', () => {
  let component: DialogTestDescriptionComponent;
  let fixture: ComponentFixture<DialogTestDescriptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogTestDescriptionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DialogTestDescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
