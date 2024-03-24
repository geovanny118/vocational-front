import { Component, ElementRef, ViewChild, inject } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { FormControl } from '@angular/forms';
import { AuthenticationService } from 'src/app/modules/authentication/services';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-pdf-upload-form',
  standalone: true,
  imports: [MatFormFieldModule, MatButtonModule, MatInputModule, MatIconModule, NgIf],
  templateUrl: './pdf-upload-form.component.html',
  styleUrl: './pdf-upload-form.component.scss'
})
export class PdfUploadFormComponent {
  selectedFileName: string = '';
  fileFormControl = new FormControl();
  @ViewChild('fileInput') fileInput!: ElementRef;

  authenticationServices = inject(AuthenticationService);

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
    console.log(file);
    if (file) {
      this.selectedFileName = file?.name;
      // Intenta acceder a la ruta relativa del archivo
      const relativePath = file['webkitRelativePath'] || '';
      console.log('Ruta relativa del archivo:', relativePath);
      // Actualiza el valor del FormControl con el archivo seleccionado
      this.fileFormControl.setValue(file);
    }
  }

  clearFileSelection(): void {
    // Establece el valor del input de tipo archivo a una cadena vacía
    this.fileInput.nativeElement.value = '';
    // Limpia la selección
    this.clearSelection();
  }

  // Método para limpiar la selección de archivo
  clearSelection(): void {
    // Limpia el nombre del archivo seleccionado y el valor del FormControl
    this.selectedFileName = '';
    this.fileFormControl.setValue(null);
  }

  // Método para cargar el archivo (podrías enviarlo a través de un servicio, por ejemplo)
  uploadFile(): void {
    const selectedFile: File = this.fileFormControl.value;
    if (selectedFile) {
      // Realiza alguna acción con el archivo seleccionado, por ejemplo, enviarlo a un servicio
      console.log('Archivo seleccionado:', selectedFile);
      // Limpia la selección después de cargar el archivo
      this.clearSelection();
    } else {
      console.log('No se ha seleccionado ningún archivo.');
    }
  }
}
