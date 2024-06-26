import { Component, ElementRef, ViewChild, inject } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { FormControl } from '@angular/forms';
import { AuthenticationService } from 'src/app/modules/authentication/services';
import { NgIf, NgClass } from '@angular/common';
import { IcfesService } from '../../services';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Results, IcfesResult } from '../../models';

@Component({
  selector: 'app-pdf-upload-form',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule,
    NgIf,
    NgClass,
    MatSnackBarModule,
  ],
  templateUrl: './pdf-upload-form.component.html',
  styleUrl: './pdf-upload-form.component.scss',
})
export class PdfUploadFormComponent {
  selectedFileName: string = '';
  isButtonDisabled: boolean = true;
  fileFormControl = new FormControl();
  resultIcfes: Results = {
    lectura_critica: '',
    matematicas: '',
    sociales: '',
    ciencias_naturales: '',
    ingles: '',
    razonamiento: '',
    competencias: '',
  };

  @ViewChild('fileInput') fileInput!: ElementRef;

  authenticationServices: AuthenticationService = inject(AuthenticationService);
  private _icfesServices: IcfesService = inject(IcfesService);
  private _snackBar: MatSnackBar = inject(MatSnackBar);

  ngOnInit(): void {
    const userId = localStorage.getItem('identificacion');
    if (userId) {
      this.authenticationServices.getLoggedInUserInfo(userId).subscribe({
        next: (response) => {
          this.authenticationServices.currentUserSignal.set(response);
        },
        error: () => {
          this.authenticationServices.currentUserSignal.set(null);
        },
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
    this.fileInput.nativeElement.value = null;
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
        (response) => {
          //console.log('File uploaded successfully:', response);
          this.mapMaterias(response);
          //console.log(this.resultIcfes);
          const results: Results[] = [this.resultIcfes];
          console.log(results);
          this._icfesServices.updateResults(results);
          this._snackBar.open('El examen se ha cargado exitosamente.', '✅', {
            duration: 2000,
          });
        },
        (error) => {
          console.error('Error uploading file:', error);
          this._snackBar.open('El archivo no es compatible', '❌', {
            duration: 3000,
          });
        }
      );
      this.clearSelection();
    } else {
      console.log('No se ha seleccionado ningún archivo.');
    }
  }

  mapMaterias(responseData: IcfesResult): void {
    responseData.listaMaterias.forEach((materia) => {
      switch (materia.prueba) {
        case 'LECTURA CRÍTICA':
          this.resultIcfes.lectura_critica = materia.puntaje;
          break;
        case 'MATEMÁTICAS':
          this.resultIcfes.matematicas = materia.puntaje;
          break;
        case 'SOCIALES Y CIUDADANAS':
          this.resultIcfes.sociales = materia.puntaje;
          break;
        case 'CIENCIAS NATURALES':
          this.resultIcfes.ciencias_naturales = materia.puntaje;
          break;
        case 'INGLÉS':
          this.resultIcfes.ingles = materia.nivel;
          break;
        case 'RAZONAMIENTO CUANTITATIVO':
          this.resultIcfes.razonamiento = materia.puntaje;
          break;
        case 'COMPETENCIAS CIUDADANAS':
          this.resultIcfes.competencias = materia.puntaje;
          break;
      }
    });
  }
}
