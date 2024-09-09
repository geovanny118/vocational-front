import { Component, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { ChasideTestService } from 'src/app/modules/chaside-test/services';
import { ImagenesAreaInteres, TextoAreaInteres, ChasideResult, University } from '../../models';
import { Usuario } from 'src/app/modules/authentication/models';
import { AuthenticationService } from 'src/app/modules/authentication/services';
import { Router } from '@angular/router';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'chaside-test-result',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, MatProgressSpinnerModule, MatSnackBarModule],
  templateUrl: './test-result.component.html',
  styleUrl: './test-result.component.scss',
})
export class TestResultComponent {
  user: Usuario | undefined;
  authenticationServices = inject(AuthenticationService);
  chasideTestService: ChasideTestService = inject(ChasideTestService);
  chasideResult: ChasideResult[] | undefined | null = this.chasideTestService.currentChasideResultSignal();
  areasInteres: string[] = [];
  loading: boolean = false;
  private _router: Router = inject(Router);
  private _snackBar: MatSnackBar = inject(MatSnackBar);

  readonly imagenesAreasDeInteres: ImagenesAreaInteres = {
    'Área de Ciencias Experimentales':
      'https://images.unsplash.com/photo-1636751179475-516561a802c4?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'Área de Enseñanzas Técnicas':
      'https://images.unsplash.com/photo-1482062364825-616fd23b8fc1?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'Área Artística':
      'https://plus.unsplash.com/premium_photo-1706430433607-48f37bdd71b8?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'Área de Humanidades y Ciencias Sociales y Jurídicas':
      'https://images.unsplash.com/photo-1460518451285-97b6aa326961?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'Área Administrativa':
      'https://images.unsplash.com/photo-1501504905252-473c47e087f8?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'Área de Ciencias de la Salud':
      'https://plus.unsplash.com/premium_photo-1664475473789-1ea7ac194527?q=80&w=2072&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'Área de Defensa y Seguridad':
      'https://plus.unsplash.com/premium_photo-1663050763436-818382a24bb8?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  };

  readonly textoAreasDeInteres: TextoAreaInteres = {
    'Área de Ciencias Experimentales':
      'El Área Científica se centra en el estudio y la comprensión del mundo natural a través de la observación, la experimentación y el análisis. Esta área incluye disciplinas como la física, la química, la biología, y las ciencias ambientales. Los profesionales en este campo son investigadores, científicos y técnicos que trabajan en laboratorios, universidades y centros de investigación, desarrollando nuevas teorías y tecnologías que mejoran nuestra comprensión del universo y contribuyen al avance tecnológico.',
    'Área de Enseñanzas Técnicas':
      'El Área de Enseñanzas Técnicas se enfoca en la aplicación práctica de la ciencia para resolver problemas y crear innovaciones que mejoren la vida cotidiana. Este campo abarca la ingeniería, la informática y la tecnología de la información. Los tecnólogos y los ingenieros diseñan, construyen y mantienen sistemas, dispositivos y software que son esenciales en la industria, la comunicación, la medicina y muchos otros sectores.',
    'Área Artística':
      'El Área Artística está dedicada a la expresión creativa y la comunicación a través de diversas formas de arte. Esto incluye las artes visuales, la música, el teatro, la danza, el diseño gráfico y la moda. Los artistas y diseñadores utilizan su talento para crear obras que inspiran, provocan emociones y transmiten mensajes. Trabajan en estudios, teatros, agencias de diseño y medios de comunicación, aportando belleza y significado a nuestra cultura y sociedad.',
    'Área de Humanidades y Ciencias Sociales y Jurídicas':
      'El Área de Humanidades y Ciencias Sociales y Jurídicas se centra en el estudio del comportamiento humano y las sociedades. Incluye disciplinas como la psicología, la sociología, la antropología, el trabajo social, la educación y los estudios culturales. Los profesionales en este campo trabajan para entender y mejorar las interacciones humanas, promover la justicia social y educar a las futuras generaciones. Su labor es fundamental para el desarrollo de políticas públicas, programas educativos y servicios comunitarios.',
    'Área Administrativa':
      'El Área Administrativa y Financiera se enfoca en la gestión de organizaciones y recursos económicos. Esto incluye la administración de empresas, la contabilidad, las finanzas, el marketing, la economía y la gestión de recursos humanos. Los profesionales en este campo planifican, organizan y controlan las operaciones empresariales, asegurando la eficiencia y la rentabilidad. Trabajan en corporaciones, instituciones financieras, agencias gubernamentales y organizaciones sin fines de lucro.',
    'Área de Ciencias de la Salud':
      'El Área de Ciencias de la Salud se dedica al bienestar físico y mental de las personas. Incluye disciplinas como la medicina, la enfermería, la nutrición, la fisioterapia, la terapia ocupacional y la salud pública. Los profesionales de la salud diagnostican, tratan y previenen enfermedades, así como promueven hábitos de vida saludables. Trabajan en hospitales, clínicas, centros de rehabilitación y organismos de salud pública, mejorando la calidad de vida y la esperanza de vida de las comunidades.',
    'Área de Defensa y Seguridad':
      'El Área de Defensa y Seguridad se centra en la enseñanza y formación de profesionales encargados de garantizar la protección y bienestar de la sociedad. Esta área abarca diversos niveles educativos, desde la formación inicial hasta la capacitación avanzada y especialización técnica. Los instructores y expertos en defensa desarrollan estrategias, técnicas y materiales didácticos para impartir conocimientos en tácticas, tecnología y gestión de seguridad. Trabajan en academias militares, instituciones de seguridad pública, centros de formación y organismos gubernamentales, desempeñando un papel crucial en la preparación de los individuos para enfrentar y mitigar amenazas, asegurando la paz y estabilidad en diversas comunidades.',
  };

  ngOnInit() {
    const userId = localStorage.getItem('identificacion');
    let mensaje: string = '';
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

    if (this.chasideResult) {
      this.chasideResult.forEach(result => {
        if (result.areaInteres) {
          this.areasInteres.push(...result.areaInteres.split(',').map(area => area.trim()));
        }
      });
      mensaje = this.chasideResult[0].mensaje || '';
      this.showMessage(mensaje);
    }
  }

  getImageUrl(areaInteres: string): string {
    return this.imagenesAreasDeInteres[areaInteres] || '';
  }

  getDescription(areaInteres: string): string {
    return this.textoAreasDeInteres[areaInteres] || '';
  }

  getUniversities(areaInteres: string): void {
    this.loading = true;
    this.chasideTestService.getUniversities(areaInteres).subscribe(
      (response: University) => {
        console.log('Universidades recomendadas:', response);
        this.chasideTestService.currentCareerSignal.set(response?.categorias);
        this.chasideTestService.currentUniversitiesResultSignal.set(response?.cardsUniversidades);
        this._router.navigateByUrl('/chaside/universities').then(() => {
          this.loading = false;
        });
      }
    );
  }

  showMessage(mensaje: string): void {
    this._snackBar.open(mensaje, '', { duration: 10000 });
  }
}
