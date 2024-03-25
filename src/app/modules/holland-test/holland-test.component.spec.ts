import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HollandTestComponent } from './holland-test.component';

describe('HollandTestComponent', () => {
  let component: HollandTestComponent;
  let fixture: ComponentFixture<HollandTestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HollandTestComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HollandTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
