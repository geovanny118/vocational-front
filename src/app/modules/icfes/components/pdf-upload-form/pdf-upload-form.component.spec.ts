import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PdfUploadFormComponent } from './pdf-upload-form.component';

describe('PdfUploadFormComponent', () => {
  let component: PdfUploadFormComponent;
  let fixture: ComponentFixture<PdfUploadFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PdfUploadFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PdfUploadFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
