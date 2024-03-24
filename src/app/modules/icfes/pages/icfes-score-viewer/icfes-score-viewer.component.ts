import { Component } from '@angular/core';
import { PdfUploadFormComponent } from '../../components';

@Component({
  selector: 'app-icfes-score-viewer',
  standalone: true,
  imports: [PdfUploadFormComponent],
  templateUrl: './icfes-score-viewer.component.html',
  styleUrl: './icfes-score-viewer.component.scss'
})
export class IcfesScoreViewerComponent {

}
