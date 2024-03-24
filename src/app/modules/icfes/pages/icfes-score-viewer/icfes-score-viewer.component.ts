import { Component } from '@angular/core';
import { PdfUploadFormComponent } from '../../components';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-icfes-score-viewer',
  standalone: true,
  imports: [PdfUploadFormComponent, MatTableModule],
  templateUrl: './icfes-score-viewer.component.html',
  styleUrl: './icfes-score-viewer.component.scss'
})
export class IcfesScoreViewerComponent {

}
