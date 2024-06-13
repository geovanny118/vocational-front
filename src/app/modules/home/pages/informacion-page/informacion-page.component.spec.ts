import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InformacionPageComponent } from './informacion-page.component';

describe('InformacionPageComponent', () => {
  let component: InformacionPageComponent;
  let fixture: ComponentFixture<InformacionPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InformacionPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InformacionPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
