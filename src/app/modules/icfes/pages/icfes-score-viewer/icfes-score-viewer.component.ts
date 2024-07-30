import { Component, inject } from '@angular/core';
import { PdfUploadFormComponent } from '../../components';
import { MatTableModule } from '@angular/material/table';
import { Results } from '../../models';
import { IcfesService } from '../../services';

@Component({
  selector: 'app-icfes-score-viewer',
  standalone: true,
  imports: [PdfUploadFormComponent, MatTableModule],
  templateUrl: './icfes-score-viewer.component.html',
  styleUrl: './icfes-score-viewer.component.scss',
})
export class IcfesScoreViewerComponent {
  displayedColumns: string[] = [
    'lectura crítica',
    'matemáticas',
    'sociales y ciudadanas',
    'ciencias naturales',
    'inglés',
    'razonamiento cuantitativo',
    'competencias ciudadanas',
  ];
  dataSource: Results[] = [];

  private _icfesServices: IcfesService = inject(IcfesService);

  ngOnInit(): void {

    /*
    this._icfesServices.currentResults.subscribe((results) => {
      this.dataSource = results;
    });
    */
    this._icfesServices.getResults().subscribe((results) => {
      this.dataSource = results;
    });
  }
}
