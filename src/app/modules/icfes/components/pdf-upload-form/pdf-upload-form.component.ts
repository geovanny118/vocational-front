import { Component, ElementRef, ViewChild, inject } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { FormControl } from '@angular/forms';
import { AuthenticationService } from 'src/app/modules/authentication/services';
import { NgIf, NgClass } from '@angular/common';
import { IcfesService } from '../../services';

@Component({
  selector: 'app-pdf-upload-form',
  standalone: true,
  imports: [MatFormFieldModule, MatButtonModule, MatInputModule, MatIconModule, NgIf, NgClass],
  templateUrl: './pdf-upload-form.component.html',
  styleUrl: './pdf-upload-form.component.scss'
})
export class PdfUploadFormComponent {
  selectedFileName: string = '';
  isButtonDisabled: boolean = true;
  fileFormControl = new FormControl();
  @ViewChild('fileInput') fileInput!: ElementRef;

  authenticationServices = inject(AuthenticationService);
  _icfesServices = inject(IcfesService);

  ngOnInit(): void {
    const userId = localStorage.getItem('identificacion');
    if (userId) {
      this.authenticationServices.getLoggedInUserInfo(userId).subscribe({
        next: (response) => {
          this.authenticationServices.currentUserSignal.set(response);
        },
        error: () => {
          this.authenticationServices.currentUserSignal.set(null);
        }
      });
    }
  }

  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    console.log(file?.name);
    if (file) {
      this.selectedFileName = file?.name;
      this.fileFormControl.setValue(file);
      this.isButtonDisabled = false;
    }
  }

  clearFileSelection(): void {
    this.fileInput.nativeElement.value = '';
    this.clearSelection();
  }

  clearSelection(): void {
    this.selectedFileName = '';
    this.fileFormControl.setValue(null);
    this.isButtonDisabled = true;
  }

  uploadFile(): void {
    const selectedFile: File = this.fileFormControl.value;
    const identification: string = localStorage.getItem('identificacion') ?? '';
    if (selectedFile) {
      console.log('Archivo seleccionado:', selectedFile);
      const formData = new FormData();
      formData.append('file', selectedFile);
      formData.append('identificacion', identification);
      this._icfesServices.uploadPdf(formData).subscribe(
        response => {
          console.log('File uploaded successfully:', response);
        },
        error => {
          console.error('Error uploading file:', error);
        }
      );
      this.clearSelection();
    } else {
      console.log('No se ha seleccionado ningún archivo.');
    }
  }

}
