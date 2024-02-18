import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IcfesComponent } from './icfes.component';

describe('IcfesComponent', () => {
  let component: IcfesComponent;
  let fixture: ComponentFixture<IcfesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IcfesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(IcfesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
