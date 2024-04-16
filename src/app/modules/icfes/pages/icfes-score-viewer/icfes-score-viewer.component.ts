import { Component } from '@angular/core';
import { PdfUploadFormComponent } from '../../components';
import { MatTableModule } from '@angular/material/table';
import { Materia } from '../../models';

export interface resultados {
  lectura_critica: string;
  matematicas: string;
  sociales: string;
  ciencias_naturales: string;
  ingles: string;
  razonamiento: string;
  competencias: string;
}
@Component({
  selector: 'app-icfes-score-viewer',
  standalone: true,
  imports: [PdfUploadFormComponent, MatTableModule],
  templateUrl: './icfes-score-viewer.component.html',
  styleUrl: './icfes-score-viewer.component.scss'
})
export class IcfesScoreViewerComponent {
  materias: Materia[] = [
    { prueba: "LECTURA CRÍTICA", puntaje: "63", nivel: "", decil: "D07" },
    { prueba: "MATEMÁTICAS", puntaje: "68", nivel: "", decil: "D07" },
    { prueba: "SOCIALES Y CIUDADANAS", puntaje: "75", nivel: "", decil: "D09" },
    { prueba: "CIENCIAS NATURALES", puntaje: "61", nivel: "", decil: "D06" },
    { prueba: "INGLÉS", puntaje: "66", nivel: "A2", decil: "D06" },
    { prueba: "RAZONAMIENTO CUANTITATIVO", puntaje: "71", nivel: "", decil: "D07" },
    { prueba: "COMPETENCIAS CIUDADANAS", puntaje: "66", nivel: "", decil: "D08" }
  ];

  resultados: resultados[] = [
    {
      lectura_critica: "63",
      matematicas: "68",
      sociales: "75",
      ciencias_naturales: "61",
      ingles: "A2",
      razonamiento: "71",
      competencias: "66"
    }
  ];

  displayedColumns: string[] = ['lectura crítica', 'matemáticas', 'sociales y ciudadanas', 'ciencias naturales', 'inglés', 'razonamiento cuantitativo', 'competencias ciudadanas'];
  dataSource: resultados[] = this.resultados;
}
